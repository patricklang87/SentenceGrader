/*
import { prepSentence, arToPhraseString} from './textPrep';
import { sentenceParser } from './parserBeta';
import { wordOrderEditor } from './wordOrderEditor';
import { autocorrect } from './wordSpellingEditor';
*/
/*
let phrase1 = "Ich bin vom weiten gekommen.";
let phrase2 = "monkey weiten glass gekommen bi.";
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
    
    console.log("STEP 2 (parse): keystatus: ", groupedKeyAnsPrepped, "userans status: ", groupedUserAnsPrepped);

    // autocorrect or delete words
    let autocorrectedResult = autocorrect(groupedKeyAnsPrepped, groupedUserAnsPrepped);
    let autocorrectedUserAns = autocorrectedResult[0];
    let numAutocorrectedWords = autocorrectedResult[1];
    let numDeletedWords = autocorrectedResult[2];
    console.log("STEP 3 (autocorrect and delete): keystatus: ", groupedKeyAnsPrepped , " userans status: ", autocorrectedUserAns );

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



const englishTest = () => {
    console.log("begin english test");
    let englishAnsKey = "My sister wants to try to eat healthily.";
    let userResponse = document.getElementById("english-response").value;
    let outcome = calculateEdits(englishAnsKey, userResponse);
    let closestResponse = outcome[0].join(' ');
    document.getElementById("user-english-response").innerHTML = userResponse;
    document.getElementById("english-closest-result").innerHTML = closestResponse;
    document.getElementById("english-spelling-autocorrections").innerHTML = outcome[1];
    document.getElementById("english-deletions").innerHTML = outcome[2];
    document.getElementById("english-insertions").innerHTML = outcome[3];
    document.getElementById("english-WOEs").innerHTML = outcome[4];

}



let engSubButton = document.getElementById("english-button");
engSubButton.addEventListener('click', englishTest);


/*
const showUserInput = () => {
	let userInput = document.getElementById("english-response").value;
  console.log(userInput);
  document.getElementById("user-english-response").innerHTML = userInput;
}

document.getElementById("english-button").addEventListener('click', showUserInput);
*/