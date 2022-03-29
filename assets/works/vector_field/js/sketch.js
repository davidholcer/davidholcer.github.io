//Created by David Holcer
//Non-commercial license
//Sep 15,2021

let points=[];
let stars=[];
let total;
let randomOffset;
let t;
let paused,showField,lines;
// let dt;
let per;
let cols;
let bgColor;
let start,prev;
let ar,br,etime;
let pvcenter,vcenter;
let clicked,beenclicked;
let vec1;
let easing;//,diff;
let center;
let palettes,ppalette;
let holeW;
let fd;
let planAmt,planCut,plansR,planVals;
// let rands;

//TODO: 
//rescale equation+thickness to be proportional to current screen

function setup() {
  // randomSeed(1);
  createCanvas(windowWidth, windowHeight);
  console.log(width,height);
  // sLength=min(windowWidth,windowHeight);
  // randomSeed(40);
  frameRate(60);
  randomOffset=createVector(random(-100,100),random(-100,100));
  // randomOffset=p5.Vector.random2D().mult(100);
  colorMode(HSB);
  total=2000;
  t=0;
  // dt=0.1;
  per=10;
  bgColor=7;
  easing=2e-4;

  planAmt=0.008;
  planCut=1-planAmt
  plansR=[80,18,2];
  planVals=[]
  for (let i=0;i<plansR.length;i++){
    planVals.push(plansR.slice(0,i+1).reduce((a,b)=>a+b)/100);
  }

  // holeW=5;
  holeW=random(40,60);
  // cols=[color(random(360),random(50,100),random(50,100)),color(random(360),random(50,100),random(50,100))]
  // cols=[color('#03045e'),color('#caf0f8')]

  cols=[color(random(360),random(75,100),random(30,60))]
  // cols.push(color(hue(cols[0])+Math.sign(randomOffset.x)*map(abs(randomOffset.x),0,100,50,200),saturation(cols[0])+map(randomOffset.x,-100,100,-40,40),100-brightness(cols[0])));
  cols.push(color(hue(cols[0])+2*randomOffset.x,saturation(cols[0])+map(randomOffset.x,-100,100,-20,20),100-brightness(cols[0])));
  // console.log(cols)
  // cols=[color('#EC3822'),color('#E7863A'),color('#00654F'),color('#E8C5A9'),color('#798A70')];
  showField=false;
  lines=true;
  paused=false;
  start=millis();
  prev=0;
  populatePoints(points);
  populatePoints(stars,1);

  beenclicked=false;
  // noLoop();
  // palettes=[["#000000","#ffffff","#c8c8c8"],["#ccc5b9","#403d39","#eb5e28"],["#002642","#840032","#e5dada"],["#0c0a3e","#f9564f","#f3c677"],["#264653","#e9c46a","#e76f51"],["#e63946","#f1faee","#1d3557"],["#2b2d42","#edf2f4","#d90429"],["#003049","#d62828","#eae2b7"],["#14213d","#fca311","#e5e5e5"],["#e0fbfc","#ee6c4d","#293241"],["#011627","#e71d36","#ff9f1c"],["#1a535c","#ff6b6b","#ffe66d"],["#355070","#e56b6f","#eaac8b"],["#283d3b","#197278","#edddd4"],["#2b2d42","#edf2f4","#d80032"],["#ffe066","#247ba0","#70c1b3"],["#ff6700","#ebebeb","#004e98"],["#177e89","#db3a34","#ffc857"],["#b80c09","#fbfbff","#040f16"],["#001427","#f4d58d","#8d0801"],["#1f271b","#28afb0","#f4d35e"],["#e0fbfc","#9db4c0","#253237"],["#001427","#708d81","#f4d58d"],["#0029c1","#f7dc09","#e22b00"],["#0c090d","#f9c22e","#53b3cb"],["#ed1c24","#fdfffc","#020100"],["#fff2cd","#ff004c","#610d4b"],["#fbfef9","#191923","#f39237"],["#ffba08","#3f88c5","#032b43"],["#f1faee","#a8dadc","#1d3557"],["#010000","#ffa100","#f1f2f1"],["#0d3b66","#faf0ca","#f95738"],["#e6eed6","#bbc5aa","#090c02"],["#0d0b0b","#d80056","#ecedef"],["#55827A","#362D2D","#EBA58A"],["#fff3b0","#9e2a2b","#540b0e"],["#0d1b2a","#778da9","#e0e1dd"],["#0c0f0a","#ff206e","#fbff12"],["#2f4550","#b8dbd9","#f4f4f9"],["#ebd4cb","#da9f93","#b6465f"],["#3e92cc","#fffaff","#1e1b18"],["#fecc50","#010b8b","#1e0521"],["#c9e4ca","#3b6064","#364958"]];
  palettes=[[color('#333333'), color('#666A86'), color('#FF6700'), color('#E8DDB5')],[color('#238DA5'),color('#599D6B'), color('#FDBC2E'),color('#C84A4D'), color('#2A303E') ],[color('#FA8334'),color('#1E3888'),color('#191308'),color('#C45AB3'),color('#89937C')],[color('#0081A7'),color('#00AFB9'),color('#291F1E'),color('#FED9B7'),color('#F07167')],[color('#E07A5F'),color('#3D405B'),color('#81B29A'),color('#F2CC8F')],[color('#5F0F40'),color('#9A031E'),color('#FB8B24'),color('#E36414'),color('#0F4C5C')],[color('#c9cba3'),color('#ffe1a8'),color('#e26d5c'),color('#723d46'),color('#472d30')],[color('#dd6e42'),color('#e8dab2'),color('#4f6d7a'),color('#c0d6df'),color('#eaeaea')],[color('#001219'), color('#005F73'), color('#0A9396'), color('#94D2BD'), color('#E9D8A6'), color('#EE9B00'), color('#CA6702'), color('#BB3E03'),color('#AE2012'),color('#9B2226')],[color('#ee4a1b'), color('#61d5d4'), color('#3e73a2'), color('#bebc9e'), color('#060b0a')],[color("#e3170a"),color("#2a2b2a"),color("#fdb833"),color("#7d8491"),color("#c04cfd")]];
  ppalette=random(palettes);

  

  // rands=[]
  // for (i=0;i<500;i++){
  //   rands.push(random());
  // }

  // let t1=createVector(-width/2,-height/2);
  // let t2=createVector(-width/2,height/2);
  // let t3=createVector(width/2,-height/2);
  // let t4=createVector(width/2,height/2);
  // // console.log(furthestDist(t1));
  // let tests=[t1,t2,t3,t4]
  // console.log(tests.map(tx => furthestDist(tx)));

}

function draw() {
  background(bgColor);
  if (showField) drawVectors();
  stars.forEach(drawStars);
  points.forEach(runAll);
  center.drawCircle();
  if (!paused && !clicked){
    // t+=dt;
    
    //set t to a function of runtime
    let vtime=millis()-start+prev;
    t=timeFunc(vtime/1000);
    // t=0;
    // console.log(t);
  }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    // sLength=min(windowWidth,windowHeight);
    // maxLength=max(windowWidth,windowHeight);
    stars.forEach(resizeInd);
    points.forEach(resizeInd);
}

let resizeInd=(elm)=>{elm.P.set(resized(elm,1),resized(elm,0));elm.oCor.set(windowWidth,windowHeight);}
let resized=(r,b)=>{if (b) return r.P.x/r.oCor.x*width; else return r.P.y/r.oCor.y*height}

let timeFunc=(s)=>{let a=2*PI/(per*4);return 5*sin(s*a);}
let dtimeFunc=(s)=>{let a=2*PI/(per*4);return Math.sign(5*a*cos(s*a));}
let lerpFunc=(s,f)=>{let a=2*PI/(per*4*f);return (sin(s*a));}
let paraEllipse=(s,ar,br)=>{let a=width/2*ar;let b=height/2*br;return createVector(a*cos(s),b*sin(s))}

function drawStars(point) {
  if (!paused){
    point.updateV(-1);
    point.move();
  }
  point.drawPoint(point.sw);
}

function runAll(point) {
  if (!paused){
    point.updateV();
    point.move();
  }
  // if (!lines) point.drawPoint();
  // else point.drawLine();
  if (!lines) point.drawPoint(5);
  else if (point.prob<planCut) point.drawLine();
  else{
    //between 0.995 and 1 -> planets are ~0.5% of points(lines)
    

    // let planProb=(e)=>planAmt/100*plansR/100

    // 0.0047
    // 0.0002
    // 0.0001

    // point.setSpeed(point.oSpeed);
    // point.setStarLerp(random());
    // let pmap=map(point.prob,planCut,1,0,1);
    // cpmap=floor(pmap*ppalette.length);
    cpmap=floor(point.starLerp*ppalette.length);
    // console.log(pmap);
    // let randAdd=rands.pop()
    let added=floor(point.prob2*(ppalette.length-1))+1;
    // console.log(cpmap,added)
    let col=ppalette[cpmap];
    let nextCol=ppalette[(cpmap+added)%ppalette.length];
    patternColors([color(hue(col),saturation(col),brightness(col)*point.dk),color(hue(nextCol),saturation(nextCol),brightness(nextCol)*point.dk)]);
    pattern(PTN.wave(100, 10, lerp(5,15,point.prob3), 3));
    patternAngle(PI *lerp(0,2,point.prob4));
    //reg planets
    // 0.9997
    point.drawPoint(point.sw,color(ppalette[cpmap]),1);
    // if (point.prob<planCut+planAmt*planVals[0]) point.drawPoint(point.sw*4,color(ppalette[cpmap]),1);
    //big planets
    // else if (point.prob<planCut+planAmt*planVals[1]) point.drawPoint(point.sw*16,color(ppalette[cpmap]),1);
    //jumbo planets
    // else point.drawPoint(point.sw*32,color(ppalette[cpmap]),1);
  }
  // point.drawOffest();
}

function populatePoints(array,itype){
  for(i=0;i<total;i++){
    let P=createVector(random(-width/2,width/2),random(-height/2,height/2));
    let type=itype || 0;
    let point=new Point(P,type);
    array.push(point);
  }
}

function drawVectors(){
  let divs=20;
  for(let x=1;x<divs;x++){
    for(let y=1;y<divs;y++){
      let P=createVector(map(width/divs*x,0,width,-width/2,width/2),map(height/divs*y,0,height,-height/2,height/2));
      // let dir=equation(P).mult(50);
      let dir=equation(P).mult(50).mult(dtimeFunc(millis()/1000));
      // console.log(P.x,P.y,dir);
      drawVector(P,dir);
    }
  }
}

//from p5js reference
function drawVector(base, vec) {
  push();
  strokeWeight(1);
  stroke(255-bgColor);
  fill(255-bgColor);
  translate(base.x+width/2, base.y+height/2);
  line(0, 0, vec.x, vec.y);
  rotate(vec.heading());
  let arrowSize = 2;
  translate(vec.mag() - arrowSize, 0);
  triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
  pop();
}
  
  // 00->11
  // 01->10
  // 10->01
  // 11->00
  // let legend=['00','11','01','10'];
  // let ans=legend[(legend.indexOf(key)+1)%(legend.length)];
// function furthestDist(P){
//   let maxDist;
//   let ans=str('1'*(P.x<0)).concat('1'*(P.y<0));
//   maxDist=dist(width/2*(2*int(ans[0])-1),height/2*(2*int(ans[1])-1),P.x,P.y);
//   return maxDist;
// }

function keyTyped() {
  switch(key) {
    case 'p':
      // console.log(start,prev);
      if (!paused) prev=millis()-start+prev;
      if (paused || clicked) start=millis();
      // console.log(start,prev);
      paused=!paused;
      break;
    case 'b':bgColor=255-bgColor;break;
    case 'd':showField=!showField;break;
    case 'l':lines=!lines;break;
  }
}

class Point{
  constructor(P,type){
    this.type=type;// || 0;
    this.P=P;
    // this.speed=random(1,5);
    this.lineLen=random(5,30);
    this.prob=random();
    this.prob2=random();
    this.prob3=random();
    this.prob4=random();
    this.dk=1;
    //star base r
    if (this.type==1) this.sw=abs(randomGaussian(1.5,0.8))//random(1,3);
    //planet base r
    else this.sw=random(4,10);

    if (this.prob<planCut+planAmt*planVals[0] && !this.type) this.sw*=4
    else if (this.prob<planCut+planAmt*planVals[1] && !this.type) this.sw*=16
    else if (!this.type) this.sw*=32;

    this.osw=0.0+this.sw;
    if (this.type==1) this.speed=random(0.001,0.5);
    else if (this.prob<0.8) this.speed=random(0.001,5);
    else this.speed=random(5,10);
    this.starLerp=random(); 
    this.oCor=createVector(width,height);
    this.oSpeed=this.speed+0.0;
  }

  setSpeed(s){
    this.speed=s;
  }

  furthestDist(){
    let ans=str('1'*(this.P.x<0)).concat('1'*(this.P.y<0));
    return(dist(width/2*(2*int(ans[0])-1),height/2*(2*int(ans[1])-1),this.P.x,this.P.y));
  }

  updateV(ineg){
    // this.nV=equation(this.P);
    // this.V=this.nV.mult(this.speed);
    let neg=ineg||1
    this.nV=equation(this.P).mult(dtimeFunc(millis()/1000)).mult(neg);
    this.V=createVector(0,0).set(this.nV).mult(this.speed);
  }

  move(){
    // this.P.add(this.V);
    this.P.add(this.V);
  }

  drawPoint(sw,c=0,p=0){
    push();
    translate(width/2,height/2);

    this.updateCenter()
    center=new Point(vcenter);
    let cdist=dist(this.P.x,this.P.y,center.P.x,center.P.y);
    // fd=center.furthestDist();
    if (!p) this.speed=constrain(map(cdist,0,width/holeW,10,1),1,10);
    else this.speed=constrain(map(cdist,0,width/holeW,5,1),1,5);

    let sFact=3;
    let sMore=width/10;
    if (cdist<this.sw+width/holeW+sMore && p){
      this.sw=this.osw*map(cdist,this.sw+width/holeW+sMore,0,1,0.01);
      this.dk=map(cdist,this.sw+width/holeW+sMore,0,1,0.01);
      this.dk=this.dk**2;
    }
    else{
      this.dk=1;
      this.sw=this.osw;
    }

    translate(this.P.x,this.P.y);
    // stroke(255-bgColor);
    if (c) stroke(c);
    else{
      let c1=color('#004587');
      let c2=color('#E5F7FB');
      fill(lerpColor(c1,c2,this.starLerp));
      noStroke();
      // stroke(lerpColor(c1,c2,this.starLerp));
    }
    strokeWeight(sw);
    translate(map(randomOffset.x,-100,100,-10,10),map(randomOffset.y,-100,100,-10,10))
    //
    if (!p) circle(0,0,sw*2);
    //
    else circlePattern(0,0,sw*2);

    // point(0,0);
    pop();
  }

  updateCenter(){
    if (!clicked && !paused) vcenter=createVector(t*randomOffset.x+paraEllipse(etime,ar,br).y,1-paraEllipse(etime,ar,br).x-t*randomOffset.y);
    if (clicked && !paused) {
      let diff=ifClicked(1);
      vcenter.add(diff);
      pvcenter.set(vcenter);
    }
  }

  drawCircle(){
    push();
    translate(width/2,height/2);
    translate(this.P.x,this.P.y);
    fill(0)
    //width/holeW is r of black hole
    circle(0,0,width/holeW*2);
    pop();
  }

  drawLine(){
    // let llen=10;
    //positive half of the line vector from point P
    let halfLen=createVector(0,0).set(this.nV).mult(this.lineLen);
    // console.log(halfLen);
    // let perp=createVector(this.nV.y,this.nV.x);
    // console.log(this.nV);
    push();
    translate(width/2,height/2);
    
    stroke('black');
    
    // let center=new Point(createVector(t*randomOffset.x,1-t*randomOffset.y));
    // let center=new Point(createVector(t*randomOffset.x-1,-t*randomOffset.y));

    // let center=new Point(createVector(t*randomOffset.x+paraEllipse(etime,ar,br).y,1-paraEllipse(etime,ar,br).x-t*randomOffset.y) );

    
    // let vcenter=createVector(t*randomOffset.x+paraEllipse(etime,ar,br).y,1-paraEllipse(etime,ar,br).x-t*randomOffset.y);
    this.updateCenter();

    let center=new Point(vcenter);
    let cdist=dist(this.P.x,this.P.y,center.P.x,center.P.y);
    fd=center.furthestDist();
    // console.log(fd);
    // let sw=map(cdist,0,3*width/4,2,0.6);
    // sw=pow(sw,3);
    // sw*=sw;
    // strokeWeight(this.sw);
    // let hue=map(cdist,0,width/2,0,360);

    let c1=cols[0];
    let c2=cols[1];

    // let hu=map(cdist,0,width/2,hue(c1),hue(c2));
    // let sat=map(cdist,0,width/2,saturation(c1),saturation(c2));
    // let brit=map(cdist,0,width/2,brightness(c1),brightness(c2));
    // stroke(hu,100,90);
    let amt=map(cdist,0,fd,0,5);
    amt=pow(amt,2);
    if (amt>0.5){
      amt=constrain(map(cdist,0,fd,0.5,1),0,0.999);
    }
    // console.log(floor(amt*cols.length),cols.length);
    // stroke(cols[floor(amt*cols.length)]);
    stroke(lerpColor(c1, c2, amt));

    let sw=map(cdist,0,fd,0.2,12)*width/1680;
    strokeWeight(sw);
    // stroke(hu,sat,brit);
    translate(this.P.x,this.P.y);

    
    line(-halfLen.x,-halfLen.y,halfLen.x,halfLen.y);


    // beginShape();
    // vertex(-halfLen.x, -halfLen.y);
    // quadraticVertex(perp.x, perp.y, halfLen.x, halfLen.y);
    // endShape();

    pop();
  }

  drawOffest(){
    push();
    translate(width/2,height/2);
    fill(20);
    circle(t*randomOffset.x,1-t*randomOffset.y,40);
    pop();
  }

  // getColor(){
  //   this.P
  // }

}

function ifClicked(i){
  vcenter=createVector(0,0).set(pvcenter);
  let mouse=createVector(mouseX-width/2,mouseY-height/2)
  // console.log(i==0);
  let diff;
  if (i==1){diff=mouse.sub(vcenter).mult(easing);}
  else if (i==0){diff=mouse.sub(vcenter);}
  return diff
}

function mousePressed() {
  clicked=true;
  beenclicked=true;
  pvcenter=createVector(0,0).set(vcenter);
}

function mouseReleased() {
  clicked = false;
}


let remapped=(value,newVal,x)=>{if (x) return map(value,-width/2,width/2,-newVal,newVal);else return map(value,-height/2,height/2,-newVal,newVal);}

// let equation = (P) => createVector(sin(map(P.y,-height/2,height/2,-PI,PI)),sin(map(P.x,-width/2,width/2,-PI,PI))).normalize();
// let equation = (P) => {let y=remapped(P.y,PI,0);let x=remapped(P.x,PI,1);return createVector(sin(y),sin(x)).normalize();}
// let equation = (P) => createVector(P.y+t*randomOffset.y,-P.x+t*randomOffset.x).normalize();

function equation(P){
  let efactor=2;
  if (!paused && !clicked){
    etime=(millis()-start+prev)/1000/efactor;
    ar=lerp(1/8,3/8,lerpFunc(etime,3));
    br=lerp(1/8,3/8,lerpFunc(etime,6));
  }

  // let vec1=createVector(P.y+t*randomOffset.y+paraEllipse(etime,ar,br).x,-P.x+t*randomOffset.x+paraEllipse(etime,ar,br).y).normalize();
  vec1=createVector(P.y+t*randomOffset.y+paraEllipse(etime,ar,br).x,-P.x+t*randomOffset.x+paraEllipse(etime,ar,br).y);
    // if (clicked) {
    //   console.log(ifClicked().y,ifClicked().x);
    //   vec1=createVector(P.y+t*randomOffset.y+paraEllipse(etime,ar,br).x,-P.x+t*randomOffset.x+paraEllipse(etime,ar,br).y);
    // }
  if (clicked) {
      let mouse=createVector(mouseX-width/2,mouseY-height/2)
      let difff=createVector(0,0).set(mouse).sub(vcenter)
      vec1=createVector(P.y-(mouse.y+1),-P.x+mouse.x);
      // console.log(ifClicked().y,ifClicked().x);
  }

  // let vec2=createVector(abs(randomOffset.x)*(P.y+t*randomOffset.y+paraEllipse(etime,ar,br).x),abs(randomOffset.y)*(-P.x+t*randomOffset.x+paraEllipse(etime,ar,br).y)).normalize();
  // let vec2=createVector(P.y+randomOffset.x+t*randomOffset.y+paraEllipse(etime,ar,br).x,-P.x+randomOffset.y+t*randomOffset.x+paraEllipse(etime,ar,br).y).normalize();
  // let vec3=vec1.add(vec2).normalize();
  return createVector(0,0).set(vec1).normalize();
  //(1,0)=(t*randomOffset.x+paraEllipse(vtime,ar,br).y,1-paraEllipse(vtime,ar,br).x-t*randomOffset.y) 
}
// let equation = (P) => {let vtime=(millis()-start+prev)/1000;return createVector(P.y+t*randomOffset.y+paraEllipse(vtime).x,-P.x+t*randomOffset.x+paraEllipse(vtime).y).normalize();}

// let equation = (P) => {let vtime=(millis()-start+prev)/1000;let f=4;let g=10;return createVector(P.y+t*width/height*lerpFunc(vtime,abs(lerpFunc(vtime,3)*f)+2)*randomOffset.x,-P.x+t*height/width*lerpFunc(vtime,abs(lerpFunc(vtime,5)*g)+4)*randomOffset.x).normalize();}

//.add(randomOffset.mult(t)))
// let equation = (P) => {let y=remapped(P.y,PI,0);let x=remapped(P.x,PI,1);return (createVector(sin(y*x)+t*randomOffset.x,cos(y)+t*randomOffset.y)).normalize();}










