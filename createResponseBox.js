// @ts-check

const createDisplayBox = (labelContent, infoContent) => {
    let box = document.createElement("div");
    let labelDiv = document.createElement("div");
    let contentDiv = document.createElement("div");
    box.className = "resultRow";
    labelDiv.innerHTML = labelContent;
    contentDiv.innerHTML = infoContent;
    box.appendChild(labelDiv);
    box.appendChild(contentDiv);
    return box;
}

const createClosestResBox = (labelContent, infoContent) => {
    let box = document.createElement("div");
    let labelDiv = document.createElement("div");
    let contentDiv = document.createElement("div");
    box.className = "resultRow";
    labelDiv.innerHTML = labelContent;
    contentDiv.appendChild(infoContent);
    box.appendChild(labelDiv);
    box.appendChild(contentDiv);
    return box;
}

const createResponseBox = (score, userResponse, closestResponse, outcome, weightedWord) => {
    let responseBox = document.createElement("div");

    let scoreContent = score[0] + " out of " + score[1];
    let scoreDiv = createDisplayBox("Score: ", scoreContent);
    responseBox.appendChild(scoreDiv);

    let userResponseDiv = createDisplayBox("User Reponse: ", userResponse);
    responseBox.appendChild(userResponseDiv);

    let closestResponseDiv = createClosestResBox("Closest Correct Answer: ", closestResponse);
    responseBox.appendChild(closestResponseDiv);

    let autocorrectedDiv = createDisplayBox("Autocorrections: ", outcome[1]);
    if (outcome[1] == 0) autocorrectedDiv.style.display = "none";
    responseBox.appendChild(autocorrectedDiv);
    console.log("outcome[8]:", outcome[8]);
    let deletedWords = "(" + outcome[8].join(", ") + ")";
    let deletionDivInfo = outcome[2] + " " + deletedWords;
    let deletionsDiv = createDisplayBox("Deletions: ", deletionDivInfo);
    if (outcome[2] == 0) deletionsDiv.style.display = "none";
    responseBox.appendChild(deletionsDiv);

    let insertionsDiv = createDisplayBox("Insertions: ", outcome[3]);
    if (outcome[3] == 0) insertionsDiv.style.display = "none";
    responseBox.appendChild(insertionsDiv);

    let WOEDiv = createDisplayBox("Word Order Edits: ", outcome[4]);
    if (outcome[4] == 0) WOEDiv.style.display = "none";
    responseBox.appendChild(WOEDiv);

    let CapEditsDiv = createDisplayBox("Capitalization Edits: ", outcome[5]);
    if (outcome[5] == 0) CapEditsDiv.style.display = "none";
    responseBox.appendChild(CapEditsDiv);

    let puncEditsDiv = createDisplayBox("Punctuation Edits: ", outcome[6]);
    if (outcome[6] == 0) puncEditsDiv.style.display = "none";
    responseBox.appendChild(puncEditsDiv);

    
    let weightedWordLabel = "Weighted Word (" + weightedWord[0] + "): ";
    let weightedWordDiv = createDisplayBox(weightedWordLabel, outcome[7]);
    if (outcome[7] == 0) weightedWordDiv.style.display = "none";
    responseBox.appendChild(weightedWordDiv);

    return responseBox;
}