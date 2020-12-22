

const capitalizationChecker = (keyPhrase, userPhrase, weightedWord) => {
    let capitalizationEdits = 0;
    let weightedWordEdits = 0;
    for (let i = 0; i < userPhrase.length; i++) {
      if (!keyPhrase.includes(userPhrase[i])) {
        for (let j = 0; j < keyPhrase.length; j++) {
          if (!userPhrase.includes(keyPhrase[j])) {
            console.log("cap check: ", keyPhrase[j])
            if (keyPhrase[j].toLowerCase() == userPhrase[i].toLowerCase()) {
                userPhrase.splice(i, 1, keyPhrase[j]);
                capitalizationEdits++;
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