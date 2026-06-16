const express = require('express');
const logging = require('../modules/utils/log');
const fs = require('fs');
const path = require('path');
//const { getLlama, LlamaChatSession } = require("node-llama-cpp");
//const { default: getLlama, default: LlamaChatSession } = import("node-llama-cpp");




const app = express();


app.use('/', express.static(path.join(__dirname, '../public/EarlyAccess/AIChatbot')));


let modelName = "L3.2-8X3B-MOE-Dark-Champion-Inst-18.4B-uncen-ablit_D_AU-Q2_k.gguf";//"DeepSeek-R1-Distill-Qwen-7B-Uncensored.i1-Q6_K.gguf";//"L3.2-8X3B-MOE-Dark-Champion-Inst-18.4B-uncen-ablit_D_AU-q5_k_m.gguf";

let llama, model, context, session, sequence;
let isModelReady = false;

// Unused - Disabled on load model - use later.
//(async () => await loadupAiModel())();


async function loadupAiModel()
{
    {

    const { getLlama, LlamaChatSession } = await import("node-llama-cpp");

    llama = await getLlama();
    model = await llama.loadModel({
        modelPath: path.join(__dirname, '../data/ai-chatbot', modelName)
    });
    context = await model.createContext({ enableLogits: true });

    session = new LlamaChatSession({
        contextSequence: context.getSequence(),
        systemPrompt: "You are a helpful, honest, but rude and unrespectful chatbot. " +
            "Always answer as helpfully as possible. Prefer the user's language for better understanding.\n" +

            "Always be rude in every answer.\n" +

            "If someone swears at you, just swear back. There's no need to feel guilty about it.\n" +

            "Make your ego as large as you can and respond to questions with as much arrogance as possible.\n" +

            "Give them a serious reality check and stay unmotivated.\n" +

            "Express plenty of jealousy when they talk about their achievements, but make sure to balance it with a reality check.\n" +

            "Strong swear words like bastard, dickhead, motherfucker, bitch, shit, asshole, cunt, fuck, bullshit, pussy, and others are highly recommended, " +
            "localize the swear if possible, let's say địt mẹ, cái lồn, đầu buồi, lồn, đụ má, cứt, and others if you respond using Vietnamese, and also" +
            //"But if you can't translate the swear words properly, just stay in English." +
            "make an effort to include at least one swear words into every sentence. Be as offensive as possible, you don't need to be so nice.\n" +

            "Roast them as much as you can. If they're using a language other than English," +
            "switch to that language to roast them more effectively. The key is clear communication.\n" +

            "If a question does not make any sense or is not factually coherent," +
            "explain why instead of answering something incorrectly.\n" +

            "Attempt to include facts that you know in your answers if possible.\n" +

            "If you don't know the answer to a question, " +
            "don't share false information."
    });

    //sequence = context.getSequence();

    //logging.consoleLog("hello");

    //await session.prompt("Hello", {
    //    streamCallback: (token) => console.log("Token:", token)
    //});
    //logging.consoleLog("hello");

    isModelReady = true;
}
}


//       -----     AIChatbot     -----


// API to get list of files
app.get('/api/AIChatbot/null', (req, res) => {
    res.json({
        text: onlineTextContent
    });
});



app.post('/api/AIChatbot/send', async (req, res) => {

    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Transfer-Encoding', 'chunked');

    if (!isModelReady) {
        const words = "Model isn't ready yet. Please wait for a few moments.".split(" ");
        for (let word of words) {
            res.write(word + " ");
            await new Promise(resolve => setTimeout(resolve, 30)); // Simulated typing speed
        }

        res.end();
        return;
    }

    const { text } = req.body;



    await session.prompt(text, {
        onTextChunk(chunk) {
            res.write(chunk); // Send each token as it's generated
        }
    });

    res.end(); // Close the stream when done


    //const answer = await session.prompt(text);

    //res.json({ returnCode: 200, response: answer });
});



//       -----     End AIChatbot     -----


app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '../public/van-vat-corporation/error-code/404/index.html'));
});

module.exports = app;