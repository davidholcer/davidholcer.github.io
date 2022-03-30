'use strict';

//Coded by David Holcer
//June 17, 2021
//NFT 2.0 License

let points=[];
let total;
let P,newP1;
let speed;
let thresholdDist,borderDist,lineDist,circleRadius;
let si,selector;
let minD;
let incTime,resetTime,addTime,bgTime,lineTime;
let time,rtime,atime,btime,ltime;
let colorScheme;//,ocolorScheme;
//booleans
let lines,autom,pautom,reset,preset,pLine,bPoint,pPoint,iLines,iBg;
let lineWeight;
let stype;
let bgColor,dotColor;
let paused;
let cs;
//controls change in speed
let dSpeed,spdAmt;
let pointsLimit;
let cColors;
let opacity,opacityAmt;

function setup() {
  createCanvas(windowWidth,windowHeight);
  total=int(random(30,60));
  pointsLimit=500;
  //total=3;
  //console.log(total);
  //total=2;

  paused=false;

  thresholdDist=2;
  borderDist=50;
  lineDist=20;
  circleRadius=map(min(windowWidth,windowHeight),500,1200,4,7);
  lineWeight=4;

  iLines=iBg=false;
  autom=pautom=lines=true;
  pLine=true;
  preset=reset=true;
  bPoint=pPoint=false;
  opacity=true;
  opacityAmt=200;

  time=rtime=atime=btime=ltime=stype=0;
  lineTime=1000;
  addTime=100;
  incTime=1000;
  resetTime=60000;
  bgTime=300000;

  bgColor=color('#F2F4F3');
  dotColor=color(invertColor('#F2F4F3'))
  //ocolorScheme=[[color('#333333'), color('#666A86'), color('#FF6700'), color('#E8DDB5')],[color('#238DA5'),color('#599D6B'), color('#FDBC2E'),color('#C84A4D'), color('#2A303E') ]];
  colorScheme=[[color('#333333'), color('#666A86'), color('#FF6700'), color('#E8DDB5')],[color('#238DA5'),color('#599D6B'), color('#FDBC2E'),color('#C84A4D'), color('#2A303E') ],[color('#FA8334'),color('#1E3888'),color('#191308'),color('#C45AB3'),color('#89937C')],[color('#0081A7'),color('#00AFB9'),color('#291F1E'),color('#FED9B7'),color('#F07167')],[color('#E07A5F'),color('#3D405B'),color('#81B29A'),color('#F2CC8F')],[color('#5F0F40'),color('#9A031E'),color('#FB8B24'),color('#E36414'),color('#0F4C5C')],[color('#c9cba3'),color('#ffe1a8'),color('#e26d5c'),color('#723d46'),color('#472d30')],[color('#dd6e42'),color('#e8dab2'),color('#4f6d7a'),color('#c0d6df'),color('#eaeaea')],[color('#001219'), color('#005F73'), color('#0A9396'), color('#94D2BD'), color('#E9D8A6'), color('#EE9B00'), color('#CA6702'), color('#BB3E03'),color('#AE2012'),color('#9B2226')],[color('#ee4a1b'), color('#61d5d4'), color('#3e73a2'), color('#bebc9e'), color('#060b0a')]];
  if (opacity) toggleOpacity();
  cs=int(random(0,colorScheme.length));
  cColors=[255,0];

  //sets dark/light mode based on local time
  var now = new Date();
  checkTime(now);

  dSpeed=0;
  spdAmt=0.02;

  populatePoints();
  //createLoop({duration:3, gif:true})

console.log("Moving Points by David Holcer\nMinted June 17, 2021\n------------------------------\n\nControls:\n"+
"\'a\' to toggle automatically adding 1 point/second (indicated by a circle in the bottom right corner corner, initially ON)\n"+
"\'r\' to toggle resetting points after 1 min (indicated by a double circle in the bottom right corner corner, initially ON)\n"+
"\'x\' to randomize colors\n"+
"\'c\' to randomize color scheme\n"+
"\'v\' to invert line color\n"+
"\'b\' to invert background and points\n"+
"\'i\' to invert background and lines\n"+
"\'n\' or SPACE to randomize points\n"+
"\'m\' to toggle points\n"+
"\'k\' to toggle variable width lines (initially ON)\n"+
"\'l\' to toggle lines\n"+
"\';\' to switch line type\n"+
"\'o\' to toggle opacity\n"+
"\'p\' to pause\n"+
"\'-\' to decrease speed\n"+
"\'=\' to increase speed\n"+
"\',\' to lower opacity\n"+
"\'.\' to increase opacity\n"+
"Mouse scroll to increase/decrease line width\n"+
"Click to add a point\n"+
"UP ARROW to add points\n"+
"DOWN ARROW to remove points\n"+
"Click and Drag to move a point");


}
function draw() {
  background(bgColor);

  if (autom==true) drawCircle(30,10);
  if (reset==true){
    drawCircle(5,10);
    drawCircle(5,5);
  }

  if (lines) connectPoints();

  for (let i = 0; i < points.length; i++) {
    var P1=points[i];
    P1.drawPoint();
    var nP=nearestPoint(P1, i);
    // //gets nearest point to current point
    P1.minD=minD;
    if (lines) P1.drawConnected();
    if (!paused) {
      // //calculate vector distance between current point and nearest point and normalizes it
      var minV=createVector(nP.P.x-P1.P.x, nP.P.y-P1.P.y);
      if (minV.mag()>thresholdDist) {
        minV.normalize();

      //   //update pos for both points
        P1.updateV(minV);
        minV.mult(-1);
        nP.updateV(minV);
      }
      P1.updatePos();
    }
  }

  //console.log(millis(),time,incTime);
  if (millis()-time>=incTime && !paused) {
    //console.log('got here');
    if (autom==true && points.length+1<pointsLimit) addPoint();
   
    for (let k = 0; k < points.length; k++) {
      var P1=points[k];
      P1.connected=[];
      P1.drawn=[];
    }

    if (lines) connectPoints();
    time=millis();
  }
  

  if (millis()-rtime>=resetTime && reset==true && !paused){
    resetAll();
  }

  if (millis()-btime>=bgTime && !paused) {
    var now = new Date();
    checkTime(now);
  }

  if (keyIsDown(109) || keyIsDown(189)){
    adjustSpeed(-spdAmt);
  }
  else if (keyIsDown(187)){
    adjustSpeed(spdAmt);
  }
  else if (keyIsDown(188)){
    if (opacityAmt-1>=10) opacityAmt-=1;
    toggleOpacity();
  }
  else if (keyIsDown(190)){
    if (opacityAmt+1<=255) opacityAmt+=1;
    toggleOpacity();
  }

  else if (keyIsDown(UP_ARROW)) {
    if (( (millis()-atime) >=addTime) && ((points.length+1)<pointsLimit)){
      //console.log('yes');
      addPoint();
      total+=1;
      atime=millis();
    }
    
  }
  else if (keyIsDown(DOWN_ARROW)) {
    if (( (millis()-atime) >=addTime) && ((points.length-1)>1)){
      //console.log('yes');
      points.splice(points.length-1,1);
      total-=1;
      atime=millis();
    }
    
  }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    
    circleRadius=map(min(windowWidth,windowHeight),500,1200,4,7);
    if (circleRadius>7) circleRadius=7;

    //console.log(tempX,windowWidth);
    //console.log(windowWidth, windowHeight);
    for (let i=0; i<points.length; i++) {
      //console.log(points[i].P.x,points[i].P.x/width*windowWidth);
      points[i].P.x=points[i].P.x/points[i].oCor.x*windowWidth;
      points[i].P.y=points[i].P.y/points[i].oCor.y*windowHeight;
      points[i].oCor.set(windowWidth,windowHeight);
    }
}


function mousePressed() {
  var mouseRadius=5;

  selector=0;
  for (let i=0; i<points.length; i++) {
    if ((abs(mouseX-points[i].P.x)<=mouseRadius) && (abs(mouseY-points[i].P.y)<=mouseRadius) && (mouseButton == LEFT)) {
      selector=1;
      si=i;
    }
    if ((abs(mouseX-points[i].P.x)<=mouseRadius) && (abs(mouseY-points[i].P.y)<=mouseRadius) && (mouseButton == RIGHT)) {
      points.splice(i,1);
    }
  }

  if (selector==0 && (mouseButton == LEFT)) {
    if (total+1<pointsLimit){
      newP1=createVector(mouseX, mouseY);
      if (newP1.x>borderDist && newP1.x<width-borderDist && newP1.y>borderDist && newP1.y<height-borderDist){
        points.push(new Point(newP1));
        
        var nP=nearestPoint(points[points.length-1], points.length-1);
        connectPoints();
        if (points.length+1<pointsLimit) total+=1;
        rtime=millis();
      }
    }
  }

  if (selector==0 && (mouseButton == RIGHT)) {
    //random index to remove
    var ri=int(random(0, points.length));
    //remove point at random index
    points.splice(ri,1);
    rtime=millis();
  }
}

function mouseDragged() {
  newP1=createVector(mouseX, mouseY);
  if (selector>0) {

    points[si].movePoint(selector, newP1);
    for (let k = 0; k < points.length; k++) {
      var P1=points[k];
      P1.connected=[];
    }
  }
}

function mouseWheel(event) {
  var e = event.delta;
  if (lineWeight-e/10>2 && lineWeight-e/10<100){
    lineWeight-=e/10;
  }
  for (let i=0; i<points.length; i++) {
    if (points[i].sw-e/10>2 && points[i].sw-e/10<100){
      points[i].sw-=e/10;
    }
  }
}

function keyTyped() {

  if (key == ' '|| key=='n') {
      points=[];
      populatePoints();
      newColorScheme();
      rtime=millis();
  }

  if (key == 'a' && !paused) {
      if (autom==true){
        if (reset==false) reset=true;
        pautom=false;
        autom=false;
      }
      else {
        //if (reset==true) reset=false;
        pautom=true;
        autom=true;
      }
    }

  if(key=='b'){
    invertBgP()
  }

  if (key == 'c') {
    newColorScheme();
  }

  if (key == 'g') {
    console.log(points.length);
  }  

  if (key == 'i') {
    invertColors();
  }

  if (key == 'k') {
    pLine=(pLine==true)?false:true;
    for (let k = 0; k < points.length; k++) {
      points[k].sw=lineWeight;
    }
  }

  if (key == 'l') {
    var temp=(bPoint==true)?true:false

    if (!pPoint && bPoint && !lines){
      bPoint=false;
    }
    else{
      bPoint=true;
    }

    pPoint=(temp==true)?true:false;
    lines= (lines==true) ? false: true;
  }

  if (key==';'){
    stype=(stype+1)%3
    switch (stype){
      case 0:
        strokeCap(ROUND);
        break;
      case 1:
        strokeCap(SQUARE);
        break;
      case 2:
        strokeCap(PROJECT);
        break;
    }
  }

  if (key == 'm') {
    if (!(bPoint==true && lines==false)){
      bPoint= (bPoint==true) ? false: true;
      pPoint=!bPoint;
    }
  }
  

  if (key == 'r' && !paused) {
    if (reset==true){
        preset=false;
        reset=false;
      } 
      else {
        preset=true;
        reset=true;
      }
  }

  if (key == 'o') {
    opacity= (opacity==true) ? false: true;
    colorScheme=[[color('#333333'), color('#666A86'), color('#FF6700'), color('#E8DDB5')],[color('#238DA5'),color('#599D6B'), color('#FDBC2E'),color('#C84A4D'), color('#2A303E') ],[color('#FA8334'),color('#1E3888'),color('#191308'),color('#C45AB3'),color('#89937C')],[color('#0081A7'),color('#00AFB9'),color('#291F1E'),color('#FED9B7'),color('#F07167')],[color('#E07A5F'),color('#3D405B'),color('#81B29A'),color('#F2CC8F')],[color('#5F0F40'),color('#9A031E'),color('#FB8B24'),color('#E36414'),color('#0F4C5C')],[color('#c9cba3'),color('#ffe1a8'),color('#e26d5c'),color('#723d46'),color('#472d30')],[color('#dd6e42'),color('#e8dab2'),color('#4f6d7a'),color('#c0d6df'),color('#eaeaea')],[color('#001219'), color('#005F73'), color('#0A9396'), color('#94D2BD'), color('#E9D8A6'), color('#EE9B00'), color('#CA6702'), color('#BB3E03'),color('#AE2012'),color('#9B2226')],[color('#ee4a1b'), color('#61d5d4'), color('#3e73a2'), color('#bebc9e'), color('#060b0a')]];
    if (opacity) toggleOpacity();
  }

  if (key == 'p') {
    time=millis();
    rtime=millis();
    paused= (paused==true) ? false: true;

    if (autom==true){
      autom=false;
      pautom=true;
    }
    else if (autom==false){
      if (pautom==true){
        autom=true;
      }
      else{
        autom=false;
      }
    }

    if (reset==true){
      reset=false;
      preset=true;
    }
    else if (reset==false){
      if (preset==true){
        reset=true;
      }
      else{
        reset=false;
      }
    }

  }

  if(key=='v'){
    invertLines(true);
  }

  if (key=='x'){
    randomizeLineColor();
  }
}

function resetAll(){
    total=int(random(30,60));
    populatePoints();
    rtime=millis();
    autom=(autom==true)?true:false;
    pautom=(autom==true)?true:false;
    preset=reset=true;
    bPoint=pPoint=false;
    lines=true;
    newColorScheme();
}

function checkTime(someDate){
    //(not inverted and night) or (inverted and day)
    if (  ((someDate.getHours()>=18 || someDate.getHours()<6) && cColors[1]==0) ||  (someDate.getHours()>=6 && someDate.getHours()<18 && cColors[1]==255) ){
      invertLines(true);
      invertBgP();
      //invertLines(false);
    }
}

function adjustSpeed(amt){
  for (let k = 0; k < points.length; k++) {
      var P1=points[k];
      if ( (amt>0 && P1.speed+amt<3) || (amt<0 && P1.speed+amt>0.1) ){
        P1.speed+=amt;
      }
    }

  if( (amt>0 && dSpeed<3) || (amt<0 && dSpeed>0)) dSpeed+=amt;
}

function toggleOpacity(){
  for (let i=0;i<colorScheme.length;i++){
    for (let j=0;j<colorScheme[i].length;j++){
      colorScheme[i][j].setAlpha(opacityAmt);
    }
  }
}

function newColorScheme(){
  colorScheme=[[color('#333333'), color('#666A86'), color('#FF6700'), color('#E8DDB5')],[color('#238DA5'),color('#599D6B'), color('#FDBC2E'),color('#C84A4D'), color('#2A303E') ],[color('#FA8334'),color('#1E3888'),color('#191308'),color('#C45AB3'),color('#89937C')],[color('#0081A7'),color('#00AFB9'),color('#291F1E'),color('#FED9B7'),color('#F07167')],[color('#E07A5F'),color('#3D405B'),color('#81B29A'),color('#F2CC8F')],[color('#5F0F40'),color('#9A031E'),color('#FB8B24'),color('#E36414'),color('#0F4C5C')],[color('#c9cba3'),color('#ffe1a8'),color('#e26d5c'),color('#723d46'),color('#472d30')],[color('#dd6e42'),color('#e8dab2'),color('#4f6d7a'),color('#c0d6df'),color('#eaeaea')],[color('#001219'), color('#005F73'), color('#0A9396'), color('#94D2BD'), color('#E9D8A6'), color('#EE9B00'), color('#CA6702'), color('#BB3E03'),color('#AE2012'),color('#9B2226')],[color('#ee4a1b'), color('#61d5d4'), color('#3e73a2'), color('#bebc9e'), color('#060b0a')]];
  if (iLines==true){
    invertLines(false);
  }
  if (opacity) toggleOpacity();

  cs=int(random(0,colorScheme.length));
    for (let k = 0; k < points.length; k++) {
      var P1=points[k];
      P1.c=int(random(0,colorScheme[cs].length));
  }
}


function invertColors(){
  invertLines(true);
  invertBgP();
}

function invertLines(riLines){
  if (riLines==true) iLines= (iLines==true) ? false: true;
  for (let i=0;i<colorScheme.length;i++){
    for (let j=0;j<colorScheme[i].length;j++){
      for (let k=0; k<3; k++){
        colorScheme[i][j].levels[k]=255-colorScheme[i][j].levels[k];
      }
    }
  }
}

function randomizeLineColor(){
  for (let i=0; i<colorScheme.length;i++){
    for (let j=0;j<colorScheme[i].length;j++){
      for (let k=0; k<3; k++){
        colorScheme[i][j].levels[k]=int(random(0,256));
      }
    }
  }
}


function invertBgP(){
  iBg=(iBg==true)?false:true;
  for (let j=0; j<3; j++){
    bgColor.levels[j]=255-bgColor.levels[j]
    dotColor.levels[j]=255-dotColor.levels[j]
  }
  cColors=[cColors[1],cColors[0]];
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


function drawCircle(space,radius){
  fill(cColors[0]);
  stroke(cColors[1]);

  strokeWeight(2);
  ellipseMode(CENTER);
  circle(width-borderDist/2-space,height-borderDist/2,radius);
}

function addPoint(){
  if (points.length+1<pointsLimit){
    var P=createVector(random(borderDist, width-borderDist), random(borderDist, height-borderDist));
    points.push(new Point(P));
    total+=1;
  }
}

function populatePoints(){
  points=[];
  for (let i=0; i<total; i++) {
    P=createVector(random(borderDist, width-borderDist), random(borderDist, height-borderDist));
    points.push(new Point(P));
  }

}


function nearestPoint(P1, i) {
  var nP=P1;
  minD=width*2;
  for (let j = 0; j < points.length; j++) {
    if (j!=i) {
      var P2=points[j];
      var distt=P1.distance(P2);

      if (distt<minD && distt>thresholdDist) {
        minD=distt;
        nP=P2;
      }
    }
  }

  return nP;
}


function connectPoints() {
  // var start = new Date();

  for (let i = 0; i < points.length; i++) {
    var P1=points[i];
    for (let j = 0; j < points.length; j++) {
      var P2=points[j];
      var dd=int(P1.distance(P2));
      if ((int(P1.minD)-lineDist<= (dd)) && ((dd) <= int(P1.minD)+lineDist)) {
        P1.connect(P2);
      }
    }
  }
}


function lineThickness(p1,p2,i){
    if (pLine && millis()-p1.ltime>lineTime && !paused){
      var nP=nearestPoint(p1, i);
      p1.minD=minD;
      var lw=map(p1.distance(p2), p1.minD, p1.minD+lineDist, lineWeight/3, lineWeight*1.5);

      if (lw>lineWeight*2) lw=lineWeight*1.5;
      else if (lw<2) lw=2;
      p1.ltime=millis();
      p1.sw=lw;
      return lw;
    }
    return p1.sw;
  }  



class Point {

  constructor(P) {
    this.P=P;
    //this.speed=random(0.5, 1);
    this.speed=random(0.1+dSpeed, 0.5+dSpeed);
    //console.log(this.speed);
    this.mV=createVector(0, 0);
    this.connected=[];
    this.drawn=[];
    //this.c=colorScheme[int(random(0, colorScheme.length))];
    this.c=int(random(0, colorScheme[cs].length));
    this.oCor=createVector(width,height);
    this.sw=lineWeight;
    this.ltime=millis();
  }

  getProperties(){
    console.log("P:",this.P,"\nSpeed:",this.speed,"\nmV",this.mV,"\nConnected:",this.connected,"\nDrawn:",this.drawn,"\nColor:",this.c);
  }

  connect(P2) {
    //this.connected.push(P2);
    if (this.connected.includes(P2)==false) this.connected.push(P2);
  }


  drawPoint() {
    strokeWeight(circleRadius);
    stroke(dotColor);
    if (bPoint==true) point(this.P.x, this.P.y);
  }


  distance(P2) {
    var distt=dist(this.P.x, this.P.y, P2.P.x, P2.P.y);
    return distt;
  }

  updateV(dVec) {
    dVec.setMag(this.speed);
    this.mV=dVec;
  }

  updatePos() {
    if (this.P.x<borderDist || this.P.x > width-borderDist) {
      this.mV.set(0, 0);
    }
    if (this.P.y<borderDist || this.P.y > height-borderDist) {
      this.mV.set(0, 0);
    }
    this.P.add(this.mV);
  }

  movePoint(selector, newP1) {
    if (selector==1) {
      this.P=newP1;
    }
  }

  drawConnected() {
    for (let i=0; i<this.connected.length; i++) {
      var P2=this.connected[i];
      var ccolor=colorScheme[cs][this.c]
      stroke(ccolor);
      if (P2.drawn.includes(this)==false) {

        var lw=float(lineWeight);
        this.sw=lineThickness(this,P2,i);
        strokeWeight(this.sw);
        line(this.P.x, this.P.y, P2.P.x, P2.P.y);
        this.drawn.push(P2);
      }
    }
  }

}
