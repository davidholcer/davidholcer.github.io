(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/**
 * @author David Holcer (@vadth)
 * @date Sep. 2021
 * @description 
*/

// var tome=require('chromotome');

// // Palettes can be acquired randomly...
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
  // xs=40;
  xs=int(random(15,40));
  ys=int(random(30,70));
  // ys=63;
  // ys=63;
  t=0;

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
      fill(c);
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
  t+=0.02;
  // allL=[...allLo]
}

function mouseClicked(){
  populateLs();
  rand=random();
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
},{"chromotome":2}],2:[function(require,module,exports){
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.chromotome = {})));
}(this, (function (exports) { 'use strict';

  var misc = [
    {
      name: 'frozen-rose',
      colors: ['#29368f', '#e9697b', '#1b164d', '#f7d996'],
      background: '#f2e8e4',
    },
    {
      name: 'winter-night',
      colors: ['#122438', '#dd672e', '#87c7ca', '#ebebeb'],
      background: '#ebebeb',
    },
    {
      name: 'saami',
      colors: ['#eab700', '#e64818', '#2c6393', '#eecfca'],
      background: '#e7e6e4',
    },
    {
      name: 'knotberry1',
      colors: ['#20342a', '#f74713', '#686d2c', '#e9b4a6'],
      background: '#e5ded8',
    },
    {
      name: 'knotberry2',
      colors: ['#1d3b1a', '#eb4b11', '#e5bc00', '#f29881'],
      background: '#eae2d0',
    },
    {
      name: 'tricolor',
      colors: ['#ec643b', '#56b7ab', '#f8cb57', '#1f1e43'],
      background: '#f7f2df',
    },
    {
      name: 'foxshelter',
      colors: ['#ff3931', '#007861', '#311f27', '#bab9a4'],
      background: '#dddddd',
    },
    {
      name: 'hermes',
      colors: ['#253852', '#51222f', '#b53435', '#ecbb51'],
      background: '#eeccc2',
    },
    {
      name: 'olympia',
      colors: ['#ff3250', '#ffb33a', '#008c36', '#0085c6', '#4c4c4c'],
      stroke: '#0b0b0b',
      background: '#faf2e5',
    },
    {
      name: 'byrnes',
      colors: ['#c54514', '#dca215', '#23507f'],
      stroke: '#0b0b0b',
      background: '#e8e7d4',
    },
    {
      name: 'butterfly',
      colors: ['#f40104', '#f6c0b3', '#99673a', '#f0f1f4'],
      stroke: '#191e36',
      background: '#191e36',
    },
    {
      name: 'floratopia',
      colors: ['#bf4a2b', '#cd902a', '#4e4973', '#f5d4bc'],
      stroke: '#1e1a43',
      background: '#1e1a43',
    },
    {
      name: 'verena',
      colors: ['#f1594a', '#f5b50e', '#14a160', '#2969de', '#885fa4'],
      stroke: '#1a1a1a',
      background: '#e2e6e8',
    },
    {
      name: 'florida_citrus',
      colors: ['#ea7251', '#ebf7f0', '#02aca5'],
      stroke: '#050100',
      background: '#9ae2d3',
    },
    {
      name: 'lemon_citrus',
      colors: ['#e2d574', '#f1f4f7', '#69c5ab'],
      stroke: '#463231',
      background: '#f79eac',
    },
    {
      name: 'yuma_punk',
      colors: ['#f05e3b', '#ebdec4', '#ffdb00'],
      stroke: '#ebdec4',
      background: '#161616',
    },
    {
      name: 'yuma_punk2',
      colors: ['#f2d002', '#f7f5e1', '#ec643b'],
      stroke: '#19080e',
      background: '#f7f5e1',
    },
    {
      name: 'moir',
      colors: ['#a49f4f', '#d4501e', '#f7c558', '#ebbaa6'],
      stroke: '#161716',
      background: '#f7f4ef',
    },
    {
      name: 'sprague',
      colors: ['#ec2f28', '#f8cd28', '#1e95bb', '#fbaab3', '#fcefdf'],
      stroke: '#221e1f',
      background: '#fcefdf',
    },
    {
      name: 'bloomberg',
      colors: ['#ff5500', '#f4c145', '#144714', '#2f04fc', '#e276af'],
      stroke: '#000',
      background: '#fff3dd',
    },
    {
      name: 'revolucion',
      colors: ['#ed555d', '#fffcc9', '#41b797', '#eda126', '#7b5770'],
      stroke: '#fffcc9',
      background: '#2d1922',
    },
    {
      name: 'sneaker',
      colors: ['#e8165b', '#401e38', '#66c3b4', '#ee7724', '#584098'],
      stroke: '#401e38',
      background: '#ffffff',
    },
    {
      name: 'miradors',
      colors: ['#ff6936', '#fddc3f', '#0075ca', '#00bb70'],
      stroke: '#ffffff',
      background: '#020202',
    },
    {
      name: 'kaffeprat',
      colors: ['#BCAA8C', '#D8CDBE', '#484A42', '#746B58', '#9A8C73'],
      stroke: '#000',
      background: '#fff',
    },
    {
      name: 'jrmy',
      colors: ['#df456c', '#ea6a82', '#270b32', '#471e43'],
      stroke: '#270b32',
      background: '#ef9198',
    },
    {
      name: 'animo',
      colors: ['#f6c103', '#f6f6f6', '#d1cdc7', '#e7e6e5'],
      stroke: '#010001',
      background: '#f5f5f5',
    },
    {
      name: 'book',
      colors: ['#be1c24', '#d1a082', '#037b68', '#d8b1a5', '#1c2738', '#c95a3f'],
      stroke: '#0e0f27',
      background: '#f5b28a',
    },
    {
      name: 'juxtapoz',
      colors: ['#20357e', '#f44242', '#ffffff'],
      stroke: '#000000',
      background: '#cfc398',
    },
    {
      name: 'hurdles',
      colors: ['#e16503', '#dc9a0f', '#dfe2b4', '#66a7a6'],
      stroke: '#3c1c03',
      background: '#3c1c03',
    },
    {
      name: 'ludo',
      colors: ['#df302f', '#e5a320', '#0466b3', '#0f7963'],
      stroke: '#272621',
      background: '#dedccd',
    },
    {
      name: 'riff',
      colors: ['#e24724', '#c7c7c7', '#1f3e7c', '#d29294', '#010203'],
      stroke: '#010203',
      background: '#f2f2f2',
    },
    {
      name: 'san ramon',
      colors: ['#4f423a', '#f6a74b', '#589286', '#f8e9e2', '#2c2825'],
      stroke: '#2c2825',
      background: '#fff',
    },
    {
      name: 'one-dress',
      colors: ['#1767D2', '#FFFFFF', '#F9AB00', '#212121'],
      stroke: '#212121',
      background: '#fff',
    },
  ];

  var colourscafe = [
    {
      name: 'cc239',
      colors: ['#e3dd34', '#78496b', '#f0527f', '#a7e0e2'],
      background: '#e0eff0'
    },
    {
      name: 'cc234',
      colors: ['#ffce49', '#ede8dc', '#ff5736', '#ff99b4'],
      background: '#f7f4ed'
    },
    {
      name: 'cc232',
      colors: ['#5c5f46', '#ff7044', '#ffce39', '#66aeaa'],
      background: '#e9ecde'
    },
    {
      name: 'cc238',
      colors: ['#553c60', '#ffb0a0', '#ff6749', '#fbe090'],
      background: '#f5e9de'
    },
    {
      name: 'cc242',
      colors: ['#bbd444', '#fcd744', '#fa7b53', '#423c6f'],
      background: '#faf4e4'
    },
    {
      name: 'cc245',
      colors: ['#0d4a4e', '#ff947b', '#ead3a2', '#5284ab'],
      background: '#f6f4ed'
    },
    {
      name: 'cc273',
      colors: ['#363d4a', '#7b8a56', '#ff9369', '#f4c172'],
      background: '#f0efe2'
    }
  ];

  var ranganath = [
    {
      name: 'rag-mysore',
      colors: ['#ec6c26', '#613a53', '#e8ac52', '#639aa0'],
      background: '#d5cda1'
    },
    {
      name: 'rag-gol',
      colors: ['#d3693e', '#803528', '#f1b156', '#90a798'],
      background: '#f0e0a4'
    },
    {
      name: 'rag-belur',
      colors: ['#f46e26', '#68485f', '#3d273a', '#535d55'],
      background: '#dcd4a6'
    },
    {
      name: 'rag-bangalore',
      colors: ['#ea720e', '#ca5130', '#e9c25a', '#52534f'],
      background: '#f9ecd3'
    },
    {
      name: 'rag-taj',
      colors: ['#ce565e', '#8e1752', '#f8a100', '#3ac1a6'],
      background: '#efdea2'
    },
    {
      name: 'rag-virupaksha',
      colors: ['#f5736a', '#925951', '#feba4c', '#9d9b9d'],
      background: '#eedfa2'
    }
  ];

  var roygbivs = [
    {
      name: 'retro',
      colors: [
        '#69766f',
        '#9ed6cb',
        '#f7e5cc',
        '#9d8f7f',
        '#936454',
        '#bf5c32',
        '#efad57'
      ]
    },
    {
      name: 'retro-washedout',
      colors: [
        '#878a87',
        '#cbdbc8',
        '#e8e0d4',
        '#b29e91',
        '#9f736c',
        '#b76254',
        '#dfa372'
      ]
    },
    {
      name: 'roygbiv-warm',
      colors: [
        '#705f84',
        '#687d99',
        '#6c843e',
        '#fc9a1a',
        '#dc383a',
        '#aa3a33',
        '#9c4257'
      ]
    },
    {
      name: 'roygbiv-toned',
      colors: [
        '#817c77',
        '#396c68',
        '#89e3b7',
        '#f59647',
        '#d63644',
        '#893f49',
        '#4d3240'
      ]
    },
    {
      name: 'present-correct',
      colors: [
        '#fd3741',
        '#fe4f11',
        '#ff6800',
        '#ffa61a',
        '#ffc219',
        '#ffd114',
        '#fcd82e',
        '#f4d730',
        '#ced562',
        '#8ac38f',
        '#79b7a0',
        '#72b5b1',
        '#5b9bae',
        '#6ba1b7',
        '#49619d',
        '#604791',
        '#721e7f',
        '#9b2b77',
        '#ab2562',
        '#ca2847'
      ]
    }
  ];

  var tundra = [
    {
      name: 'tundra1',
      colors: ['#40708c', '#8e998c', '#5d3f37', '#ed6954', '#f2e9e2']
    },
    {
      name: 'tundra2',
      colors: ['#5f9e93', '#3d3638', '#733632', '#b66239', '#b0a1a4', '#e3dad2']
    },
    {
      name: 'tundra3',
      colors: [
        '#87c3ca',
        '#7b7377',
        '#b2475d',
        '#7d3e3e',
        '#eb7f64',
        '#d9c67a',
        '#f3f2f2'
      ]
    },
    {
      name: 'tundra4',
      colors: [
        '#d53939',
        '#b6754d',
        '#a88d5f',
        '#524643',
        '#3c5a53',
        '#7d8c7c',
        '#dad6cd'
      ]
    }
  ];

  var rohlfs = [
    {
      name: 'rohlfs_1R',
      colors: ['#004996', '#567bae', '#ff4c48', '#ffbcb3'],
      stroke: '#004996',
      background: '#fff8e7'
    },
    {
      name: 'rohlfs_1Y',
      colors: ['#004996', '#567bae', '#ffc000', '#ffdca4'],
      stroke: '#004996',
      background: '#fff8e7'
    },
    {
      name: 'rohlfs_1G',
      colors: ['#004996', '#567bae', '#60bf3c', '#d2deb1'],
      stroke: '#004996',
      background: '#fff8e7'
    },
    {
      name: 'rohlfs_2',
      colors: ['#4d3d9a', '#f76975', '#ffffff', '#eff0dd'],
      stroke: '#211029',
      background: '#58bdbc'
    },
    {
      name: 'rohlfs_3',
      colors: ['#abdfdf', '#fde500', '#58bdbc', '#eff0dd'],
      stroke: '#211029',
      background: '#f76975'
    },
    {
      name: 'rohlfs_4',
      colors: ['#fde500', '#2f2043', '#f76975', '#eff0dd'],
      stroke: '#211029',
      background: '#fbbeca'
    }
  ];

  var ducci = [
    {
      name: 'ducci_jb',
      colors: ['#395e54', '#e77b4d', '#050006', '#e55486'],
      stroke: '#050006',
      background: '#efe0bc'
    },
    {
      name: 'ducci_a',
      colors: ['#809498', '#d3990e', '#000000', '#ecddc5'],
      stroke: '#ecddc5',
      background: '#863f52'
    },
    {
      name: 'ducci_b',
      colors: ['#ecddc5', '#79b27b', '#000000', '#ac6548'],
      stroke: '#ac6548',
      background: '#d5c08e'
    },
    {
      name: 'ducci_d',
      colors: ['#f3cb4d', '#f2f5e3', '#20191b', '#67875c'],
      stroke: '#67875c',
      background: '#433d5f'
    },
    {
      name: 'ducci_e',
      colors: ['#c37c2b', '#f6ecce', '#000000', '#386a7a'],
      stroke: '#386a7a',
      background: '#e3cd98'
    },
    {
      name: 'ducci_f',
      colors: ['#596f7e', '#eae6c7', '#463c21', '#f4cb4c'],
      stroke: '#f4cb4c',
      background: '#e67300'
    },
    {
      name: 'ducci_g',
      colors: ['#c75669', '#000000', '#11706a'],
      stroke: '#11706a',
      background: '#ecddc5'
    },
    {
      name: 'ducci_h',
      colors: ['#6b5c6e', '#4a2839', '#d9574a'],
      stroke: '#d9574a',
      background: '#ffc34b'
    },
    {
      name: 'ducci_i',
      colors: ['#e9dcad', '#143331', '#ffc000'],
      stroke: '#ffc000',
      background: '#a74c02'
    },
    {
      name: 'ducci_j',
      colors: ['#c47c2b', '#5f5726', '#000000', '#7e8a84'],
      stroke: '#7e8a84',
      background: '#ecddc5'
    },
    {
      name: 'ducci_o',
      colors: ['#c15e1f', '#e4a13a', '#000000', '#4d545a'],
      stroke: '#4d545a',
      background: '#dfc79b'
    },
    {
      name: 'ducci_q',
      colors: ['#4bae8c', '#d0c1a0', '#2d3538'],
      stroke: '#2d3538',
      background: '#d06440'
    },
    {
      name: 'ducci_u',
      colors: ['#f6d700', '#f2d692', '#000000', '#5d3552'],
      stroke: '#5d3552',
      background: '#ff7426'
    },
    {
      name: 'ducci_v',
      colors: ['#c65f75', '#d3990e', '#000000', '#597e7a'],
      stroke: '#597e7a',
      background: '#f6eccb'
    },
    {
      name: 'ducci_x',
      colors: ['#dd614a', '#f5cedb', '#1a1e4f'],
      stroke: '#1a1e4f',
      background: '#fbb900'
    }
  ];

  var judson = [
    {
      name: 'jud_playground',
      colors: ['#f04924', '#fcce09', '#408ac9'],
      stroke: '#2e2925',
      background: '#ffffff'
    },
    {
      name: 'jud_horizon',
      colors: ['#f8c3df', '#f2e420', '#28b3d0', '#648731', '#ef6a7d'],
      stroke: '#030305',
      background: '#f2f0e1'
    },
    {
      name: 'jud_mural',
      colors: ['#ca3122', '#e5af16', '#4a93a2', '#0e7e39', '#e2b9bd'],
      stroke: '#1c1616',
      background: '#e3ded8'
    },
    {
      name: 'jud_cabinet',
      colors: ['#f0afb7', '#f6bc12', '#1477bb', '#41bb9b'],
      stroke: '#020508',
      background: '#e3ded8'
    }
  ];

  var iivonen = [
    {
      name: 'iiso_zeitung',
      colors: ['#ee8067', '#f3df76', '#00a9c0', '#f7ab76'],
      stroke: '#111a17',
      background: '#f5efcb'
    },
    {
      name: 'iiso_curcuit',
      colors: ['#f0865c', '#f2b07b', '#6bc4d2', '#1a3643'],
      stroke: '#0f1417',
      background: '#f0f0e8'
    },
    {
      name: 'iiso_airlines',
      colors: ['#fe765a', '#ffb468', '#4b588f', '#faf1e0'],
      stroke: '#1c1616',
      background: '#fae5c8'
    },
    {
      name: 'iiso_daily',
      colors: ['#e76c4a', '#f0d967', '#7f8cb6', '#1daeb1', '#ef9640'],
      stroke: '#000100',
      background: '#e2ded2'
    }
  ];

  var kovecses = [
    {
      name: 'kov_01',
      colors: ['#d24c23', '#7ba6bc', '#f0c667', '#ede2b3', '#672b35', '#142a36'],
      stroke: '#132a37',
      background: '#108266'
    },
    {
      name: 'kov_02',
      colors: ['#e8dccc', '#e94641', '#eeaeae'],
      stroke: '#e8dccc',
      background: '#6c96be'
    },
    {
      name: 'kov_03',
      colors: ['#e3937b', '#d93f1d', '#090d15', '#e6cca7'],
      stroke: '#090d15',
      background: '#558947'
    },
    {
      name: 'kov_04',
      colors: ['#d03718', '#292b36', '#33762f', '#ead7c9', '#ce7028', '#689d8d'],
      stroke: '#292b36',
      background: '#deb330'
    },
    {
      name: 'kov_05',
      colors: ['#de3f1a', '#de9232', '#007158', '#e6cdaf', '#869679'],
      stroke: '#010006',
      background: '#7aa5a6'
    },
    {
      name: 'kov_06',
      colors: [
        '#a87c2a',
        '#bdc9b1',
        '#f14616',
        '#ecbfaf',
        '#017724',
        '#0e2733',
        '#2b9ae9'
      ],
      stroke: '#292319',
      background: '#dfd4c1'
    },
    {
      name: 'kov_06b',
      colors: [
        '#d57846',
        '#dfe0cc',
        '#de442f',
        '#e7d3c5',
        '#5ec227',
        '#302f35',
        '#63bdb3'
      ],
      stroke: '#292319',
      background: '#dfd4c1'
    },
    {
      name: 'kov_07',
      colors: ['#c91619', '#fdecd2', '#f4a000', '#4c2653'],
      stroke: '#111',
      background: '#89c2cd'
    }
  ];

  var tsuchimochi = [
    {
      name: 'tsu_arcade',
      colors: ['#4aad8b', '#e15147', '#f3b551', '#cec8b8', '#d1af84', '#544e47'],
      stroke: '#251c12',
      background: '#cfc7b9'
    },
    {
      name: 'tsu_harutan',
      colors: ['#75974a', '#c83e3c', '#f39140', '#e4ded2', '#f8c5a4', '#434f55'],
      stroke: '#251c12',
      background: '#cfc7b9'
    },
    {
      name: 'tsu_akasaka',
      colors: ['#687f72', '#cc7d6c', '#dec36f', '#dec7af', '#ad8470', '#424637'],
      stroke: '#251c12',
      background: '#cfc7b9'
    }
  ];

  var duotone = [
    {
      name: 'dt01',
      colors: ['#172a89', '#f7f7f3'],
      stroke: '#172a89',
      background: '#f3abb0',
    },
    {
      name: 'dt02',
      colors: ['#302956', '#f3c507'],
      stroke: '#302956',
      background: '#eee3d3',
    },
    {
      name: 'dt03',
      colors: ['#000000', '#a7a7a7'],
      stroke: '#000000',
      background: '#0a5e78',
    },
    {
      name: 'dt04',
      colors: ['#50978e', '#f7f0df'],
      stroke: '#000000',
      background: '#f7f0df',
    },
    {
      name: 'dt05',
      colors: ['#ee5d65', '#f0e5cb'],
      stroke: '#080708',
      background: '#f0e5cb',
    },
    {
      name: 'dt06',
      colors: ['#271f47', '#e7ceb5'],
      stroke: '#271f47',
      background: '#cc2b1c',
    },
    {
      name: 'dt07',
      colors: ['#6a98a5', '#d24c18'],
      stroke: '#efebda',
      background: '#efebda',
    },
    {
      name: 'dt08',
      colors: ['#5d9d88', '#ebb43b'],
      stroke: '#efebda',
      background: '#efebda',
    },
    {
      name: 'dt09',
      colors: ['#052e57', '#de8d80'],
      stroke: '#efebda',
      background: '#efebda',
    },
    {
      name: 'dt10',
      colors: ['#e5dfcf', '#151513'],
      stroke: '#151513',
      background: '#e9b500',
    },
  ];

  var hilda = [
    {
      name: 'hilda01',
      colors: ['#ec5526', '#f4ac12', '#9ebbc1', '#f7f4e2'],
      stroke: '#1e1b1e',
      background: '#e7e8d4'
    },
    {
      name: 'hilda02',
      colors: ['#eb5627', '#eebb20', '#4e9eb8', '#f7f5d0'],
      stroke: '#201d13',
      background: '#77c1c0'
    },
    {
      name: 'hilda03',
      colors: ['#e95145', '#f8b917', '#b8bdc1', '#ffb2a2'],
      stroke: '#010101',
      background: '#6b7752'
    },
    {
      name: 'hilda04',
      colors: ['#e95145', '#f6bf7a', '#589da1', '#f5d9bc'],
      stroke: '#000001',
      background: '#f5ede1'
    },
    {
      name: 'hilda05',
      colors: ['#ff6555', '#ffb58f', '#d8eecf', '#8c4b47', '#bf7f93'],
      stroke: '#2b0404',
      background: '#ffda82'
    },
    {
      name: 'hilda06',
      colors: ['#f75952', '#ffce84', '#74b7b2', '#f6f6f6', '#b17d71'],
      stroke: '#0e0603',
      background: '#f6ecd4'
    }
  ];

  var spatial = [
    {
      name: 'spatial01',
      colors: ['#ff5937', '#f6f6f4', '#4169ff'],
      stroke: '#ff5937',
      background: '#f6f6f4'
    },
    {
      name: 'spatial02',
      colors: ['#ff5937', '#f6f6f4', '#f6f6f4'],
      stroke: '#ff5937',
      background: '#f6f6f4'
    },
    {
      name: 'spatial02i',
      colors: ['#f6f6f4', '#ff5937', '#ff5937'],
      stroke: '#f6f6f4',
      background: '#ff5937'
    },

    {
      name: 'spatial03',
      colors: ['#4169ff', '#f6f6f4', '#f6f6f4'],
      stroke: '#4169ff',
      background: '#f6f6f4'
    },
    {
      name: 'spatial03i',
      colors: ['#f6f6f4', '#4169ff', '#4169ff'],
      stroke: '#f6f6f4',
      background: '#4169ff'
    }
  ];

  var jung = [
    {
      name: 'jung_bird',
      colors: ['#fc3032', '#fed530', '#33c3fb', '#ff7bac', '#fda929'],
      stroke: '#000000',
      background: '#ffffff'
    },
    {
      name: 'jung_horse',
      colors: ['#e72e81', '#f0bf36', '#3056a2'],
      stroke: '#000000',
      background: '#ffffff'
    },
    {
      name: 'jung_croc',
      colors: ['#f13274', '#eed03e', '#405e7f', '#19a198'],
      stroke: '#000000',
      background: '#ffffff'
    },
    {
      name: 'jung_hippo',
      colors: ['#ff7bac', '#ff921e', '#3ea8f5', '#7ac943'],
      stroke: '#000000',
      background: '#ffffff'
    },
    {
      name: 'jung_wolf',
      colors: ['#e51c39', '#f1b844', '#36c4b7', '#666666'],
      stroke: '#000000',
      background: '#ffffff'
    }
  ];

  var system = [
    {
      name: 'system.#01',
      colors: ['#ff4242', '#fec101', '#1841fe', '#fcbdcc', '#82e9b5'],
      stroke: '#000',
      background: '#fff'
    },
    {
      name: 'system.#02',
      colors: ['#ff4242', '#ffd480', '#1e365d', '#edb14c', '#418dcd'],
      stroke: '#000',
      background: '#fff'
    },
    {
      name: 'system.#03',
      colors: ['#f73f4a', '#d3e5eb', '#002c3e', '#1aa1b1', '#ec6675'],
      stroke: '#110b09',
      background: '#fff'
    },
    {
      name: 'system.#04',
      colors: ['#e31f4f', '#f0ac3f', '#18acab', '#26265a', '#ea7d81', '#dcd9d0'],
      stroke: '#26265a',
      backgrund: '#dcd9d0'
    },
    {
      name: 'system.#05',
      colors: ['#db4549', '#d1e1e1', '#3e6a90', '#2e3853', '#a3c9d3'],
      stroke: '#000',
      background: '#fff'
    },
    {
      name: 'system.#06',
      colors: ['#e5475c', '#95b394', '#28343b', '#f7c6a3', '#eb8078'],
      stroke: '#000',
      background: '#fff'
    },
    {
      name: 'system.#07',
      colors: ['#d75c49', '#f0efea', '#509da4'],
      stroke: '#000',
      background: '#fff'
    },
    {
      name: 'system.#08',
      colors: ['#f6625a', '#92b29f', '#272c3f'],
      stroke: '#000',
      background: '#fff'
    }
  ];

  var flourish = [
    {
      name: 'empusa',
      colors: ['#c92a28', '#e69301', '#1f8793', '#13652b', '#e7d8b0', '#48233b', '#e3b3ac'],
      stroke: '#1a1a1a',
      background: '#f0f0f2',
    },
    {
      name: 'delphi',
      colors: ['#475b62', '#7a999c', '#2a1f1d', '#fbaf3c', '#df4a33', '#f0e0c6', '#af592c'],
      stroke: '#2a1f1d',
      background: '#f0e0c6',
    },
    {
      name: 'mably',
      colors: [
        '#13477b',
        '#2f1b10',
        '#d18529',
        '#d72a25',
        '#e42184',
        '#138898',
        '#9d2787',
        '#7f311b',
      ],
      stroke: '#2a1f1d',
      background: '#dfc792',
    },
    {
      name: 'nowak',
      colors: ['#e85b30', '#ef9e28', '#c6ac71', '#e0c191', '#3f6279', '#ee854e', '#180305'],
      stroke: '#180305',
      background: '#ede4cb',
    },
    {
      name: 'jupiter',
      colors: ['#c03a53', '#edd09e', '#aab5af', '#023629', '#eba735', '#8e9380', '#6c4127'],
      stroke: '#12110f',
      background: '#e6e2d6',
    },
    {
      name: 'hersche',
      colors: [
        '#df9f00',
        '#1f6f50',
        '#8e6d7f',
        '#da0607',
        '#a4a5a7',
        '#d3d1c3',
        '#42064f',
        '#25393a',
      ],
      stroke: '#0a0a0a',
      background: '#f0f5f6',
    },
    {
      name: 'cherfi',
      colors: ['#99cb9f', '#cfb610', '#d00701', '#dba78d', '#2e2c1d', '#bfbea2', '#d2cfaf'],
      stroke: '#332e22',
      background: '#e3e2c5',
    },
    {
      name: 'harvest',
      colors: [
        '#313a42',
        '#9aad2e',
        '#f0ae3c',
        '#df4822',
        '#8eac9b',
        '#cc3d3f',
        '#ec8b1c',
        '#1b9268',
      ],
      stroke: '#463930',
      background: '#e5e2cf',
    },
    {
      name: 'honey',
      colors: ['#f14d42', '#f4fdec', '#4fbe5d', '#265487', '#f6e916', '#f9a087', '#2e99d6'],
      stroke: '#141414',
      background: '#f4fdec',
    },
    {
      name: 'jungle',
      colors: [
        '#adb100',
        '#e5f4e9',
        '#f4650f',
        '#4d6838',
        '#cb9e00',
        '#689c7d',
        '#e2a1a8',
        '#151c2e',
      ],
      stroke: '#0e0f27',
      background: '#cecaa9',
    },
    {
      name: 'skyspider',
      colors: ['#f4b232', '#f2dbbd', '#01799c', '#e93e48', '#0b1952', '#006748', '#ed817d'],
      stroke: '#050505',
      background: '#f0dbbc',
    },
    {
      name: 'atlas',
      colors: ['#5399b1', '#f4e9d5', '#de4037', '#ed942f', '#4e9e48', '#7a6e62'],
      stroke: '#3d352b',
      background: '#f0c328',
    },
    {
      name: 'giftcard',
      colors: [
        '#FBF5E9',
        '#FF514E',
        '#FDBC2E',
        '#4561CC',
        '#2A303E',
        '#6CC283',
        '#A71172',
        '#238DA5',
        '#9BD7CB',
        '#231E58',
        '#4E0942',
      ],
      stroke: '#000',
      background: '#FBF5E9',
    },
    {
      name: 'giftcard_sub',
      colors: [
        '#FBF5E9',
        '#FF514E',
        '#FDBC2E',
        '#4561CC',
        '#2A303E',
        '#6CC283',
        '#238DA5',
        '#9BD7CB',
      ],
      stroke: '#000',
      background: '#FBF5E9',
    },
  ];

  var dale = [
    {
      name: 'dale_paddle',
      colors: [
        '#ff7a5a',
        '#765aa6',
        '#fee7bc',
        '#515e8c',
        '#ffc64a',
        '#b460a6',
        '#ffffff',
        '#4781c1',
      ],
      stroke: '#000000',
      background: '#abe9e8',
    },
    {
      name: 'dale_night',
      colors: ['#ae5d9d', '#f1e8bc', '#ef8fa3', '#f7c047', '#58c9ed', '#f77150'],
      stroke: '#000000',
      background: '#00ae83',
    },
    {
      name: 'dale_cat',
      colors: ['#f77656', '#f7f7f7', '#efc545', '#dfe0e2', '#3c70bd', '#66bee4'],
      stroke: '#000000',
      background: '#f6e0b8',
    },
  ];

  var cako = [
    {
      name: 'cako1',
      colors: ['#000000', '#d55a3a', '#2a5c8a', '#7e7d14', '#dbdac9'],
      stroke: '#000000',
      background: '#f4e9d5',
    },
    {
      name: 'cako2',
      colors: ['#dbdac9', '#d55a3a', '#2a5c8a', '#b47b8c', '#7e7d14'],
      stroke: '#000000',
      background: '#000000',
    },
    {
      name: 'cako2_sub1',
      colors: ['#dbdac9', '#d55a3a', '#2a5c8a'],
      stroke: '#000000',
      background: '#000000',
    },
    {
      name: 'cako2_sub2',
      colors: ['#dbdac9', '#d55a3a', '#7e7d14'],
      stroke: '#000000',
      background: '#000000',
    },
  ];

  var mayo = [
    {
      name: 'mayo1',
      colors: ['#ea510e', '#ffd203', '#0255a3', '#039177', '#111111'],
      stroke: '#111111',
      background: '#fff',
    },
    {
      name: 'mayo2',
      colors: ['#ea663f', '#f9cc27', '#84afd7', '#7ca994', '#f1bbc9', '#242424'],
      stroke: '#2a2a2a',
      background: '#f5f6f1',
    },
    {
      name: 'mayo3',
      colors: ['#ea5b19', '#f8c9b9', '#137661', '#2a2a2a'],
      stroke: '#2a2a2a',
      background: '#f5f4f0',
    },
  ];

  var exposito = [
    {
      name: 'exposito',
      colors: [
        '#8bc9c3',
        '#ffae43',
        '#ea432c',
        '#228345',
        '#d1d7d3',
        '#524e9c',
        '#9dc35e',
        '#f0a1a1',
      ],
      stroke: '#fff',
      background: '#000000',
    },
    {
      name: 'exposito_sub1',
      colors: ['#8bc9c3', '#ffae43', '#ea432c', '#524e9c'],
      stroke: '#fff',
      background: '#000000',
    },
    {
      name: 'exposito_sub2',
      colors: ['#8bc9c3', '#ffae43', '#ea432c', '#524e9c', '#f0a1a1', '#228345'],
      stroke: '#fff',
      background: '#000000',
    },
    {
      name: 'exposito_sub3',
      colors: ['#ffae43', '#ea432c', '#524e9c', '#f0a1a1'],
      stroke: '#fff',
      background: '#000000',
    },
  ];

  const pals = misc.concat(
    ranganath,
    roygbivs,
    tundra,
    colourscafe,
    rohlfs,
    ducci,
    judson,
    iivonen,
    kovecses,
    tsuchimochi,
    duotone,
    hilda,
    spatial,
    jung,
    system,
    flourish,
    dale,
    cako,
    mayo,
    exposito
  );

  var palettes = pals.map((p) => {
    p.size = p.colors.length;
    return p;
  });

  function getRandom() {
    return palettes[Math.floor(Math.random() * palettes.length)];
  }

  function get(name) {
    if (name === undefined) return getRandom();
    return palettes.find(pal => pal.name == name);
  }

  function getAll() {
    return palettes;
  }

  function getNames() {
    return palettes.map(p => p.name);
  }

  exports.getRandom = getRandom;
  exports.get = get;
  exports.getAll = getAll;
  exports.getNames = getNames;

  Object.defineProperty(exports, '__esModule', { value: true });

})));

},{}]},{},[1]);
