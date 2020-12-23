

const capitalizationChecker = (keyPhrase, userPhrase, weightedWord) => {
    let userPhraseS = [];
    for (let i = 0; i < userPhrase.length; i++) {
      userPhraseS.push(userPhrase[i].phrase);
    }
    let capitalizationEdits = 0;
    let weightedWordEdits = 0;
    for (let i = 0; i < userPhrase.length; i++) {
      if (!keyPhrase.includes(userPhrase[i].phrase)) {
        for (let j = 0; j < keyPhrase.length; j++) {
          if (!userPhraseS.includes(keyPhrase[j])) {
            console.log("cap check: ", keyPhrase[j], userPhrase[i].phrase)
            if (keyPhrase[j].toLowerCase() == userPhrase[i].phrase.toLowerCase()) {
                userPhrase[i].phrase = keyPhrase[j];
                console.log("userPhrase[i].phrase", userPhrase[i].phrase);
                capitalizationEdits++;
                userPhrase[i].capEdit = "yes";
                if (keyPhrase[j].toLowerCase() == weightedWord.toLowerCase()) {
                  weightedWordEdits++;
                }
            }   
          }
        }
      }
    }
    return [userPhrase, capitalizationEdits, weightedWordEdits];
  }
  
 //console.log(capitalizationChecker(["This", "is", "me"], ["This", "is", "Me"], "me"));