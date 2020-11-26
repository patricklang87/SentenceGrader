// @ts-check
import { prepSentence } from './textPrep';
import { matchSections } from './matchSections';
import { removeFalseWords, wordOrderEditor } from './wordOrderEditor';
import { autocorrect } from './wordSpellingEditor';




let phrase1 = "Ich bin vom weiten gekommen.";
let phrase2 = "Ich weiten gekommen bin vom.";


const calculateEdits = (keyAns, userAns) => {


    let userAnsPrepped = prepSentence(userAns);
    let keyAnsPrepped = prepSentence(keyAns);

    let autocorrectedResult = autocorrect(keyAnsPrepped, userAnsPrepped);
    let spellingEditsTotal = autocorrectedResult[0];
    let autocorrectedUserAns = autocorrectedResult[1];

    let falseWords = removeFalseWords(keyAnsPrepped, autocorrectedUserAns);
    let numWordsRemoved = falseWords[1];
    let userAnsWordsRemoved = falseWords[0];
    console.log(numWordsRemoved, userAnsWordsRemoved);

    let reorderedUserSub = wordOrderEditor(keyAnsPrepped, userAnsWordsRemoved);
    let reorderCount = reorderedUserSub[0];
    let reorderedPhrase = reorderedUserSub[1];
  

    return [reorderedPhrase, spellingEditsTotal, numWordsRemoved, reorderCount];
}

let outcome = calculateEdits(phrase1, phrase2);
console.log("Edited Phrase: ", outcome[0], ", Spelling Autocorrections: ", outcome[1], ", Item Removals: ", outcome[2], ", Rearrangement Moves: ", outcome[3]);
