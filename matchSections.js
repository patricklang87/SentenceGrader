//let phrase1 = ["I", "am", "going", "to", "the", "store", "tomorrow", "."];
//let phrase2 = ["to", "the", "store", "tomorrow", "I", "am", "going", "."];


export const matchSections = (keyAns, userAns) => {
let subphrases = [];
for (let i = 0; i < userAns.length; i++) {
let subphraseItems = 0;
for (let phrase of subphrases){
subphraseItems += phrase.length;
}
// this position counter likely have to be updated when dealing with incorrect words.
if ( i < subphraseItems) {
	continue;
}
  for (let j = 0; j < keyAns.length; j++) {
    if (keyAns[j] == userAns[i]) {
      let subphrase = [];
      let startingPoint = keyAns.slice(j);
      for (let k = 0; k < startingPoint.length; k++) {
        if (startingPoint[k] == userAns[i + k]) {
        subphrase.push(userAns[i + k]);  
        } else {
          subphrases.push(subphrase);
          break;
        }    
      }
      if (startingPoint.length == 1) subphrases.push(subphrase);
    }
  }
}
return subphrases;
}

//console.log(matchSections(phrase1, phrase2));