// @ts-check

function ColorCodedSubPhrase(phrase) {
    this.phrase = phrase;
    this.autocorrect = "no";
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
    let printPhrase = document.createElement("span");
    for (let i = 0; i < sentence.length; i++) {
        let space = document.createElement('span');
        space.innerHTML = " ";
        if (!punctuation.includes(sentence[i]) && i != 0) {
            printPhrase.appendChild(space);
        }

        let subSentence = document.createElement("span");
        subSentence.innerHTML = sentence[i].phrase;

        console.log(sentence[i].phrase, sentence[i].autocorrect, sentence[i].insertion, sentence[i].wordOrderEdit, sentence[i].capEdit, sentence[i].weightWord);

        // Mark each kind of edit with a class (color plus a non-color cue, see
        // style.css) and hidden text, so the meaning doesn't rely on color alone.
        const edits = [];
        if (sentence[i].autocorrect == "yes") edits.push(["edit-autocorrect", "spelling corrected"]);
        if (sentence[i].insertion == "yes") edits.push(["edit-insertion", "inserted"]);
        if (sentence[i].wordOrderEdit == "yes") edits.push(["edit-order", "moved"]);
        if (sentence[i].capEdit == "yes") edits.push(["edit-capitalization", "capitalization fixed"]);
        if (sentence[i].weightWord == "yes") subSentence.style.fontWeight = "bold";
        edits.forEach(([className]) => subSentence.classList.add(className));
        if (edits.length) {
            const note = document.createElement("span");
            note.className = "visually-hidden";
            note.textContent = ` (${edits.map(([, label]) => label).join(", ")})`;
            subSentence.appendChild(note);
        }

        printPhrase.appendChild(subSentence);
    }
    console.log(printPhrase.innerHTML);
    return printPhrase;
}
