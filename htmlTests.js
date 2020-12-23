
const findClosestKeyAns = (keyAnsS, userAns, weightedWord) => {
    let closestKeyAns = 0;
    let lowestTotalEdits = 999;
    let outcomeS = [];
    for (let i = 0; i < keyAnsS.length; i++) {
        let outcome = calculateEdits(keyAnsS[i], userAns, weightedWord);
        outcomeS.push(outcome);
        let outcomeTotalEdits = outcome[1] + outcome[2] + outcome[3] + outcome[4];
        if (outcomeTotalEdits < lowestTotalEdits) {
            lowestTotalEdits = outcomeTotalEdits;
            closestKeyAns = i;
        }
    }
    return outcomeS[closestKeyAns];
}

/*console.log(findClosestKeyAns(phrase1, phrase2));*/

const englishTest = () => {
    console.log("begin english test");
    let englishAnsKey = ["My sister wants to try to eat healthily.", "My sister tries to want to eat healthily."];
    let userResponse = document.getElementById("english-response").value;
    let weightedWord = ["NONE", 0];
    let outcome = findClosestKeyAns(englishAnsKey, userResponse, weightedWord);
    let closestResponse = printColorCodedPhrase(outcome[0]);
    let score = scoreAnswer(outcome, weightedWord);
    let responseBox = createResponseBox(score, userResponse, closestResponse, outcome, weightedWord);
    let resultDiv = document.getElementById("english-result");
    if (resultDiv.hasChildNodes()) {
        resultDiv.removeChild(resultDiv.firstChild);
    }
    resultDiv.appendChild(responseBox);
    resultDiv.style.display = "grid";
}

const germanTest = () => {
    console.log("begin german test");
    let germanAnsKey = ["Ich bin spät nach Hause gekommen.", "Spät bin ich nach Hause gekommen.", "Nach Hause bin ich spät gekommen."];
    let userResponse = document.getElementById("german-response").value;
    let weightedWord = ["gekommen", 0.5];
    let outcome = findClosestKeyAns(germanAnsKey, userResponse, weightedWord);
    let closestResponse = printColorCodedPhrase(outcome[0]);
    let score = scoreAnswer(outcome, weightedWord);
    let responseBox = createResponseBox(score, userResponse, closestResponse, outcome, weightedWord);
    let resultDiv = document.getElementById("german-result");
    if (resultDiv.hasChildNodes()) {
        resultDiv.removeChild(resultDiv.firstChild);
    }
    resultDiv.appendChild(responseBox);
    resultDiv.style.display = "grid";
}

const russianTest = () => {
    console.log("begin russian test");
    let russianAnsKey = ["Я не знаю, хочет ли она пойти в кино.", "Я не знаю, хочет ли моя сестра пойти в кино."];
    let userResponse = document.getElementById("russian-response").value;
    let weightedWord = ["ли", 0.5];
    let outcome = findClosestKeyAns(russianAnsKey, userResponse, weightedWord);
    let closestResponse = printColorCodedPhrase(outcome[0]);
    let score = scoreAnswer(outcome, weightedWord);
    let responseBox = createResponseBox(score, userResponse, closestResponse, outcome, weightedWord);
    let resultDiv = document.getElementById("russian-result");
    if (resultDiv.hasChildNodes()) {
        resultDiv.removeChild(resultDiv.firstChild);
    }
    resultDiv.appendChild(responseBox);
    resultDiv.style.display = "grid";
}

const customTest = () => {
    console.log("begin custom test");
    let customAnsKey = [];
    let ansKey1 = document.getElementById("ans-key-1").value;
    let ansKey2 = document.getElementById("ans-key-2").value;
    let ansKey3 = document.getElementById("ans-key-3").value;
    customAnsKey.push(ansKey1);
    if (ansKey2 != undefined) customAnsKey.push(ansKey2);
    if (ansKey3 != undefined) customAnsKey.push(ansKey3);
    console.log("customAnsKey: ", customAnsKey);
    let weightedWord = [];
    weightedWord.push(document.getElementById("weighted-word").value);
    weightedWord.push(document.getElementById("weighted-word-weight").value);
    let userResponse = document.getElementById("custom-response").value;
    let outcome = findClosestKeyAns(customAnsKey, userResponse, weightedWord);
    
    let pointTotal = document.getElementById("point-value").value;
    let autoCorWeight = document.getElementById("autocorrection-weight").value;
    let inserWeight = document.getElementById("insertion-weight").value;
    let delWeight = document.getElementById("deletion-weight").value;
    let orderWeight = document.getElementById("ordering-weight").value;
    let capWeight = document.getElementById("capitalization-weight").value;
    let puncWeight = document.getElementById("punctuation-weight").value;
    let score = scoreAnswer(outcome, weightedWord, pointTotal, autoCorWeight, inserWeight, delWeight, orderWeight, capWeight, puncWeight);

    let closestResponse = printColorCodedPhrase(outcome[0]);
    let responseBox = createResponseBox(score, userResponse, closestResponse, outcome, weightedWord);
    let resultDiv = document.getElementById("custom-result");
    if (resultDiv.hasChildNodes()) {
        resultDiv.removeChild(resultDiv.firstChild);
    }
    resultDiv.appendChild(responseBox);
    resultDiv.style.display = "grid";
}

let engSubButton = document.getElementById("english-button");
engSubButton.addEventListener('click', englishTest);
let gerSubButton = document.getElementById("german-button");
gerSubButton.addEventListener('click', germanTest);
let rusSubButton = document.getElementById("russian-button");
rusSubButton.addEventListener('click', russianTest);
let cusSubButton = document.getElementById("custom-button");
cusSubButton.addEventListener('click', customTest);