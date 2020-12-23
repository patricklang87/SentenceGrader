// @ts-check

//let givenAns = "Welcome home!";
//let userAns = "Wecome home!";



const combineInnerArs = (ar) => {
  let combArS = [];
  for (let i = 0; i < ar.length; i++) {
    combArS.push(ar[i].join(""));
  }
  return combArS;
}

const individualLetters = (word) => {
  let tokenizedWord = [];
  for (let i = 0; i < word.length; i++) {
    tokenizedWord.push(word[i]);
  }
  return tokenizedWord;
}

const levCalc = (keyWord, userWord) => {
  let totalEdits = 0;

  let tokenizedKeyWord = individualLetters(keyWord);
  let tokenizedUserWord = individualLetters(userWord);
  console.log("tokenized: ", tokenizedKeyWord, tokenizedUserWord);
  let altTokenizedKeyWord = altAr(tokenizedKeyWord);
  let altTokenizedUserWord = altAr(tokenizedUserWord);
  let parsedKeyWord = sentenceParser(altTokenizedUserWord, altTokenizedKeyWord);
  let parsedUserWord = sentenceParser(tokenizedKeyWord, tokenizedUserWord);
  console.log("parsed: ", parsedKeyWord, parsedUserWord);
  let joinedKeyWord = combineInnerArs(parsedKeyWord);
  let joinedUserWord = combineInnerArs(parsedUserWord);

  let subLevCalc = (currentUserWordAr) => {

    let indexRun = currentUserWordAr.length;
    if (keyWord.length > indexRun) indexRun = keyWord.length;

    for (let i = 0; i < indexRun; i++) {
      console.log("currentUserWordAr: ", currentUserWordAr);
      if (currentUserWordAr[i] != joinedKeyWord[i]) {
      if (currentUserWordAr[i+1] == joinedKeyWord[i+1]) {
        console.log("replacement");
        currentUserWordAr.splice(i, 1, joinedKeyWord[i]);
        totalEdits++;
        subLevCalc(currentUserWordAr);
      } else if (!joinedKeyWord.slice(i).includes(currentUserWordAr[i]) && currentUserWordAr[i] != undefined) {
          console.log("deletion");
          currentUserWordAr.splice(i, 1);
          totalEdits++;
          subLevCalc(currentUserWordAr);
        } else if (currentUserWordAr[i] == joinedKeyWord[i + 1] && currentUserWordAr[i + 1] == joinedKeyWord[i]) {
          console.log("inversion");
          currentUserWordAr.splice(i, 1, joinedKeyWord[i]);
          currentUserWordAr.splice(i + 1, 1, joinedKeyWord[i + 1]);
          totalEdits++;
          subLevCalc(currentUserWordAr);
        } else {
          console.log("insertion");
          currentUserWordAr.splice(i, 0, joinedKeyWord[i]);
          totalEdits++;
          subLevCalc(currentUserWordAr);
        }
      }
    }
    
  }
  
  subLevCalc(joinedUserWord);
  console.log("LEV CALCULATION: ", totalEdits, keyWord, userWord);
  return totalEdits;
}

const checkIfPunctuation = (ar) => {
  let punctuation = [",", "!", "." , ":", ";", "(", ")"];
  if (arIncludeAr(ar, punctuation) == true) return true;
  else return false;
}

const compareArrays = (ar1, ar2) => {
    if (ar1.length != ar2.length) return false;
    else {
        let truthAr = [];
        for (let i = 0; i < ar1.length; i++) {
            if (ar1[i] == ar2[i]) truthAr.push(ar1[i]);
        }
        if (ar1.length == truthAr.length) return true;
        else return false;
    }
}

const arIncludeAr = (innerAr, outerAr) => {
    let truthAr = [];
    for (let k = 0; k < outerAr.length; k++) {
        if (compareArrays(innerAr, outerAr[k]) == true) {
			truthAr.push(innerAr);
			break;
		} 
    }
    if (truthAr.length > 0) return true;
    else return false;
}

const determineAutocorrectStrictness = (wordLength) => {
    let strictnessFactor = 1/5;
    if (wordLength == 1) strictnessFactor = 1;
    else if (wordLength == 2) strictnessFactor = 1/2;
    else if (wordLength <= 8) strictnessFactor = 1/3;
    else if (wordLength <= 16 ) strictnessFactor = 1/4;
    return strictnessFactor;
}


//checks for words that can be corrected and corrects them;
const autocorrect = (keyAns, editedPhrase, weightedWord) => {
    let editedPhraseS = [];
    for (let i = 0; i < editedPhrase.length; i++) {
      editedPhraseS.push(editedPhrase[i].phrase);
    }
    let autocorrections = 0;
    let deletions = 0;
    let puncDeletions = 0;
    let weightedWordEdits = 0;
    let deletedWords = [];
    for (let index = editedPhrase.length - 1; index >= 0; index --) {
        console.log("postion in interation: ", index, editedPhrase[index]);
        //console.log(" iteration ", index, " section: ", editedPhrase[index]);
        if (!keyAns.includes(editedPhrase[index].phrase)) {
          console.log(editedPhrase[index].phrase, " IS NOT IN ", keyAns);

            let levCalcS = [];
            for (let j = 0; j < keyAns.length; j++) {
                //console.log("keyAns[j]: ", keyAns[j], " editedPhrase: ", editedPhrase);
                if (!editedPhraseS.includes(keyAns[j])) {
                  console.log(keyAns[j], " IS NOT IN ", editedPhraseS);
                  let levVal = levCalc(keyAns[j], editedPhrase[index].phrase);
                  console.log("levVal: ", levVal);
                  levCalcS.push([levVal, keyAns[j]]);
                }
                 
                } 
                console.log("levCalcS: ", levCalcS);
                if (levCalcS[0] != undefined) {
                  let lowestLevValIndex = 0;
                    for (let k = 0; k < levCalcS.length; k++) {
                      if (levCalcS[k][0] < levCalcS[lowestLevValIndex][0]) lowestLevValIndex = k;
                    }
                    console.log("lowestValIndex: ", lowestLevValIndex);

                    let lengthCompare = editedPhrase[index].phrase.length;
                    console.log("levCalcS[lowestLevValIndex]: ", levCalcS[lowestLevValIndex]);
                    if (levCalcS[lowestLevValIndex][1].length > lengthCompare) lengthCompare = levCalcS[lowestLevValIndex][1].length;

                    let strictnessFactor = determineAutocorrectStrictness(lengthCompare);

                    if (levCalcS[lowestLevValIndex][0] <= (strictnessFactor)*lengthCompare) {
                        console.log("editedPhrase, editedPhrase[index].phrase: ", editedPhrase, editedPhrase[index].phrase);
                        editedPhrase[index].phrase = levCalcS[lowestLevValIndex][1];
                        autocorrections++;
                        editedPhrase[index].autocorrect = "yes"; 
                        if (weightedWord != undefined) {
                        if (levCalcS[lowestLevValIndex][1].toLowerCase() == weightedWord.toLowerCase()) {
                          weightedWordEdits++;
                        }      
                      }                
                    } else {
                      if (checkIfPunctuation(editedPhrase[index].phrase) == true) puncDeletions++;
                      else if (compareArrays(editedPhrase[index].phrase, ['']) != true) deletions++;
                      deletedWords.push(editedPhrase[index].phrase);
                      console.log("deletion: ", editedPhrase[index].phrase);
                      editedPhrase.splice(index, 1);                      
                    }                         
                } else {
                  if (checkIfPunctuation(editedPhrase[index].phrase) == true) puncDeletions++;
                  else if (compareArrays(editedPhrase[index].phrase, ['']) != true) deletions++;
                  deletedWords.push(editedPhrase[index].phrase); 
                      console.log("deletion: ", editedPhrase[index].phrase);
                      editedPhrase.splice(index, 1); 
                }                 
        }    
    }
    return [editedPhrase, autocorrections, deletions, puncDeletions, weightedWordEdits, deletedWords];
}





let phrase1 = [
  'My sister',
  'wants',
  'to',
  'try',
  'to' ,
  'eat healthily .'
];

let phrase2 = [
  'My sister',
  'want',
  'try',
  'eat healthily .'
];

let res = autocorrect(phrase1, phrase2);
console.log("new edited phrase: ", res[0], ", autocorrections: ", res[1], ", deletions: ", res[2]);
/*
console.log(levCalc("пойт", "пойти"));*/