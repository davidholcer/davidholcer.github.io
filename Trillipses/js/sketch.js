/**
 * @author David Holcer (@vadth)
 * @date Sep. 2021
 * @description "Trillipses" is a generative interactive work in which randomly positioned triangles and nearby ellipses are added to the screen until they begin to rotate and increase in size.
 * Hic et nunc data code source: Raphaël de Courville (@sableRaph)
*/

console.log(" __    __ ______   _____    ______  __  __\n\
/\\ \\  / //\\  __ \\ /\\  __-. /\\__  _\\/\\ \\_\\ \\\n\
\\ \\ \\/ / \\ \\  __ \\\\ \\ \\/\\ \\\\/_/\\ \\/\\ \\  __ \\\n\
 \\ \\__/   \\ \\_\\ \\_\\\\ \\____-   \\ \\_\\ \\ \\_\\ \\_\\\n\
  \\/_/     \\/_/\\/_/ \\/____/    \\/_/  \\/_/\\/_/\n\n")

console.log("Trillipses by David Holcer\nMinted Sept. 3,2021\n------------------------------\n\nControls:\n\
\'b\' to toggle black or white background\n\
\'c\' for new color scheme\n\
\'d\' to toggle darkmode (changing background over time)\n\
\'i\' to invert objects' color\n\
\'l\' to toggle object' lines\n\
\'n\' or SPACE for new set+color of triangles and ellipses\n\
\'m\' for new background color\n\
\'o\' to toggle opacity\n\
\'p\' to pause\n\
\'t\' to toggle trippy mode\n\
\'x\' to randomize colors\n\
\'-\' to decrease trip amount (when on)\n\
\'=\' to increase trip amount (when on)\n\
\',\' to lower opacity (when on)\n\
\'.\' to increase opacity (when on)\n\
Mouse scroll to increase/decrease objects' size\n")

// **************************
// *        VARIABLES       *
// **************************
let triangles=[];
let borderDist=20;
let maxTotal=500;
let limit;
let cTotal;
let time,incTime;
let moving;
let bgColor;
let paused;
let colorScheme;
let cs;
let opacityAmt;
let opacity;
let lines,iBg,iColors;
let spdAmt;
let bDay;
let btime,bgTime;
let bgChoice,bgCycleTime;
let playedCount;
let darkMode;
let binary;
let trippy,tripAmt;
let sLength,maxLength;
let resizeLimit;

// **************************
// *    HIC ET NUNC DATA    *
// **************************
const DEFAULT_ADDRESS = "tz1hjsJLB4iX74cJ8zsemWY7K2mobWBzmee3";
const DEFAULTSEED = getHash(DEFAULT_ADDRESS);
let viewerSeed = DEFAULTSEED;

const creator = new URLSearchParams(window.location.search).get("creator");
const viewer = new URLSearchParams(window.location.search).get("viewer");
// const viewer=DEFAULT_ADDRESS;
const objkt = new URLSearchParams(window.location.search).get("objkt");
// console.log("NFT created by", creator); // null if local
console.log("NFT viewed by:", viewer); // null if local
console.log("OBJKT ID:", objkt); // null if local

// const DUMMY = "tz1hjsJLB4iX74cJ8zsemWY7K2mobWBzmee3"; // simulate a synced viewer (user a different address to try another viewer)
// const UNSYNCED = "false"; // simulate an unsynced user
// const PREVIEW_OBJKT = "false"; // simulate the preview page
// const DUMMY_OBJKT = 67954; // simulate an OBJKT ID

let viewerData = viewer;
let creatorData = creator;
let objktData = objkt;
let viewerWasFound = viewerData && !viewerData.includes("false");
let useRandomSeed = false;

// Set this to true when minting
p5.disableFriendlyErrors = true;

// The title of your piece goes here (not visible on hicetnunc)
document.title = "Trillipses";

let description = "'Trillipses' is a generative interactive work in which randomly positioned triangles and nearby ellipses are added to the screen until they begin to rotate and increase in size."

function setup() {
  createCanvas(windowWidth, windowHeight);
  console.log('Screen Dimensions: '+width+'px x '+height+'px');
  sLength=min(windowWidth,windowHeight);
  maxLength=max(windowWidth,windowHeight);

  initSeeds();
  describe(description);

  colorMode(HSB);
  cTotal=1;
  time=0;
  incTime=50;
  moving=false;
  paused=false;
  lines=true;
  binary=false;
  limit=random(20,100);
  iColors=false;

  bgCycleTime=int(random(10,20))*60;

  opacity=true;
  opacityAmt=0.75;
  spdAmt=0.005;

  trippy=false;
  tripAmt=0.1;

  resizeLimit=750;

  colorScheme=[[color('#333333'), color('#666A86'), color('#FF6700'), color('#E8DDB5')],[color('#238DA5'),color('#599D6B'), color('#FDBC2E'),color('#C84A4D'), color('#2A303E') ],[color('#FA8334'),color('#1E3888'),color('#191308'),color('#C45AB3'),color('#89937C')],[color('#0081A7'),color('#00AFB9'),color('#291F1E'),color('#FED9B7'),color('#F07167')],[color('#E07A5F'),color('#3D405B'),color('#81B29A'),color('#F2CC8F')],[color('#5F0F40'),color('#9A031E'),color('#FB8B24'),color('#E36414'),color('#0F4C5C')],[color('#c9cba3'),color('#ffe1a8'),color('#e26d5c'),color('#723d46'),color('#472d30')],[color('#dd6e42'),color('#e8dab2'),color('#4f6d7a'),color('#c0d6df'),color('#eaeaea')],[color('#001219'), color('#005F73'), color('#0A9396'), color('#94D2BD'), color('#E9D8A6'), color('#EE9B00'), color('#CA6702'), color('#BB3E03'),color('#AE2012'),color('#9B2226')],[color('#ee4a1b'), color('#61d5d4'), color('#3e73a2'), color('#bebc9e'), color('#060b0a')],[color("#e3170a"),color("#2a2b2a"),color("#fdb833"),color("#7d8491"),color("#c04cfd")]];
  // if (opacity) toggleOpacity();
  cs=int(random(0,colorScheme.length));

  frameRate(60);
  populatePoints();

  btime,playedCount=0;
  // bgTime=300000;
  var now = new Date();
  //night
  if (now.getHours()>=18 || now.getHours()<6){
    bDay=0;
    iBg=true;
    darkMode=true;
  }
  //day
  else if (now.getHours()>=6 && now.getHours()<18){
    bDay=1;
    darkMode=false;
    iBg=false;
  }
  bgColor=updateBgColor();
}

function draw() {
  background(bgColor);

  if (millis()-time>=incTime && cTotal<limit && !paused){
  	cTotal+=1;
  	time=millis();
  }
  else if (cTotal>=limit){
  	moving=true;
  }
  
  for (let i = 0; i < cTotal; i++){
  var tri=triangles[i];
	tri.drawTriangle();
	if (moving && !paused){
		tri.move()
		tri.rotat();
		tri.expand();
	}
  }

  if (keyIsDown(188) && opacity){
    adjusT(-spdAmt,true);
  }
  else if (keyIsDown(190) && opacity){
    adjusT(spdAmt,true);
  }
  if (keyIsDown(189) && trippy){
    adjusT(-spdAmt,false);
  }
  if (keyIsDown(187) && trippy){
    adjusT(spdAmt,false);
  }

  let bgTime=1-(abs((bgCycleTime/2)-(playedCount%(bgCycleTime)) ) /(bgCycleTime/2));
  if (!paused && !binary){
    changeBg(bgTime,bgChoice);
    playedCount+=1;
  }
  if (trippy) bgColor.setAlpha(tripAmt);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    sLength=min(windowWidth,windowHeight);
    maxLength=max(windowWidth,windowHeight);
    for (let i=0; i<triangles.length; i++) {
      triangles[i].P.x=triangles[i].P.x/triangles[i].oCor.x*windowWidth;
      triangles[i].P.y=triangles[i].P.y/triangles[i].oCor.y*windowHeight;
      triangles[i].oCor.set(windowWidth,windowHeight);
    }
}

function invertBgP(){
  if (iBg){
    bgColor=color('#F7EDE9');
    binary=true;
    iBg=false;
  }
  else {
    bgColor=color('#0d0b0c')
    binary=true;
    iBg=true;
  }
}

function updateBgColor(){
  let colScheme=cs;
  let chCs=colorScheme[colScheme];
  bgChoice=random(chCs);
  bgChoice.setAlpha(1)
  return bgChoice;
}

function changeBg(time,bgChoice){
  var bgColorMinDark=color(hue(bgChoice),saturation(bgChoice),brightness(bgChoice)/1.1);
  var bgColorMinLight=color(hue(bgChoice),saturation(bgChoice),brightness(bgChoice)*1.1);
  var bgColorMaxDark=color(hue(bgChoice),saturation(bgChoice),brightness(bgChoice)/5);
  var bgColorMaxLight=color(hue(bgChoice),saturation(bgChoice),brightness(bgChoice)*4);
  if (darkMode) bgColor=lerpColor(bgColorMinDark, bgColorMaxDark, time);
  else bgColor=lerpColor(bgColorMinLight, bgColorMaxLight, time);
}

function keyTyped() {
	if (key == ' '|| key=='n') {
      triangles=[];
      populatePoints();
      cTotal=1;
      moving=false;
      newColorScheme();
  }
  if(key=='b') invertBgP();
  if (key=='d') {
    darkMode=(darkMode==true) ? false: true;
    binary=false;
  }
  if (key == 'c') newColorScheme();
  if (key == 'i') invertColors();
  if (key == 'l') lines=(lines==true) ? false: true;
  if (key == 'm') {
    //shallow copy doesn't work!
    binary=false;
    let prevColor=color(hue(bgChoice),saturation(bgChoice),brightness(bgChoice));;
    let tempBgColor=updateBgColor()
    while (tempBgColor.toString()==prevColor.toString()){
      tempBgColor=updateBgColor()
    }
    bgColor=color(hue(tempBgColor),saturation(tempBgColor),brightness(tempBgColor));
    playedCount=0;
  }
  if (key=='o')opacity=(opacity==true)?false:true;
 	if (key == 'p')paused=(paused==true)?false:true;
  if (key == 't') {
    if (trippy) bgColor.setAlpha(1);
    trippy=(trippy==true)?false:true;
  }
  if (key == 'x') randomizeColor();
}

function adjusT(inputAmt,toggle){
  //if true do opacity, if false do trippy
  if (toggle){
    if (opacityAmt+inputAmt<=0.95 && opacityAmt+inputAmt>=0.1) opacityAmt+=inputAmt;  
  }
  else{
    if (tripAmt+inputAmt<=0.5 && tripAmt+inputAmt>=0.005) tripAmt+=inputAmt;  
  }
}

function newColorScheme(){
  colorScheme=[[color('#333333'), color('#666A86'), color('#FF6700'), color('#E8DDB5')],[color('#238DA5'),color('#599D6B'), color('#FDBC2E'),color('#C84A4D'), color('#2A303E') ],[color('#FA8334'),color('#1E3888'),color('#191308'),color('#C45AB3'),color('#89937C')],[color('#0081A7'),color('#00AFB9'),color('#291F1E'),color('#FED9B7'),color('#F07167')],[color('#E07A5F'),color('#3D405B'),color('#81B29A'),color('#F2CC8F')],[color('#5F0F40'),color('#9A031E'),color('#FB8B24'),color('#E36414'),color('#0F4C5C')],[color('#c9cba3'),color('#ffe1a8'),color('#e26d5c'),color('#723d46'),color('#472d30')],[color('#dd6e42'),color('#e8dab2'),color('#4f6d7a'),color('#c0d6df'),color('#eaeaea')],[color('#001219'), color('#005F73'), color('#0A9396'), color('#94D2BD'), color('#E9D8A6'), color('#EE9B00'), color('#CA6702'), color('#BB3E03'),color('#AE2012'),color('#9B2226')],[color('#ee4a1b'), color('#61d5d4'), color('#3e73a2'), color('#bebc9e'), color('#060b0a')],[color("#e3170a"),color("#2a2b2a"),color("#fdb833"),color("#7d8491"),color("#c04cfd")]];
  cs=int(random(0,colorScheme.length));
    for (let k = 0; k < triangles.length; k++) {
      var T1=triangles[k];
      T1.c=int(random(0,colorScheme[cs].length));
  }
  updateBgColor();
}

function populatePoints(){
  triangles=[];
  for (let i=0; i<maxTotal; i++) {
    let P=createVector(random(borderDist, width-borderDist), random(borderDist, height-borderDist));
    
    let tlength;
    if (sLength<resizeLimit){
      tlength=random(20,400)*sLength/resizeLimit;
    }
    else{
      tlength=random(20,400);
    }

    triangles.push(new Triangle(P,tlength));
  }

}

function mouseWheel(event) {
  var e = event.delta;
  for (let i=0; i<triangles.length; i++) {
    triangles[i].tlength-=e/10;
    triangles[i].height-=e/10;
    triangles[i].posR[2]-=e/20;
    triangles[i].posR[3]-=e/20;
  }
}

function randomizeColor(){
  for (let i=0; i<colorScheme.length;i++){
    for (let j=0;j<colorScheme[i].length;j++){
      for (let k=0; k<3; k++){
        colorScheme[i][j]=color(int(random(0,360)),int(random(0,100)),int(random(0,100)) );
      }
    }
  }
}

function invertColors(){
  // iColors=(iColors==true)?false:true;
  for (let i=0;i<colorScheme.length;i++){
    for (let j=0;j<colorScheme[i].length;j++){
      for (let k=0; k<3; k++){
        colorScheme[i][j].setRed(255-red(colorScheme[i][j]));
        colorScheme[i][j].setGreen(255-green(colorScheme[i][j]));
        colorScheme[i][j].setBlue(255-blue(colorScheme[i][j]));
      }
    }
  }
}

class Triangle {
  constructor(P,tlength) {
    this.P=P;
    //this.speed=random(0.5, 1);
    this.tlength=tlength;
    this.rot=random(0,2*PI);
    if (sLength<resizeLimit){
      this.height=random(20,300)*sLength/resizeLimit;
    }
    else{
      this.height=random(20,300);  
    }
    this.fill=[random(256),random(256),random(256),random(50,250)]
    this.V=createVector(random(-2,2),random(-2,2));
    this.rotSpeed=random(-0.01,0.01);
    this.c=int(random(0, colorScheme[cs].length));
    if (sLength<resizeLimit){
      this.posR=[random(2,100),random(2,100),random(42,100),random(20,60)].map(x => x * (sLength/resizeLimit));
    }
    else{
      this.posR=[random(2,100),random(2,100),random(42,100),random(20,60)];
    }
    this.dd=[random(),random(),random(),random()]
    this.oCor=createVector(width,height);
  }

  drawTriangle(){
  	push();
  	translate(this.P.x,this.P.y);
  	rotate(this.rot);
    var ccolor=colorScheme[cs][this.c]
    if (opacity) ccolor.setAlpha(opacityAmt);
    else ccolor.setAlpha(1);
    fill(ccolor);
    if (!lines) noStroke();
    else {stroke('black');strokeWeight(1);}
  	triangle(0,0,this.tlength,0,this.tlength/2,this.height);  
    ellipse(this.posR[0],this.posR[1],this.posR[2],this.posR[3]);
  	pop();
  }

  move(){
  	this.P.add(this.V);
  }

  rotat(){
  	this.rot+=this.rotSpeed;
    for (var i = 0; i < this.posR.length; i++) {
      this.posR[i]+=this.dd[i];
    }
  }

  expand(){
  	this.height+=0.1;
  }
}

// **************************
// *         UTILS          *
// **************************
//
function getHash(string) {
  if (string) {
    let nameHash = string.split("").reduce((a, b) => {
      a = (a << 5) - a + b.charCodeAt(0);
      return a & a;
    }, 0);
    return Math.abs(nameHash);
  } else {
    return null;
  }
}

function initSeeds() {
  if (viewerWasFound) {
    viewerSeed = getHash(viewerData);
    console.log(`Seed: ${viewerSeed}`);
  } else if (useRandomSeed) {
    viewerSeed = Math.floor(Math.random() * 999999999);
    console.log(`No viewer found; using random seed: ${viewerSeed}`);
  }
  else {
    console.log(`No viewer found; using default seed: ${viewerSeed}`);
  }
  // Use the same random and noise values every time for a given (synced) viewer
  noiseSeed(viewerSeed);
  randomSeed(viewerSeed);
}