
//*****************************declaration des variables globalr**************************
var temeratureunite = "";
var temeraturevalue = 0.0;
var tablevaleur = [];

//****************************initialisation***********************************************
function onload() {
  temeratureunite = "K";
  temeraturevalue = 0.0;
  templabel.innerHTML = "Temperatute [Kelvin]";
}
//******************creation des devision et des elements html *****************************
const division1t = document.createElement("div");
const title = document.createElement('h3');
title.innerHTML = "Temperature Converter";
division1t.appendChild(title);

const division2t = document.createElement("div");
const templabel = document.createElement("label");
division2t.appendChild(templabel);
division2t.appendChild(document.createElement("br"));
const inputboxt = document.createElement("input");
inputboxt.addEventListener("input", calcule);
division2t.appendChild(inputboxt);


const division3t = document.createElement("div");
const tablet = document.createElement("table");
division3t.appendChild(tablet);


const division0t = document.createElement("div");
//division0t.style.border = '1px solid'
division0t.appendChild(division1t);
division0t.appendChild(division2t);
division0t.appendChild(division3t);
document.body.appendChild(division0t);

//---------------------------------------------------------------------------------------

const division2 = document.createElement("div");
document.body.appendChild(division2);
division2.appendChild(document.createElement("br"));

//*********************creation de la table html ***************************************

function populatetable() {
  tablet.innerHTML = "";

  for (let i = 0; i < tablevaleur.length; i++) {
    const row = document.createElement("tr");
    const cell1 = document.createElement("td");
    const radiot = document.createElement("input");
    radiot.addEventListener("change", select);
    radiot.name = "radiot";
    radiot.type = "radio";
    radiot.id = "id" + i;
    cell1.appendChild(radiot);
    row.appendChild(cell1);

    const cell2 = document.createElement("td");
    cell2.innerHTML = 0.0;
    row.appendChild(cell2);

    const cell3 = document.createElement("td");
    cell3.innerHTML = "(°" + tablevaleur[i][3] + ")";
    row.appendChild(cell3);

    tablet.appendChild(row);
  }

  tablet.rows[0].cells[0].children[0].checked = true;
  tablet.rows[0].cells[1].style.fontWeight = "bold";
  tablet.rows[0].cells[2].style.fontWeight = "bold";
}

//************************creation du tableau de donnees*************************************
async function getdata() {
  const response = await fetch("/CONVERTERS/TEMPERATURECONVERTER/TMPCSV.csv");
  const data = await response.text();
  data.split("\n").forEach((line) => {
    tablevaleur.push(line.split(";"));
  });

  for (let i = 0; i < tablevaleur.length; i++) {
    for (let j = 0; j < tablevaleur[i].length - 2; j++) {
      tablevaleur[i][j] = parseFloat(tablevaleur[i][j]);
    }
  }
}

//**************************event select*****************************************************

function select() {


  for (let i = 0; i < tablevaleur.length; i++) {
    tablet.rows[i].cells[1].style.fontWeight = "";
    tablet.rows[i].cells[2].style.fontWeight = "";

    if (tablet.rows[i].cells[0].children[0].checked) {
      temeratureunite = tablevaleur[i][3];
      templabel.innerHTML = "Temperatute [" + tablevaleur[i][4] + "]";

      tablet.rows[i].style.fontWeight = "bold";


    }
  }

  calcule();
}
//*************************fonction de calcule **********************************************
function calcule() {
  inputboxt.style.color = "";
  //division2.innerHTML = "";
  let j = 0;

  if (inputboxt.value === "" || isNaN(inputboxt.value)) {
    temeraturevalue = 0.0;
    inputboxt.style.color = "red";
  } else {
    temeraturevalue = parseFloat(inputboxt.value);
  }

  for (let i = 0; i < tablevaleur.length; i++) {
    if (tablevaleur[i][3] === temeratureunite) {
      j = i;
    }
  }

  for (let i = 0; i < tablevaleur.length; i++) {
    tablevaleur[i][2] = (
      (tablevaleur[j][0] * temeraturevalue +
        tablevaleur[j][1] -
        tablevaleur[i][1]) /
      tablevaleur[i][0]
    ).toFixed(3);

    tablet.rows[i].cells[1].innerHTML = tablevaleur[i][2];
  }

  if (tablevaleur[0][2] < 0) {
    division2.innerHTML = " (0 °K) Absolute zero is the lowest limit ";
    inputboxt.value = "";
    temeraturevalue = 0.0;

  } else {

    division2.innerHTML = "";

  }
}

//*****************execution*********************************
onload();
await getdata();
populatetable();
calcule();


