/**
 * @author David Holcer (@vadth)
 * @date Sep. 2021
 * @description 
*/

// var tome=require('chromotome');
// var p5 = require('../js/p5.min.js');
// var patLib = require('../js/p5.pattern.js');

// Palettes can be acquired randomly...
// let palette = tome.get(); // tome.getRandom() also works.

console.log(" __    __ ______   _____    ______  __  __\n\
/\\ \\  / //\\  __ \\ /\\  __-. /\\__  _\\/\\ \\_\\ \\\n\
\\ \\ \\/ / \\ \\  __ \\\\ \\ \\/\\ \\\\/_/\\ \\/\\ \\  __ \\\n\
 \\ \\__/   \\ \\_\\ \\_\\\\ \\____-   \\ \\_\\ \\ \\_\\ \\_\\\n\
  \\/_/     \\/_/\\/_/ \\/____/    \\/_/  \\/_/\\/_/\n\n")

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
document.title = ""
let description = ""

// **************************
// *        VARIABLES       *
// **************************
let bgColor;
let mc;
let nums;
let probs;
let xs,ys;
let allL;
let t;
let rand;
let black;


function setup() {
  createCanvas(0.985*windowHeight, windowHeight);
  console.log('Screen Dimensions: '+width+'px x '+height+'px');
  sLength=min(windowWidth,windowHeight);
  maxLength=max(windowWidth,windowHeight);

  // initSeeds();
  describe(description);

  ellipseMode(RADIUS);
  colorMode(HSB);
  frameRate(60);
  noStroke();
  fill(0);
  // noLoop();

  rand=random();
  xs=40;
  // xs=int(random(15,40));
  // ys=int(random(30,70));
  ys=63;
  // ys=63;
  t=0;
  if (random()<0.5) black=true;
  else black=false;

  bgColor=color('#F2F4F3');
  probs=[0.1429,0.2698,0.4127,0.5397,0.6825,0.8095,1];
  mc=[[0.2857,0.5714,0.7143,0.8571,1,0,0],[0.1429,0.4286,0.5714,0.8571,1,0,0],[0,0,0.125,0.25,0.75,1,0],[0,0,0,0.2857,0,0.5714,1],[0,0,0,0.125,0.3750,0.6250,1],[0,0,0,0.2857,0.4286,0.7143,1],[0,0,0,0.1818,0.6364,0.8182,1]];


  populateLs();
  allLo=[...allL]
  // const add1=x=>x+1;
  // let nums = Array.from(Array(7), (_,x) => add1(x));

  
}

function populateLs() {
  allL=[];
  for (i=0;i<xs+1;i++){
    if (i==0) allL.push(getRandom(probs))
    else {
      let l;
      l=getRandom(mc[allL[i-1]-1]);
      // console.log(l)
      if (i>1){
        while (l%4==allL[i-1]%4 && l%4==allL[i-2]%4){
          // console.log(l,allL[i-1],allL[i-2]);
          l=getRandom(mc[allL[0]-1]);
        }
      }
      allL.push(l)
    }
  }
}

function draw() {
  background(bgColor);
  
  // let l;
  // l=getRandom(probs);
  // l=allL.pop(0);
  // l=allL[0]
  let ls;
  // console.log(l);
  // let tFunc=tFunct(t,4);
  // let tFunc=parabEq(t,4);
  // let tFunc=easeInOutCubic(t,8);
  let tFunc=easeInOutP(t,9,5);

  // console.log(parabEq(t,4));
  for (let x=1;x<xs+1;x++){
    let dist,dist1;
    l=allL[x-1];
    ls=[l-8,l-4,l,l+4,l+8];
    for (let y=1;y<ys+1;y++){
      // fill(map(y,1,ys,0,255),80,70)
      let c=color(map(l%4,0,3,0,255),65,65);
      if (black) fill('black');
      else fill(c);
      // console.log((x-1)*xs+y-1)
      // console.log(allL)
      push();
      translate(width/(xs+1)*x,height/(ys+1)*y);
      dist=min(abs(ls[0]*8-y),abs(ls[1]*8-y),abs(ls[2]*8-y),abs(ls[3]*8-y),abs(ls[4]*8-y));
      dist1=min(abs(ls[0]*8+1-y),abs(ls[1]*8+1-y),abs(ls[2]*8+1-y),abs(ls[3]*8+1-y),abs(ls[4]*8+1-y));
      // console.log(dist1);
      dist=min(dist,dist1);
      let osz=map(dist,0,16,1,0);
      let sz=osz+0.0
      
      sz=lerp(osz,1-osz,tFunc)
      // if (osz>0.5) sz=osz-(1-abs(1-t%2))*(osz);
      // else sz=osz+(1-abs(1-t%2))*(osz);
      rF=0.8+sz;
      // if (dist<=8) rF=0.9*t
      //figure out how to transition from big to small and vice versa
      // let rand=noise(x,y);
      rectMode(CENTER);
      // circle(0,0,2.5*rF**(2.1));
      stroke('black');
      if (rand<0.3) circle(0,0,2.5*rF**(2.1));
      else if (rand<0.6) square(0,0,6*rF**(2.1));
      else if (rand<0.7) {rotate(PI/4);square(0,0,6*rF**(2.1));}
      else {stroke(c);strokeWeight(rF**(3)); let orr=map(noise(x,y),0.1,0.8,0,2*PI);rotate(orr+2*PI*tFunc);line(-10,0,10,0)}

      // pattern(PTN.wave(100, 10, 6, 3));
      // ellipsePattern(0,0,2.5*rF**(2.1),2.5*rF**(2.1));
      
      
      

      // if (y==l*8) circle(0,0,20);
      // else circle(0,0,5);
      pop();

    }
    // l=getRandom(mc[l-1]);
    // l=allL.pop(0);
    
    // console.log(l);
  }
  t+=0.03;
  // allL=[...allLo]
}

function makeNew(){
  populateLs();
  rand=random();
  if (random()<0.5) black=true;
  else black=false;
}

function mouseClicked(){
  makeNew();
}

// let tFunct=(t)=>{return 1};
// let tFunct=(t,d)=>{let p=2+2*d;let tt=1000*t%(int(1000*p))/1000.0;if (tt<1){return (1-abs(1-t%(2+2*d) ))};if (tt<1+d){return 1};if(tt<2+t){return (1-abs(1-(t-d)%(2+2*t) ))};if(tt<2+2*t){return 0}};
// let getMod=(a,b)=>{let mod=a;while (mod>=b){mod-=b};return mod;}

let easeInOutCubic=(t,d)=>{let tt=1-abs(1-(t/(d/2))%2);return tt<0.5?4*tt**3:1-pow(-2*tt+2,3)/2;}
let easeInOutP=(t,d,p)=>{let tt=1-abs(1-(t/(d/2))%2);return tt<0.5?2**(p-1)*tt**p:1-pow(-2*tt+2,p)/2;}

// let parab=(t,d)=>{let p=2+d;let tt=t%p;let k=4.4/(d**2+4*d+d);return(-k*(tt-(2+d)/2)**2+1.1 )}
// let parabEq=(t,d)=>{let p=2+d;let tt=t%p;if (tt<=2+d){return parab(t,d)}}
let tFunct=(t,d)=>{let p=2+2*d;let tt=t%p;if (tt<=1){return (1-abs(1-tt))};if (tt<=1+d){return 1};if(tt<=2+d){return (1-abs(1-(t-d)%(p) ))};if(tt<=2+2*d){return 0}};
// let tFunct=(t,d)=>{let p=2+2*d;let tt=getMod(t,p);if (tt<1){return (1-abs(1-tt ))};if (tt<1+d){return 1};if(tt<2+d){return (1-abs(1-getMod(t-d,p) ))};if(tt<2+2*d){return 0}};

//https://stackoverflow.com/questions/8877249/generate-random-integers-with-probabilities
function getRandom (weights,rand=false) {
    var num;
    if (rand==false) num=random();
    else num=rand;
    var s = 0,lastIndex = weights.length;
    // console.log(lastIndex);
    // console.log(num);
        // console.log(lastIndex);

    for (var i = 0; i < lastIndex; ++i) {
        if (num < weights[i]) {
          // console.log(i+1);
          // if ((i+1)==6) console.log("yaa");
          // console.log(num,i+1);
          return i+1;
        }
    }
    return lastIndex+1;
};


function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function keyTyped() {
  switch (key) {
    case 'b':black=!black;break
    case ' ':makeNew();break
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