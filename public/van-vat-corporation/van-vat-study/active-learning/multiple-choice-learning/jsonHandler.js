    const fileInput = document.getElementById('fileInput');
    const jsonViewer = document.getElementById('jsonViewer');

    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file && file.type === "application/json") {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const json = JSON.parse(event.target.result);
            jsonViewer.value = JSON.stringify(json, null, 2);
          } catch (err) {
            alert("File không đúng định dạng JSON!");
          }
        };
        reader.readAsText(file);
      } else {
        alert("Vui lòng chọn file JSON hợp lệ.");
      }
    });

    function clearText() {
      jsonViewer.value = "";
      fileInput.value = "";
    }

    function downloadJSON() {
      const content = jsonViewer.value;
      if (!content.trim()) return alert("Không có dữ liệu để tải xuống.");
      const blob = new Blob([content], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'questions.json';
      a.click();
      URL.revokeObjectURL(url);
    }