// @ts-check
import { prepSentence } from './textPrep';
import { sentenceParser } from './parserBeta';
import { matchSections, arToPhraseString } from './matchSections';
import { removeFalseWords, wordOrderEditor } from './wordOrderEditor';
//import { autocorrect } from './wordSpellingEditor';




let phrase1 = "Ich bin vom weiten gekommen.";
let phrase2 = "vom weiten Ich gekommen bi.";


const calculateEdits = (keyAns, userAns) => {

    // break the comparison sentences into individual words
    let userAnsPrepped = prepSentence(userAns);
    let keyAnsPrepped = prepSentence(keyAns);

    //parse sentences into groups of matching phrases
    let groupedUserAnsPrepped = sentenceParser(userAnsPrepped);
    let groupedKeyAnsPrepped = sentenceParser(keyAnsPrepped);

    /*
    let autocorrectedResult = autocorrect(keyAnsPrepped, userAnsPrepped);
    let spellingEditsTotal = autocorrectedResult[0];
    let autocorrectedUserAns = autocorrectedResult[1];

    let falseWords = removeFalseWords(keyAnsPrepped, autocorrectedUserAns);
    let numWordsRemoved = falseWords[1];
    let userAnsWordsRemoved = falseWords[0];
    console.log(numWordsRemoved, userAnsWordsRemoved);

    let userSectionString = arToPhraseString(userSectionsMatched);
    let keySectionString = arToPhraseString(keySectionsMatched);

console.log(userSectionString, keySectionString);

    let reorderedUserSub = wordOrderEditor(keySectionString, userSectionString);
    let reorderCount = reorderedUserSub[0];
    let reorderedPhrase = reorderedUserSub[1];
  

    return [reorderedPhrase, spellingEditsTotal, numWordsRemoved, reorderCount];
    */
}


let outcome = calculateEdits(phrase1, phrase2);
console.log("Edited Phrase: ", outcome[0], ", Spelling Autocorrections: ", outcome[1], ", Item Removals: ", outcome[2], ", Rearrangement Moves: ", outcome[3]);
