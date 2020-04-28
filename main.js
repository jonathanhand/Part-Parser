console.log("Testing thanks to:")
console.log("Austen Young")
console.log("Jack Gamboa")
console.log("Patrick Potvin")
const dupBox = document.getElementById('dupCheck').checked = false;
const packCon = document.getElementById('uomCheck').checked = false;

function clearAll() {
    var elements = document.getElementsByTagName("input");
    var elements2 = document.getElementsByTagName('textarea');
    const emailField = document.getElementById('emailField');
    const qtyField = document.getElementById('qtyField');

    const lineListField = document.getElementById('lineListField');
    const partCSVField = document.getElementById('partCSVField');
    const tableCSVField = document.getElementById('tableCSVField');


    emailField.value = '';
    qtyField.value = '';
    lineListField.value = '';
    partCSVField.value = '';
    tableCSVField.value = '';

    for (var ii = 0; ii < elements.length; ii++) {
        if (elements[ii].type == "text") {
            elements[ii].value = "";
        }
    }

}

const custCheck = document.getElementById('custCheck');
const placeCheck = document.getElementById('placeCheck');


custCheck.addEventListener('change', showCust);
qtyCheck.addEventListener('change', showQty);
uomCheck.addEventListener('change', showUom);
placeCheck.addEventListener('change', showPlace);

const custField = document.getElementById('custField');
const alert = document.getElementById('alert-text');
//get html elements
const getPartsBtn = document.getElementById('getPartsBtn').addEventListener('click', function () {

    alert.style.display = "inline-block";
    const emailField = document.getElementById('emailField');
    const dupCheck = document.getElementById('dupCheck').checked;
    const ipixCheck = document.getElementById('ipixCheck').checked;
    const qtyField = document.getElementById('qtyField');

    const uomField = document.getElementById('uomField');
    const uomConField = document.getElementById('uomConField');

    const qtyCheck = document.getElementById('qtyCheck').checked;
    const uomCheck = document.getElementById('uomCheck').checked;
    const tableCheck = document.getElementById('tableCheck').checked;



    var uomArray = new Array();
    var qtyArray = new Array();
    if (qtyField.value != null) {
        qtyArray = parseQty(qtyField.value);
    } else {
        qtyArray = -1
    }
    if (uomField.value.trim() != '') {

        uomArray = parseUom(uomField.value);

    } else {
        uomArray.push(-1)
    }
    if (uomArray[0] != -1 && uomArray.length == qtyArray.length) {
        var newQtyArray = convertPacks(uomArray, qtyArray)
        qtyOut(newQtyArray);
        parseParts(emailField.value, dupCheck, ipixCheck, custCheck, custField, newQtyArray, tableCheck);
    } else {
        parseParts(emailField.value, dupCheck, ipixCheck, custCheck, custField, qtyArray, tableCheck);
    }

});

function qtyOut(newQty) {
    var qtyOut = ''
    for (let i in newQty) {
        qtyOut += newQty[i] + '\n'
    }
    uomConField.innerHTML = qtyOut
}

function convertPacks(uom, qty) {
    var product = 1
    var newQtyArray = new Array()
    for (let index in uom) {
        product = qty[index] / uom[index]
        product = Math.ceil(product)
        newQtyArray.push(product)
    }
    return newQtyArray
}

function parseQty(qtyText) {
    const digitReg = /(\d{1,7})/gim;
    const qtyMatch = qtyText.match(digitReg);
    if (qtyMatch != null) {
        return qtyMatch;

    }
}

function parseUom(uomText) {
    uomText = uomText.trim()
    const digitReg = /(\d{1,7})/gim;
    uomLines = uomText.split('\n')
    var uomMatch = new Array()

    for (let line in uomLines) {
        uomLines[line] = uomLines[line].trim()

        if (uomLines[line] == "Each" || uomLines[line] == "Pairs") {
            uomMatch.push(1);
        } else {
            uomMatch.push(parseInt(uomLines[line].match(digitReg)));
        }
    }
    if (uomMatch.length > 0 && isNaN(uomMatch[0]) != true) {
        return uomMatch;
    } else {
        return -1;
    }


}

function showPlace() {
    const placeField = document.getElementById('placeField')
    if (placeCheck.checked == true) {
        placeField.style.display = 'inline-block';
    } else {
        placeField.style.display = 'none';
    }

}
//show custom field
function showCust() {
    if (custCheck.checked == true) {
        custField.style.display = 'inline-block';
    } else {
        custField.style.display = 'none';
    }

}

function showUom() {
    if (uomCheck.checked == true) {
        uomDiv.style.display = 'inline-block';
        uomConDiv.style.display = 'inline-block';
        qtyDiv.style.display = 'inline-block';
    } else {
        if (qtyCheck.checked == false) {
            uomDiv.style.display = 'none';
            //qtyDiv.style.display = 'none';
            uomConDiv.style.display = 'none';
        }
        if (qtyCheck.checked == true) {
            uomDiv.style.display = 'none';
            qtyDiv.style.display = 'inline-block';
            uomConDiv.style.display = 'none';
        }
    }

}

function showQty() {
    const qtyCheck = document.getElementById('qtyCheck').checked;
    const uomCheck = document.getElementById('uomCheck').checked;
    if (qtyCheck == true) {
        qtyDiv.style.display = 'inline-block';
    } else if (qtyCheck == false) {
        if (uomCheck == true) {
            qtyDiv.style.display = 'inline-block';
        } else {
            qtyDiv.style.display = 'none';

        }

    }
}
//parse the email into arrays
function parseParts(emailText, dupCheck, ipixCheck, custCheck, custField, qtyArray, tableCheck) {
    const pattern = /([1-9])(\d{3,4})([AKTNaktn])(\d{1,3})/gim;
    const patternReg = /([1-9])(\d{3,4})([AKTNaktn])(\d{1,3})/gim;
    const digit = /(\d{1,7})/;
    const digitAll = /(\d{1,7})/gim;

    const partMatch = emailText.match(pattern);
    const setMatch = new Set(partMatch);
    const setArray = [...setMatch]; //no dupe array

    const placeVal = document.getElementById('placeField').value;
    var placeMatch = placeVal.match(digitAll)
    const placeS = new Set(placeMatch)
    const placeSet = [...placeS]

    partsWithPlaceholders = [...partMatch]
    if (placeSet.length > 0) {
        for (let line in placeSet) {
            lineInt = parseInt(placeSet[line]) - 1
            if (lineInt >= 0) {
                if (lineInt <= partsWithPlaceholders.length) {
                    partsWithPlaceholders.splice(lineInt, 0, "99999A999");

                }
            }
        }
    }
    const setArrayP = new Set(partsWithPlaceholders)
    const setArrayPlace = [...setArrayP]
    console.log(partsWithPlaceholders)
    console.log(qtyArray)
    //call functions based on duplicate box
    if (dupCheck == true) {
        createCSV(setArrayPlace, qtyArray, tableCheck);
        createLineList(setArrayPlace, ipixCheck, custCheck, custField, tableCheck);
    } else {
        createCSV(partsWithPlaceholders, qtyArray, tableCheck);
        createLineList(partsWithPlaceholders, ipixCheck, custCheck, custField, tableCheck);
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
function createCSV(partMatch, qtyArray, tableCheck) {
    var partsCSV = ' '
    var tableCSV = ' '
    let lineNum = 1;
    let indexNum = 0;


    if (tableCheck == true) {
        if (qtyArray == null) {
            //(partMatch.length == qtyArray.length && qtyChecked.checked == true){
            for (let i in partMatch) {
                //if on item number 5, add line break
                if (lineNum % 5 == 0) {
                    // console.log('adding line break after ' + partMatch[i])
                    partsCSV = partsCSV + partMatch[i] + ' ' + '1' + ',' + '\n' ;

                }
                //takes off comma if last part number (less than 5)
                else {
                    if (i == (partMatch.length - 1)) {
                        partsCSV = partsCSV + partMatch[i] + ' ' + '1' + ','
                        // console.log(partMatch[i] + ' is the last part on the line')
                    } else {
                        partsCSV = partsCSV + partMatch[i] + ' ' + '1' + ',';
                        // console.log(partsCSV)
                    }
                }
                lineNum += 1;
                indexNum += 1;
            }

        } else if (partMatch.length == qtyArray.length) {
            //(partMatch.length == qtyArray.length && qtyChecked.checked == true){
            for (let i in partMatch) {
                //if on item number 5, add line break
                if (lineNum % 5 == 0) {
                    // console.log('adding line break after ' + partMatch[i])
                    partsCSV = partsCSV + partMatch[i] + ' ' + qtyArray[indexNum] + ',' + '\n';

                }
                //takes off comma if last part number (less than 5)
                else {
                    if (i == (partMatch.length - 1)) {
                        partsCSV = partsCSV + partMatch[i] + ' ' + qtyArray[indexNum] + ','
                        // console.log(partMatch[i] + ' is the last part on the line')
                    } else {
                        partsCSV = partsCSV + partMatch[i] + ' ' + qtyArray[indexNum] + ',';
                        // console.log(partsCSV)
                    }
                }
                lineNum += 1;
                indexNum += 1;
            }
        } else {
            for (let i in partMatch) {
                //if on item number 7, add line break
                if (lineNum % 7 == 0) {
                    // console.log('adding line break after ' + partMatch[i])
                    partsCSV = partsCSV + partMatch[i] + ',' + '\n';

                }
                //takes off comma if last part number (less than 7)
                else {
                    if (i == (partMatch.length - 1)) {
                        partsCSV = partsCSV + partMatch[i] + ',';
                        // console.log(partMatch[i] + ' is the last part on the line')
                    } else {
                        partsCSV = partsCSV + partMatch[i] + ',';
                        // console.log(partsCSV)
                    }
                }
                lineNum += 1;
                indexNum += 1;
            }
        }


    } else {
        if (qtyCheck.checked == true || uomCheck.checked == true) {
            if (qtyArray == null) {
                console.log("qty array is null")
                //(partMatch.length == qtyArray.length && qtyChecked.checked == true){
                for (let i in partMatch) {
                    tableCSV = tableCSV + partMatch[i] + ' 1,'
                    //if on item number 5, add line break
                    if (lineNum % 5 == 0) {
                        // console.log('adding line break after ' + partMatch[i])
                        partsCSV = partsCSV + partMatch[i] + ' ' + '1' + '\n' ;

                    }
                    //takes off comma if last part number (less than 5)
                    else {
                        if (i == (partMatch.length - 1)) {
                            partsCSV = partsCSV + partMatch[i] + ' ' + '1'

                            // console.log(partMatch[i] + ' is the last part on the line')
                        } else {
                            partsCSV = partsCSV + partMatch[i] + ' ' + '1' + ',';

                            // console.log(partsCSV)
                        }
                    }
                    lineNum += 1;
                    indexNum += 1;
                }

            } else if (partMatch.length == qtyArray.length) {
                console.log("qty and pns match")
                //(partMatch.length == qtyArray.length && qtyChecked.checked == true){
                for (let i in partMatch) {
                    tableCSV = tableCSV + partMatch[i] + ' ' + qtyArray[indexNum] + ','
                    //if on item number 5, add line break
                    if (lineNum % 5 == 0) {
                        // console.log('adding line break after ' + partMatch[i])
                        partsCSV = partsCSV + partMatch[i] + ' ' + qtyArray[indexNum] + '\n' ;

                    }
                    //takes off comma if last part number (less than 5)
                    else {
                        if (i == (partMatch.length - 1)) {
                            partsCSV = partsCSV + partMatch[i] + ' ' + qtyArray[indexNum]

                            // console.log(partMatch[i] + ' is the last part on the line')
                        } else {
                            partsCSV = partsCSV + partMatch[i] + ' ' + qtyArray[indexNum] + ',';

                            // console.log(partsCSV)
                        }
                    }
                    lineNum += 1;
                    indexNum += 1;
                }
            } else {
                console.log("send alert")
                window.alert("Number of quantities does not match the number of parts.\n \nPlease verify each part number is a McMaster part number and each part number has a quantity. \n \nInvalid quanties will not be used (ex: 0.05)\n \n");
                for (let i in partMatch) {
                    tableCSV = tableCSV + partMatch[i] + ' 1,';
                    //if on item number 7, add line break
                    if (lineNum % 7 == 0) {
                        // console.log('adding line break after ' + partMatch[i])
                        partsCSV = partsCSV + partMatch[i] + '\n';


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
                    indexNum += 1;
                }
            }


        } else {
            for (let i in partMatch) {
                tableCSV = tableCSV + partMatch[i] + ' 1,';
                //if on item number 7, add line break
                if (lineNum % 7 == 0) {
                    // console.log('adding line break after ' + partMatch[i])
                    partsCSV = partsCSV + partMatch[i] + '\n';

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
                indexNum += 1;
            }
        }
    }
    const partCSVField = document.getElementById('partCSVField');
    partCSVField.innerHTML = partsCSV;

    const tableCSVField = document.getElementById('tableCSVField');
    tableCSVField.innerHTML = tableCSV;

}

function createLineList(part, ipixCheck, custCheck, custField) {
    const lineListField = document.getElementById('lineListField');
    lineListField.innerHTML = ' '
    let i = 1
    for (let j in part) {
        if (ipixCheck == true) {
            lineListField.innerHTML += 'Ln ' + i + ":\n" + 'IPIX' + part[j] + '\n'
        } else if (custCheck.checked == true) {
            lineListField.innerHTML += 'Ln ' + i + ":\n" + custField.value + part[j] + '\n'
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
        line += 1

        let matchCount = 0;
        for (let i in array) {
            if (set[part] == array[i]) {
                matchCount += 1
            }
            if (matchCount > 1) {
                console.log('Line ' + line + '- duplicate part alert (' + set[part] + ')' + '\n')
                duplicateAlerts += 'Line ' + line + '- duplicate part alert (' + set[part] + ')' + '\n';
            }
        }
    }
    // console.log(duplicateAlerts)

}


const makeTableBtn = document.getElementById('makeTableBtn').addEventListener('click', function () {
    const revField = document.getElementById('revField');
    //const tableField = document.getElementById('tableField');
    //const lineCheck = document.getElementById('lineCheck');
    //const descriptionCheck = document.getElementById('descriptionCheck');
    //const qtyCheck = document.getElementById('qtyCheck');
    const availCheck = document.getElementById('availCheck').checked;
    var table = document.getElementById('tableOutput')
    table.innerHTML = "";

    parseRev(revField.value, availCheck, table);
});

function parseRev(revVal, availCheck, table) {
    let revSpace = revVal;
    const tabPattern = /\t/;
    const linePattern = /\n/;
    let lineSplit = revSpace.split(linePattern);
    let spaceList = revSpace.split(/\n/g);
    let lineArray = []
    let orderedArray = []
    console.log('split!')
    for (let line = 0; line < lineSplit.length - 2; line++) {
        let split = lineSplit[line].split(tabPattern)
        lineArray[line] = split.slice();
        console.log(split)

        lineArray[line][0] = split.slice(0, 1)
        console.log(lineArray[line][0])
        lineArray[line][1] = split.slice(3, 4)
        lineArray[line][2] = split.slice(4, 5)
        console.log(split[1])
        if (split[6][0] != '$') {
            split[6] = '$' + split[6]
        }
        lineArray[line][3] = split.slice(6, 7)
        lineArray[line][4] = split.slice(2, 3)
        lineArray[line][8] = split.slice(1, 2)
        lineArray[line][6] = split.slice(6, 7)
        lineArray[line][7] = split.slice(7, 8)
        lineArray[line][5] = split.slice(5, 6)

    }
    if (availCheck == false) {
        //hide avail
        let x = 0
    } else {
        let x = 1
     //display avail
    }
    // for (let cell in lineArray) {
    //   lineArray[]
    // }
    //console.log(lineArray)



    // console.log('TAB LIST: ')
    // console.log(tabList)
    // console.log(lineSplit)
    createTable(lineArray,table)

}

function createTable(lineArray,table) {
    for (let row in lineArray) {
        var tr = document.createElement('tr')
        //console.log(lineArray[row])
        for (let cell in lineArray[row]) {
            var td = document.createElement('td')
            //console.log(lineArray[row][cell])
            td.appendChild(document.createTextNode(lineArray[row][cell]))
            tr.appendChild(td)
        }
        table.appendChild(tr)

    }
    console.log(table)
}


