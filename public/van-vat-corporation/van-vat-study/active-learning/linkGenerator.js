
    const testInput = document.getElementById("testIdInput");
    const randomCheckbox = document.getElementById("randomCheckbox");
    const colInput = document.getElementById("columnInput");


    // --- Restore URL state ---
    const params = new URLSearchParams(window.location.search);
    if (params.has("testId")) testInput.value = params.get("testId");
    if (params.has("col")) colInput.value = params.get("col");
    if (params.has("random")) randomCheckbox.checked = params.get("random") === "true";

    // --- Update URL in real time ---
    function updateURL() {
      const newParams = new URLSearchParams();
      if (testInput.value.trim()) newParams.set("testId", testInput.value.trim());
      newParams.set("random", randomCheckbox.checked);
      if (colInput.value.trim()) newParams.set("col", colInput.value.trim());
      const newUrl = `${window.location.pathname}?${newParams.toString()}`;
      window.history.replaceState({}, "", newUrl);
    }

    testInput.addEventListener("input", updateURL);

        colInput.addEventListener("input", updateURL);

randomCheckbox.addEventListener("change", updateURL);

    // --- Handle mode click ---
    document.querySelectorAll(".mode-card").forEach(card => {
      card.addEventListener("click", (e) => {
        e.preventDefault();
        const mode = card.dataset.mode;
        const testId = testInput.value.trim();
        const colNum = colInput.value.trim();
        const random = randomCheckbox.checked;

        if (!testId) {
          alert("Vui lòng nhập Test ID trước khi chọn chế độ!");
          return;
        }

        const url = `./multiple-choice-learning/${mode}?testId=${encodeURIComponent(testId)}&random=${random}&col=${colNum}`;
        window.location.href = url;
      });
    });
