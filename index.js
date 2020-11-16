// @ts-check
import {add, prepSentence } from './textPrep';
import { removeFalseWords, wordOrderEditor } from './wordOrderEditor';
import { autocorrect } from './wordSpellingEditor';

console.log(add(2, 3));

let phrase1 = "Ich bin vom weiten gekommen.";
let phrase2 = "Ich bin gekmmen, vom weiten.";


const calculateEdits = (keyAns, userAns) => {
    let userAnsPrepped = prepSentence(userAns);
    let keyAnsPrepped = prepSentence(keyAns);

    let autocorrectedUserAns = autocorrect(keyAnsPrepped, userAnsPrepped);

    let falseWords = removeFalseWords(keyAnsPrepped, autocorrectedUserAns);
    let numWordsRemoved = falseWords[1];
    let userAnsWordsRemoved = falseWords[0];
    console.log(numWordsRemoved, userAnsWordsRemoved);

    let reorderedUserSub = wordOrderEditor(keyAnsPrepped, userAnsWordsRemoved);
    let reorderCount = reorderedUserSub[0];
    let reorderedPhrase = reorderedUserSub[1];
    console.log(reorderCount, reorderedPhrase);
}

console.log(calculateEdits(phrase1, phrase2));
