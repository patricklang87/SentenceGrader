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



//reorderer -- this now just needs to be edited so it counts changes correctly

export const wordOrderEditor = (keyAns, userSub) => {
  let editCount = 0;
  let insertions = 0;
  //create an editedPhrase that can be compared to the user submission
  let editedPhrase = [];
  for (let item of userSub) editedPhrase.push(item);

  //word order editor will recursively call reorderer so it after each change, it starts from the beginning of the array, and does not accidentally skip contents.
  const reorderer = (keyAns, userAns) => {
    for (let index = 0; index < keyAns.length; index++) {
    	
      if (keyAns[index] != editedPhrase[index]) {
        if (!editedPhrase.includes(keyAns[index])) {
          editedPhrase.splice(index, 0, keyAns[index]);
          insertions++;
        }
        else {

				console.log("round starting status: ", editedPhrase);
         let roundStartStatus = [];
  				for (let item of editedPhrase) roundStartStatus.push(item);
        // if the word in the user submission is incorrect, and more than one position behind where it should be, or the next word is more than one ahead of where it should be, the edit count is increased by one. Then that word at the index is removed
        //let correctWord = userAns[index];
        let userWord = editedPhrase[index];
        editedPhrase.splice(index, 1);
        console.log("step 1: ", editedPhrase);
        //if the word now at that index is still not the right word, the program locates the right word places it at the index, and deletes it where it was before. 
        if (editedPhrase[index] != keyAns[index]) {
          editedPhrase.splice(editedPhrase.indexOf(keyAns[index]), 1);
          console.log("step 2A: ", editedPhrase);
          editedPhrase.splice(index, 0, keyAns[index]);
          console.log("step 2B: ", editedPhrase);
        }

        // then the program prepares to put the word back. By default it places it at its correct index, but if it finds that the word behind it in the edited phrase has a higher correct index, it is moved back until it hits a word with a lower index. Failing this, it checks the next word in the list, and places it ahead of it.
        if (keyAns.indexOf(userWord) < keyAns.indexOf(editedPhrase[keyAns.indexOf(userWord) - 1])) {
        	console.log("index shift -");
          let indexShift = 0;
          for (let newIndex = keyAns.indexOf(userWord); newIndex > index; newIndex--) {
          
            if (keyAns.indexOf(editedPhrase[newIndex - 1]) < keyAns.indexOf(userWord)) {
              break;
            }
            indexShift++;
          }
          editedPhrase.splice(keyAns.indexOf(userWord) - indexShift, 0, userWord);
        } else if (keyAns.indexOf(userWord) > keyAns.indexOf(editedPhrase[keyAns.indexOf(userWord)])) {
        	console.log("index shift +");
         let indexShift = 0;
          for (let newIndex = keyAns.indexOf(userWord); newIndex < editedPhrase.length; newIndex++) {
          if (keyAns.indexOf(editedPhrase[newIndex]) > keyAns.indexOf(userWord)) {
              break;
            }
            indexShift++;
          }
          editedPhrase.splice(keyAns.indexOf(userWord) + indexShift, 0, userWord);
             
            } else editedPhrase.splice(keyAns.indexOf(userWord), 0, userWord);
        //  if the word at the index has changed, the edit count increases by 1
        if (roundStartStatus[index] != editedPhrase[index]) editCount++;
        if (roundStartStatus[index] != editedPhrase[index + 1]) editCount++;
        //if (roundStartStatus[index] != editedPhrase[index +1] && roundStartStatus[index] != editedPhrase[index +2]) editCount++;
        console.log("step 3: ", editedPhrase, " editCount: ", editCount);
				console.log("userSub[index]: ", userSub[index], " editedPhrase[index]: ", editedPhrase[index] );
        // this is always repeated from the beginning of the array until the edited Phrase matches the key answer.
        if (editedPhrase != keyAns) {
          reorderer(keyAns, editedPhrase);
        }
      }
    }
    }
  }
  reorderer(keyAns, userSub);
  return [editedPhrase, editCount, insertions];
}



//console.log(wordOrderEditor(phrase1, phrase2));