//****************************************************************************************
let pressureunite = "";
let pressurevalue = 0;
let tablevalue = [];

//****************************************************************************************
const tablehtmlP = document.createElement('table');
document.body.appendChild(tablehtmlP);

const homeP = document.createElement('a');
homeP.textContent = "(home)";
homeP.href = "/index.html";
const rowP = document.createElement('tr');
const cellP = document.createElement('td');
cellP.appendChild(homeP);
rowP.appendChild(cellP);
tablehtmlP.appendChild(rowP);

const titleP = document.createElement('h3');
titleP.innerHTML = "Pressure Converter";
const rowlP1 = document.createElement('tr');
const cellP1 = document.createElement('td');
cellP1.appendChild(titleP);
rowlP1.appendChild(cellP1);
tablehtmlP.appendChild(rowlP1);


const templabel = document.createElement("label");
const rowlP2 = document.createElement('tr');
const cellP2 = document.createElement('td');
cellP2.appendChild(templabel);
rowlP2.appendChild(cellP2);
tablehtmlP.appendChild(rowlP1);


const inputboxp = document.createElement("input");
inputboxp.addEventListener('input', calcule);
const rowlP3 = document.createElement('tr');
const cellP3 = document.createElement('td');
cellP3.appendChild(inputboxp);
rowlP3.appendChild(cellP3);
tablehtmlP.appendChild(rowlP3);
//---------------------------------------------------------------------------------------

const table = document.createElement('table');
document.body.appendChild(table);

//**************************************************************************************

async function getdata() {
  const response = await fetch("/CONVERTERS/PRESSURECONVERTER/PRCSV.csv");
  const data = await response.text();
  data.split("\n").forEach((line) => {
    tablevalue.push(line.split(";"));
  });

  for (let i = 0; i < tablevalue.length; i++) {
    for (let j = 0; j < tablevalue[i].length - 1; j++) {
      tablevalue[i][j] = parseFloat(tablevalue[i][j]);
    }
  }
}

//*************************************************************************************

function onload() {
  pressureunite = "Bar";
  pressurevalue = 1000000;
  templabel.innerHTML = "Pressure [" + pressureunite + "]";
}

//**************************************************************************************

function populatetable() {

  for (let i = 0; i < tablevalue.length; i++) {

    const row = document.createElement('tr');
    const cell1 = document.createElement('td');
    const radiop = document.createElement('input');
    radiop.type = 'radio';
    radiop.name = 'radiop';
    radiop.addEventListener('change', select);
    cell1.appendChild(radiop);
    row.appendChild(cell1);

    const cell2 = document.createElement('td');
    cell2.innerHTML = tablevalue[i][1];
    row.appendChild(cell2);

    const cell3 = document.createElement('td');
    cell3.innerHTML = "(" + tablevalue[i][2] + ")";
    row.appendChild(cell3);

    table.appendChild(row);

  }

  table.rows[0].cells[0].children[0].checked = true;
  table.rows[0].style.fontWeight = 'bold';

}

//***************************************************************************************

function select() {


  for (let i = 0; i < table.rows.length; i++) {

    table.rows[i].style.fontWeight = "";

    if (table.rows[i].cells[0].children[0].checked) {
      pressureunite = tablevalue[i][2];
      templabel.innerHTML = "Pressure [" + pressureunite + "]";
      table.rows[i].style.fontWeight = "bold";

    }
  }


  calcule()
}

//****************************************************************************************
function calcule() {
  let j = 0;


  inputboxp.style.color = "";

  if (inputboxp.value === "" || isNaN(inputboxp.value) || parseFloat(inputboxp.value) < 0) {
    pressurevalue = 0.0;
    inputboxp.style.color = "red";
  } else {
    pressurevalue = parseFloat(inputboxp.value);
  }

  for (let i = 0; i < tablevalue.length; i++) {
    if (tablevalue[i][2] === pressureunite) {
      j = i;
    }

  }

  for (let i = 0; i < tablevalue.length; i++) {
    tablevalue[i][1] = ((tablevalue[j][0] / tablevalue[i][0]) * pressurevalue).toFixed(3);

    table.rows[i].cells[1].innerHTML = tablevalue[i][1];
  }

}

//********************************************************************************************
onload();
await getdata();
populatetable();
calcule();
