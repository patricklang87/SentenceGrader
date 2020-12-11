
const findClosestKeyAns = (keyAnsS, userAns) => {
    let closestKeyAns = 0;
    let lowestTotalEdits = 999;
    let outcomeS = [];
    for (let i = 0; i < keyAnsS.length; i++) {
        let outcome = calculateEdits(keyAnsS[i], userAns);
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
    let outcome = findClosestKeyAns(englishAnsKey, userResponse);
    let closestResponse = outcome[0].join(' ');
    let score = scoreAnswer(outcome);
    document.getElementById("english-score").innerHTML = score[0] + " out of " + score[1];
    document.getElementById("user-english-response").innerHTML = userResponse;
    document.getElementById("english-closest-result").innerHTML = closestResponse;
    document.getElementById("english-spelling-autocorrections").innerHTML = outcome[1];
    document.getElementById("english-deletions").innerHTML = outcome[2];
    document.getElementById("english-insertions").innerHTML = outcome[3];
    document.getElementById("english-WOEs").innerHTML = outcome[4];
    document.getElementById("english-CapEdits").innerHTML = outcome[5];
    document.getElementById("english-result").style.display = "block";
}

const germanTest = () => {
    console.log("begin german test");
    let germanAnsKey = ["Ich bin spät nach Hause gekommen.", "Spät bin ich nach Hause gekommen.", "Nach Hause bin ich spät gekommen."];
    let userResponse = document.getElementById("german-response").value;
    let outcome = findClosestKeyAns(germanAnsKey, userResponse);
    let closestResponse = outcome[0].join(' ');
    let score = scoreAnswer(outcome);
    document.getElementById("german-score").innerHTML = score[0] + " out of " + score[1];
    document.getElementById("user-german-response").innerHTML = userResponse;
    document.getElementById("german-closest-result").innerHTML = closestResponse;
    document.getElementById("german-spelling-autocorrections").innerHTML = outcome[1];
    document.getElementById("german-deletions").innerHTML = outcome[2];
    document.getElementById("german-insertions").innerHTML = outcome[3];
    document.getElementById("german-WOEs").innerHTML = outcome[4];
    document.getElementById("german-CapEdits").innerHTML = outcome[5];
    document.getElementById("german-result").style.display = "block";
}

const russianTest = () => {
    console.log("begin russian test");
    let russianAnsKey = ["Я не знаю, хочет ли она пойти в кино.", "Я не знаю, хочет ли моя сестра пойти в кино."];
    let userResponse = document.getElementById("russian-response").value;
    let outcome = findClosestKeyAns(russianAnsKey, userResponse);
    let closestResponse = outcome[0].join(' ');
    let score = scoreAnswer(outcome);
    document.getElementById("russian-score").innerHTML = score[0] + " out of " + score[1];
    document.getElementById("user-russian-response").innerHTML = userResponse;
    document.getElementById("russian-closest-result").innerHTML = closestResponse;
    document.getElementById("russian-spelling-autocorrections").innerHTML = outcome[1];
    document.getElementById("russian-deletions").innerHTML = outcome[2];
    document.getElementById("russian-insertions").innerHTML = outcome[3];
    document.getElementById("russian-WOEs").innerHTML = outcome[4];
    document.getElementById("russian-CapEdits").innerHTML = outcome[5];
    document.getElementById("russian-result").style.display = "block";
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
    console.log("ustomAnsKey: ", customAnsKey);
    let userResponse = document.getElementById("custom-response").value;
    let outcome = findClosestKeyAns(customAnsKey, userResponse);
    
    let pointTotal = document.getElementById("point-value").value;
    let autoCorWeight = document.getElementById("autocorrection-weight").value;
    let inserWeight = document.getElementById("insertion-weight").value;
    let delWeight = document.getElementById("deletion-weight").value;
    let orderWeight = document.getElementById("ordering-weight").value;
    let capWeight = document.getElementById("capitalization-weight").value;
    let score = scoreAnswer(outcome, pointTotal, autoCorWeight, inserWeight, delWeight, orderWeight, capWeight);

    let closestResponse = outcome[0].join(' ');
    document.getElementById("custom-score").innerHTML = score[0] + " out of " + score[1];
    document.getElementById("user-custom-response").innerHTML = userResponse;
    document.getElementById("custom-closest-result").innerHTML = closestResponse;
    document.getElementById("custom-spelling-autocorrections").innerHTML = outcome[1];
    document.getElementById("custom-deletions").innerHTML = outcome[2];
    document.getElementById("custom-insertions").innerHTML = outcome[3];
    document.getElementById("custom-WOEs").innerHTML = outcome[4];
    document.getElementById("custom-CapEdits").innerHTML = outcome[5];
    document.getElementById("custom-result").style.display = "block";
}

let engSubButton = document.getElementById("english-button");
engSubButton.addEventListener('click', englishTest);
let gerSubButton = document.getElementById("german-button");
gerSubButton.addEventListener('click', germanTest);
let rusSubButton = document.getElementById("russian-button");
rusSubButton.addEventListener('click', russianTest);
let cusSubButton = document.getElementById("custom-button");
cusSubButton.addEventListener('click', customTest);