let kPhrase = ["I", "can", "change", ".", "I", "can", "change", "my", "life", ".", "I", "can", "change", "my", "life", "for", "the", "better", "."];

let pPhrase = ["I", "change", "my", "life", ".", "I", "can", "change", "my", "life", "for", "the", "better", "monkey", ".", "I", "can", "can", "change", "."];

let sentenceParser = (keyPhrase, parsingPhrase) => {
  let parsedPhrases = [];

  let identifyMatchIn = (subKeyPhrase, character) => {
    let matchIndices = [];
    for (let j = 0; j < subKeyPhrase.length; j++) {
      if (subKeyPhrase[j] == character) matchIndices.push(j);
    }
    console.log("match Indices: ", matchIndices);
    return matchIndices;
  }

  const subParse = (keyPhrase, parsingPhrase) => {
    console.log("subParse Begin");

    if (!keyPhrase.includes(parsingPhrase[0])) {
      let exceptAr = [];
      exceptAr.push(parsingPhrase[0]);
      parsedPhrases.push(exceptAr);
      parsingPhrase.splice(0, 1);
      subParse(keyPhrase, parsingPhrase);
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

          } else {
            
            console.log("tentative Subphrases: ", tentativeSubphraseS);
            break;
          }
        }
        tentativeSubphraseS.push(tentativeSubphrase);
      }
      let longestIndex = 0;
      for (let m = 0; m < tentativeSubphraseS.length; m++) {
        if (tentativeSubphraseS[m].length > tentativeSubphraseS[longestIndex].length) longestIndex = m;
        console.log("longest index: ", longestIndex);
      }
      parsedPhrases.push(tentativeSubphraseS[longestIndex]);
      console.log("longest Index: ", longestIndex, " tentativeSubphraseS: ", tentativeSubphraseS);
      console.log(longestIndex, longestIndex + tentativeSubphraseS[longestIndex].length);
      keyPhrase.splice(matchingTerms[longestIndex], tentativeSubphraseS[longestIndex].length);
      parsingPhrase.splice(0, tentativeSubphraseS[longestIndex].length);
      console.log("parsedPhrases: ", parsedPhrases);
      console.log("newParsingPhrase: ", parsingPhrase);
      console.log("keyPhrase: ", keyPhrase);

      let truthAr = [];
      for (n = 0; n < parsingPhrase.length; n++) {
        if (keyPhrase[n] == parsingPhrase[n]) truthAr.push(parsingPhrase[n]);
      }
      if (truthAr.length == parsingPhrase.length) parsedPhrases.push(parsingPhrase);
      else {
        subParse(keyPhrase, parsingPhrase);
      }
    }
  }

  subParse(keyPhrase, parsingPhrase);
  return parsedPhrases;
}

console.log("completed result: ", sentenceParser(pPhrase, kPhrase));
