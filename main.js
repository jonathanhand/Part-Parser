//get html elements
const getPartsBtn = document.getElementById('getPartsBtn').addEventListener('click', function () {
    const emailField = document.getElementById('emailField');
    const dupCheck = document.getElementById('dupCheck').checked;
    const ipixCheck = document.getElementById('ipixCheck').checked;
    console.log(dupCheck);
    console.log(emailField)
    parseParts(emailField.value, dupCheck, ipixCheck);

});

//parse the email into arrays
function parseParts(emailText, dupCheck, ipixCheck) {
    const pattern = /([1-9])(\d{3,4})([a-z])(\d{1,3})/gim;
    const patternReg = /([1-9])(\d{3,4})([a-z])(\d{1,3})/gim;
    const digit = /(\d)/;
    const partMatch = emailText.match(pattern);
    const setMatch = new Set(partMatch);
    const setArray = [...setMatch]; //no dupe array

    //call functions based on duplicate box
    if (dupCheck == false) {
        createCSV(setArray);
        createLineList(setArray, ipixCheck);
    } else {
        createCSV(partMatch);
        createLineList(partMatch, ipixCheck);
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
function createCSV(partMatch) {
    var partsCSV = ' '
    let lineNum = 1;
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

    }
    const partCSVField = document.getElementById('partCSVField');
    partCSVField.innerHTML = partsCSV;
}


function createLineList(part, ipixCheck) {
    const lineListField = document.getElementById('lineListField');
    lineListField.innerHTML = ' '
    let i = 1
    for (let j in part) {
        if (ipixCheck == true) {
            lineListField.innerHTML += 'Ln ' + i + ":\n" + 'IPIX' + part[j] + '\n'
        } else {
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
        //TODO: stopped here
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