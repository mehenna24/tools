import {
  DATACT,
  GRADECT,
  NOTECT,
  CLASSESC,
  GROUPSC,
  DATAFT,
  GRADEFT,
  NOTEFT,
  CLASSESF,
  GROUPSF,
  scopetexte,
} from "./tableCcsv.js";

//***********************************************************************
var DATAT = DATACT;
var GRADET = GRADECT;
var NOTET = NOTECT;
var CLASSES = CLASSESC;
var GROUPS = GROUPSC;
var unitep = "Bar";
var unitet = "°C";

//***********************************************************************

var groupvalue = "";
var processvalue = "";
var gradevalue = "";
var compositionvalue = "";
var notevalue = "";
var notedialay = "";
var classvalue = "";
var temperaturevalue = "";
var temperaturevalue1 = "";
var temperatureinter = "";
var pressurevalue = "";
var pressurevalue1 = "";
var pressureinter = "";

//**************************************************************************


const home = document.createElement("a");
home.href = "/index.html";
home.textContent = "home";

const title = document.createElement("h4");
title.textContent = "ASME B16.5";

const radioc = document.createElement("input");
radioc.name = "radio";
radioc.type = "radio";
radioc.addEventListener("click", systemunitechange);
radioc.addEventListener("click", loadbody);
radioc.checked = true;


const radiof = document.createElement("input");
radiof.name = "radio";
radiof.type = "radio";
radiof.addEventListener("click", systemunitechange);
radiof.addEventListener("click", loadbody);

const gradeCB = document.createElement('select');
gradeCB.addEventListener("change", gradechange);

const classCB = document.createElement('select');
classCB.addEventListener("change", classechange);

const tempCB = document.createElement('select');
tempCB.addEventListener("change", temperaturechange);

const output = document.createElement('label');
output.innerHTML = "";

const slide = document.createElement('input');
slide.addEventListener("input", interpolation);
slide.type = "range";
slide.min = 0;
slide.max = 100;


//------------------------------------------------------------------------

const division0b = document.createElement("div");
document.body.appendChild(division0b);

const tablehtml = document.createElement('table');
for (let i = 0; i < 16; i++) {
  const row = document.createElement('tr');
  for (let j = 0; j < 2; j++) {
    const cell = document.createElement('td');
    row.appendChild(cell);
  }
  tablehtml.appendChild(row);
}

tablehtml.rows[0].cells[1].innerHTML = '';
tablehtml.rows[1].cells[1].innerHTML = '';
tablehtml.rows[2].cells[1].appendChild(radioc);
tablehtml.rows[3].cells[1].appendChild(radiof);
tablehtml.rows[4].cells[1].appendChild(gradeCB);
tablehtml.rows[5].cells[1].appendChild(classCB);
tablehtml.rows[6].cells[1].appendChild(tempCB);
tablehtml.rows[7].cells[1].appendChild(slide);

tablehtml.rows[0].cells[0].appendChild(home);
tablehtml.rows[1].cells[0].appendChild(title);
tablehtml.rows[2].cells[0].innerHTML = 'Bar/°C';
tablehtml.rows[3].cells[0].innerHTML = 'Psi/°F';
tablehtml.rows[4].cells[0].innerHTML = 'Grade';
tablehtml.rows[5].cells[0].innerHTML = 'Class';
tablehtml.rows[6].cells[0].innerHTML = 'Temperature';
tablehtml.rows[7].cells[0].innerHTML = output.innerHTML;
tablehtml.rows[8].cells[0].innerHTML = 'Grade';
tablehtml.rows[9].cells[0].innerHTML = 'Groupe';
tablehtml.rows[10].cells[0].innerHTML = 'Process';
tablehtml.rows[11].cells[0].innerHTML = 'Composition';
tablehtml.rows[12].cells[0].innerHTML = 'Temperature';
tablehtml.rows[13].cells[0].innerHTML = 'Pressure';
tablehtml.rows[14].cells[0].innerHTML = 'Note';
tablehtml.rows[15].cells[0].innerHTML = 'Scope';

division0b.appendChild(tablehtml);

//************************************************************************

loadbody();

//****************************LOAD DATA***********************************

function loadbody() {
 
  classCB.innerHTML = null;

  for (let i = 0; i < CLASSES.length; i++) {
    var op = document.createElement('option');
    op.value = CLASSES[i];
    op.text = CLASSES[i];
    classCB.appendChild(op);

  }

  gradeCB.innerHTML = null;
  for (let i = 0; i < GRADET.length; i++) {
    var op = document.createElement('option');
    op.value = GRADET[i][0];
    op.text = GRADET[i][0];
    gradeCB.appendChild(op);

  }

  gradevalue = gradeCB.value;
  classvalue = classCB.value;
  updatetemp();
  temperaturevalue = tempCB.value;
  updatepressure();
  updatenote();
  updateinfos();
  interpolation();
}

//*****************************LISTENERS**********************************
function systemunitechange() {
  if (radioc.checked) {
    DATAT = DATACT;
    GRADET = GRADECT;
    NOTET = NOTECT;
    CLASSES = CLASSESC;
    GROUPS = GROUPSC;
    unitep = "Bar";
    unitet = "°C";
  }
  if (radiof.checked) {
    DATAT = DATAFT;
    GRADET = GRADEFT;
    NOTET = NOTEFT;
    CLASSES = CLASSESF;
    GROUPS = GROUPSF;
    unitep = "Psi";
    unitet = "°F";
  }
}

function gradechange() {
  gradevalue = gradeCB.value;

  for (let i = 0; i < GRADET.length; i++) {
    if (gradevalue == GRADET[i][0]) {
      groupvalue = GRADET[i][3];
      processvalue = GRADET[i][1];
      compositionvalue = GRADET[i][2];
      notevalue = GRADET[i][4];
    }
  }
  updatetemp();
  updatepressure();
  updatenote();
  updateinfos();
  interpolation();

}

function classechange() {
  classvalue = classCB.value;
  updatepressure();
  updateinfos();
  interpolation();


}

function temperaturechange() {
  temperaturevalue = tempCB.value;
  updatepressure();
  updateinfos();
  interpolation();

}

//******************UPDATES **********************************************

function updatetemp() {
  tempCB.innerHTML = null;

  for (let i = 0; i < GRADET.length; i++) {
    if (gradevalue == GRADET[i][0]) {
      groupvalue = GRADET[i][3];
      processvalue = GRADET[i][1];
      compositionvalue = GRADET[i][2];
      notevalue = GRADET[i][4];
    }
  }

  for (let i = 0; i < DATAT.length; i++) {
    if (groupvalue == DATAT[i][0]) {
      var op = document.createElement("option");
      op.value = DATAT[i][2];
      op.textContent = DATAT[i][2];
      tempCB.appendChild(op);
    }
  }
}
function updatepressure() {
  for (let i = 0; i < GRADET.length; i++) {
    if (gradevalue == GRADET[i][0]) {
      groupvalue = GRADET[i][3];
      processvalue = GRADET[i][1];
      compositionvalue = GRADET[i][2];
      notevalue = GRADET[i][4];
    }
  }

  for (let i = 0; i < DATAT.length; i++) {
    if (temperaturevalue == DATAT[i][2] && groupvalue == DATAT[i][0]) {
      for (let j = 3; j < 10; j++) {
        if (classvalue == DATAT[0][j]) {
          pressurevalue = DATAT[i][j];
          if (DATAT[i][0] == DATAT[i + 1][0]) {
            pressurevalue1 = DATAT[i + 1][j];
            temperaturevalue1 = DATAT[i + 1][2];
          }
        }
      }
    }
  }
}

function updatenote() {
  notedialay = "";

  for (let i = 0; i < NOTET.length; i++) {
    if (groupvalue == NOTET[i][0]) {
      if (
        (notevalue.includes("(1)") && NOTET[i][2].includes("(1)")) ||
        (notevalue.includes("(2)") && NOTET[i][2].includes("(2)")) ||
        (notevalue.includes("(3)") && NOTET[i][2].includes("(3)")) ||
        (notevalue.includes("(4)") && NOTET[i][2].includes("(4)")) ||
        (notevalue.includes("(5)") && NOTET[i][2].includes("(5)")) ||
        (notevalue.includes("(6)") && NOTET[i][2].includes("(6)")) ||
        (notevalue.includes("(7)") && NOTET[i][2].includes("(7)")) ||
        (notevalue.includes("(8)") && NOTET[i][2].includes("(8)"))
      ) {
        notedialay = notedialay + NOTET[i][2];
      }
    }
  }
}

function interpolation() {

  if (temperaturevalue === "-29 to 38") { temperaturevalue = "38"; }
  if (temperaturevalue === "-20 TO 100") { temperaturevalue = "100"; }

  let p2 = parseFloat(pressurevalue1);
  let p1 = parseFloat(pressurevalue);
  let t2 = parseFloat(temperaturevalue1);
  let t1 = parseFloat(temperaturevalue);
  let slidevalue = parseFloat(slide.value);
  temperatureinter = (((t2 - t1) * slidevalue) / 100 + t1).toFixed(2);
  pressureinter = (((p2 - p1) / (t2 - t1)) * (temperatureinter - t1) + p1).toFixed(2);

  output.innerHTML = temperatureinter + " " + unitet + " => " + pressureinter + " " + unitep;
  tablehtml.rows[7].cells[0].innerHTML = output.innerHTML;

};

//*********************************** infos display*************************

function updateinfos() {

  tablehtml.rows[8].cells[1].innerHTML = gradevalue;
  tablehtml.rows[9].cells[1].innerHTML = groupvalue;
  tablehtml.rows[10].cells[1].innerHTML = processvalue;
  tablehtml.rows[11].cells[1].innerHTML = compositionvalue;
  tablehtml.rows[12].cells[1].innerHTML = temperaturevalue + "  " + unitet;
  tablehtml.rows[13].cells[1].innerHTML = pressurevalue + "  " + unitep;
  tablehtml.rows[14].cells[1].innerHTML = notedialay;
  tablehtml.rows[15].cells[1].innerHTML = scopetexte;

}

