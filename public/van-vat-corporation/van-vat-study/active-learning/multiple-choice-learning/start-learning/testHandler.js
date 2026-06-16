const testTitleEl = document.getElementById('testTitle');
const questionsContainer = document.getElementById('questionsContainer');

let testData = null;
let userAnswers = {};
let filterMode = 'default';
let correctQuestions = new Set();
let wrongQuestions = new Set();







// 🔹 Get test name from URL hash

const params = new URLSearchParams(window.location.search);
const testId = params.get("testId");
const random = params.get("random") === "true";


if (!testId) {
  testTitleEl.textContent = "❌ No test name provided in URL";
} else {
  fetchTest(testId);
}

// 📥 Fetch test JSON
async function fetchTest(name) {
  try {
    const response = await fetch(`https://academy.vanvatcorp.com/api/active-learning/testbank/${name}.json`);
    if (!response.ok) throw new Error(`Cannot load test ${name}`);
    testData = await response.json();

  if (random) {
  testData.questions.forEach((q, idx) => {
answerShuffle(q);
});

fisherYatesShuffle(testData.questions);
}


    renderTest(testData);
  } catch (error) {
    testTitleEl.textContent = `❌ Error: ${error.message}`;
  }
}

// 🧱 Render questions dynamically (can accept filtered indexes)
function renderTest(data, filterSet = null) {
  testTitleEl.textContent = data.title || "Untitled Test";
  questionsContainer.innerHTML = "";

  data.questions.forEach((q, qIndex) => {
    if (filterSet && !filterSet.has(qIndex)) return; // filter logic 🆕

    const questionDiv = document.createElement("div");
    questionDiv.className = "p-5 bg-white rounded-lg shadow-sm border question-item mb-4";
    questionDiv.setAttribute("data-index", qIndex);

    const questionText = document.createElement("h2");
    questionText.className = "font-semibold text-lg mb-2";
    questionText.textContent = `${qIndex + 1}. ${q.question}`;
    questionDiv.appendChild(questionText);

    if (q.correctAnswers.length > 1) {
      const note = document.createElement("p");
      note.className = "text-sm text-gray-500 mb-3";
      note.textContent = "👉 You can choose more than one answer.";
      questionDiv.appendChild(note);
    }

    const choicesGrid = document.createElement("div");
    choicesGrid.className = "grid grid-cols-1 sm:grid-cols-2 gap-3";

    const singleChoice = q.correctAnswers.length === 1;

    q.choices.forEach((choice, cIndex) => {
      const id = `q${qIndex}-c${cIndex}`;
      const choiceWrapper = document.createElement("label");
      choiceWrapper.className = "flex items-center space-x-2 p-3 border rounded cursor-pointer hover:bg-blue-50 transition";
      choiceWrapper.setAttribute("data-q", qIndex);
      choiceWrapper.setAttribute("data-c", cIndex);

      const input = document.createElement("input");
      input.type = singleChoice ? "radio" : "checkbox";
      input.name = `q${qIndex}`;
      input.value = cIndex;
      input.id = id;
      input.className = "w-5 h-5 text-blue-600";

      input.addEventListener("change", () => handleSelect(qIndex, cIndex, input.checked, singleChoice));

      // restore user selections if already answered
      if (userAnswers[qIndex] && userAnswers[qIndex].has(cIndex)) {
        input.checked = true;
      }

      const choiceText = document.createElement("span");
      choiceText.textContent = choice;

      choiceWrapper.appendChild(input);
      choiceWrapper.appendChild(choiceText);
      choicesGrid.appendChild(choiceWrapper);
    });

    questionDiv.appendChild(choicesGrid);
    questionsContainer.appendChild(questionDiv);
  });

  if (filterMode !== 'default') highlightAnswers(); // keep highlighting after filter switch
}

// 🧠 Track user's selections
function handleSelect(qIndex, cIndex, checked, singleChoice) {
  if (!userAnswers[qIndex]) userAnswers[qIndex] = new Set();

  if (singleChoice) {
    userAnswers[qIndex].clear();
    if (checked) {
      userAnswers[qIndex].add(cIndex);
    }
    document.querySelectorAll(`input[name="q${qIndex}"]`).forEach(input => {
      input.checked = (parseInt(input.value) === cIndex && checked);
    });
  } else {
    if (checked) {
      userAnswers[qIndex].add(cIndex);
    } else {
      userAnswers[qIndex].delete(cIndex);
    }
  }
}

// 📊 Check answers and highlight
function submitAnswers() {
  if (!testData) return;

  correctQuestions.clear();
  wrongQuestions.clear();

  let correctCount = 0;

  testData.questions.forEach((q, qIndex) => {
    const correctSet = new Set(q.correctAnswers);
    const userSet = userAnswers[qIndex] || new Set();

    if (setsAreEqual(correctSet, userSet)) {
      correctCount++;
      correctQuestions.add(qIndex);
    } else {
      wrongQuestions.add(qIndex);
    }
  });

  highlightAnswers();

  const total = testData.questions.length;
  const scorePercent = Math.round((correctCount / total) * 100);

  showResult(correctCount, total, scorePercent);
  showFilterBar(); // 🆕 add sorting bar after submit
}

// 🖌️ Highlight correct & wrong answers
function highlightAnswers() {
  testData.questions.forEach((q, qIndex) => {
    const correctSet = new Set(q.correctAnswers);
    const userSet = userAnswers[qIndex] || new Set();

    document.querySelectorAll(`label[data-q="${qIndex}"]`).forEach(label => {
      const cIndex = parseInt(label.getAttribute("data-c"));
      const isCorrect = correctSet.has(cIndex);
      const isSelected = userSet.has(cIndex);

      label.classList.remove("border-green-500", "border-red-500", "bg-green-50", "bg-red-50");

      if (isCorrect) label.classList.add("border-green-500", "bg-green-50");
      if (isSelected && !isCorrect) label.classList.add("border-red-500", "bg-red-50");
    });
  });
}

function setsAreEqual(a, b) {
  if (a.size !== b.size) return false;
  for (let v of a) if (!b.has(v)) return false;
  return true;
}

// 🏁 Show result box
function showResult(correct, total, percent) {
  const oldResult = document.getElementById('resultBox');
  if (oldResult) oldResult.remove();

  const resultDiv = document.createElement("div");
  resultDiv.className = "mt-10 p-5 bg-white rounded-lg border shadow text-center";
  resultDiv.id = "resultBox";

  resultDiv.innerHTML = `
    <h2 class="text-2xl font-bold mb-2">🎯 Result</h2>
    <p class="text-lg mb-1">You got <span class="font-semibold text-green-600">${correct}</span> out of <span class="font-semibold">${total}</span> questions correct.</p>
    <p class="text-xl font-bold ${percent >= 70 ? 'text-green-600' : 'text-red-600'}">${percent}%</p>
  `;

  questionsContainer.appendChild(resultDiv);
}

// 🆕 Filter/sorting bar after submit
function showFilterBar() {
  if (document.getElementById('filterBar')) return;

  const filterBar = document.createElement("div");
  filterBar.id = "filterBar";
  filterBar.className = "mt-6 mb-6 flex flex-wrap gap-2 justify-center";

  const btnDefault = createFilterButton("All Questions", "default");
  const btnCorrect = createFilterButton("✅ Correct Only", "correct");
  const btnWrong = createFilterButton("❌ Wrong Only", "wrong");

  filterBar.appendChild(btnDefault);
  filterBar.appendChild(btnCorrect);
  filterBar.appendChild(btnWrong);

  questionsContainer.parentElement.insertBefore(filterBar, questionsContainer);
}

function createFilterButton(label, mode) {
  const btn = document.createElement("button");
  btn.textContent = label;
  btn.className = "px-4 py-2 rounded border bg-white hover:bg-blue-50 transition";
  btn.addEventListener("click", () => changeFilter(mode));
  return btn;
}

// 🆕 Handle filter changes
function changeFilter(mode) {
  filterMode = mode;
  if (mode === 'default') {
    renderTest(testData);
  } else if (mode === 'correct') {
    renderTest(testData, correctQuestions);
  } else if (mode === 'wrong') {
    renderTest(testData, wrongQuestions);
  }
}