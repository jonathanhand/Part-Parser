const custCheck = document.getElementById('custCheck');
custCheck.addEventListener('change', showCust);
qtyCheck.addEventListener('change', showQty);
	const custField = document.getElementById('custField');
//get html elements
const getPartsBtn = document.getElementById('getPartsBtn').addEventListener('click', function () {
    const emailField = document.getElementById('emailField');
    const dupCheck = document.getElementById('dupCheck').checked;
    const ipixCheck = document.getElementById('ipixCheck').checked;
    const qtyField = document.getElementById('qtyField');
    const qtyCheck = document.getElementById('qtyCheck').checked;
    console.log(dupCheck);
    console.log(emailField);
    
    if (qtyField.value != null) {
          qtyArray = parseQty(qtyField.value);
          
    }
  else {
    qtyArray = -1
  }
  
    parseParts(emailField.value, dupCheck, ipixCheck, custCheck, custField, qtyArray);
    
});

function parseQty(qtyText) {
    const digitReg = /(\d{1,4})/gim;
    const qtyMatch = qtyText.match(digitReg);
  if (qtyMatch != null) {
      return qtyMatch;

  }
}
//show custom field
function showCust() {
console.log('executed' + custCheck)
	if (custCheck.checked == true) {
	custField.style.display = 'inline-block';
	}
else {
custField.style.display = 'none';
}
	
	}
function showQty() {
console.log('executed qty' + qtyCheck)
	if (qtyCheck.checked == true) {
	qtyDiv.style.display = 'inline-block';
	}
else {
qtyDiv.style.display = 'none';
}
	
	}
//parse the email into arrays
function parseParts(emailText, dupCheck, ipixCheck, custCheck, custField, qtyArray) {
    console.log(qtyArray)
    const pattern = /([1-9])(\d{3,4})([a-z])(\d{1,3})/gim;
    const patternReg = /([1-9])(\d{3,4})([a-z])(\d{1,3})/gim;
    const digit = /(\d)/;
    const partMatch = emailText.match(pattern);
    const setMatch = new Set(partMatch);
    const setArray = [...setMatch]; //no dupe array

console.log(custField.value)

    //call functions based on duplicate box
    if (dupCheck == false) {
        createCSV(setArray, qtyArray);
        createLineList(setArray, ipixCheck, custCheck, custField);
    } else {
        createCSV(partMatch, qtyArray);
        createLineList(partMatch, ipixCheck, custCheck, custField);
    }
    duplicateCheck(setArray, partMatch);

    //find the quantity in relation to part number
    const splitEmail = emailText.split(/[\s,]+/);
    for (let word in splitEmail) {
        if (patternReg.test(splitEmail[word]) == true) {
            if (digit.test(splitEmail[word - 1]) == true) {
                // console.log("PART: " + splitEmail[word] + " QTY: " + splitEmail[word-1]);
            } else {
                //   console.log("PART: " + splitEmail[word] + " QTY: UNKNOWN");
            }
        }

    }
}

//create csv from passed in array
function createCSV(partMatch, qtyArray) {
    var partsCSV = ' '
    let lineNum = 1;
    let indexNum = 0;
    if (qtyArray == null || partMatch.length != qtyArray.length) {
    for (let i in partMatch) {
        //if on item number 7, add line break
        if (lineNum % 7 == 0) {
            // console.log('adding line break after ' + partMatch[i])
            partsCSV = partsCSV + partMatch[i] + '\n' + '\n';

        }
        //takes off comma if last part number (less than 7)
        else {
            if (i == (partMatch.length - 1)) {
                partsCSV = partsCSV + partMatch[i]
                // console.log(partMatch[i] + ' is the last part on the line')
            } else {
                partsCSV = partsCSV + partMatch[i] + ',';
                // console.log(partsCSV)
            }
        }
        lineNum += 1;
        indexNum +=1;
    }
    }
  else if (partMatch.length == qtyArray.length){
    for (let i in partMatch) {
        //if on item number 7, add line break
        if (lineNum % 6 == 0) {
            // console.log('adding line break after ' + partMatch[i])
            partsCSV = partsCSV + partMatch[i] + ' ' + qtyArray[indexNum] +'\n' + '\n';

        }
        //takes off comma if last part number (less than 7)
        else {
            if (i == (partMatch.length - 1)) {
                partsCSV = partsCSV + partMatch[i]+ ' ' + qtyArray[indexNum]
                // console.log(partMatch[i] + ' is the last part on the line')
            } else {
                partsCSV = partsCSV + partMatch[i] +  ' ' + qtyArray[indexNum] +',';
                // console.log(partsCSV)
            }
        }
        lineNum += 1;
        indexNum +=1;
    }
  }
    const partCSVField = document.getElementById('partCSVField');
    partCSVField.innerHTML = partsCSV;
}


function createLineList(part, ipixCheck, custCheck, custField) {
	console.log(custField.value)
    const lineListField = document.getElementById('lineListField');
    lineListField.innerHTML = ' '
    let i = 1
    for (let j in part) {
        if (ipixCheck == true) {
            lineListField.innerHTML += 'Ln ' + i + ":\n" + 'IPIX' + part[j] + '\n'
        } 

else if (custCheck.checked == true) {
	lineListField.innerHTML += 'Ln ' + i + ":\n" + custField.value + part[j] + '\n'
}

else {
            lineListField.innerHTML += 'Ln ' + i + " - " + part[j] + '\n'
        }
        i += 1

    }

}

function duplicateCheck(set, array) {
    let line = 0;
    let duplicateAlerts = ''
    for (let part in set) {
        line +=1
        
        let matchCount = 0;
        for (let i in array)
        {
            if (set[part] == array[i])
            {
                matchCount += 1            }
            if (matchCount > 1) {
                console.log('Line ' + line + '- duplicate part alert (' + set[part]  + ')'+ '\n')
                duplicateAlerts += 'Line ' + line + '- duplicate part alert (' + set[part]  + ')'+ '\n';
            }
        }
    }
    // console.log(duplicateAlerts)

}
