
//@ts-check 

// here are the programs for removing extra words and counting words in an bag of words object
/*
//produces an bag of words objet that tracks the frequency of individual strings in the array
const createWordCount = (sentence) => {
  let KeyWordCount = {};
  for (let index = 0; index < sentence.length; index++) {
    if (!Object.keys(KeyWordCount).includes(sentence[index])) KeyWordCount[sentence[index]] = 1;
    else KeyWordCount[sentence[index]]++;
  }
  return KeyWordCount;
}

//console.log(createWordCount(phrase1));

const removeExcessWords = (keyAns, editedPhrase) => {
  let BoWKeyAns = createWordCount(keyAns);
  let BoWEditedPhrase = createWordCount(editedPhrase);
  let BoWEditedPhraseKeys = Object.keys(BoWEditedPhrase);
  let BoWKeyAnsKeys = Object.keys(BoWKeyAns);
  for (let keyItem of BoWEditedPhraseKeys) {
    if (!BoWKeyAnsKeys.includes(keyItem)) {
      //here you need to move through the correction and deletion program
    } else if (BoWKeyAns.keyItem < BoWEditedPhrase.keyItem) {
       for (let i in editedPhrase) {
         if (keyItem == editedPhrase[i]) {
          //here you have to check whether the words immediately preceding or following the word in question are correct. Delete whichever word is immediately surrounded by the least correct words first
         }
       }
        
      } else if (BoWKeyAns.keyItem > BoWEditedPhrase.keyItem) {
        //in this case, the word is not absent from the user's answer, but there is not enough of it.
      }
    }
  }


//removes words that are not in the key Answer
export const removeFalseWords = (keyAns, editedPhrase) => {
	let numRemoved = 0;
	for (let index = editedPhrase.length - 1; index >= 0; index -= 1) {
    if (!keyAns.includes(editedPhrase[index])) {
      editedPhrase.splice(index, 1);
      console.log("word not in answer " + index, editedPhrase);
      numRemoved++;
    }
  }
  return [editedPhrase, numRemoved];
}

/*write code that remove excess multiples of a single word; you'll have to check which word is the best to remove
//remove extras of a single word
  let EditedPhraseWordCount = {};
  for (let index = 0; index < editedPhrase.length; index++) {
    if (!Object.keys(EditedPhraseWordCount).includes(userAns[index])) EditedPhraseWordCount[userAns[index]] = 1;
    else EditedPhraseWordCount[userAns[index]]++;
  }
  console.log("EditedPhrase Word Count: ", EditedPhraseWordCount);
  
  for (let index = 0; index < editedPhrase; index ++) {
  		if (UserAnsWordCount[userAns[index]]
  }  

 
  */
  
// once the user's submission has been reduced to the only the necessary words, it can then be put into proper order

const compArsOfArs = (ar1, ar2) => {
  let truthAr = [];
  if (ar1.length != ar2.length) return false;
  for (let i = 0; i < ar1.length; i++) {
    if (compareArrays(ar1[i], ar2[i]) == true) truthAr.push("yep");
  }
  if (truthAr.length == ar1.length) return true;
  else return false;
}


//reorderer -- this now just needs to be edited so it counts changes correctly

const wordOrderEditor = (keyAns, userSub, weightedWord) => {
  let editedPhraseS = [];
  for (let i = 0; i < userSub.length; i++) {
    editedPhraseS.push(userSub[i].phrase);
  }
  let editCount = 0;
  let insertions = 0;
  let puncEdits = 0;
  let weightedWordEdits = 0;
  //create an editedPhrase that can be compared to the user submission
  let editedPhrase = [];
  for (let item of userSub) editedPhrase.push(item);
  console.log("begin WOE, editedPhrase: ", editedPhrase);
  //word order editor will recursively call reorderer so it after each change, it starts from the beginning of the array, and does not accidentally skip contents.
  const reorderer = (keyAns, userAns) => {
  
    for (let index = 0; index < keyAns.length; index++) {
      console.log("current index: ", index);
    	
      if (keyAns[index] != editedPhrase[index].phrase) {
        console.log("sliced edited Phrase: " , index, editedPhrase.slice(index));
        if (!editedPhraseS.slice(index).includes(keyAns[index])) {
          console.log("insertion required: ", keyAns[index]);
          let newWord3 = new ColorCodedSubPhrase(keyAns[index]);
          editedPhrase.splice(index, 0, newWord3);
          editedPhrase[index].insertion = "yes";
          if (checkIfPunctuation(keyAns[index]) == true) puncEdits++;
          else {
            insertions++;
            if (keyAns[index].toLowerCase() == weightedWord.toLowerCase()) {
              weightedWordEdits++;
            }         
          }
        }
        
        else {

				console.log("round starting status: ", editedPhrase);
         let roundStartStatus = [];
  				for (let item of editedPhrase) roundStartStatus.push(item);
        // if the word in the user submission is incorrect, and more than one position behind where it should be, or the next word is more than one ahead of where it should be, the edit count is increased by one. Then that word at the index is removed
        //let correctWord = userAns[index];
        console.log("CHeck edph index phrase: ", editedPhrase[index].phrase);
        let userWord = editedPhrase[index].phrase;
        editedPhrase.splice(index, 1);
        console.log("step 1: ", editedPhrase);
        //if the word now at that index is still not the right word, the program locates the right word places it at the index, and deletes it where it was before. 
        if (editedPhrase[index].phrase != keyAns[index]) {
          editedPhrase.splice(editedPhrase.indexOf(keyAns[index]), 1);
          console.log("step 2A: ", editedPhrase);
          let addWord = new ColorCodedSubPhrase(keyAns[index]);
          editedPhrase.splice(index, 0, addWord);
          editedPhrase[index].wordOrderEdit = "yes";
          console.log("step 2B: ", editedPhrase[index].phrase);
        }
        // then the program prepares to put the word back. By default it places it at its correct index, but if it finds that the word behind it in the edited phrase has a higher correct index, it is moved back until it hits a word with a lower index. Failing this, it checks the next word in the list, and places it ahead of it.
        console.log("CHECKING: ", editedPhrase[keyAns.indexOf(userWord) - 1], keyAns.indexOf(userWord) - 1);
        if (keyAns.indexOf(userWord) < keyAns.indexOf(editedPhrase[keyAns.indexOf(userWord) - 1])) {
        	console.log("index shift -");
          let indexShift = 0;
          for (let newIndex = keyAns.indexOf(userWord); newIndex > index; newIndex--) {
          
            if (keyAns.indexOf(editedPhrase[newIndex - 1].phrase) < keyAns.indexOf(userWord)) {
              break;
            }
            indexShift++;
          }
          editedPhrase.splice(keyAns.indexOf(userWord) - indexShift, 0, userWord);
        } else if (keyAns.indexOf(userWord) > keyAns.indexOf(editedPhrase[keyAns.indexOf(userWord)].phrase)) {
        	console.log("index shift +");
         let indexShift = 0;
          for (let newIndex = keyAns.indexOf(userWord); newIndex < editedPhrase.length; newIndex++) {
          if (keyAns.indexOf(editedPhrase[newIndex].phrase) > keyAns.indexOf(userWord)) {
              break;
            }
            indexShift++;
          }
          let addWord2 = new ColorCodedSubPhrase(userWord);
          editedPhrase.splice(keyAns.indexOf(userWord) + indexShift, 0, addWord2);
          editedPhrase[keyAns.indexOf(userWord) + indexShift].wordOrderEdit = "yes";
            } else {
              let addWord3 = new ColorCodedSubPhrase(userWord);
              editedPhrase.splice(keyAns.indexOf(userWord), 0, addWord3);
              editedPhrase[keyAns.indexOf(userWord)].wordOrderEdit = "yes";
            }
        //  if the word at the index has changed, the edit count increases by 1
     
        if (roundStartStatus[index].phrase != editedPhrase[index].phrase) {
          if (checkIfPunctuation(roundStartStatus[index].phrase) == true) puncEdits++;
          else editCount++;
          console.log("roundStartStatus[index].phrase.toLowerCase(), weightedWord.toLowerCase(): ", roundStartStatus[index].phrase.toLowerCase(), weightedWord.toLowerCase());
          if (roundStartStatus[index].phrase.toLowerCase() == weightedWord.toLowerCase()) {
            weightedWordEdits++;
          }
        } 
        if (roundStartStatus[index + 1].phrase != editedPhrase[index].phrase ) {
          if (checkIfPunctuation(roundStartStatus[index + 1].phrase) == true) puncEdits++;
          else editCount++;
          console.log("roundStartStatus[index + 1].toLowerCase(), weightedWord.toLowerCase(): ",roundStartStatus[index].phrase.toLowerCase(), weightedWord.toLowerCase() );
          if (roundStartStatus[index + 1].phrase.toLowerCase() == weightedWord.toLowerCase()) {
            weightedWordEdits++;
          }
        } 
        
        console.log("step 3: ", editedPhrase, " editCount: ", editCount);
				console.log("userSub[index]: ", userSub[index], " editedPhrase[index]: ", editedPhrase[index] );
        // this is always repeated from the beginning of the array until the edited Phrase matches the key answer.
      
      }
    
     
      if (compArsOfArs(editedPhrase, keyAns) != true) {
        console.log("not the same: ", editedPhrase, keyAns );
        //reorderer(keyAns, editedPhrase);
        }
    }
  
  }
}
  reorderer(keyAns, userSub);
  return [editedPhrase, editCount, insertions, puncEdits, weightedWordEdits];
}


/*
My sister to try to eat wants healthily.

and 

My sister tries to want to eat healthily.

causing problems

*/

/*
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

*/
/*
let phrase1 = ['My sister', 'tries', 'to', 'want', 'to', 'eat healthily .'];
let phrase2 = ['My sister', 'to', 'to', 'want', 'eat healthily .'];
let res = wordOrderEditor(phrase1, phrase2);
console.log("edited phrase: ", res[0], " editCount: ", res[1], " insertions: ", res[2], " punc edits: ", res[3]);
*/