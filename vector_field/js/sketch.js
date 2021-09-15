let points=[];
let stars=[];
let total;
let randomOffset;
let t;
let paused,showField,lines;
let dt;
let per;
let cols;
let bgColor;
let start,prev;
let ar,br,etime;

//TODO: 
//rescale equation+thickness to be proportional to current screen

function setup() {
  createCanvas(windowWidth, windowHeight);
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
  bgColor=0;
  // cols=[color(random(360),random(50,100),random(50,100)),color(random(360),random(50,100),random(50,100))]
  // cols=[color('#03045e'),color('#caf0f8')]

  cols=[color(random(360),random(50,100),random(30,60))]
  cols.push(color(hue(cols[0])+Math.sign(randomOffset.x)*map(abs(randomOffset.x),0,100,100,200),saturation(cols[0])+map(randomOffset.x,-100,100,-40,40),100-brightness(cols[0])));
  
  // cols=[color('#EC3822'),color('#E7863A'),color('#00654F'),color('#E8C5A9'),color('#798A70')];
  showField=false;
  lines=true;
  paused=false;
  start=millis();
  prev=0;
  populatePoints(points);
  populatePoints(stars,1);
  // noLoop();

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
  if (!paused){
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
  else{
    if (point.prob<0.995) point.drawLine();
    else{
      point.setSpeed(point.oSpeed);
      // point.setStarLerp(random());
      point.drawPoint(point.sw);
    }
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
      if (paused) start=millis();
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
    if (this.type==1 || this.prob<0.99) this.sw=random(1,4);
    else this.sw=random(4,10);
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
    // console.log(this);
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

  drawPoint(sw){
    push();
    translate(width/2,height/2);
    translate(this.P.x,this.P.y);
    // stroke(255-bgColor);
    let c1=color('#004587');
    let c2=color('#E5F7FB');
    stroke(lerpColor(c1,c2,this.starLerp));
    strokeWeight(sw);
    translate(map(randomOffset.x,-100,100,-10,10),map(randomOffset.y,-100,100,-10,10))
    point(0,0);
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
    let center=new Point(createVector(t*randomOffset.x+paraEllipse(etime,ar,br).y,1-paraEllipse(etime,ar,br).x-t*randomOffset.y) );
    let cdist=dist(this.P.x,this.P.y,center.P.x,center.P.y);
    let fd=center.furthestDist();
    // console.log(fd);
    // let sw=map(cdist,0,3*width/4,2,0.6);
    let sw=map(cdist,0,fd,0.2,12);
    // sw=pow(sw,3);
    // sw*=sw;
    // strokeWeight(this.sw);
    strokeWeight(sw);
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

let remapped=(value,newVal,x)=>{if (x) return map(value,-width/2,width/2,-newVal,newVal);else return map(value,-height/2,height/2,-newVal,newVal);}

// let equation = (P) => createVector(sin(map(P.y,-height/2,height/2,-PI,PI)),sin(map(P.x,-width/2,width/2,-PI,PI))).normalize();
// let equation = (P) => {let y=remapped(P.y,PI,0);let x=remapped(P.x,PI,1);return createVector(sin(y),sin(x)).normalize();}
// let equation = (P) => createVector(P.y+t*randomOffset.y,-P.x+t*randomOffset.x).normalize();

function equation(P){
  let efactor=2;
  etime=(millis()-start+prev)/1000/efactor;
  ar=lerp(1/8,3/8,lerpFunc(etime,3));
  br=lerp(1/8,3/8,lerpFunc(etime,6));
  // let vec1=createVector(P.y+t*randomOffset.y+paraEllipse(etime,ar,br).x,-P.x+t*randomOffset.x+paraEllipse(etime,ar,br).y).normalize();
  let vec2=createVector(abs(randomOffset.x)*(P.y+t*randomOffset.y+paraEllipse(etime,ar,br).x),abs(randomOffset.y)*(-P.x+t*randomOffset.x+paraEllipse(etime,ar,br).y)).normalize();
  // let vec2=createVector(P.y+randomOffset.x+t*randomOffset.y+paraEllipse(etime,ar,br).x,-P.x+randomOffset.y+t*randomOffset.x+paraEllipse(etime,ar,br).y).normalize();
  // let vec3=vec1.add(vec2).normalize();
  return vec2;
  //(1,0)=(t*randomOffset.x+paraEllipse(vtime,ar,br).y,1-paraEllipse(vtime,ar,br).x-t*randomOffset.y) 
}
// let equation = (P) => {let vtime=(millis()-start+prev)/1000;return createVector(P.y+t*randomOffset.y+paraEllipse(vtime).x,-P.x+t*randomOffset.x+paraEllipse(vtime).y).normalize();}

// let equation = (P) => {let vtime=(millis()-start+prev)/1000;let f=4;let g=10;return createVector(P.y+t*width/height*lerpFunc(vtime,abs(lerpFunc(vtime,3)*f)+2)*randomOffset.x,-P.x+t*height/width*lerpFunc(vtime,abs(lerpFunc(vtime,5)*g)+4)*randomOffset.x).normalize();}

//.add(randomOffset.mult(t)))
// let equation = (P) => {let y=remapped(P.y,PI,0);let x=remapped(P.x,PI,1);return (createVector(sin(y*x)+t*randomOffset.x,cos(y)+t*randomOffset.y)).normalize();}










