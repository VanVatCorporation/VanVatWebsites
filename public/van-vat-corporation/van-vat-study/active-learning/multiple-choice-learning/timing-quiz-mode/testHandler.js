let questions = [];
let currentIndex = 0;
let streak = 0;
let highestStreak = 0;
let correctCount = 0;
let hasLoseStreak = false;
let acceptAnswer = true;

let timerDuration = 15; // seconds per question
let timerInterval = null;
let timeLeft = timerDuration;

const questionContainer = document.getElementById("question-container");
const body = document.getElementById("body");
const streakDisplay = document.getElementById("streak-display");
const progressBar = document.getElementById("progress-bar");
const progressText = document.getElementById("progress-text");
const timerBar = document.getElementById("timer-bar");


//.  --------- particle progress timer




const progressCanvas = document.getElementById("progress-particles");
const ctx = progressCanvas.getContext("2d");
progressCanvas.width = progressCanvas.offsetWidth;
progressCanvas.height = progressCanvas.offsetHeight;

window.addEventListener('resize', () => {
  progressCanvas.width = progressCanvas.offsetWidth;
  progressCanvas.height = progressCanvas.offsetHeight;
});

let particles = [];

function createParticleBurst(x) {

  for (let i = 0; i < 15; i++) {
    particles.push({
      x: x,
      y: progressCanvas.height / 2,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      alpha: 1,
      size: Math.random() * 2 + 1,
      color: `hsl(${Math.random() * 60 + 200}, 80%, 60%)`
    });
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, progressCanvas.width, progressCanvas.height);
  particles.forEach((p, i) => {
    p.x += p.vx;
    p.y += p.vy;
    p.alpha -= 0.02;
    if (p.alpha <= 0) {
      particles.splice(i, 1);
    } else {
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }
  });
  ctx.globalAlpha = 1;
  requestAnimationFrame(animateParticles);
}
animateParticles();





//.  --------- particle progress timer










// ---------------- 🌋 MUSHROOM EXPLOSION ----------------
function mushroomExplosion(targetElement, options = {}) {
  const {
    particleCount = 80,
    colors = ['#f87171', '#facc15', '#34d399', '#60a5fa', '#f472b6'],
    gravity = 0.25,
    duration = 5000
  } = options;

  const rect = targetElement.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top ;//+ rect.height / 2 + window.scrollY;

  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 6 + 2;
    const size = Math.random() * 8 + 4;

    particles.push({
      x: centerX,
      y: centerY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed * (Math.random() < 0.5 ? -1.5 : 1), // gives mushroom-like shape
      life: 1,
      size,
      color: colors[Math.floor(Math.random() * colors.length)]
    });
  }

  const particleElements = particles.map(p => {
    const el = document.createElement("span");
    el.style.position = "fixed";//absolute
    el.style.left = `${p.x}px`;
    el.style.top = `${p.y}px`;
    el.style.width = `${p.size}px`;
    el.style.height = `${p.size}px`;
    el.style.borderRadius = "50%";
    el.style.background = p.color;
    el.style.pointerEvents = "none";
    el.style.opacity = "1";
    el.style.willChange = "transform, opacity";
    document.body.appendChild(el);
    return el;
  });

  let last = performance.now();

  function animate(now) {
    const dt = (now - last) / 16;
    last = now;

    particles.forEach((p, i) => {
      p.vy += gravity * dt * 0.5;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.life -= (1 / (duration / 16)) * dt;
      const el = particleElements[i];
      el.style.transform = `translate(${p.x}px, ${p.y}px)`;
      el.style.opacity = p.life;
    });

    if (particles.some(p => p.life > 0)) {
      requestAnimationFrame(animate);
    } else {
      particleElements.forEach(el => el.remove());
    }
  }

  requestAnimationFrame(animate);
}


// ---------------- 🌋 MUSHROOM EXPLOSION ----------------




// ---------------- 🌈 EMOJI BURST (with gravity) ----------------
function emojiBurst(targetElement, emojis = ["🔥","🎉","🚀","💫","✨"]) {
  const rect = targetElement.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top ;//+ rect.height / 2 + window.scrollY;



  const gravity = 0.25;
  const duration = 5000;
  const emojiCount = 20;
  const particles = [];

  for (let i = 0; i < emojiCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 6 + 3;
    const el = document.createElement("span");
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    el.style.position = "fixed";//absolute
    el.style.left = `${centerX}px`;
    el.style.top = `${centerY}px`;
    el.style.fontSize = `${Math.random() * 24 + 24}px`;
    el.style.pointerEvents = "none";
    el.style.opacity = "1";
    el.style.willChange = "transform, opacity";
    document.body.appendChild(el);

    particles.push({
      el,
      x: centerX,
      y: centerY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed * -1, // mostly upward
      life: 1
    });
  }

  let last = performance.now();

  function animate(now) {
    const dt = (now - last) / 16;
    last = now;

    particles.forEach(p => {
      p.vy += gravity * dt;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.life -= (1 / (duration / 16)) * dt;
      p.el.style.transform = `translate(${p.x}px, ${p.y}px)`;
      p.el.style.opacity = p.life;
    });

    if (particles.some(p => p.life > 0)) {
      requestAnimationFrame(animate);
    } else {
      particles.forEach(p => p.el.remove());
    }
  }

  requestAnimationFrame(animate);
}



// ---------------- 🌈 EMOJI BURST (with gravity) ----------------










  const params = new URLSearchParams(window.location.search);
const testId = params.get("testId");
const random = params.get("random") === "true";
const colNum = params.get("col");
const badSound = params.get("badSound") === "true";
const forceAnswers = params.get("forceAnswers");


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
clearInterval(timerInterval); // ⏸ stop timer when answered
    acceptAnswer = false;

    if (!hasLoseStreak) {
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
clearStreak();
wrongAnswerVibrate();

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
  clearInterval(timerInterval); // reset timer if switching questions

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
    }, 20);
  }

  // ⏳ Start timer after rendering question
  startTimer();
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
    mushroomExplosion(streakDisplay);
    emojiBurst(streakDisplay, ["🔥","🎉","🚀","💫","✨"]);


  }
}



function updateProgress() {
  const progressPercent = (currentIndex / questions.length) * 100;
  const bar = progressBar;
  
  // Trigger glowing effect
  bar.style.width = `${progressPercent}%`;
  bar.classList.add("shadow-lg", "shadow-blue-400");

  // Burst particles at current progress end
  const burstX = (progressPercent / 100) * progressCanvas.width;
  createParticleBurst(burstX);

  // Remove glow after animation
  setTimeout(() => {
    bar.classList.remove("shadow-lg", "shadow-blue-400");
  }, 500);

  progressText.textContent = `${currentIndex} / ${questions.length}`;
}

function showEndScreen() {
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
      <p class="text-lg mb-2">You got <span class="font-semibold text-green-600">${correct}</span> out of <span class="font-semibold">${total}</span> questions correct.</p>
      <p class="text-xl font-bold ${percent >= 70 ? 'text-green-600' : 'text-red-600'}">${percent}%</p>
      <p class="text-lg mb-2">Highest streak: <span class="font-semibold text-red-600">${highestStreak}</span>.</p>
      <button onclick="restart()" class="mt-6 bg-blue-700 text-white px-6 py-3 rounded-md hover:bg-blue-800 transition">
        Restart
      </button>
    </div>
  `;
}

function clearStreak() {
    streak = 0;
    updateStreak();
    hasLoseStreak = true;
}

function restart() {

  if (random) {
  questions.forEach((q, idx) => {
answerShuffle(q);
});

fisherYatesShuffle(questions);
}

  currentIndex = 0;
  streak = 0;
  highestStreak = 0;
  hasLoseStreak = false;
  correctCount = 0;
  updateStreak();
  updateProgress();
  showQuestion(true);
}

/* ------------------ ⏳ TIMER LOGIC ------------------ */
function startTimer() {
  timeLeft = timerDuration;
  timerBar.style.width = "100%";
  timerBar.classList.remove("bg-gray-300");
  timerBar.classList.add("bg-red-500");

  timerInterval = setInterval(() => {
    timeLeft -= 0.1;
    const percent = (timeLeft / timerDuration) * 100;
    timerBar.style.width = `${percent}%`;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      handleTimeout();
    }
  }, 100);
}



function handleTimeout() {
  // Flash red to indicate timeout
  questionContainer.style.backgroundColor = "#fee2e2";

mushroomExplosion(streakDisplay, { colors: ['#ef4444', '#f87171', '#dc2626'], particleCount: 60 });

  setTimeout(() => {
    questionContainer.style.backgroundColor = "white";

currentIndex--;
  // Move on to next question
  nextQuestion();
  }, 400);

  // Move current question to a random future position
clearStreak();
  if (currentIndex < questions.length - 1) {
    const question = questions.splice(currentIndex, 1)[0];
    const newIndex = currentIndex + 1 + Math.floor(Math.random() * (questions.length - currentIndex));
    questions.splice(newIndex, 0, question);
  }


}

window.addEventListener('beforeunload', (event) => {
  // Cancel the event as stated by the standard.
  event.preventDefault();
  // Chrome requires returnValue to be set.
  event.returnValue = '';
});



if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
    .then(() => alert('Service Worker Registered'));
}




loadQuestions();
updateStreak();