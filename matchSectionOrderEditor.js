// sameArray says whether two arrays have the same contents in the same order

const sameArray = (ar1, ar2) => {
    if (ar1.length != ar2.length) return false;
    else {
      for (let i = 0; i < ar1.length; i++) {
        if (ar1[i] != ar2[i]) {
          return false;
        }
      }
      return true;
    }
  }

//sectionOrderEditor is for use with matchSections, for section-based reordering, rather than reording on the basis of individual words.

export const sectionOrderEditor = (keyAns, userSub) => {
    let editCount = 0;
  
    //create an editedPhrase that can be compared to the user submission
    let editedPhrase = [];
    for (let item of userSub) editedPhrase.push(item);
  
    //word order editor will recursively call reorderer so it after each change, it starts from the beginning of the array, and does not accidentally skip contents.
    const reorderer = (keyAns, userAns) => {
      for (let index = 0; index < keyAns.length; index++) {
          
        if (sameArray(keyAns[index], editedPhrase[index]) == false) {
                  console.log("round starting status: ", editedPhrase);
           let roundStartStatus = [];
                    for (let item of editedPhrase) roundStartStatus.push(item);
          // if the word in the user submission is incorrect, and more than one position behind where it should be, or the next word is more than one ahead of where it should be, the edit count is increased by one. Then that word at the index is removed
          let correctWord = userAns[index];
          let userWord = editedPhrase[index];
          editedPhrase.splice(index, 1);
          console.log("step 1: ", editedPhrase);
          //if the word now at that index is still not the right word, the program locates the right word places it at the index, and deletes it where it was before. 
          if (sameArray(keyAns[index], editedPhrase[index]) == false) {
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
    reorderer(keyAns, userSub);
    return [editCount, editedPhrase];
  }