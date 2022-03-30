/**
 * @author David Holcer (@vadth)
 * @date Aug. 2021
 * @description "Noisy Dots" is a generative interactive work in which colorful dots appear in square grids evenly spaced out within a larger square grid. A changing noise value determines the number of dots in each row and column, and their color.
 * Hic et nunc data code source: Raphaël de Courville (@sableRaph)
*/

console.log(" __    __ ______   _____    ______  __  __\n\
/\\ \\  / //\\  __ \\ /\\  __-. /\\__  _\\/\\ \\_\\ \\\n\
\\ \\ \\/ / \\ \\  __ \\\\ \\ \\/\\ \\\\/_/\\ \\/\\ \\  __ \\\n\
 \\ \\__/   \\ \\_\\ \\_\\\\ \\____-   \\ \\_\\ \\ \\_\\ \\_\\\n\
  \\/_/     \\/_/\\/_/ \\/____/    \\/_/  \\/_/\\/_/\n\n")

 console.log("Noisy Dots by David Holcer\nMinted Aug 29,2021\n------------------------------\n\nControls:\n \
\'b\' to toggle dark/light mode\n \
\'i\' to invert dots' color\n \
\'n\' or SPACE to randomize points\n \
\'p\' to pause\n \
\'r\' to reset all settings and points to initial states\n \
\';\' to switch between circle and square dots\n \
\'-\' to decrease noise speed\n \
\'=\' to increase noise speed\n \
\'1\' - \'9\' + \'0\' to set max number of points per row/column of small square (0=10)\n \
Mouse scroll/UP ARROW increase number of squares per page\n \
Mouse scroll/DOWN ARROW decrese number of squares per page")


// **************************
// *        VARIABLES       *
// **************************
let numPoints,numPointsF;
let t,tAmt,tMin,tMax,spdAmt;
let col;
let maxNum,maxGrids;
let paused;
let c;
let sLength,xWidth;
let iBg,invertPoints;
let probs=[];
// let rtime,redTime;
let debug;
let reset=[5,6,30,0.00125];
let btime,bgTime;
let bCircle;
let bDay;

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
document.title = "Noisy Dots";

// Describe what your piece looks like to screen reader users
let description = "Colorful dots appear in square grids evenly spaced out within a larger square grid. A changing noise value determines the number of dots in each row and column, and their color.";


function setup() {
  createCanvas(windowWidth, windowHeight);
  // createCanvas(1024, 1024);
  sLength=min(windowWidth,windowHeight);
  xWidth=constrain((windowWidth-sLength)/2,0,(windowWidth-sLength));
  yWidth=constrain((windowHeight-sLength)/2,0,(windowHeight-sLength));
  colorMode(HSB);
  pixelDensity(4);
  smooth();

  console.log('Screen Dimensions: '+width+'px x '+height+'px');

  numPoints=5;
  //float of numpoints
  numPointsF=5;
  maxNum=6;
  maxGrids=30;
  frameRate(60);
  t=0;

  paused=false;
  debug=true;

  iBg,invertPoints=false;

  redTime=500;
  rtime=-1000;

  tMin=0.00025;
  tMax=0.025;
  tAmt=0.00125;
  spdAmt=0.0000625;

  bCircle=true;

  var now = new Date();
  if (now.getHours()>=18 || now.getHours()<6){
    bDay=0;
    bgColor=color(invertColor('#F2F4F3'))
  }
  else if (now.getHours()>=6 && now.getHours()<18){
    bDay=1;
    bgColor=color('#C9DAD6');
  }
  checkTime(now);

  btime=0;
  //invert bg within 5 min of changing from day to night unless on 'correct' setting
  bgTime=300000;

  initSeeds();
  describe(description);
  // createLoop({duration:3, gif:true});
}

function draw() {
  background(bgColor);
  
for (var y = 0; y < numPoints; y++) {
  for (var x = 0; x < numPoints; x++) {
    
    strokeWeight(2);
    rectMode(CORNER);
    
    c=noise(x,y,t);
    let cc=noise(x,y,2*t);
    let l,h,prob,rMap;

    prob=probs[(y)*numPoints+x]

    h=map(cc,0,0.75,0,360);  
    if (invertPoints){
      h=360-h;
    }

    col=color(h,100,70);
    fill(col);
    stroke(col);
    strokeWeight(2.5);

    let total=int(maxNum*c)+2;
    rMap=map(total,2,maxNum+2,2,0.1);

    ellipseMode(CENTER);
    rectMode(CENTER);

    for (let u=1; u<total; u++){
      for (let v=1; v<total; v++){
        // fill('black');
        fill(col);
        noStroke();

        if (numPoints<=5){
          push()
          translate(0.5/(numPoints+1)*sLength+xWidth,0.5/(numPoints+1)*sLength+yWidth);
          translate(x/(numPoints+1)*sLength,y/(numPoints+1)*(sLength));
          translate(((v/total)/(numPoints+1))*sLength,((u/total)/(numPoints+1)*sLength  ));
          let radius=((0.5/total)/(numPoints+1))*sLength*rMap;
          if (bCircle) circle(0,0,radius);
          else square(0,0,radius);
          pop()
        }

        else{
          push()
          rectMode(CENTER);
          translate(0.5/(numPoints+1)*sLength,0.5/(numPoints+1)*sLength);
          translate(0.5/6*sLength-0.5/(numPoints+1)*sLength,0.5/6*sLength-0.5/(numPoints+1)*sLength);
          let amtLeft=sLength-(1/6*sLength)+1/(numPoints+1)*sLength;
          translate(x/(numPoints+1)*(amtLeft)+xWidth,y/(numPoints+1)*(amtLeft)+yWidth );
          translate(((v/total)/(numPoints+1))*sLength,((u/total)/(numPoints+1)*sLength));
          
          let radius=((0.5/total)/(numPoints+1))*sLength;
          if (bCircle) circle(0,0,radius);
          else square(0,0,radius);
          pop()
        }
        
      }
    }
  }
}

if (!paused){
  t+=tAmt;  
}

  if (keyIsDown(189)){
    adjusT(-spdAmt);
  }
  else if (keyIsDown(187)){
    adjusT(spdAmt);
  }

  if (millis()-btime>=bgTime && !paused) {
    var now = new Date();
    checkTime(now);
    btime=millis();
  }

}

function windowResized() {
  // console.log(windowWidth,windowHeight);
  resizeCanvas(windowWidth, windowHeight);
  sLength=min(windowWidth,windowHeight);
  xWidth=constrain((windowWidth-sLength)/2,0,(windowWidth-sLength));
  yWidth=constrain((windowHeight-sLength)/2,0,(windowHeight-sLength));
}

function mouseWheel(event) {
  var e = event.delta;
  t-=e/10000;
  if (numPointsF-e/1000<maxGrids+1 && numPointsF-e/1000>1){
    numPointsF-=e/1000;
    numPoints=int(numPointsF);
  }
}

function adjusT(inputAmt){
  if (tAmt+inputAmt<=tMax && tAmt+inputAmt>=tMin) tAmt+=inputAmt;
}

function resetAll() {
  numPoints=reset[0];
  numPointsF=reset[0];
  maxNum=reset[1];
  maxGrids=reset[2]
  tAmt=reset[3];
  noiseSeed(viewerSeed);
  t=0;
}


function invertColor(hex) {
    if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
        throw new Error('Invalid HEX color.');
    }
    // invert color components
    var r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
        g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
        b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
    // pad each with zeros and return
    return '#' + padZero(r) + padZero(g) + padZero(b);
}

function padZero(str, len) {
    len = len || 2;
    var zeros = new Array(len).join('0');
    return (zeros + str).slice(-len);
}

function invertBgP(){
  if (iBg){
    bgColor=color('#C9DAD6')
    iBg=false;
  }
  else {
    bgColor=color(invertColor('#F2F4F3'))
    iBg=true;
  }
}

function checkTime(someDate){
  //(not inverted and night) or (inverted and day)
  let cDay;
  if (someDate.getHours()>=18 || someDate.getHours()<6) cDay=0;
  else if (someDate.getHours()>=6 && someDate.getHours()<18) cDay=1;
  //if it switches to night then invert bg
  if (cDay!=bDay && ((cDay==1 && bgColor.toString()==color(invertColor('#F2F4F3')).toString() ) || (cDay==0 && bgColor.toString()===color('#C9DAD6').toString() ) ) ) {
    invertBgP();
    if (cDay) bDay=1;
    else bDay=0
  }
}


function keyTyped() {
  if (key == ' '|| key=='n') noiseSeed();
  if (key == 'b') invertBgP();
  if (key == 'i') invertPoints= (invertPoints==true) ? false: true;
  if (key == 'p') paused=(paused==true) ? false: true;
  if (key == 'r') resetAll();
  if (key == ';') bCircle=(bCircle==true) ? false: true;
}

function keyPressed() {
  if (keyCode>48 && keyCode<58){
    maxNum=keyCode-48;
  }
  else if (keyCode==48){
    maxNum=10;
  }
  else if (keyCode === UP_ARROW){
    if (numPointsF+1<maxGrids+1){
      numPointsF+=1;
      numPoints=int(numPointsF);
    }
  }
  else if (keyCode === DOWN_ARROW){
    if (numPointsF-1>=1){
      numPointsF-=1;
      numPoints=int(numPointsF);
    }
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