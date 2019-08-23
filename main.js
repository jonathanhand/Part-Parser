const getPartsBtn = document.getElementById('getPartsBtn').addEventListener('click', function(){
    const emailField = document.getElementById('emailField');
    console.log(emailField)
    parseParts(emailField.value);

});

function parseParts(emailText) {
    const pattern = /(\d{4,5})([a-z])(\d{1,3})/gim
    const partMatch = emailText.match(pattern);
    createCSV(partMatch);
    createLineList(partMatch);

    // let splitEmail = emailText.split(" ");

}

function createCSV (partMatch) {
    var partsCSV = ''
        for (let i in partMatch) {
        partsCSV = partsCSV + partMatch[i] + ',';
            console.log(partsCSV)
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