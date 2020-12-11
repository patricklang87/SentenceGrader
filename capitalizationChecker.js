const capitalizationChecker = (keyPhrase, userPhrase) => {
    let capitalizationEdits = 0;
    for (let i = 0; i < userPhrase.length; i++) {
      if (arIncludeAr(userPhrase[i], keyPhrase) != true) {
        for (let j = 0; j < keyPhrase.length; j++) {
          if (arIncludeAr(keyPhrase[j], userPhrase) != true) {
            if (keyPhrase[j][0].toLowerCase() == userPhrase[i][0].toLowerCase()) {
                userPhrase.splice(i, 1, keyPhrase[j]);
                capitalizationEdits++;
            }
          }
        }
      }
    }
    return [userPhrase, capitalizationEdits];
  }
  
  console.log(capitalizationChecker(["This", "is", "me"], ["This", "is", "Me"]));