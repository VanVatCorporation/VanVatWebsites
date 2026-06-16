  let formData = {
    title: "New Test",
    questions: []
  };

  const questionsContainer = document.getElementById("questions-container");
  const jsonEditor = document.getElementById("json-editor");
  const addQuestionBtn = document.getElementById("add-question");

  // ---- Render Question Editor ----
  function renderQuestions() {
    questionsContainer.innerHTML = "";
    formData.questions.forEach((q, qIndex) => {
      const qDiv = document.createElement("div");
      qDiv.className = "border rounded-lg p-4 space-y-3 bg-white shadow-sm";

      // Question text
      const qInput = document.createElement("input");
      qInput.type = "text";
      qInput.placeholder = "Enter question...";
      qInput.value = q.question;
      qInput.className = "w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-700";
      qInput.addEventListener("input", () => {
        formData.questions[qIndex].question = qInput.value;
        updateJsonEditor();
      });

      // Answer grid
      const answersGrid = document.createElement("div");
      answersGrid.className = "grid grid-cols-1 sm:grid-cols-2 gap-2";

      q.choices.forEach((choice, cIndex) => {
        const choiceWrapper = document.createElement("div");
        choiceWrapper.className = "flex items-center space-x-2 border rounded px-2 py-2 bg-gray-50";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = q.correctAnswers.includes(cIndex);
        checkbox.addEventListener("change", () => {
          const corrects = formData.questions[qIndex].correctAnswers;
          if (checkbox.checked) {
            corrects.push(cIndex);
          } else {
            const i = corrects.indexOf(cIndex);
            if (i > -1) corrects.splice(i, 1);
          }
          updateJsonEditor();
        });

        const answerInput = document.createElement("input");
        answerInput.type = "text";
        answerInput.value = choice;
        answerInput.placeholder = "Answer...";
        answerInput.className = "flex-1 border rounded px-2 py-1";
        answerInput.addEventListener("input", () => {
          formData.questions[qIndex].choices[cIndex] = answerInput.value;
          updateJsonEditor();
        });

        const removeBtn = document.createElement("button");
        removeBtn.innerHTML = "🗑️";
        removeBtn.className = "text-red-500 hover:text-red-700";
        removeBtn.addEventListener("click", () => {
          formData.questions[qIndex].choices.splice(cIndex, 1);
          // Also clean up correctAnswers
          formData.questions[qIndex].correctAnswers = formData.questions[qIndex].correctAnswers.filter(i => i !== cIndex);
          // Re-map correctAnswers indexes
          formData.questions[qIndex].correctAnswers = formData.questions[qIndex].correctAnswers.map(i => i > cIndex ? i - 1 : i);
          renderQuestions();
          updateJsonEditor();
        });

        choiceWrapper.appendChild(checkbox);
        choiceWrapper.appendChild(answerInput);
        choiceWrapper.appendChild(removeBtn);
        answersGrid.appendChild(choiceWrapper);
      });

      // Add answer button
      const addAnswerBtn = document.createElement("button");
      addAnswerBtn.textContent = "➕ Add Answer";
      addAnswerBtn.className = "mt-2 bg-gray-200 text-gray-800 px-3 py-1 rounded hover:bg-gray-300";
      addAnswerBtn.addEventListener("click", () => {
        formData.questions[qIndex].choices.push("");
        renderQuestions();
        updateJsonEditor();
      });

      // Remove question button
      const removeQBtn = document.createElement("button");
      removeQBtn.textContent = "🗑️ Remove Question";
      removeQBtn.className = "text-red-600 hover:text-red-800 text-sm";
      removeQBtn.addEventListener("click", () => {
        formData.questions.splice(qIndex, 1);
        renderQuestions();
        updateJsonEditor();
      });

      qDiv.appendChild(qInput);
      qDiv.appendChild(answersGrid);
      qDiv.appendChild(addAnswerBtn);
      qDiv.appendChild(removeQBtn);

      questionsContainer.appendChild(qDiv);
    });
  }

  // ---- Sync JSON Editor ----
  function updateJsonEditor() {
    jsonEditor.value = JSON.stringify(formData, null, 2);
  }

  jsonEditor.addEventListener("input", () => {
    try {
      const newData = JSON.parse(jsonEditor.value);
      formData = newData;
      renderQuestions();
    } catch (e) {
      // ignore invalid JSON
    }
  });

  // ---- Add Question ----
  addQuestionBtn.addEventListener("click", () => {
    formData.questions.push({
      question: "",
      choices: [],
      correctAnswers: []
    });
    renderQuestions();
    updateJsonEditor();
  });

  // Init
  updateJsonEditor();