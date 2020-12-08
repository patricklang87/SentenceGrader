/*
import { prepSentence, arToPhraseString} from './textPrep';
import { sentenceParser } from './parserBeta';
import { wordOrderEditor } from './wordOrderEditor';
import { autocorrect } from './wordSpellingEditor';
*/
/*
let phrase1 = ["My sister tries to want to eat healthily.", "My sister wants to try to eat healthily."];
let phrase2 = "My sister try to want to eat healthily.";

*/

const altAr = (ar) => {
    let newAr = [];
    for (let i = 0; i < ar.length; i++) newAr.push(ar[i]);
    return newAr;
}

const calculateEdits = (keyAns, userAns) => {
    // break the comparison sentences into individual words
    let userAnsPrepped = prepSentence(userAns);
    let keyAnsPrepped = prepSentence(keyAns);
console.log("STEP 1 (tokenize): key status: ", keyAnsPrepped, "userans status: ", userAnsPrepped);

    //parse sentences into groups of matching phrases
    let altUserAnsPrepped = altAr(userAnsPrepped);
    let altKeyAnsPrepped = altAr(keyAnsPrepped);
    let groupedKeyAnsPrepped = sentenceParser(altUserAnsPrepped, altKeyAnsPrepped);
    let groupedUserAnsPrepped = sentenceParser(keyAnsPrepped, userAnsPrepped);
    
    console.log("STEP 2 (parse): keystatus: ", arToPhraseString(groupedKeyAnsPrepped), "userans status: ", arToPhraseString(groupedUserAnsPrepped));

    // autocorrect or delete words
    let autocorrectedResult = autocorrect(groupedKeyAnsPrepped, groupedUserAnsPrepped);
    let autocorrectedUserAns = autocorrectedResult[0];
    let numAutocorrectedWords = autocorrectedResult[1];
    let numDeletedWords = autocorrectedResult[2];
    console.log("STEP 3 (autocorrect and delete): keystatus: ", arToPhraseString(groupedKeyAnsPrepped) , " userans status: ", arToPhraseString(autocorrectedUserAns) );

    // turn the internal arrays back into strings
    let userSectionString = arToPhraseString(autocorrectedUserAns);
    let keySectionString = arToPhraseString(groupedKeyAnsPrepped);

    console.log("STEP 4 (return inner ars to strings): key status: ", keySectionString, " userans status: ", userSectionString);

    let reorderedUserSub = wordOrderEditor(keySectionString, userSectionString);
    let reorderedPhrase = reorderedUserSub[0];
    let reorderCount = reorderedUserSub[1];
    let numInsertedWords = reorderedUserSub[2];
    
    return [reorderedPhrase, numAutocorrectedWords, numDeletedWords, numInsertedWords, reorderCount];
}


/*let outcome = calculateEdits(phrase1, phrase2);
console.log("Edited Phrase: ", outcome[0], ", Spelling Autocorrections: ", outcome[1], ", Item Removals: ", outcome[2], ", Item insertions: ", outcome[3], ", Rearrangement Moves: ", outcome[4]);*/

// html interactivity section


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
    let englishAnsKey = ["My sister wants to eat healthily."];
    let userResponse = document.getElementById("english-response").value;
    let outcome = findClosestKeyAns(englishAnsKey, userResponse);
    let closestResponse = outcome[0].join(' ');
    document.getElementById("user-english-response").innerHTML = userResponse;
    document.getElementById("english-closest-result").innerHTML = closestResponse;
    document.getElementById("english-spelling-autocorrections").innerHTML = outcome[1];
    document.getElementById("english-deletions").innerHTML = outcome[2];
    document.getElementById("english-insertions").innerHTML = outcome[3];
    document.getElementById("english-WOEs").innerHTML = outcome[4];
}

const germanTest = () => {
    console.log("begin german test");
    let germanAnsKey = ["Ich bin spät nach Hause gekommen.", "Spät bin ich nach Hause gekommen.", "Nach Hause bin ich spät gekommen."];
    let userResponse = document.getElementById("german-response").value;
    let outcome = findClosestKeyAns(germanAnsKey, userResponse);
    let closestResponse = outcome[0].join(' ');
    document.getElementById("user-german-response").innerHTML = userResponse;
    document.getElementById("german-closest-result").innerHTML = closestResponse;
    document.getElementById("german-spelling-autocorrections").innerHTML = outcome[1];
    document.getElementById("german-deletions").innerHTML = outcome[2];
    document.getElementById("german-insertions").innerHTML = outcome[3];
    document.getElementById("german-WOEs").innerHTML = outcome[4];
}

const russianTest = () => {
    console.log("begin russian test");
    let russianAnsKey = ["Я не знаю, хочет ли она пойти в кино.", "Я не знаю, хочет ли моя сестра пойти в кино."];
    let userResponse = document.getElementById("russian-response").value;
    let outcome = findClosestKeyAns(russianAnsKey, userResponse);
    let closestResponse = outcome[0].join(' ');
    document.getElementById("user-russian-response").innerHTML = userResponse;
    document.getElementById("russian-closest-result").innerHTML = closestResponse;
    document.getElementById("russian-spelling-autocorrections").innerHTML = outcome[1];
    document.getElementById("russian-deletions").innerHTML = outcome[2];
    document.getElementById("russian-insertions").innerHTML = outcome[3];
    document.getElementById("russian-WOEs").innerHTML = outcome[4];
}

let engSubButton = document.getElementById("english-button");
engSubButton.addEventListener('click', englishTest);
let gerSubButton = document.getElementById("german-button");
gerSubButton.addEventListener('click', germanTest);
let rusSubButton = document.getElementById("russian-button");
rusSubButton.addEventListener('click', russianTest);

/*
const showUserInput = () => {
	let userInput = document.getElementById("english-response").value;
  console.log(userInput);
  document.getElementById("user-english-response").innerHTML = userInput;
}

document.getElementById("english-button").addEventListener('click', showUserInput);
*/