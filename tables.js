var table = document.getElementById('tableOutput')

const makeTableBtn = document.getElementById('makeTableBtn').addEventListener('click', function () {
    const revField = document.getElementById('revField');
    const tableField = document.getElementById('tableField');
    const lineCheck = document.getElementById('lineCheck');
    const descriptionCheck = document.getElementById('descriptionCheck');
    const qtyCheck = document.getElementById('qtyCheck');
    const availCheck = document.getElementById('availCheck');


    parseRev(revField.value);
});

function parseRev (revVal) {
    let revSpace = revVal;
    const tabPattern = /\t/;
    const linePattern = /\n/;
    let lineSplit = revSpace.split(linePattern);
    let spaceList = revSpace.split(/\n/g);
  let lineArray = []
  let orderedArray = []
  console.log('split!')
  for (let line=0; line < lineSplit.length-2; line++) {
     
    let split = lineSplit[line].split(tabPattern)
    lineArray[line] = split.slice();
    console.log(split)
    lineArray[line][0] = split.slice(0,1)
    console.log(lineArray[line][0])
    lineArray[line][1] = split.slice(3,4)
    lineArray[line][2] = split.slice(4,5)
    console.log(split[1])
    if (split[6][0] != '$') {
      split[6] = '$' + split[6]
    }
    lineArray[line][3] = split.slice(6,7)
    lineArray[line][4] = split.slice(2,3)
    lineArray[line][5] = split.slice(1,2)
    lineArray[line][6] = split.slice(6,7)
    lineArray[line][7] = split.slice(7,8)
    lineArray[line][8] = split.slice(8,9)

    
  }
  // for (let cell in lineArray) {
  //   lineArray[]
  // }
  //console.log(lineArray)
    
    
    
    // console.log('TAB LIST: ')
    // console.log(tabList)
    // console.log(lineSplit)
    createTable(lineArray)
    
}

function createTable(lineArray) {
  for (let row in lineArray) {
    var tr = document.createElement('tr')
    //console.log(lineArray[row])
  for (let cell in lineArray[row]) {
    var td= document.createElement('td')
    //console.log(lineArray[row][cell])
    td.appendChild(document.createTextNode(lineArray[row][cell]))
    tr.appendChild(td)
        }
   table.appendChild(tr)

    }
  console.log(table)
}
