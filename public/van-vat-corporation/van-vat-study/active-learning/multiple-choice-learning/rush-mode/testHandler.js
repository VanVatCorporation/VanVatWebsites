let questions = [];
let currentIndex = 0;
let streak = 0;
let highestStreak = 0;
let correctCount = 0;

let timePerQuestions = 10;
let maxTime = 10;
let timerInterval = null;
let timeElapsed = 0;
let playerName = "";

let hasLoseStreak = false;
let acceptAnswer = true;



const params = new URLSearchParams(window.location.search);
const testId = params.get("testId");
const random = params.get("random") === "true";
const colNum = params.get("col");
const badSound = params.get("badSound") === "true";
const forceAnswers = params.get("forceAnswers");


const questionContainer = document.getElementById("question-container");
const body = document.getElementById("body");
const streakDisplay = document.getElementById("streak-display");
const progressBar = document.getElementById("progress-bar");
const progressText = document.getElementById("progress-text");
const timerBar = document.getElementById("timer-bar");
const timerText = document.getElementById("timer-text");


// overlay
const setupOverlay = document.getElementById("setup-overlay");
const startBtn = document.getElementById("startBtn");
const nameInput = document.getElementById("playerName");
const slider = document.getElementById("timerSlider");









function showPlusTimeAnim(text = "+5s", color = "red", component = streakDisplay) {

  const span = document.createElement("span");
  span.textContent = text;
  span.className = `absolute text-${color}-600 font-bold text-xl transition-all duration-700 ease-out`;
  span.style.left = "50%";
  span.style.transform = "translateX(-50%)";
  span.style.top = "0";
  span.style.opacity = "1";

  const timerRect = component.getBoundingClientRect();
  const parentRect = document.body.getBoundingClientRect();
  span.style.position = "fixed";
  span.style.top = `${timerRect.top - 5}px`;
  span.style.left = `${timerRect.left + timerRect.width / 2}px`;

  document.body.appendChild(span);

  requestAnimationFrame(() => {
    span.style.transform = "translate(-50%, -50px)";
    span.style.opacity = "0";
  });

  setTimeout(() => span.remove(), 800);
}

















// overlay confirm
startBtn.addEventListener("click", () => {
  playerName = nameInput.value.trim() || "Anonymous";
  timePerQuestions = parseInt(slider.value);
maxTime = timePerQuestions * questions.length;
  setupOverlay.classList.add("hidden");
  startTimer();
});




async function loadQuestions() {
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
}

function handleChoice(button, idx) {
  const q = questions[currentIndex];
  const isCorrect = q.correctAnswers.includes(idx);

  
questionContainer.classList.add("transition", "transition-colors", "duration-500");
  body.classList.add("transition-colors", "duration-500");

  if (isCorrect) {
    acceptAnswer = false;
    if(!hasLoseStreak) {
        wrongAnswerVibrate();
        correctCount++;
        streak++;
        celebrate();
}
    hasLoseStreak = false;

    if(highestStreak < streak)
        highestStreak = streak;
    updateStreak();


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


    streak = 0;
    updateStreak();
    hasLoseStreak = true;

showPlusTimeAnim("+5s", "red", button);
    // give extra 5 seconds (but cap to 60)
    timeElapsed += 5;

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

streakTextShakeIncorrectAnim(streakDisplay);
  }
}





function showQuestion(skipAnim = false) {
  questionContainer.innerHTML = "";
  const q = questions[currentIndex];



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


    }, 0);//500
  }
}




function nextQuestion() {
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

function updateStreak() {
  streakDisplay.textContent = `🔥 Streak: ${streak}`;


  if (streak > 0 && streak % 5 === 0) {

streakTextShakeCorrectAnim(streakDisplay);

  }
}


/* ------------------ ⏳ TIMER LOGIC ------------------ */
function startTimer() {
  timerBar.style.width = "0%";
  timerBar.classList.remove("bg-gray-300");
  timerBar.classList.add("bg-red-500");


  timerInterval = setInterval(() => {

    timeElapsed += 1;
    const percent = (timeElapsed / maxTime) * 100;
    timerBar.style.width = `${percent}%`;

  timerText.textContent = `${timeElapsed}s / ${maxTime}s`;

    if (timeElapsed > maxTime) {
      clearInterval(timerInterval);
      handleTimeout();
    }
  }, 1000);
}



function handleTimeout() {
  // Flash red to indicate timeout
  questionContainer.style.backgroundColor = "#fee2e2";


  setTimeout(() => {
    questionContainer.style.backgroundColor = "white";

currentIndex = questions.length;
  // Move on to next question
  nextQuestion();
  }, 400);

  // Move current question to a random future position
clearStreak();


}







function updateProgress() {
  const progressPercent = (currentIndex / questions.length) * 100;
  progressBar.style.width = `${progressPercent}%`;
  progressText.textContent = `${currentIndex} / ${questions.length}`;
}

function showEndScreen() {
clearInterval(timerInterval);

  questionContainer.classList.remove("-translate-x-full");
  questionContainer.classList.remove("translate-x-full");

  progressBar.style.width = "100%";
  progressText.textContent = `${questions.length} / ${questions.length}`;

  const correct = correctCount;
const total = questions.length;
const percent = Math.round((correct / total) * 100);

  questionContainer.innerHTML = `
    <div class="text-center p-6 bg-white rounded-lg border shadow">
      <h2 class="text-3xl font-bold mb-4">🎯 Result</h2>
      <p class="text-lg mb-2">Name: <span class="font-semibold text-blue-600">${playerName}</span></p>
      <p class="text-lg mb-2">You got <span class="font-semibold text-green-600">${correct}</span> out of <span class="font-semibold">${total}</span> questions correct.</p>
      <p class="text-lg mb-2"><span class="font-semibold text-green-600">${timePerQuestions}</span>s / questions</p>
      <p class="text-xl font-bold ${percent >= 70 ? 'text-green-600' : 'text-red-600'}">${percent}%</p>
      <p class="text-lg mb-2">Highest streak: <span class="font-semibold text-red-600">${highestStreak}</span>.</p>

      <button onclick="restart()" class="mt-6 bg-blue-700 text-white px-6 py-3 rounded-md hover:bg-blue-800 transition">
        Restart
      </button>
    </div>
  `;
}


function restart() {


  if (random) {
  questions.forEach((q, idx) => {
answerShuffle(q);
});

fisherYatesShuffle(questions);
}



  setupOverlay.classList.remove("hidden");

  currentIndex = 0;
  streak = 0;
  highestStreak = 0;
  hasLoseStreak = false;
  correctCount = 0; // ✅ reset
  timeElapsed = 0;
  updateStreak();
  updateProgress();
  showQuestion(true);
}

loadQuestions();
updateStreak();