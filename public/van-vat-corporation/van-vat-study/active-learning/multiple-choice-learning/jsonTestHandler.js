    const fileInput = document.getElementById('fileInput');
    const jsonViewer = document.getElementById('jsonViewer');
    const formTitle = document.getElementById('formTitle');
    const statusBox = document.getElementById('statusBox');

    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file && file.type === "application/json") {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const json = JSON.parse(event.target.result);
            // If JSON contains a title, load it too
            if (json.title) formTitle.value = json.title;
            jsonViewer.value = JSON.stringify(json, null, 2);
          } catch (err) {
            alert("Invalid JSON file!");
          }
        };
        reader.readAsText(file);
      } else {
        alert("Please select a valid .json file.");
      }
    });

    function clearFields() {
      jsonViewer.value = "";
      formTitle.value = "";
      fileInput.value = "";
      statusBox.classList.add('hidden');
    }

    async function uploadForm() {
      const title = formTitle.value.trim();
      if (!title) return alert("Please enter a form title.");

      let jsonContent;
      try {
        jsonContent = JSON.parse(jsonViewer.value.trim());
      } catch (err) {
        return alert("JSON content is invalid.");
      }

      statusBox.classList.remove('hidden');
      statusBox.textContent = "Uploading...";
      statusBox.className = "mt-4 p-3 rounded text-sm bg-yellow-100 text-yellow-800";

      try {
        const response = await fetch("https://academy.vanvatcorp.com/api/active-learning/upload-multiple-choice-form/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            formTitle: title,
            formJson: JSON.stringify(jsonContent)
          })
        });

        if (!response.ok) throw new Error(`Server error: ${response.status}`);
        const result = await response.json();

        statusBox.textContent = "✅ Upload successful!";
        statusBox.className = "mt-4 p-3 rounded text-sm bg-green-100 text-green-800";
      } catch (error) {
        statusBox.textContent = `❌ Upload failed: ${error.message}`;
        statusBox.className = "mt-4 p-3 rounded text-sm bg-red-100 text-red-800";
      }
    }