// @ts-check

//let givenAns = "Welcome home!";
//let userAns = "Wecome home!";
/*
let phrase1 = [["Today", "is", "a"], ["good"], ["day"], ["."]];
let phrase2 = [["god"], ["Today", "is", "a"], ["tayser"], ["."]];
*/
const levCalc = (givenAns, userAns) => {
	if (typeof givenAns != "string") return "please provide string.";
    else if (givenAns == userAns) return 0;
    else {
    	let lenID = 0;
      let userEdit = userAns;
      let editCount = 0;
    	if (userAns.length > givenAns.length) lenID = userAns.length;
    	else lenID = givenAns.length;
    	console.log("lenID: " + lenID);
      do {
      for (let i = 0; i < lenID; i++) {
      	console.log(i);
      	// check for inversions
        if (userEdit[i] != givenAns[i]) {
        	if (userEdit[i+1] == givenAns[i] && userEdit[i] == givenAns[i+1]) {
          	userEdit = userEdit.substr(0, i)  + givenAns[i] + givenAns[i+1] + userEdit.substr(i+2);
          	console.log("invert " + userEdit);
          	editCount ++;
        	}
        	//check for omissions
        	else if (userEdit[i] == givenAns[i+1]) {
        		userEdit = userEdit.substr(0, i) + givenAns[i] + userEdit.substr(i); 
        		console.log("omission " + userEdit);
        		editCount ++;
        	}
        	// check for false insertions
        	else if (userEdit[i+1] == givenAns[i]) {
        		userEdit = userEdit.substr(0, i) + userEdit.substr(i+1);
          	console.log("false insertion " + userEdit);
          	editCount ++;
        	}
        	//check if missing final character
        	else if (userEdit[i] == undefined) {
          	console.log(i, userEdit[i]);
        		userEdit = userEdit + givenAns[i];
        		editCount ++;
          	console.log("missing final char " + userEdit);
        	}
          //check if too long
        	else if (givenAns[i] == undefined) {
          	console.log(i, userEdit[i]);
        		userEdit = userEdit.substr(0, i) + userEdit.substr(i+1);
        		editCount ++;
          	console.log("excess final char " + userEdit);
        	}
          //if simply different
          else {
          	userEdit = userEdit.substr(0, i) + givenAns[i]  + userEdit.substr(i+1);
          	editCount ++;
            console.log("simply wrong " + userEdit);
          }
        }
      }
      }
      while (userEdit != givenAns);
	  console.log(userEdit);
	  //document.getElementById("words").innerHTML = userEdit;  
	  return editCount;	
	  
	}  
	
}

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
    for (let k = 0; k < outerAr.length; k++) {
		console.log(innerAr, outerAr[k]);
        if (compareArrays(innerAr, outerAr[k]) == true) {
			truthAr.push(innerAr);
			break;
		} 
    }
    if (truthAr.length > 0) return true;
    else return false;
}


//checks for words that can be corrected and corrects them;
export const autocorrect = (keyAns, editedPhrase) => {
    let autocorrections = 0;
    let deletions = 0;
    for (let index = 0; index < editedPhrase.length; index ++) {
        if (arIncludeAr(editedPhrase[index], keyAns) != true) {
            let changed = false;
            for (let j = 0; j < keyAns.length; j++) {
                if (arIncludeAr(keyAns[j], editedPhrase) != true) {
                    console.log("in autocorrect function keyansj and editedphraseindex: ", keyAns[j][0], editedPhrase[index][0]);
                    let levVal = levCalc(keyAns[j][0], editedPhrase[index][0]);
                    if (levVal <= (1/3)*editedPhrase[index][0].length) {
                        editedPhrase[index].splice(0, 1, keyAns[j][0]);
                        changed = true;
                        autocorrections++;
                        break;
                    } 
                }
            }
        
            if (changed == false) {
                console.log("changed? editedphrase index", editedPhrase[index]);
                editedPhrase.splice(index, 1);
                deletions++;
            } 
        }
       
    }
    return [editedPhrase, autocorrections, deletions];
}


/*
let res = autocorrect(phrase1, phrase2);
console.log("new edited phrase: ", res[0], ", autocorrections: ", res[1], ", deletions: ", res[1]);
*/