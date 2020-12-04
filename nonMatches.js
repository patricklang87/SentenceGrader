// @ts-check
/*
let phrase1 = [["Today"], ["is"], ["a"], ["good"], ["day"], ["."]];
let phrase2 = [["Today"], ["is"], ["a"], ["god"], ["tayser"], ["."]];

const compareArrays = (ar1, ar2) => {
    if (ar1.length != ar2.length) return false;
    else {
        let truthAr = [];
        for (let i = 0; i < ar1.length; i++) {
            if (ar1[i] == ar2[i]) truthAr.push(ar1[i]);
        }
        if (ar1.length == truthAr.length) return true;
        else return false;
    }
}

const arIncludeAr = (innerAr, outerAr) => {
    let truthAr = [];
    for (let i = 0; i < outerAr.length; i++) {
        if (compareArrays(innerAr, outerAr[i]) == true) truthAr.push(innerAr);
    }
    if (truthAr.length != 0) return true;
    else return false;
}

const rectifyNonMatches = (keyPhrase, userPhrase) => {
    let autocorrections = 0;
    let deletions = 0;


    for (let i = 0; i < userPhrase.length; i++) {
        if (arIncludeAr(userPhrase[i], keyPhrase) != true) {
            for (let j = 0; j < keyPhrase.length; j++) {
                if (arIncludeAr(keyPhrase[j]) != true) {
                    let autocorrection = autocorrect(userPhrase[i], keyPhrase[j]);
                    autocorrections += autocorrection[0];
                    userPhrase[i].splice(0, 1, autocorrect[1]);
                    if (autocorrection[0] == 0) {
                        userPhrase.splice(i, 1);
                        deletions++;
                    }
                }
            }
        }
    }
    return [userPhrase, autocorrections, deletions];
}

let result = rectifyNonMatches(phrase1, phrase2);
console.log("new edited phrase: ", result[0], ", autocorrections: ", result[1], ", deletions: ", result[1]); */