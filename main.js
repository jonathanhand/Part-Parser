const getPartsBtn = document.getElementById('getPartsBtn').addEventListener('click', function(){
    const emailField = document.getElementById('emailField');
    parseParts(emailField.innerHTML);

});

function parseParts(emailText) {
    const pattern = /(\d{3,5})([a-z])(\d{1,3})/gim
    const partMatch = emailText.match(pattern);
    createCSV(partMatch);

    // let splitEmail = emailText.split(" ");

}

function createCSV (partMatch) {
    var partsCSV = ''
        for (let i in partMatch) {
        partsCSV = partsCSV + partMatch[i] + ',';

    }
    const partCSVField = document.getElementById('partCSVField');
    partCSVField.innerHTML = partsCSV;
}