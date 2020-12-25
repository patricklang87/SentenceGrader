// @ts-check
const sepPunctuation = (str) => {
    if (typeof str != "string") console.log("input is not a string");
    let punctuation = str.match(/[,!.":;()]/g);
      if (punctuation != null) {
      let alreadyCovered = [];
      for (let i of punctuation) {
        //console.log(str, i);
        if (!alreadyCovered.includes(i)) {
          if (i == ".") str = str.replace(new RegExp(/\./, 'g'), " " + i + " ");
          else  str = str.replace(new RegExp(i, 'g'), " " + i + " ");
        }
        alreadyCovered.push(i);
      }
      str = str.replace(/\s+/g, " ");
      str = str.trim();
    }
    return str;
  }
  
// console.log(sepPunctuation(phrase));

const tokenize = (str) => {
      let tokens = str.split(" ");
    return tokens;
  }
  
const prepSentence = (str) => {
    let sepStr = sepPunctuation(str);
    let tokenStr = tokenize(sepStr);
    return tokenStr;
  }

const arToPhraseString = (ar) => {
    let newAr = [];
    for (let i = 0; i < ar.length; i++) {
      newAr.push(ar[i].join(' '));
    }
  return newAr;
  }

console.log(prepSentence("My sister wants to try to eat healthily."));
console.log(prepSentence("My sister to try wants to eat healthily."));

/*

  console.log(arToPhraseString([
  [ 'My', 'sister' ],
  [ 'wants' ],
  [ 'to' ],
  [ 'try' ],
  [ 'to' ],
  [ 'eat', 'healthily', '.' ]
]));
  console.log(arToPhraseString([
    [ 'My', 'sister' ],
    [ 'wants' ],
    [ 'try' ],
    [ 'eat', 'healthily', '.' ]]));

*/