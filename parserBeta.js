// @ts-check

//let kPhrase = [ 'Ich', 'bin', 'vom', 'weiten', 'gekommen', '.' ];  

//let pPhrase = ['vom', 'weiten', 'Ich', 'gekommen', 'bi', '.' ];



/*export*/ const sentenceParser = (keyPhrase, parsingPhrase) => {
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
          if (parsingPhrase[l] == keyPhraseSubsec[l] || keyPhraseSubsec[l] == "$PLACEHOLDER$") {
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
      keyPhrase.splice(matchingTerms[longestIndex], tentativeSubphraseS[longestIndex].length, '$PLACEHOLDER$');
      parsingPhrase.splice(0, tentativeSubphraseS[longestIndex].length);
      console.log("parsedPhrases: ", parsedPhrases);
      console.log("newParsingPhrase: ", parsingPhrase);
      console.log("keyPhrase: ", keyPhrase);

      if (parsingPhrase.length > 0) {
      let truthAr = [];
      for (let n = 0; n < parsingPhrase.length; n++) {
        console.log("pushed parsing phrase n");
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

/*
let kPhrase = ['My', 'sister', 'wants', 'to', 'try', 'to', 'eat', 'healthily', '.'];
let pPhrase = ['My', 'sister', 'want', 'try', 'to', 'eat', 'healthily', '.'];
console.log(sentenceParser(kPhrase, pPhrase));




[
  [ 'My', 'sister' ],
  [ 'want' ],
  [ 'try', 'to', 'eat', 'healthily', '.' ]
]

[
  [ 'My', 'sister' ],
  [ 'wants' ],
  [ 'to' ],
  [ 'try' ],
  [ 'to' ],
  [ 'eat', 'healthily', '.' ]
]


*/