// @ts-check
import {add, prepSentence } from './textPrep';
import { removeFalseWords, wordOrderEditor } from './wordOrderEditor';

console.log(add(2, 3));

let phrase1 = "Ich bin vom weiten gekommen.";
let phrase2 = "Ich bin gekommen, vom weiten.";


const calculateEdits = (keyAns, userAns) => {
    let userAnsPrepped = prepSentence(userAns);
    let keyAnsPrepped = prepSentence(keyAns);

    let falseWords = removeFalseWords(keyAnsPrepped, userAnsPrepped);
    let numWordsRemoved = falseWords[1];
    let userAnsWordsRemoved = falseWords[0];
    console.log(numWordsRemoved, userAnsWordsRemoved);

    let reorderedUserSub = wordOrderEditor(keyAnsPrepped, userAnsWordsRemoved);
    let reorderCount = reorderedUserSub[0];
    let reorderedPhrase = reorderedUserSub[1];
    console.log(reorderCount, reorderedPhrase);
}

console.log(calculateEdits(phrase1, phrase2));
