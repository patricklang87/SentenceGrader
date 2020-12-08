// @ts-check

//let givenAns = "Welcome home!";
//let userAns = "Wecome home!";


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
        	}
          //if simply different
          else {
            console.log("simply different: " , userEdit[i], givenAns[i]);
          	userEdit = userEdit.substr(0, i) + givenAns[i]  + userEdit.substr(i+1);
          	editCount ++;
          }
        }
      }
      }
      while (userEdit != givenAns);
	   
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
        if (compareArrays(innerAr, outerAr[k]) == true) {
			truthAr.push(innerAr);
			break;
		} 
    }
    if (truthAr.length > 0) return true;
    else return false;
}


//checks for words that can be corrected and corrects them;
/*export*/ const autocorrect = (keyAns, editedPhrase) => {
    let autocorrections = 0;
    let deletions = 0;
    for (let index = editedPhrase.length - 1; index >= 0; index --) {
        console.log("postion in interation: ", index, editedPhrase[index]);
        //console.log(" iteration ", index, " section: ", editedPhrase[index]);
        if (arIncludeAr(editedPhrase[index], keyAns) != true) {
          console.log(editedPhrase[index], " IS NOT IN ", keyAns);

            let levCalcS = [];
            for (let j = 0; j < keyAns.length; j++) {
                //console.log("keyAns[j]: ", keyAns[j], " editedPhrase: ", editedPhrase);
                if (arIncludeAr(keyAns[j], editedPhrase) != true) {
                  console.log(keyAns[j], " IS NOT IN ", editedPhrase);
                  let levVal = levCalc(keyAns[j][0], editedPhrase[index][0]);
                  console.log("levVal: ", levVal);
                  levCalcS.push([levVal, keyAns[j][0]]);
                }
                 
                } 
                console.log("levCalcS: ", levCalcS);
                if (levCalcS[0] != undefined) {
                  let lowestLevValIndex = 0;
                    for (let k = 0; k < levCalcS.length; k++) {
                      if (levCalcS[k][0] < levCalcS[lowestLevValIndex][0]) lowestLevValIndex = k;
                    }
                    console.log("lowestValIndex: ", lowestLevValIndex);

                    let lengthCompare = editedPhrase[index][0].length;
                    console.log("levCalcS[lowestLevValIndex]: ", levCalcS[lowestLevValIndex]);
                    if (levCalcS[lowestLevValIndex][1].length > lengthCompare) lengthCompare = levCalcS[lowestLevValIndex][1].length;
                    if (levCalcS[lowestLevValIndex][0] <= (1/3)*lengthCompare) {
                        editedPhrase[index].splice(0, 1, levCalcS[lowestLevValIndex][1]);
                        autocorrections++;                         
                    } else {
                      console.log("deletion: ", editedPhrase[index]);
                      editedPhrase.splice(index, 1);
                      deletions++;                 
                    }                         
                }                  
        }    
    }
    return [editedPhrase, autocorrections, deletions];
}



/*
let phrase1 = [['Ich '], ['bin '], ['spät '], ['nach Hause '], ['gekommen '], ['. ']];
let phrase2 = [['Spät '], ['ich '], ['nach Hause '], ['kommen '], ['. ']];

let res = autocorrect(phrase1, phrase2);
console.log("new edited phrase: ", res[0], ", autocorrections: ", res[1], ", deletions: ", res[2]);
*/

console.log(levCalc("gekommen ", "kommen "));