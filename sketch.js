'use strict';

let points=[];
let total;
let P,newP1;
let speed;
let thresholdDist,borderDist,lineDist,circleRadius;
let si,selector;
let minD;
let incTime,resetTime,addTime;
let time,rtime,atime;
let colorScheme;//,ocolorScheme;
let lines,autom,pautom,reset,preset,pLine,bPoint,pPoint;
let lineWeight;
let bgColor,dotColor;
let paused;
let cs;
let dSpeed,spdAmt;
let pointsLimit;
let cColors;
let opacity,opacityAmt;

function setup() {
  //console.log("batataaas");
  createCanvas(windowWidth,windowHeight);
  total=int(random(30,60));
  pointsLimit=500;
  //total=3;
  //console.log(total);
  //total=2;

  //smooth(8);
  //console.log(invertColor('#F2F4F3'))

  paused=false;

  thresholdDist=2;
  borderDist=50;
  lineDist=20;
  circleRadius=7;
  lineWeight=4;

  autom=pautom=lines=pLine=true;
  preset=reset=true;
  bPoint=pPoint=false;
  opacity=true;
  opacityAmt=100;

  time=rtime=atime=0;
  addTime=100;
  incTime=1000;
  resetTime=60000;

  bgColor=color('#F2F4F3');
  dotColor=color(invertColor('#F2F4F3'))
  //ocolorScheme=[[color('#333333'), color('#666A86'), color('#FF6700'), color('#E8DDB5')],[color('#238DA5'),color('#599D6B'), color('#FDBC2E'),color('#C84A4D'), color('#2A303E') ]];
  colorScheme=[[color('#333333'), color('#666A86'), color('#FF6700'), color('#E8DDB5')],[color('#238DA5'),color('#599D6B'), color('#FDBC2E'),color('#C84A4D'), color('#2A303E') ],[color('#FA8334'),color('#1E3888'),color('#191308'),color('#C45AB3'),color('#89937C')],[color('#0081A7'),color('#00AFB9'),color('#291F1E'),color('#FED9B7'),color('#F07167')],[color('#E07A5F'),color('#3D405B'),color('#81B29A'),color('#F2CC8F')],[color('#5F0F40'),color('#9A031E'),color('#FB8B24'),color('#E36414'),color('#0F4C5C')],[color('#c9cba3'),color('#ffe1a8'),color('#e26d5c'),color('#723d46'),color('#472d30')],[color('#dd6e42'),color('#e8dab2'),color('#4f6d7a'),color('#c0d6df'),color('#eaeaea')]];
  //if (opacity) toggleOpacity();

  //console.log(colorScheme);
  
  cs=int(random(0,colorScheme.length));

  //noLoop();

  cColors=[255,0];

  dSpeed=0;
  spdAmt=0.02;

  populatePoints();

  //console.log(points);
}

function draw() {
  //console.log(autom,pautom);

  background(bgColor);

  //noFill();
  // for (let i=0; i< colorScheme.length; i++){
  //   for (let j=0; j<colorScheme[i].length;j++){
  //     stroke(colorScheme[i][j]);
  //     strokeWeight(5);
      
  //   }
  // }
 
  
//console.log('fdasasd');


  // fill(colorScheme[2][1]);
  // circle(50,50,40);
  // circle(60,60,40);
  
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
    if (!paused) {
      // //calculate vector distance between current point and nearest point and normalizes it
      var minV=createVector(nP.P.x-P1.P.x, nP.P.y-P1.P.y);
      if (minV.mag()>thresholdDist) {
        minV.normalize();
        var norm=sqrt(sq(minV.x)+sq(minV.y));
        minV.set(minV.x/norm , minV.y/norm);

      //   //update pos for both points
        P1.updateV(minV);
        minV.mult(-1);
        nP.updateV(minV);
      }
      if (points.length>1) P1.updatePos();

    }
    if (lines) P1.drawConnected();

    // for (let i = 0; i < points.length; i++) {
    //   var P=points[i];
    //   for (let k=0;k<P.drawn;k++){
    //     var P2=P.drawn[k];
    //     console.log('hfasd');
    //     line(this.P.x, this.P.y, P2.P.x, P2.P.y);
    //   }
    // }
    //console.log("yes");
  }

  //console.log(millis(),time,incTime);
  if (millis()-time>=incTime && !paused) {
    //console.log('got here');
    if (autom==true) addPoint();
   
    for (let k = 0; k < points.length; k++) {
      var P1=points[k];
      P1.connected=[];
      P1.drawn=[];
    }

    if (lines) connectPoints();

    for (let k = 0; k < points.length; k++) {
      var P1=points[k];
      P1.drawConnected();
    }

  //console.log('sdfasd');

    time=millis();
  }
  

  if (millis()-rtime>=resetTime && reset==true && !paused){
    total=int(random(30,60));
    populatePoints();
    rtime=millis();
    //pautom=(autom==false)?true:false;
    autom=(autom==true)?true:false;
    pautom=(autom==true)?true:false;
    //pautom=autom=true;
    preset=reset=true;
    //preset=(reset==true)?true:false;
    //reset=(reset==true)?false:true;
    
  }

  if (keyIsDown(109) || keyIsDown(189)){
    adjustSpeed(-spdAmt);
  }
  else if (keyIsDown(187)){
    adjustSpeed(spdAmt);
  }
  else if (keyIsDown(UP_ARROW)) {
    //console.log((millis()-atime) >=addTime)
    if (( (millis()-atime) >=addTime) && ((points.length+1)<pointsLimit)){
      //console.log('yes');
      addPoint();
      total+=1;
      atime=millis();
    }
    
  }
  else if (keyIsDown(DOWN_ARROW)) {
    //console.log((millis()-atime) >=addTime)
    if (( (millis()-atime) >=addTime) && ((points.length-1)>0)){
      //console.log('yes');
      points.splice(points.length-1,1);
      total-=1;
      atime=millis();
    }
    
  }

  //points.sort(dynamicSort("P.x"));
  //sort(dataArray, count);
  //points.sort((a,b)=>(a.P.x < b.P.x) ? -1 : (a.P.x > b.P.x) ? 1 : 0);
}


function mousePressed() {
  var mouseRadius=5;

  selector=0;
  for (let i=0; i<points.length; i++) {
    if ((abs(mouseX-points[i].P.x)<=mouseRadius) && (abs(mouseY-points[i].P.y)<=mouseRadius) && (mouseButton == LEFT)) {
      //println("p1", i);
      selector=1;
      si=i;
    }
    if ((abs(mouseX-points[i].P.x)<=mouseRadius) && (abs(mouseY-points[i].P.y)<=mouseRadius) && (mouseButton == RIGHT)) {
      //println("p1", i);
      points.splice(i,1);
    }
  }

  if (selector==0 && (mouseButton == LEFT)) {
    if (total+1<pointsLimit){
      newP1=createVector(mouseX, mouseY);
      if (newP1.x>borderDist && newP1.x<width-borderDist && newP1.y>borderDist && newP1.y<height-borderDist){
        points.push(new Point(newP1));
        
        var nP=nearestPoint(points[points.length-1], points.length-1);
        //console.log(minD);
        connectPoints();
        //points[points.length - 1].getProperties();
        total+=1;
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
    //var nP=nearestPoint(points[si], si);
    //console.log(minD);
    //points[si].getProperties();
    for (let k = 0; k < points.length; k++) {
      var P1=points[k];
      P1.connected=[];
    }
  }
}

function mouseWheel(event) {
  var e = event.delta;
  if (lineWeight-e/10>0.1 && lineWeight-e/10<100){
    lineWeight-=e/10;
    //console.log(lineWeight);
  }
}

function keyTyped() {

  if (key == ' '|| key=='n') {
      points=[];
      populatePoints();
      //newColorScheme();
      rtime=millis();
  }

  if (key == 'a' && !paused) {
      if (autom==true){
        if (reset==false) reset=true;
        pautom=false;
        autom=false;
      }
      else {
        if (reset==true) reset=false;
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
    //console.log(pLine);
  }

  if (key == 'l') {
    // pPoint= (bPoint==true && pPoint==false) ? true: false;

    // if (bPoint==true && pPoint==false && lines==false){
    //   bPoint=false;
    //   //pPoint=true;
    // }
    // else if (bPoint==true && pPoint==true && lines==false){
    //   bPoint=true
    // }
    // else{
    //   bPoint=true;
    // }
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

  if (key == 'm') {
    bPoint= (bPoint==true) ? false: true;
    pPoint=!bPoint;
  }
  

  if (key == 'r' && !paused) {
    // if (reset==true) reset=false;
    // else reset=true;
    if (reset==true){
        preset=false;
        reset=false;
      } 
      else {
        preset=true;
        reset=true;
      }
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
    invertLines();
  }

  if (key=='x'){
    randomizeLineColor();
  }
}

function adjustSpeed(amt){
  for (let k = 0; k < points.length; k++) {
      var P1=points[k];
      if ( (amt>0 && P1.speed+amt<3) || (amt<0 && P1.speed+amt>0.5) ){
        P1.speed+=amt;
      }
    }

  if( (amt>0 && dSpeed<3) || (amt<0 && dSpeed>0)) dSpeed+=amt;

  // var speeds=[];
  // for (let k = 0; k < points.length; k++) {
  //   var P1=points[k];
  //   speeds.push(P1.speed);
  // }
  //var maxValue = Math.max(...speeds);
  //var minValue = Math.min(...speeds);
  //console.log(minValue,maxValue,dSpeed);
}

function toggleOpacity(){
  console.log(colorScheme);
  for (let i=0;i<colorScheme.length;i++){
    for (let j=0;j<colorScheme[i].length;j++){
      //for (let k=0; k<3; k++){
      colorScheme[i][j].setAlpha(opacityAmt);
      //console.log(colorScheme[i][j].levels);
    }
  }
}

function newColorScheme(){
  colorScheme=[[color('#333333'), color('#666A86'), color('#FF6700'), color('#E8DDB5')],[color('#238DA5'),color('#599D6B'), color('#FDBC2E'),color('#C84A4D'), color('#2A303E') ],[color('#FA8334'),color('#1E3888'),color('#191308'),color('#C45AB3'),color('#89937C')],[color('#0081A7'),color('#00AFB9'),color('#291F1E'),color('#FED9B7'),color('#F07167')],[color('#E07A5F'),color('#3D405B'),color('#81B29A'),color('#F2CC8F')],[color('#5F0F40'),color('#9A031E'),color('#FB8B24'),color('#E36414'),color('#0F4C5C')],[color('#c9cba3'),color('#ffe1a8'),color('#e26d5c'),color('#723d46'),color('#472d30')],[color('#dd6e42'),color('#e8dab2'),color('#4f6d7a'),color('#c0d6df'),color('#eaeaea')]];
  //if (opacity) toggleOpacity();

  cs=int(random(0,colorScheme.length));
    for (let k = 0; k < points.length; k++) {
      var P1=points[k];
      P1.c=int(random(0,colorScheme[cs].length));
  }
}


function invertColors(){
  invertLines();
  invertBgP();
}

function invertLines(){
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
  //cs=int(random(0,colorScheme.length));
    //for (let k = 0; k < points.length; k++) {
      //var P1=points[k];
      //P1.c=int(random(0,colorScheme[cs].length));
   // }
}


function invertBgP(){
  for (let j=0; j<3; j++){
    bgColor.levels[j]=255-bgColor.levels[j]
    dotColor.levels[j]=255-dotColor.levels[j]
  }
  cColors=[cColors[1],cColors[0]];
  //console.log(cColors);
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
  if (points.length<pointsLimit){
    var P=createVector(random(borderDist, width-borderDist), random(borderDist, height-borderDist));
    points.push(new Point(P));
    total+=1;
    //rtime=millis();
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
        //line(P1.P.x,P1.P.y,P2.P.x,P2.P.y);
        P1.connect(P2);
      }
    }
  }

  // var end = new Date();
  // var millisecondsElapsed = end - start;
  //console.log(millisecondsElapsed);


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
    this.c=int(random(0, colorScheme[cs].length  ));
  }

  getProperties(){
    console.log("P:",this.P,"\nSpeed:",this.speed,"\nmV",this.mV,"\nConnected:",this.connected,"\nDrawn:",this.drawn,"\nColor:",this.c);
  }

  connect(P2) {
    this.connected.push(P2);
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
    //println(this.connected.size());
    for (let i=0; i<this.connected.length; i++) {
      var P2=this.connected[i];
      //stroke(this.c[0],this.c[1],this.c[2]);
      //console.log(colorScheme[cs][this.c]);
      var ccolor=colorScheme[cs][this.c]
      //if (opacity) ccolor.setAlpha(10);
      stroke(ccolor);
      //console.log(colorScheme);
      //var lw=float(lineWeight);
      //strokeWeight(lineWeight);

      if (P2.drawn.includes(this)==false) {
        var lw=float(lineWeight);
        if (pLine){
          lw=map(this.distance(P2), this.minD, this.minD+lineDist, lineWeight/2, lineWeight*2);
          //console.log(lw);
          // if (lw>lineWeight+2){
          //   lw=lw+2;
          // }
        }
        strokeWeight(lw);
        line(this.P.x, this.P.y, P2.P.x, P2.P.y);
        this.drawn.push(P2);
      }
    }
  }
  

}
