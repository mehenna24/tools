export const DATACT = [];
const datactcsv = [];

async function Getdatactcsv() {
  const response = await fetch("/ASMEB165/CSV/DATACT.csv");
  const data = await response.text();
  datactcsv.push(data);
}

await Getdatactcsv();

datactcsv[0].split("\n").forEach((element) => {
  DATACT.push(element.split(";"));
});

//*********************************************************** */
export const GRADECT = [];
const gradectcsv = [];

async function Getgradectcsv() {
  const response = await fetch("/ASMEB165/CSV/GRADECT.csv");
  const data = await response.text();
  gradectcsv.push(data);
}

await Getgradectcsv();

gradectcsv[0].split("\n").forEach((element) => {
  GRADECT.push(element.split(";"));
});

//************************************************************* */

export const NOTECT = [];
const notectcsv = [];

async function Getnotectcsv() {
  const response = await fetch("/ASMEB165/CSV/NOTECT.csv");
  const data = await response.text();
  notectcsv.push(data);
}

await Getnotectcsv();

notectcsv[0].split("\n").forEach((element) => {
  NOTECT.push(element.split(";"));
});

//************************************************************* */

export const CLASSESC = DATACT[0].slice(3);

//************************************************************* */

export const GROUPSC = [];

for (let i = 1; i < DATACT.length-1; i++) {
  if (DATACT[i][0] != DATACT[i - 1][0]) {
    GROUPSC.push(DATACT[i][0]);
  }
}
/***************************************************************** */
/***************************************************************** */
/***************************************************************** */
/***************************************************************** */


export const DATAFT = [];
const dataftcsv = [];

async function Getdataftcsv() {
  const response = await fetch("/ASMEB165/CSV/DATAFT.csv");
  const data = await response.text();
  dataftcsv.push(data);
}

await Getdataftcsv();

dataftcsv[0].split("\n").forEach((element) => {
  DATAFT.push(element.split(";"));
});

/***************************************************************** */

export const GRADEFT = [];
const gradeftcsv = [];

async function Getgradeftcsv() {
  const response = await fetch("/ASMEB165/CSV/GRADEFT.csv");
  const data = await response.text();
  gradeftcsv.push(data);
}

await Getgradeftcsv();

gradeftcsv[0].split("\n").forEach((element) => {
  GRADEFT.push(element.split(";"));
});

//************************************************************* */

export const NOTEFT = [];
const noteftcsv = [];

async function Getnoteftcsv() {
  const response = await fetch("/ASMEB165/CSV/NOTEFT.csv");
  const data = await response.text();
  noteftcsv.push(data);
}

await Getnoteftcsv();

noteftcsv[0].split("\n").forEach((element) => {
  NOTEFT.push(element.split(";"));
});

//************************************************************* */

export const CLASSESF = DATAFT[0].slice(3);

//************************************************************* */

export const GROUPSF = [];

for (let i = 1; i < DATAFT.length-1; i++) {
  if (DATAFT[i][0] != DATAFT[i - 1][0]) {
    GROUPSF.push(DATAFT[i][0]);
  }
}


//********************************************************************

export var scopetexte ="";

async function Gettext() {
  const response = await fetch("/ASMEB165/csv/scope.txt");
  const text = await response.text();
  scopetexte = text;
 
}

await Gettext();