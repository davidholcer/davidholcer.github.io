/**
 * @author David Holcer (@vadth)
 * @date Sep. 2021
 * @description 
*/

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
let dots,cDots;
let bgColor,lineColor,globeColor,rc1,rc2,rc3,electricColor,offWhite;
let radius;
let tPoints,tcPoints;
let eqRadius=150;
let cReds;
let siTime,sTime;
let sel;
let randPow,randAmp;
let grainAmt,noises,nL;
let clicked;
let oRadius;
let pVector,pVectors;

function setup() {
  createCanvas(windowWidth, windowHeight);
  console.log('Screen Dimensions: '+width+'px x '+height+'px');
  sLength=min(windowWidth,windowHeight);
  maxLength=max(windowWidth,windowHeight);

  initSeeds();
  describe(description);

  colorMode(HSB);
  frameRate(60);

  lineColor=color('#3F8ED9');
  electricColor=color('#4044B4');
  offWhite=color('#F2F4F3');
  bgColor=color('#0d0b0c');
  globeColor=color('#14074B');
  rc1=color('#DD454A');
  rc2=color('#B13262');
  rc3=color('#E04163');

  siTime=0;
  sTime=2000;
  
  randPow=random(2,3);
  randAmp=random(50,70);
  
  radius=100;
  tPoints=1000;
  tcPoints=12000;
  dots=[];
  cDots=[];
  cReds=[];
  pVectors=[];
  oRadius=515/2;
  clicked=false;
  populatePoints(tPoints,false);
  populatePoints(tcPoints,true);

  // let gf=random();
	// grainAmt=int(random(1*gf,2*gf));
	// // grainAmt=20;
	nL=(width*pixelDensity())*(height*pixelDensity());
	noises = Array.from(Array(nL), () => random(-1,1));

  // bgColor=color('#F2F4F3');
  // noLoop();
}


// let eq=(t,s)=>eqRadius*sin(s**3*noise(t)*t*cos(100*t)   );
// let eq=(t,s)=>eqRadius*sin(s**randPow*noise(t)*t*cos(randAmp*t));
// let eq=(t,s)=>eqRadius*sin(s**randPow*noise(t)*t*cos(randAmp*t)*tan(t*t));
let eq=(t,s)=>eqRadius*sin(s**randPow*noise(t)*t*cos(randAmp*t)*tan(t*t*noise(t)));
let coilEq=(t,l,w,f)=>w*(sin(f*map(t,0,1,0,l)));
// let eq=(t,s)=>100*sin(t*s*cos(s));
// let eq=t=>60;
// let eq=t=>50;
let smoothMod=(x,t)=>t/2-abs(t/2-x%t);
let getVec=t=>createVector(cos(t),sin(t)).normalize();
let gcC=t=>globeColor.setAlpha(0.2+0.8*sin(t));

function draw() {
  translate(width/2,height/2);
  background(offWhite);
  let vt;
  gcC(smoothMod(millis()/4000,4));
  fill(globeColor);
  // stroke(lineColor);
  strokeWeight(0.5);
  circle(0,0,oRadius*2);

  for (cDot of cDots){
    push()
    cDot.drawCoil();
    pop()
  }

  

  fill(bgColor);
  noStroke();
  circle(0,0,110);
  
  for(dot of dots){
    vt=millis()/5000%2<1?round(millis()/5000%2,3):round(2-millis()/5000%2,3);
    // vt=round(2-millis()/5000%2,3);
    dot.draw();
    // console.log(vt)
  }

  drawBase();
  addGrain();
  
  // siTime=millis();
}

function drawBase(){
  push()
  fill(bgColor);
  // noStroke();
  let ts=[4*PI/3,5*PI/3];
  let rr=515/2;
  let l;
  translate((l=rr*cos(ts[0])),-rr*sin(ts[0]));
  // console.log(l,-rr*sin(ts[0]))
  // beginShape(QUADS);
  let f=0.07
  // vertex(f*l, -5);
  // vertex(-(2+f)*l,-5);
  // vertex(-(2+f+0.5)*l,180);
  // vertex((f+0.5)*l,180);
  // vertex(0, 0);
  // endShape(CLOSE);
  // stroke(bgColor);
  // line(f*l, -5,-(2+f)*l,-5);
  let totl=3000;
  for (let i=0;i<=totl;i++){
    stroke(0,0,0+25*i/totl)
    line(map(i,0,totl,f*l,(f+0.5)*l), map(i,0,totl,-5,180),  map(i,0,totl,-(2+f)*l,-(2+f+0.5)*l),map(i,0,totl,-5,180)  );   
  }
  
  // for (let i=0;i<20;i++){
    //  line(f*l,-5,-(2+f)*l,-5);
  // }
  pop();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function populatePoints(total,coil){
  for(i=0;i<tPoints;i++){
    if (coil) cDots.push(new Points(i/tPoints,0,i))
    else dots.push(new Points(i/tPoints,random(radius-1,radius+1),i));
  }
}

// rcos(t),rsin(t)

function mouseCheck(){
  pVector=(createVector(mouseX,mouseY).sub(width/2,height/2));
  // console.log(pVector);
  let t=Math.atan(pVector.y/pVector.x)/(2*PI);
  if (pVector.y<0 && pVector.x>0){
    t=-t;
  }
  else if (pVector.y<0 && pVector.x<0){
    t=0.5-t;
  }
  else if (pVector.y>0 && pVector.x<0){
    t=0.5-t;
  }
  else if (pVector.y>0 && pVector.x>0){
    t=1-t;
  }

  // console.log(t);
  t+=random(-0.04,0.04);

  let r=sqrt(pVector.x**2+pVector.y**2);

  // console.log(r)

  if (pVector.mag()<oRadius-20){
    // for (let i=0;i<20;i++){
      pVectors.push( new Points (t,r,i) );
    // }
  } 
}

function mousePressed() {
	clicked = true;
}

function mouseReleased() {
	clicked = false;
}

class Points{
  constructor(t,r,i){
    this.t=t;
    this.at=lerp(0,2*PI,this.t);
    this.r=r;
    this.P=createVector(cos(this.at)*this.r,sin(this.at)*this.r);
    this.oP=createVector(0,0).set(this.P);
    this.rand=random();
    this.i=i;
  }

  drawCoil(){
    stroke(bgColor);
    strokeWeight(3);
    translate(0,35);
    rotate(PI/2);
    let lent=220;
    let wid=40;
    let freq=90000+smoothMod(millis()/5e5,1);
    point(map(cDot.t,0,1,0,lent),coilEq(cDot.t,lent,wid,freq));
  }

  updateE(){
    let tang=getVec(this.at);
    // console.log(this.at,tang.x,tang.y,tang.mag());
    tang.mult(eq(this.at,smoothMod(millis()/5000,10)   ));
    // translate(tang.x,tang.y);
    // translate()
    // point(0,0);
    // stroke('red');
    this.P.set(this.oP.x+tang.x,this.oP.y+tang.y);
    this.dist=this.P.mag();
    return tang;
  }

  drawLightning(cRed,icR,click=false){
    if (!(cRed)) return;
    // let icR=;
    let extra=-40;
    icR=icR+lerp(-8,extra,this.rand/0.1);
    // if (click) {
    //   cRed.at+=random(-0.1,0.1);
    //   cRed.at+=random(-0.1,0.1);
    // }
    push();
    beginShape();
    curveVertex(0, 0);
    curveVertex(0, 0);
    curveVertex(-0.52*this.P.x+icR*cos(cRed.at),-0.54*this.P.y-icR*sin(cRed.at));
    curveVertex(-0.62*this.P.x+icR*cos(cRed.at),-0.72*this.P.y-icR*sin(cRed.at));
    curveVertex(-this.P.x+icR*cos(cRed.at),-this.P.y-icR*sin(cRed.at));
    curveVertex(-this.P.x+icR*cos(cRed.at),-this.P.y-icR*sin(cRed.at));
    endShape();
    rc3.setAlpha(0.5);
    stroke(rc3);
    strokeWeight(15);
    point(-this.P.x+icR*cos(cRed.at),-this.P.y-icR*sin(cRed.at));
    pop();
    // curveVertex(0, 0);
    // curveVertex(0, 0);
    // curveVertex(-0.52*this.P.x+cRed.sP.x,-0.54*this.P.y+cRed.sP.y);
    // curveVertex(-0.62*this.P.x+cRed.sP.x,-0.72*this.P.y+cRed.sP.y);
    // curveVertex(-this.P.x+cRed.sP.x,-this.P.y+cRed.sP.y);
    // curveVertex(-this.P.x+cRed.sP.x,-this.P.y+cRed.sP.y);  
  }

  draw(){
    push()
    let tang=this.updateE(this.at);
    translate(this.P.x,this.P.y);
    // translate(tang.x,tang.y);
    let iCirc=(this.dist<55 && this.rand<0.3);
    if (iCirc ){
      stroke(rc3);
      let added=cReds.indexOf(this);
      if (added==-1){
        this.sP=createVector(0,0).set(this.P);
        cReds.push(this)
      }
      else cReds.splice(1,added);
    }
    else if (this.dist<55){
      noStroke();
    }
    else stroke(lineColor);
    strokeWeight(map(this.dist,0,eqRadius+radius,3,5 ) );
    
    // console.log(siTime,sTime);
    // console.log(millis()-siTime>=sTime);
    // if (millis()-siTime>=sTime){
      // sel=cReds.pop();
      // console.log(sel);
      // console.log('NEW');
      // siTime=millis();
    // }
    // console.log(siTime,sTime);
    let oCirc=this.dist>0.85*(eqRadius+radius) && this.rand<0.15;
    if (oCirc){
      stroke(rc3);
      
      // point(0,0);
      // if (cReds.length>0 && sel){
        // line(0,0,sel.P.x,sel.P.y);
      // }
      
      if (cReds){
        let cRed=cReds.pop();
        // line(0,0,-this.P.x+cReds.pop().sP.x,-this.P.y+cReds.pop().sP.y);
        noFill();
        
        
        if (this.rand<0.05){
          strokeWeight(2.5);
          stroke(offWhite);
        }
        else{
          strokeWeight(5);
          stroke(electricColor);
        }

        if (clicked){
          let cPoint;
          mouseCheck();
          if (pVectors) cPoint=pVectors.pop();
          // fill('black');
          // circle(-this.P.x+cPoint.P.x,-this.P.y-cPoint.P.y,20)
          // console.log(cPoint);
          // cPoint.P=cPoint.P.add(this.P.x,this.P.y);
          // console.log(cPoint.P);
          // cPoint.P=createVector(cPoint.P.x,-this.P.y);
          // console.log(cPoint);
          if (cPoint && this.rand<0.02){
            if (this.rand<0.01){
              strokeWeight(2.5);
              stroke(offWhite);
            }
            else{
              strokeWeight(5);
              stroke(electricColor);
            }
            this.drawLightning(cPoint,cPoint.r,true);
            this.drawLightning(cPoint,cPoint.r,true);
          }
          // this.drawLightning(cPoint);
          // this.drawLightning(cPoint);
        }
        else {
          this.drawLightning(cRed,55);
          this.drawLightning(cRed,55);
        }
        // this.drawLightning(cRed);
        //   this.drawLightning(cRed);
        

        // fill(bgColor);
        // noStroke();
        // circle(-this.P.x,-this.P.y,110);

        // let icR=100;
        // curveVertex(-0.52*this.P.x+icR*cos(cRed.t),-0.54*this.P.y+icR*sin(cRed.t));
        // curveVertex(-0.62*this.P.x+icR*cos(cRed.t),-0.72*this.P.y+icR*sin(cRed.t));
        // curveVertex(-this.P.x+icR*cos(cRed.t),-this.P.y+icR*sin(cRed.t));
        // curveVertex(-this.P.x+icR*cos(cRed.t),-this.P.y+icR*sin(cRed.t));

        // curveVertex(-0.52*this.P.x+icR*cos(this.t),-0.54*this.P.y+icR*sin(this.t));
        // curveVertex(-0.62*this.P.x+icR*cos(this.t),-0.72*this.P.y+icR*sin(this.t));
        // // curveVertex(-this.P.x+icR*cos(this.t),-this.P.y+icR*sin(this.t));
        // curveVertex(-this.P.x+icR*cos(this.t),-this.P.y+icR*sin(this.t));


        // curveVertex(-this.P.x+1.25*cReds.pop().sP.x,-this.P.y+1.25*cReds.pop().sP.y);
        // curveVertex(-this.P.x+1.3*cReds.pop().sP.x,-this.P.y+1.3*cReds.pop().sP.y);
        // curveVertex(-this.P.x+cReds.pop().sP.x,-this.P.y+cReds.pop().sP.y);
        
        stroke(rc3);
      }
      strokeWeight(15);

    }
    // if (!(iCirc)) point(0,0);
    rc3.setAlpha(1);
    point(0,0);
    // line(0,0,tang.x,tang.y);
    pop()
  }
  
}

function addGrain(amount=1){
	l=millis()
	loadPixels()
	for(let i=0;i<nL*4;i+=64){
	//   let noise = map(fxrand(),0,1,-amount,amount)
	// let noise = map(noises[i/4],0,1,-amount,amount)
    let cF;
    cF=((pixels[i]==red(offWhite) && pixels[i+1]==green(offWhite) && pixels[i+2]==blue(offWhite)))?100:0;
    pixels[i] = pixels[i]+cF*noises[i/4]
    pixels[i+1] = pixels[i+1]+cF*noises[i/4]
    pixels[i+2] = pixels[i+2]+cF*noises[i/4]
    pixels[i+3] = pixels[i+3]+cF*noises[i/4]
	}
	updatePixels()
	// console.log(millis()-l);
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