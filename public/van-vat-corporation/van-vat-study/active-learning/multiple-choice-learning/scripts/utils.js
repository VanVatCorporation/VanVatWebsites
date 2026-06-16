function fisherYatesShuffle(array) {
  let currentIndex = array.length;
  let randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}
function partialFisherYatesShuffle(array, start, end) {
  for (let i = end; i > start; i--) {
    const j = Math.floor(Math.random() * (i - start + 1)) + start;
    [array[i], array[j]] = [array[j], array[i]];
  }

return array;
}

function answerSet(question, setIndexes) {

if(setIndexes.length != question.correctAnswers.length)
return question;
// return unchanged when these answers do not match




for(let i = 0; i < setIndexes.length; i++)
{


for(let j = 0; j < question.correctAnswers.length; j++)
{

if(setIndexes[i] === question.correctAnswers[j])
{
continue;
}
else
{
let previousCorrect = question.correctAnswers[j];
let afterCorrect = setIndexes[i];

    [question.choices[previousCorrect], question.choices[afterCorrect]] = [question.choices[afterCorrect], question.choices[previousCorrect]];



question.correctAnswers[j] = afterCorrect;
}

}




}




  return question;
}

function answerShuffle(question) {


  let currentIndex = question.choices.length;
  let randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

let currentMatch = -1;
let randomMatch = -1;

for(let i = 0; i < question.correctAnswers.length; i++)
{


if(currentIndex === question.correctAnswers[i])
currentMatch = i;

if(randomIndex === question.correctAnswers[i])
randomMatch = i;

if(currentMatch != -1 && randomMatch != -1)
break;

}

if(!(currentMatch != -1 && randomMatch != -1))
{
if(currentMatch != -1)
question.correctAnswers[currentMatch] = randomIndex;

if(randomMatch != -1)
question.correctAnswers[randomMatch] = currentIndex;

}



    // And swap it with the current element.
    [question.choices[currentIndex], question.choices[randomIndex]] = [question.choices[randomIndex], question.choices[currentIndex]];
  }

  return question;
}







function wrongAnswerVibrate()
{
if ('vibrate' in navigator) {
    console.log("Vibration API is supported.");
    // Test vibration (optional)
// Vibrate in a pattern: vibrate for 300ms, pause for 100ms, vibrate for 100ms
    const canVibrate = 
navigator.vibrate([300, 100, 100]); // Returns true if the device supports vibration
    if (canVibrate) {
        console.log("Device supports vibration.");
    } else {
        console.log("Device does not support vibration.");
    }
} else {
    console.log("Vibration API is not supported.");
}

}




function streakTextShakeIncorrectAnim(streakDisplay)
{

streakDisplay.classList.add("incorrect-shake");

setTimeout(() => {
      streakDisplay.classList.remove("incorrect-shake");
    }, 600);


}


function streakTextShakeCorrectAnim(streakDisplay)
{

streakDisplay.classList.add("streak-shake");

setTimeout(() => {
      streakDisplay.classList.remove("streak-shake");
    }, 600);


}
