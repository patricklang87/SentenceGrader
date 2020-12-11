// @ts-check

function ColorCodedSubPhrase(phrase) {
    this.phrase = phrase;
    this.autocorrect = "no";
    this.deletion = "no";
    this.insertion = "no";
    this.wordOrderEdit = "no";
    this.capEdit = "no";
}

const colorCodePhrase = (phrase) => {
    let colorCodedPhrase = [];
    for (let i = 0; i < phrase.length; i++) {
        let codedSubphrase = new ColorCodedSubPhrase(phrase[i]);
        colorCodedPhrase.push(codedSubphrase);
    }
    return colorCodedPhrase;
}

