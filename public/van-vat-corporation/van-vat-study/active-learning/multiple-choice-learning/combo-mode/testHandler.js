    let questions = [];
    let currentIndex = 0;
    let correctCount = 0;
    let acceptAnswer = true;
    let hasLoseStreak = false;

    let score = 0;
    let combo = 0;

    // Combo timer
    const comboDuration = 10000;
    let comboTimer = null;
    let comboExpireTime = null;
    let comboBarInterval = null;

    // Timer
    let startTime = null;
    let timerInterval = null;
    let elapsedTime = 0;

    const questionContainer = document.getElementById("question-container");
    const body = document.getElementById("body");
    const progressBar = document.getElementById("progress-bar");
    const progressText = document.getElementById("progress-text");
    const timerText = document.getElementById("timer-text");
    const scoreDisplay = document.getElementById("score-display");
    const comboText = document.getElementById("combo-text");
    const comboTimerBar = document.getElementById("combo-timer-bar");


const params = new URLSearchParams(window.location.search);
const testId = params.get("testId");
const random = params.get("random") === "true";
const colNum = params.get("col");
const badSound = params.get("badSound") === "true";
const forceAnswers = params.get("forceAnswers");


    // 🪄 Load Questions
async function loadQuestions() {
  //const hash = window.location.hash.replace("#", "");



  const url = `https://academy.vanvatcorp.com/api/active-learning/testbank/${testId}.json`;
  const res = await fetch(url);
  const data = await res.json();

questions = data.questions;


  if (random) {
  questions.forEach((q, idx) => {
answerShuffle(q);
});

fisherYatesShuffle(questions);
}

  
  showQuestion(true);
  updateProgress();
  startTimer();
}








    function startTimer(){
      startTime = Date.now();
      timerInterval = setInterval(()=>{
        elapsedTime = Math.floor((Date.now() - startTime)/1000);
        const m = String(Math.floor(elapsedTime/60)).padStart(2,'0');
        const s = String(elapsedTime%60).padStart(2,'0');
        timerText.textContent = `${m}:${s}`;
      },1000);
    }







    function stopTimer(){ clearInterval(timerInterval); }










    // Combo timer bar logic
    function startComboTimer(){
      stopComboTimer();
// 500 addition for transition
      comboExpireTime = Date.now() + comboDuration + 500;
      comboTimerBar.style.width = "100%";

      comboBarInterval = setInterval(()=>{
if(!acceptAnswer) return;

        const remaining = comboExpireTime - Date.now();
        if(remaining <= 0){
          resetCombo();
        } else {
          const percent = (remaining / comboDuration) * 100;
          comboTimerBar.style.width = `${percent}%`;
        }
      }, 50);
    }





    function stopComboTimer(){
      clearInterval(comboBarInterval);
    }




    function resetCombo(){
      combo = 0;
      comboText.textContent = "";
      comboTimerBar.style.width = "0%";
      stopComboTimer();
    }





    function showCombo(){
      if(combo <= 1){
        comboText.textContent = "";
        return;
      }
      comboText.textContent = `🔥 Combo x${combo}!`;
      comboText.classList.remove("combo-animate");
      void comboText.offsetWidth; // re-trigger animation
      comboText.classList.add("combo-animate");
    }

    // Scoring
    function calculatePoints(answerTime){
      const maxPoints = 300;
      const t = Math.max(0, answerTime - 2);
      const timeFactor = Math.exp(-0.5 * t); // exponential decay
      return Math.round(maxPoints * timeFactor) * Math.max(1, combo);
    }

    // Show question
    let questionStartTime = 0;



function showQuestion(skipAnim = false) {
  questionContainer.innerHTML = "";
  const q = questions[currentIndex];
  questionStartTime = Date.now();

  questionContainer.classList.remove("-translate-x-full");
  questionContainer.classList.remove("translate-x-full");
  if (!skipAnim) {
    questionContainer.classList.remove("duration-500");
questionContainer.classList.add("duration-0");
questionContainer.classList.add("translate-x-full");
  }



  const qTitle = document.createElement("h2");
  qTitle.className = "text-xl font-bold mb-4";
  qTitle.textContent = q.question;
  questionContainer.appendChild(qTitle);

  const choicesWrapper = document.createElement("div");
  choicesWrapper.className = `grid grid-cols-${colNum} gap-4`;

  q.choices.forEach((choice, idx) => {
    const btn = document.createElement("button");
    btn.textContent = choice;
    btn.className =
      "border px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors duration-500 text-left";
    btn.dataset.index = idx;
    btn.addEventListener("click", () => {
    if(acceptAnswer)
        handleChoice(btn, idx);
});
    choicesWrapper.appendChild(btn);
  });

  questionContainer.appendChild(choicesWrapper);

  // 👌 Smooth slide-in after layout reset
  if (!skipAnim) {
    setTimeout(() => {
      questionContainer.classList.remove("translate-x-full");
questionContainer.classList.remove("duration-0");
      questionContainer.classList.add("transition-transform", "duration-500", "ease-in-out");
    }, 500);
  }
}











    function handleChoice(button, idx){

      const q = questions[currentIndex];
      const isCorrect = q.correctAnswers.includes(idx);
      const answerTime = (Date.now() - questionStartTime)/1000;


questionContainer.classList.add("transition", "transition-colors", "duration-500");
  body.classList.add("transition-colors", "duration-500");


      if(isCorrect){
acceptAnswer = false;

    if(!hasLoseStreak) {
        correctCount++;
        combo++;
        showCombo();

        const pointsGained = calculatePoints(answerTime);
        score += pointsGained;
        scoreDisplay.textContent = `🪙 ${score}`;

        celebrate();



        startComboTimer();

}
hasLoseStreak = false;




button.style.backgroundColor = "#bbf7d0";
    questionContainer.style.backgroundColor = "#d1fae5";
    body.style.backgroundColor = "#d1fae5";

    setTimeout(() => {
      button.style.backgroundColor = "";
      questionContainer.style.backgroundColor = "white";
      body.style.backgroundColor = "white";



    }, 500);

    setTimeout(nextQuestion, 700);

      } else {

    button.style.backgroundColor = "#fecaca";
    questionContainer.style.backgroundColor = "#fee2e2";
    body.style.backgroundColor = "#fee2e2";

    setTimeout(() => {
      button.style.backgroundColor = "";
      questionContainer.style.backgroundColor = "white";
      body.style.backgroundColor = "white";
    }, 500);

    button.disabled = true;
    button.classList.add("cursor-not-allowed", "opacity-50");



        score = Math.ceil(score / 2);
        scoreDisplay.textContent = `🪙 ${score}`;
        resetCombo();

        hasLoseStreak = true;
        
      }
    }




















    function nextQuestion(){
  questionContainer.classList.add("-translate-x-full");

setTimeout(() => {
    currentIndex++;
    updateProgress();
    acceptAnswer = true;
    if (currentIndex >= questions.length) {
      showEndScreen();
    } else {
      showQuestion();
    }
  }, 500);

     
    }










    function updateProgress(){
      const percent = (currentIndex / questions.length) * 100;
      progressBar.style.width = `${percent}%`;
      progressText.textContent = `${currentIndex} / ${questions.length}`;
    }







    function showEndScreen(){
  questionContainer.classList.remove("-translate-x-full");

questionContainer.classList.remove("translate-x-full");


      stopTimer();
      resetCombo();
      const correct = correctCount;
      const total = questions.length;
      const min = String(Math.floor(elapsedTime / 60)).padStart(2, "0");
      const sec = String(elapsedTime % 60).padStart(2, "0");

      questionContainer.innerHTML = `
        <div class="text-center p-6 bg-white rounded-lg border shadow">
          <h2 class="text-3xl font-bold mb-4">🏁 Result</h2>
          <p class="text-lg mb-2">Correct answers: <span class="font-semibold text-green-600">${correct}</span> / ${total}</p>
          <p class="text-lg mb-2">🪙 Total points: <span class="font-semibold text-yellow-600">${score}</span></p>
          <p class="text-lg mb-2">🕒 Time: <span class="font-semibold text-blue-600">${min}:${sec}</span></p>
          <button onclick="restart()" class="mt-6 bg-blue-700 text-white px-6 py-3 rounded-md hover:bg-blue-800 transition">
            Restart
          </button>
        </div>
      `;
    }




function showEndScreenOld() {

  
  progressBar.style.width = "100%";
  progressText.textContent = `${questions.length} / ${questions.length}`;

  const correct = correctCount;
const total = questions.length;
const percent = Math.round((correct / total) * 100);

  questionContainer.innerHTML = `
    <div class="text-center p-6 bg-white rounded-lg border shadow">
      <h2 class="text-3xl font-bold mb-4">🎯 Result</h2>
      <p class="text-lg mb-2">You got <span class="font-semibold text-green-600">${correct}</span> out of <span class="font-semibold">${total}</span> questions correct.</p>
      <p class="text-xl font-bold ${percent >= 70 ? 'text-green-600' : 'text-red-600'}">${percent}%</p>
      <p class="text-lg mb-2">Highest streak: <span class="font-semibold text-red-600">${highestStreak}</span>.</p>

      <button onclick="restart()" class="mt-6 bg-blue-700 text-white px-6 py-3 rounded-md hover:bg-blue-800 transition">
        Restart
      </button>
    </div>
  `;
}









    function restart(){
if (random) {
  questions.forEach((q, idx) => {
answerShuffle(q);
});

fisherYatesShuffle(questions);
}

      currentIndex = 0;
      correctCount = 0;
      combo = 0;
      score = 0;
      elapsedTime = 0;
      hasLoseStreak = false;
      timerText.textContent = "00:00";
      scoreDisplay.textContent = "🪙 0";
      resetCombo();
      updateProgress();
      showQuestion(true);
      startTimer();
    }
    loadQuestions();
