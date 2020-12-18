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

const calculateEdits = (keyAns, userAns, weightedWord) => {
    let puncEdits = 0;
    let weightedWordEdits = 0;
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

    //check for false capitalizations or lower case words
    let checkUserPhraseCapitalization = capitalizationChecker(groupedKeyAnsPrepped, groupedUserAnsPrepped, weightedWord[0]);
    let caseCheckedUserPhrase = checkUserPhraseCapitalization[0];
    let capitalizationEdits = checkUserPhraseCapitalization[1];
    weightedWordEdits += checkUserPhraseCapitalization[2];

    // autocorrect or delete words
    let autocorrectedResult = autocorrect(groupedKeyAnsPrepped, caseCheckedUserPhrase, weightedWord[0]);
    let autocorrectedUserAns = autocorrectedResult[0];
    let numAutocorrectedWords = autocorrectedResult[1];
    let numDeletedWords = autocorrectedResult[2];
    puncEdits += autocorrectedResult[3];
    weightedWordEdits += autocorrectedResult[4];
    console.log("STEP 3 (autocorrect and delete): keystatus: ", arToPhraseString(groupedKeyAnsPrepped) , " userans status: ", arToPhraseString(autocorrectedUserAns) );

    // turn the internal arrays back into strings
    let userSectionString = arToPhraseString(autocorrectedUserAns);
    let keySectionString = arToPhraseString(groupedKeyAnsPrepped);

    console.log("STEP 4 (return inner ars to strings): key status: ", keySectionString, " userans status: ", userSectionString);

    let reorderedUserSub = wordOrderEditor(keySectionString, userSectionString, weightedWord[0]);
    let reorderedPhrase = reorderedUserSub[0];
    let reorderCount = reorderedUserSub[1];
    let numInsertedWords = reorderedUserSub[2];
    puncEdits += reorderedUserSub[3];
    weightedWordEdits += reorderedUserSub[4];
    
    return [reorderedPhrase, numAutocorrectedWords, numDeletedWords, numInsertedWords, reorderCount, capitalizationEdits, puncEdits, weightedWordEdits];
}


/*let outcome = calculateEdits(phrase1, phrase2);
console.log("Edited Phrase: ", outcome[0], ", Spelling Autocorrections: ", outcome[1], ", Item Removals: ", outcome[2], ", Item insertions: ", outcome[3], ", Rearrangement Moves: ", outcome[4]);*/

const scoreAnswer = (calcEditsOutcome, weightedWord, maxPoints=4, spellingWeight=1, insertionWeight=1, deletionWeight=1, orderWeight=1, capitalizationWeight=0.5, punctuationWeight=0.5) => {
    let points = maxPoints;
    points -= calcEditsOutcome[1]*spellingWeight;
    points -= calcEditsOutcome[2]*deletionWeight;
    points -= calcEditsOutcome[3]*insertionWeight;
    points -= calcEditsOutcome[4]*orderWeight;
    points -= calcEditsOutcome[5]*capitalizationWeight;
    points -= calcEditsOutcome[6]*punctuationWeight;
    points -= calcEditsOutcome[7]*weightedWord[1];
    if (points < 0) points = 0;
    return [points, maxPoints];
}


