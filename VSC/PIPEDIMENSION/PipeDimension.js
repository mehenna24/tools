//***************************global variables************************************
var BIGdata = new Array();
var CSVdata = new Array();
var Selectoptions = new Array();
var length = 0;
var width = 0;
var SCOPEtext = "";
var npsselected = "";

var CSVpath = "";
var SCOPEpath = "";

//*******************create divivions ********************************************

const division0 = document.createElement("div");
document.body.appendChild(division0);

const division1 = document.createElement("div");
document.body.appendChild(division1);
document.body.appendChild(document.createElement("br"));

const division2 = document.createElement("div");
document.body.appendChild(division2);
document.body.appendChild(document.createElement("br"));

const division3 = document.createElement("div");
document.body.appendChild(division3);
//***********************create title label*************************************** */
const labeltitle = document.createElement("h4");
labeltitle.textContent = "Dimensions of welded and seamless wrought pipe";
division0.appendChild(labeltitle);

//*****************************create radio buttons *******************************
const radiob3619M = document.createElement("input");
radiob3619M.type = "radio";
radiob3619M.name = "radio";
radiob3619M.checked = true;
radiob3619M.addEventListener("change", radiochecked);
const labelb3619M = document.createElement("label");
labelb3619M.textContent = "ASME B36.19M (Stain less Steel Pipe)";
division0.appendChild(radiob3619M);
division0.appendChild(labelb3619M);

division0.appendChild(document.createElement("br"));

const radiob3610 = document.createElement("input");
radiob3610.type = "radio";
radiob3610.name = "radio";
radiob3610.checked = false;
radiob3610.addEventListener("change", radiochecked);
const labelb3610 = document.createElement("label");
labelb3610.textContent = "ASME B36.10 (Welded and Seamless Wrought Steel Pipe)";
division0.appendChild(radiob3610);
division0.appendChild(labelb3610);

//***************************** create select button *********************************
const npsSelect = document.createElement("select");
npsSelect.addEventListener("change", npschange);
division1.appendChild(document.createElement("br"));
division1.appendChild(npsSelect);

const labelNPS = document.createElement("label");
labelNPS.textContent = " NPS";
division1.appendChild(labelNPS);

//*******************create html table **********************************************
const tablehtml = document.createElement("table");
division2.appendChild(tablehtml);

//******************************* function get big table data from csv **************

async function Getdata() {
  const response = await fetch(CSVpath);
  const data = await response.text();
  const data3610 = [];
  data3610.push(data);

  data3610[0].split("\n").forEach((element) => {
    BIGdata.push(element.split(";"));
  });
}

//***********************populate select ********************************************

function populateselect() {
  Selectoptions = [];

  for (var i = 1; i < BIGdata.length; i++) {
    if (BIGdata[i][0] != BIGdata[i - 1][0]) {
      Selectoptions.push(BIGdata[i][0]);
    }
  }

  npsSelect.innerHTML = "";
  for (var i = 0; i < Selectoptions.length; i++) {
    var option = document.createElement("option");
    option.value = Selectoptions[i];
    option.textContent = Selectoptions[i];
    npsSelect.appendChild(option);
  }
}

//*****************************************create NPS csv table**********************

function createcsvtable() {
  CSVdata = [];

  
    if (! Selectoptions.includes(npsselected)) {
      npsselected = Selectoptions[0];
    }
  
  CSVdata.push(BIGdata[0]);

  for (let i = 0; i < BIGdata.length; i++) {
    if (npsselected == BIGdata[i][0]) {
      CSVdata.push(BIGdata[i]);
    }
  }

  length = CSVdata.length;
  width = CSVdata[0].length;
}

//*************************************populate html table **************************
function createhtmltable() {
  tablehtml.innerHTML = "";

  for (let j = 0; j < length; j++) {
    const row = document.createElement("tr");

    if (j != 0) {
      row.addEventListener("mouseover", () => {
        row.style.backgroundColor = "lightgray";
      });
      row.addEventListener("mouseout", () => {
        row.style.backgroundColor = "";
      });
    }

    for (let i = 0; i < width; i++) {
      const cell = document.createElement("td");

      cell.style.border = "1px solid black";

      if (j != 0) {
        cell.addEventListener("mouseover", () => {
          cell.style.color = "red";
        });
        cell.addEventListener("mouseout", () => {
          cell.style.color = "";
        });
      }

      row.appendChild(cell);
    }

    tablehtml.appendChild(row);
  }

  for (let j = 0; j < length; j++) {
    for (let i = 0; i < width; i++) {
      tablehtml.rows[j].cells[i].textContent = CSVdata[j][i];
    }
  }

  for (let j = 1; j < length; j++) {
    tablehtml.rows[j].cells[0].textContent =
      tablehtml.rows[j].cells[0].textContent + '"';
  }

  tablehtml.rows[0].style.fontWeight = "bold";
  tablehtml.style.borderCollapse = "collapse";
}
//****************************function to get scope and option text ****************
async function Gettext() {
  const response = await fetch(SCOPEpath);
  const text = await response.text();
  SCOPEtext = text;
  division3.innerHTML = "";
  division3.innerHTML = SCOPEtext;
}

//****************************eventhandler on select change *************************

function npschange() {
  npsselected = npsSelect.value;

  createcsvtable();
  createhtmltable();
}

//****************************eventhandler on radio change **************************

async function radiochecked() {
  if (radiob3619M.checked) {
    CSVpath = "/PipeDimension/B3619M.csv";
    SCOPEpath = "/PipeDimension/B3619M.txt";
  }
  if (radiob3610.checked) {
    CSVpath = "/PipeDimension/B3610.csv";
    SCOPEpath = "/PipeDimension/B3610.txt";
  }

  BIGdata = [];
  CSVdata = [];
  length = 0;
  width = 0;
  SCOPEtext = "";

  tablehtml.innerHTML = "";
  npsSelect.innerHTML = "";
  division3.innerHTML = "";

  await Getdata();
  populateselect();
  createcsvtable();
  createhtmltable();
  await Gettext();


  for (var i = 0; i < npsSelect.options.length; i++) {
    if (npsSelect.options[i].value === npsselected) {
        npsSelect.selectedIndex = i;
        break; 
    }
}

  
}

//****************************on load************************************************

async function onload() {
  BIGdata = [];
  CSVdata = [];
  length = 0;
  width = 0;
  SCOPEtext = "";
  npsselected;

  tablehtml.innerHTML = "";
  npsSelect.innerHTML = "";
  division3.innerHTML = "";

  CSVpath = "/PipeDimension/B3619M.csv";
  SCOPEpath = "/PipeDimension/B3619M.txt";

  await Getdata();
  npsselected = BIGdata[1][0];
  populateselect();
  createcsvtable();
  createhtmltable();
  await Gettext();
}

await onload();
