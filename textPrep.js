// @ts-check
const sepPunctuation = (str) => {
    if (typeof str != "string") console.log("input is not a string");
    let punctuation = str.match(/[,.":;()]/g);
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
      str = str.substr(0, str.length - 1);
    }
    return str;
  }
  
  // console.log(sepPunctuation(phrase));
  
  const tokenize = (str) => {
      let tokens = str.split(" ");
    return tokens;
  }
  
  export const prepSentence = (str) => {
    let sepStr = sepPunctuation(str);
    let tokenStr = tokenize(sepStr);
    return tokenStr;
  }