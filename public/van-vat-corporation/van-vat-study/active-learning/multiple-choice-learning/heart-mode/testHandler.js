    let questions = [];
    let currentIndex = 0;
    let correctCount = 0;

    let lives = 3;
    const maxLives = 3;
    let acceptAnswer = true;

    // ⏱ Timer
    let startTime = null;
    let timerInterval = null;
    let elapsedTime = 0;

    const questionContainer = document.getElementById("question-container");
    const body = document.getElementById("body");
    const progressBar = document.getElementById("progress-bar");
    const progressText = document.getElementById("progress-text");
    const timerText = document.getElementById("timer-text");


const params = new URLSearchParams(window.location.search);
const testId = params.get("testId");
const random = params.get("random") === "true";
const colNum = params.get("col");
const badSound = params.get("badSound") === "true";
const forceAnswers = params.get("forceAnswers");


    // ❤️ Update Lives UI
    function updateLives(dropIndex = null) {
      const livesDisplay = document.getElementById("lives-display");
      livesDisplay.innerHTML = "";
      livesDisplay.classList.remove("shake");

      for (let i = 0; i < maxLives; i++) {
        const heart = document.createElement("span");
        heart.textContent = i < lives ? "❤️" : "🩶";
        heart.className = "text-3xl transition-all relative";
        if (dropIndex !== null && i === dropIndex) {
          heart.classList.add("drop-heart");
        } else if (dropIndex === null) {
          heart.classList.add("bounce-heart");
        }
        livesDisplay.appendChild(heart);
      }

      if (dropIndex !== null) {
        livesDisplay.classList.add("shake");
        setTimeout(() => livesDisplay.classList.remove("shake"), 600);
      }
    }

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

    // 🧠 Show Question
    function showQuestion(skipAnim = false) {
      questionContainer.innerHTML = "";
      const q = questions[currentIndex];

      questionContainer.classList.remove("-translate-x-full", "translate-x-full");
      if (!skipAnim) {
        questionContainer.classList.remove("duration-500");
        questionContainer.classList.add("duration-0", "translate-x-full");
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
        btn.className = "border px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors duration-500 text-left";
        btn.addEventListener("click", () => { if (acceptAnswer) handleChoice(btn, idx); });
        choicesWrapper.appendChild(btn);
      });

      questionContainer.appendChild(choicesWrapper);

      if (!skipAnim) {
        setTimeout(() => {
          questionContainer.classList.remove("translate-x-full", "duration-0");
          questionContainer.classList.add("transition-transform", "duration-500", "ease-in-out");
        }, 500);
      }
    }

    // 🖱 Handle Choice
    function handleChoice(button, idx) {
      const q = questions[currentIndex];
      const isCorrect = q.correctAnswers.includes(idx);

      questionContainer.classList.add("transition", "transition-colors", "duration-500");
      body.classList.add("transition-colors", "duration-500");

      if (isCorrect) {
        acceptAnswer = false;
        correctCount++;
        celebrate();

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

wrongAnswerVibrate();

        const lostHeartIndex = lives - 1;
        updateLives(lostHeartIndex);

        // 🔸 delay lives decrement to allow drop animation
        setTimeout(() => {
          lives--;
          updateLives();
          if (lives <= 0) setTimeout(() => showEndScreen(true), 500);
        }, 200);

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
      }
    }

    // ➡️ Next Question
    function nextQuestion() {
      questionContainer.classList.add("-translate-x-full");
      setTimeout(() => {
        currentIndex++;
        updateProgress();
        acceptAnswer = true;

        if (currentIndex >= questions.length) {
          showEndScreen(false);
        } else {
          showQuestion();
        }
      }, 500);
    }



    // 📊 Progress
    function updateProgress() {
      const progressPercent = (currentIndex / questions.length) * 100;
      progressBar.style.width = `${progressPercent}%`;
      progressText.textContent = `${currentIndex} / ${questions.length}`;
    }

    // ⏱ Timer
    function startTimer() {
      startTime = Date.now();
      timerInterval = setInterval(() => {
        elapsedTime = Math.floor((Date.now() - startTime) / 1000);
        const min = String(Math.floor(elapsedTime / 60)).padStart(2, "0");
        const sec = String(elapsedTime % 60).padStart(2, "0");
        timerText.textContent = `${min}:${sec}`;
      }, 1000);
    }

    function stopTimer() {
      clearInterval(timerInterval);
    }

    // 🏁 End Screen
    function showEndScreen(isFailed) {
  questionContainer.classList.remove("-translate-x-full");
  questionContainer.classList.remove("translate-x-full");


      stopTimer();
      progressBar.style.width = "100%";
      progressText.textContent = `${questions.length} / ${questions.length}`;

      const correct = correctCount;
      const total = questions.length;
      const percent = Math.round((correct / total) * 100);

      const min = String(Math.floor(elapsedTime / 60)).padStart(2, "0");
      const sec = String(elapsedTime % 60).padStart(2, "0");

      questionContainer.innerHTML = `
        <div class="text-center p-6 bg-white rounded-lg border shadow">
          <h2 class="text-3xl font-bold mb-4">${(isFailed ? "💀 You died" : "🎯 Result")}</h2>
          <p class="text-lg mb-2">You got <span class="font-semibold text-green-600">${correct}</span> out of <span class="font-semibold">${total}</span> questions correct.</p>
          <p class="text-xl font-bold ${percent >= 70 ? 'text-green-600' : 'text-red-600'}">${percent}%</p>
          <p class="text-lg mb-2">❤️ Lives remaining: <span class="font-semibold text-red-600">${lives}</span></p>
          <p class="text-lg mb-2">🕒 Time: <span class="font-semibold text-blue-600">${min}:${sec}</span></p>
          <button onclick="restart()" class="mt-6 bg-blue-700 text-white px-6 py-3 rounded-md hover:bg-blue-800 transition">
            Restart
          </button>
        </div>
      `;
    }

    // 🔄 Restart
    function restart() {
      

  if (random) {
  questions.forEach((q, idx) => {
answerShuffle(q);
});

fisherYatesShuffle(questions);
}

      currentIndex = 0;
      correctCount = 0;
      lives = maxLives;
      acceptAnswer = true;
      elapsedTime = 0;
      timerText.textContent = "00:00";
      updateLives();
      updateProgress();
      showQuestion(true);
      startTimer();
    }

    // 🚀 Init
    loadQuestions();
    updateLives();