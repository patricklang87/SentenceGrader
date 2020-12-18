// @ts-check

function ColorCodedSubPhrase(phrase) {
    this.phrase = phrase;
    this.autocorrect = "no";
    this.deletion = "no";
    this.insertion = "no";
    this.wordOrderEdit = "no";
    this.capEdit = "no";
    this.weightWord = "no";

}

const colorCodePhrase = (phrase, weightWord) => {
    let colorCodedPhrase = [];
    for (let i = 0; i < phrase.length; i++) {
        let codedSubphrase = new ColorCodedSubPhrase(phrase[i]);
        if (codedSubphrase.phrase == weightWord) codedSubphrase.weightWord = "yes";
        colorCodedPhrase.push(codedSubphrase);
    }
    return colorCodedPhrase;
}

const printColorCodedPhrase = (sentence) => {
    let punctuation = [",", "."];
    let printPhrase = document.createElement("p");
    for (let i = 0; i < sentence.length; i++) {
        let space = document.createElement('span');
        space.innerHTML = " ";
        if (!punctuation.includes(sentence[i]) && i != 0) {
            printPhrase.appendChild(space);
        }

        let subSentence = document.createElement("span");
        subSentence.innerHTML = sentence[i].phrase;

        if (sentence[i].autocorrect = "yes") subSentence.style.color = "orange";
        if (sentence[i].insertion = "yes") subSentence.style.color = "red";
        if (sentence[i].wordOrderEdit = "yes") subSentence.style.backgroundColor = "purple";
        if (sentence[i].capEdit = "yes") subSentence.style.color = "blue";
        if (sentence[i].weightWord = "yes") subSentence.style.fontWeight = "bold";

        printPhrase.appendChild(subSentence);
    }
}
