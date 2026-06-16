
document.getElementById('botIcon').addEventListener('click', function () {
    document.getElementById('botDropdown').classList.toggle('hidden');
});

document.getElementById('uploadButton').addEventListener('click', function () {
    document.getElementById('imagePreviewModal').classList.remove('hidden');
});

document.getElementById('closePreview').addEventListener('click', function () {
    document.getElementById('imagePreviewModal').classList.add('hidden');
});

function previewImage(event) {
    const reader = new FileReader();
    reader.onload = function () {
        const output = document.getElementById('imagePreview');
        output.src = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
}

document.getElementById('imagePreview').addEventListener('click', function () {
    document.getElementById('fileInput').click();
});

document.getElementById('menuButton').addEventListener('click', function () {
    document.getElementById('sideMenuOverlay').classList.toggle('hidden');
});

document.getElementById('sideMenuOverlay').addEventListener('click', function (event) {
    if (event.target === this) {
        document.getElementById('sideMenuOverlay').classList.add('hidden');
    }
});
const userText = `    <div class="flex items-end justify-end space-x-2">
     <div class="bg-blue-500 text-white p-3 rounded-2xl max-w-xs md:max-w-md lg:max-w-lg">
      <p>
       /xxx/
      </p>
     </div>
     <img alt="User avatar" class="w-10 h-10 rounded-full" height="40" src="https://storage.googleapis.com/a1aa/image/osW5_LWmQ2LQU2VluDWUV6GPxusDfFUUsyYQBANXRoE.jpg" width="40"/>
    </div>`;
const aiText = `    <div class="flex items-start space-x-2">
     <img alt="AI chatbot avatar" class="w-10 h-10 rounded-full" height="40" src="https://storage.googleapis.com/a1aa/image/kK-Opt0EdqQLHbFPb2xFoU3Vwq912BVLzKDndiiSmwo.jpg" width="40"/>
     <div class="bg-gray-200 p-3 rounded-2xl max-w-xs md:max-w-md lg:max-w-lg">
      <p class="text-gray-800">
      /xxx/
      </p>
     </div>
    </div>`;



async function submitResponse() {
    const promptTextBox = document.getElementById("promptText");
    const text = promptTextBox.value;
    if (text === "") return;

    const chatContainer = document.getElementById("chatContainer");

    const userUI = document.createElement("p");
    userUI.innerHTML = userText.replace("/xxx/", text);
    chatContainer.appendChild(userUI);

    promptTextBox.value = "";

    const thoughtTime = document.createElement("p");
    thoughtTime.innerHTML = `Thought for 0.0s`
    chatContainer.appendChild(thoughtTime);

    const aiUI = document.createElement("p");
    aiUI.innerHTML = aiText.replace("/xxx/", " ⬤");
    chatContainer.appendChild(aiUI);

    let isDoneThought = false;
    let thoughtMillisecond = 0;
    let startThoughtTime = Date.now();

    let thoughtInterval = setInterval(() => {

        thoughtMillisecond = Math.floor((Date.now() - startThoughtTime));

        if (isDoneThought)
            clearInterval(thoughtInterval);
        else
            thoughtTime.innerHTML = `Thought for ${(thoughtMillisecond / 1000).toFixed(1)}s`;
    }, 100);




    const response = await fetch('/api/AIChatbot/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
    });

    isDoneThought = true;

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");

    let buffer = "";

    const aiInsideTextNode = aiUI.querySelector("p");

    while (true) {
        const { done, value } = await reader.read();
        if (done) {
            aiInsideTextNode.innerHTML = aiInsideTextNode.innerHTML.replace(" ⬤", "");
            break;
        }

        buffer += decoder.decode(value);

        // Typing animation: reveal one character at a time
        for (let i = 0; i < buffer.length; i++) {
            aiInsideTextNode.innerHTML = aiInsideTextNode.innerHTML.replace(" ⬤", `${buffer[i]} ⬤`);
            chatContainer.scrollTop = chatContainer.scrollHeight; // Auto-scroll
            await new Promise(resolve => setTimeout(resolve, 75)); // Typing speed default: 15
        }

        buffer = ""; // Clear buffer after animation
    }
}

