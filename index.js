// @ts-check
import {add, prepSentence } from './textPrep';

console.log(add(2, 3));

let phrase1 = "Ich bin vom weiten gekommen.";
let phrase2 = "Ich bin, vom weiten gekommen.";


const calculateEdits = (keyAns, userAns) => {
    let userAnsPrepped = prepSentence(userAns);
    let keyAnsPrepped = prepSentence(keyAns);
    console.log(userAnsPrepped, keyAnsPrepped);
}

console.log(calculateEdits(phrase1, phrase2));
