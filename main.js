const getPartsBtn = document.getElementById('getPartsBtn').addEventListener('click', function(){
    const emailField = document.getElementById('emailField');
    console.log(emailField)
    parseParts(emailField.value);

});

function parseParts(emailText) {
const pattern = /([1-9])(\d{3,4})([a-z])(\d{1,3})/gim;
    const patternReg = /([1-9])(\d{3,4})([a-z])(\d{1,3})/gim;
    const digit = /(\d)/;
    const partMatch = emailText.match(pattern);
    const setMatch = new Set(partMatch);
    const setArray = [...setMatch];
    // console.log('set: ' + setArray);
    createCSV(setArray);
    createLineList(setArray);
  
    //working on checking
    const splitEmail = emailText.split(/[\s,]+/);
    for(let word in splitEmail) {      
      if (patternReg.test(splitEmail[word]) == true) {
        if(digit.test(splitEmail[word-1]) == true)
          {
        console.log("PART: " + splitEmail[word] + " QTY: " +                  splitEmail[word-1]);
          }
        else
        {
          console.log("PART: " + splitEmail[word] + " QTY: UNKNOWN");
      }
    }
    
    }
}

function createCSV (partMatch) {
    var partsCSV = ''
    let lineNum = 0;
        for (let i in partMatch) {
              if (lineNum % 7 == 0) {
          partsCSV =partsCSV + '\n' + '\n';
          }
        partsCSV = partsCSV + partMatch[i] + ',';
            // console.log(partsCSV)
          lineNum +=1;
    }
    const partCSVField = document.getElementById('partCSVField');
    partCSVField.innerHTML = partsCSV;
}

function createLineList (part) {
    const lineListField = document.getElementById('lineListField');
    lineListField.innerHTML= ' '
    let i =1
    for (let j in part) {
  
        lineListField.innerHTML += 'Ln ' + i + " - "  + part[j] + '\n'
        i +=1
    
    }

}