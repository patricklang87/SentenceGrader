/*
let pPhrase = [{ phrase: "This"}, { phrase: "is"}, {phrase : "my"}, {phrase: "first"}, {phrase: "is"}, {phrase: "time"}, {phrase: "here"}, {phrase : "my"}, {phrase: "is"}, {phrase: "."}];
let kPhrase = ["This", "is", "my", "first", "time", "here", "."];
*/



const createObjWordCount = (sentence) => {
    let KeyWordCount = {};
    for (let index = 0; index < sentence.length; index++) {
      if (!Object.keys(KeyWordCount).includes(sentence[index].phrase)) KeyWordCount[sentence[index].phrase] = 1;
      else KeyWordCount[sentence[index].phrase]++;
    }
    return KeyWordCount;
  }

//console.log(createObjWordCount(pPhrase));

const createArWordCount = (sentence) => {
    let KeyWordCount = {};
    for (let index = 0; index < sentence.length; index++) {
      if (!Object.keys(KeyWordCount).includes(sentence[index])) KeyWordCount[sentence[index]] = 1;
      else KeyWordCount[sentence[index]]++;
    }
    return KeyWordCount;
  }

  //console.log(createArWordCount(kPhrase));

  const subAnsHigherCount = (kPhraseBOW, pPhraseBOW) => {
      let userSubKeys = Object.keys(pPhraseBOW);
      let keySubKeys = Object.keys(kPhraseBOW);
      let truthAr = [];
      for (let i = 0; i < userSubKeys.length; i++) {
          for (let j = 0; j <keySubKeys.length; j++) {
              if (userSubKeys[i] == keySubKeys[j]) {
                  if (pPhraseBOW[userSubKeys[i]] > kPhraseBOW[keySubKeys[j]]) truthAr.push(true);
              }
          }
      }
      console.log("truthAr: ", truthAr);
      if (truthAr.length > 0) return true;
      else return false;
  }

  const removeExcessWords = (kPhrase, pPhrase) => {
      let deletions = 0;
      let puncEdits = 0;
      let deletedWords = [];

  const subRemoveExcessWords = (kPhrase, pPhrase) => {  
      let userSubBOW = createObjWordCount(pPhrase);
      let keyBOW = createArWordCount(kPhrase);

      let userSubKeys = Object.keys(userSubBOW);
      let keySubKeys = Object.keys(keyBOW);

      for (let i = 0; i < userSubKeys.length; i++) {
          for (let j = 0; j < keySubKeys.length; j++) {
              if (userSubKeys[i] == keySubKeys[j] && userSubBOW[userSubKeys[i]] > keyBOW[keySubKeys[j]] ) {
                  let userExcessIndices = [];
                  for (let k = 0; k < pPhrase.length; k++) {
                      if (pPhrase[k].phrase == userSubKeys[i]) userExcessIndices.push(k);
                  }
                  let keyIndices = [];
                  for (let l = 0; l < kPhrase.length; l++) {
                      if (kPhrase[l] == userSubKeys[i]) keyIndices.push(l);
                  }

                  console.log(userExcessIndices, keyIndices);

                  // now I want to delete whichever matched iteration has the most distant closest index.
                  let allIndexDifferences = [];
                  for (let m = 0; m < userExcessIndices.length; m++) {
                      let indexDifferences = [];
                      for (let n = 0; n < keyIndices.length; n++) {
                          indexDifferences.push(Math.abs(userExcessIndices[m] - keyIndices[n]));
                      }
                      allIndexDifferences.push(indexDifferences);
                  }

                  console.log(allIndexDifferences);
                  
                  let smallestIndexDifferences = [];
                  for (let o = 0; o < allIndexDifferences.length; o++) {
                    smallestIndexDifferences.push(Math.min(...allIndexDifferences[o]));
                  }

                  let indexOfLargestSmallestDistance = 0;
                  for (let p = 0; p < smallestIndexDifferences.length; p++) {
                      if (smallestIndexDifferences[p] > smallestIndexDifferences[indexOfLargestSmallestDistance]) indexOfLargestSmallestDistance = p;
                  }

                let deletionIndex = userExcessIndices[indexOfLargestSmallestDistance];
                console.log(deletionIndex);

                deletedWords.push(pPhrase[deletionIndex].phrase);

                if (checkIfPunctuation(pPhrase[deletionIndex].phrase) == true) puncDeletions++;
                else deletions++;
                pPhrase.splice(deletionIndex, 1);
                console.log("updated pPhrase: ", pPhrase);
                break;  

              }
          }
      }
      let newUserSubBOW = createObjWordCount(pPhrase);
        if (subAnsHigherCount(keyBOW, newUserSubBOW) == true) {
        console.log("init sub");
        subRemoveExcessWords(kPhrase, pPhrase);
        }
    }
    subRemoveExcessWords(kPhrase, pPhrase);
    return [pPhrase, deletions, deletedWords, puncEdits];
  }
/*
let result = removeExcessWords(kPhrase, pPhrase);

console.log(result[0], result[1]);
*/