// @ts-check
const sentenceParser = (keyPhrase, parsingPhrase) => {
  let parsedPhrases = [];
  const identifyMatchIn = (subKeyPhrase, character) => {
    let matchIndices = [];
    for (let j = 0; j < subKeyPhrase.length; j++) {
      if (subKeyPhrase[j] == character) matchIndices.push(j);
    }
    console.log("match Indices: ", matchIndices);
    return matchIndices;
  }
  const subParse = (keyPhrase, parsingPhrase) => {
    console.log("subParse Begin", parsingPhrase);
    console.log("parsingPhrase, parsingPhrase[0]: ", parsingPhrase, parsingPhrase[0] );
    if (!keyPhrase.includes(parsingPhrase[0])) {
      let exceptAr = [];
      exceptAr.push(parsingPhrase[0]);
      parsedPhrases.push(exceptAr);
      parsingPhrase.splice(0, 1);
      if (parsingPhrase.length > 0) subParse(keyPhrase, parsingPhrase);
    } else {
      let matchingTerms = identifyMatchIn(keyPhrase, parsingPhrase[0]);
      let tentativeSubphraseS = [];
      for (let k = 0; k < matchingTerms.length; k++) {
        let tentativeSubphrase = [];
        let keyPhraseSubsec = keyPhrase.slice(matchingTerms[k]);
        console.log("keyPhraseSubsec: ", keyPhraseSubsec);
        for (let l = 0; l < parsingPhrase.length; l++) {
            console.log("parsingPhrase[l], keyPhraseSubsec[l]", parsingPhrase[l], keyPhraseSubsec[l]);
          if (parsingPhrase[l] == keyPhraseSubsec[l]) {
            tentativeSubphrase.push(parsingPhrase[l]);
          } else if (keyPhraseSubsec[l] == "$PLACEHOLDER$") {
              continue;
              
          } else {
            console.log("tentative Subphrase: ", tentativeSubphrase);
            break;
          }
        }
        tentativeSubphraseS.push(tentativeSubphrase);
      }
      let longestIndex = 0;
      for (let m = 0; m < tentativeSubphraseS.length; m++) {
        if (tentativeSubphraseS[m].length > tentativeSubphraseS[longestIndex].length) longestIndex = m;
      }
      parsedPhrases.push(tentativeSubphraseS[longestIndex]);
     

      let shouldWeDelete = [];
      for (let n = 1; n < parsingPhrase.length; n++) {
        if (parsingPhrase[n] == parsingPhrase[0]) {
          console.log("parsingPhrase[n-1], keyPhrase[matchingTerms[longestIndex] -1 ]", parsingPhrase[n-1], keyPhrase[matchingTerms[longestIndex] -1 ]);
          let nextKeyIndex = matchingTerms[longestIndex] + keyPhrase[matchingTerms[longestIndex]].length;
          console.log("nextKeyIndex", nextKeyIndex);
          console.log("keyPhrase[matchingTerms[longestIndex]][0]", keyPhrase[matchingTerms[longestIndex]]);
          console.log("keyPhrase[nextKeyIndex]", keyPhrase[nextKeyIndex]);
          
          if (parsingPhrase[n-1] != keyPhrase[matchingTerms[longestIndex] -1 ] || keyPhrase[matchingTerms[longestIndex]] == keyPhrase[nextKeyIndex] ) {
            shouldWeDelete.push("yes");  
          } 
          
        }
      }
      if (shouldWeDelete.length > 0) {
        console.log("inserting placeholder");
        keyPhrase.splice(matchingTerms[longestIndex], tentativeSubphraseS[longestIndex].length, '$PLACEHOLDER$');
      }

      parsingPhrase.splice(0, tentativeSubphraseS[longestIndex].length);
      console.log("parsedPhrases: ", parsedPhrases);
      console.log("newParsingPhrase: ", parsingPhrase);
      console.log("keyPhrase: ", keyPhrase);
      if (parsingPhrase.length > 0) {
      let truthAr = [];
      for (let n = 0; n < parsingPhrase.length; n++) {
        if (keyPhrase[n] == parsingPhrase[n]) truthAr.push(parsingPhrase[n]);
      }
      if (truthAr.length == parsingPhrase.length) {
        console.log("truth r initiated parsed phrases push", truthAr);
        parsedPhrases.push(parsingPhrase);
      } 
      else {
        subParse(keyPhrase, parsingPhrase);
      }
    }
  }
  
  }
  subParse(keyPhrase, parsingPhrase);
  return parsedPhrases;
}


let kPhrase = ['I', 'like', 'to', 'party', 'party', '.'];
let pPhrase =   ['I', 'like', 'to', 'PARTY', 'party', '.'];
console.log(sentenceParser(kPhrase, pPhrase));

/*
[ [ 'I', 'like', 'to' ], [ 'PARTY' ], [ 'party', '.' ] ]
[ [ 'I', 'like', 'to' ], [ 'party' ], [ 'party' ], [ '.' ] ]
*/