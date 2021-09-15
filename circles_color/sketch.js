//Created by David Holcer
//Non-commercial license
//Sep 15,2021

var levels,radius,P,total;
let circles=[];
var bRotate;
var dtime,ddTime;
var ddFactor;
var debug;
var decreasing;
let factorAmt;
let retTime,goTime;
let opacity,opacityAmt,spdAmt;
let bgColor,bgChoice,bgCycleTime;
let bDay,darkMode;
let cc;
let playedCount;
let colorScheme,colorSchemeTwo;
let cOrig;

function setup(){
	createCanvas(windowWidth,windowHeight);
	console.log(width,height);
	slength=min(windowWidth,windowHeight);
	xwidth=(windowWidth-slength)/2;
	// levels=40;

	colorMode(HSB);

	// total=25;
	//make this distribution uniform
	levels=floor(random(4,12));
	radius=50*slength/1800*6/(levels*1.5);
	// total=random(5,25);
	total=30;
	paused=false;
	ddFactor=10;
	debug=false;
	decreasing=false;

	opacity=false;
	opacityAmt=0.7;
	spdAmt=0.005;

	// bgColor=50;
	bgCycleTime=int(random(20,40))*60;

	factorAmt=0.2;

let turnColor=(colorArray)=>{
	cA=[]
	for(let i=0;i<colorArray.length;i++){
		cA.push(color(colorArray[i]))
	}
	nS.push(cA)
}

cOrig=true;
	
	colorScheme=[
        ["#000000", "#ffffff", "#c8c8c8"],
        ["#ccc5b9", "#403d39", "#eb5e28"],
        ["#002642", "#840032", "#e5dada"],
        ["#0c0a3e", "#f9564f", "#f3c677"],
        ["#264653", "#e9c46a", "#e76f51"],
        ["#e63946", "#f1faee", "#1d3557"],
        ["#2b2d42", "#edf2f4", "#d90429"],
        ["#003049", "#d62828", "#eae2b7"],
        ["#14213d", "#fca311", "#e5e5e5"],
        ["#e0fbfc", "#ee6c4d", "#293241"],
        ["#011627", "#e71d36", "#ff9f1c"],
        ["#1a535c", "#ff6b6b", "#ffe66d"],
        ["#355070", "#e56b6f", "#eaac8b"],
        ["#283d3b", "#197278", "#edddd4"],
        ["#2b2d42", "#edf2f4", "#d80032"],
        ["#ffe066", "#247ba0", "#70c1b3"],
        ["#ff6700", "#ebebeb", "#004e98"],
        ["#177e89", "#db3a34", "#ffc857"],
        ["#b80c09", "#fbfbff", "#040f16"],
        ["#001427", "#f4d58d", "#8d0801"],
        ["#1f271b", "#28afb0", "#f4d35e"],
        ["#e0fbfc", "#9db4c0", "#253237"],
        ["#001427", "#708d81", "#f4d58d"],
        ["#0029c1", "#f7dc09", "#e22b00"],
        ["#0c090d", "#f9c22e", "#53b3cb"],
        ["#ed1c24", "#fdfffc", "#020100"],
        ["#fff2cd", "#ff004c", "#610d4b"],
        ["#fbfef9", "#191923", "#f39237"],
        ["#ffba08", "#3f88c5", "#032b43"],
        ["#f1faee", "#a8dadc", "#1d3557"],
        ["#010000", "#ffa100", "#f1f2f1"],
        ["#0d3b66", "#faf0ca", "#f95738"],
        ["#e6eed6", "#bbc5aa", "#090c02"],
        ["#0d0b0b", "#d80056", "#ecedef"],
        ["#55827A", "#362D2D", "#EBA58A"],
        ["#fff3b0", "#9e2a2b", "#540b0e"],
        ["#0d1b2a", "#778da9", "#e0e1dd"],
        ["#0c0f0a", "#ff206e", "#fbff12"],
        ["#2f4550", "#b8dbd9", "#f4f4f9"],
        ["#ebd4cb", "#da9f93", "#b6465f"],
        ["#3e92cc", "#fffaff", "#1e1b18"],
        ["#fecc50", "#010b8b", "#1e0521"],
        ["#c9e4ca", "#3b6064", "#364958"]
    ];
  nS=[]
  colorScheme.forEach(turnColor);
  colorSchemeTwo=nS;

  colorScheme=[[color('#333333'), color('#666A86'), color('#FF6700'), color('#E8DDB5')],[color('#238DA5'),color('#599D6B'), color('#FDBC2E'),color('#C84A4D'), color('#2A303E') ],[color('#FA8334'),color('#1E3888'),color('#191308'),color('#C45AB3'),color('#89937C')],[color('#0081A7'),color('#00AFB9'),color('#291F1E'),color('#FED9B7'),color('#F07167')],[color('#E07A5F'),color('#3D405B'),color('#81B29A'),color('#F2CC8F')],[color('#5F0F40'),color('#9A031E'),color('#FB8B24'),color('#E36414'),color('#0F4C5C')],[color('#c9cba3'),color('#ffe1a8'),color('#e26d5c'),color('#723d46'),color('#472d30')],[color('#dd6e42'),color('#e8dab2'),color('#4f6d7a'),color('#c0d6df'),color('#eaeaea')],[color('#001219'), color('#005F73'), color('#0A9396'), color('#94D2BD'), color('#E9D8A6'), color('#EE9B00'), color('#CA6702'), color('#BB3E03'),color('#AE2012'),color('#9B2226')],[color('#ee4a1b'), color('#61d5d4'), color('#3e73a2'), color('#bebc9e'), color('#060b0a')],[color("#e3170a"),color("#2a2b2a"),color("#fdb833"),color("#7d8491"),color("#c04cfd")]];

	cc=int(random(0,colorScheme.length));

	// console.log(colorScheme[0][1]);
	// console.log(colorScheme[0][1]._array[2]=0.1);
	console.log(colorScheme[0][1]);

	playedCount=0;
	dtime,ddTime=0;

	retTime=int(random(20,50));
	goTime=int(random(3,20));

	frameRate(60);

	// console.log('cool');

	var now = new Date();
  if (now.getHours()>=18 || now.getHours()<6){
    bDay=0;
    darkMode=true;
  }
  else if (now.getHours()>=6 && now.getHours()<18){
    bDay=1;
    darkMode=false;
  }
  checkTime(now);



	// createLoop({duration:5, gif:true});
	populateCircles();
	bgColor=updateBgColor();

}

function draw(){
	// background('#F2F4F3');
	background(bgColor);
	
	//noFill();
	// strokeWeight(0.1);
	// push();
	// P=createVector(width/2,height/2);
	// translate(P.x,P.y)
	// for (var i = 0; i < levels; i++) {
	// 	circle(0,0,radius*(i+1));	
	// }
	// pop();
	
	//circles array per level with circles on current level circle base.
	for (var i = 0; i < circles.length; i++) {
		push();
		translate(width/2,height/2);
		//rotate(frameCount / 100.0)
		circles[i].drawCircle();
		pop();		
	}
	//fill(0);

	if (!paused){
		// console.log('neww version');
		for (var i = 0; i < circles.length; i++) {

			var C=circles[i];
			var x=width/2+C.r/2*C.l*cos(C.t)+ddFactor*C.dd.x;
			var y=height/2+C.r/2*C.l*sin(C.t)+ddFactor*C.dd.y;

			var nextX=width/2+C.r/2*C.l*cos(C.t+C.dt)+ddFactor*C.dd.x;
			var nextY=height/2+C.r/2*C.l*sin(C.t+C.dt)+ddFactor*C.dd.y;

			// point(x,y);
			C.t+=C.dt;	
			C.tt+=1;

			// if (nextX<=width-C.r/2 && nextX>=C.r/2 && nextY<=height-C.r/2 && nextY>=C.r/2 && false==true){
			// 	C.t+=C.dt;	
			// }

			if (debug){
				stroke(C.c);
				line(width-C.r/2,0,width-C.r/2,height);
				line(C.r,0,C.r,height);
				line(0,height-C.r/2,width,height-C.r/2);
				line(0,C.r/2,width,C.r/2);
			}
		

			if (x<=width-C.r/2 && x>=C.r/2 && y<=height-C.r/2 && y>=C.r/2 && ((int(C.tt/60)%goTime)==0 || (int(C.tt/60)%goTime==1)) && ((int(C.tt/60)%retTime)!=0 && (int(C.tt/60)%retTime)!=1) && (C.tt/60)!=0){ // && decreasing==false && int(abs(C.t))!=0){
				if (C.ddFactor<40){
					C.ddFactor+=0.05;
				}
				// }
				// else{
				// 	C.ddFactor+=0.2;
				// }
			}

			if (int(C.tt/60)%retTime==0 || int(C.tt/60)%retTime==1 && (C.tt/60)!=0){
				// factorAmt-=0.1;
				// C.c=color('#cccccc');
				if (C.ddFactor-0.3<0){
					C.ddFactor=0;
				}
				else{
					C.ddFactor-=0.3;	
				}
			}

			C.dd.add((circles[i].ddt.x),(circles[i].ddt.y));

			// original pos max x: C.r/2*C.l*cos(0)
			let maxX=width-C.r/2-(width/2+C.r/2*C.l*cos(0));
			// original pos max y: C.r/2*C.l*sin(PI/2)
			let maxY=height-C.r/2-(height/2+C.r/2*C.l*sin(PI/2));
			// console.log(maxX,maxY);

			C.dd.set(constrain(C.dd.x,-maxX/C.ddFactor,maxX/C.ddFactor),constrain(C.dd.y,-maxY/C.ddFactor,maxY/C.ddFactor));
			// console.log(C.dd);

		//shapes[i].P.set(radius/2*shapes[i].l*sin(shapes[i].t),radius/2*shapes[i].l*cos(shapes[i].t));
		}

	}

	if (millis()-dtime>=ddTime){// && !paused) {
		newDd();
	}


	// let bgTime=1-(abs(300-(frameCount%(600)) ) /300);
	let bgTime=1-(abs((bgCycleTime/2)-(playedCount%(bgCycleTime)) ) /(bgCycleTime/2));
	if (!paused){
		changeBg(bgTime,bgChoice);
		playedCount+=1;
	}

  if (keyIsDown(188) && opacity){
    adjusT(-spdAmt);
  }
  else if (keyIsDown(190) && opacity){
    adjusT(spdAmt);
  }
}

function adjusT(inputAmt){
  if (opacityAmt+inputAmt<=0.95 && opacityAmt+inputAmt>=0.1) opacityAmt+=inputAmt;
}

function changeBg(time,bgChoice){
	// console.log(choice);
	var bgColorMinDark=color(hue(bgChoice),saturation(bgChoice),brightness(bgChoice)/1.1);
	var bgColorMinLight=color(hue(bgChoice),saturation(bgChoice),brightness(bgChoice)*1.1);
	var bgColorMaxDark=color(hue(bgChoice),saturation(bgChoice),brightness(bgChoice)/5);
	var bgColorMaxLight=color(hue(bgChoice),saturation(bgChoice),brightness(bgChoice)*3);

	if (darkMode) bgColor=lerpColor(bgColorMinDark, bgColorMaxDark, time);
	else bgColor=lerpColor(bgColorMinLight, bgColorMaxLight, time);

	bgColor.setAlpha(0.6);
}


function checkTime(someDate){
  //(not inverted and night) or (inverted and day)
  let cDay;
  if (someDate.getHours()>=18 || someDate.getHours()<6) cDay=0;
  else if (someDate.getHours()>=6 && someDate.getHours()<18) cDay=1;
  //if it switches to night then invert bg
  if (cDay!=bDay && ((cDay==1 && darkMode ) || (cDay==0 && !darkMode ) ) ) {
    darkMode=(darkMode==true)?false:true;
    if (cDay) bDay=1;
    else bDay=0
  }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    
    // circleRadius=map(min(windowWidth,windowHeight),500,1200,4,7);
    // if (circleRadius>7) circleRadius=7;

    //console.log(tempX,windowWidth);
    //console.log(windowWidth, windowHeight);
    // for (let i=0; i<circles.length; i++) {
    //   //console.log(points[i].P.x,points[i].P.x/width*windowWidth);
    //   circles[i].P.x=circles[i].P.x/circles[i].oCor.x*windowWidth;
    //   circles[i].P.y=circles[i].P.y/circles[i].oCor.y*windowHeight;
    //   circles[i].oCor.set(windowWidth,windowHeight);
    // }
}

function newDd(){
	for (var i = 0; i < circles.length; i++) {	
			circles[i].dd.set(random(-1,1),random(-1,1));
}
}

function keyTyped() {
	if (key == ' '|| key=='n') {
      circles=[];
      populateCircles();
      updateBgColor();
      //newColorScheme();
  }
  if (key=='x'){
  	cOrig=!cOrig;
  	if (cOrig){
  		colorScheme=[[color('#333333'), color('#666A86'), color('#FF6700'), color('#E8DDB5')],[color('#238DA5'),color('#599D6B'), color('#FDBC2E'),color('#C84A4D'), color('#2A303E') ],[color('#FA8334'),color('#1E3888'),color('#191308'),color('#C45AB3'),color('#89937C')],[color('#0081A7'),color('#00AFB9'),color('#291F1E'),color('#FED9B7'),color('#F07167')],[color('#E07A5F'),color('#3D405B'),color('#81B29A'),color('#F2CC8F')],[color('#5F0F40'),color('#9A031E'),color('#FB8B24'),color('#E36414'),color('#0F4C5C')],[color('#c9cba3'),color('#ffe1a8'),color('#e26d5c'),color('#723d46'),color('#472d30')],[color('#dd6e42'),color('#e8dab2'),color('#4f6d7a'),color('#c0d6df'),color('#eaeaea')],[color('#001219'), color('#005F73'), color('#0A9396'), color('#94D2BD'), color('#E9D8A6'), color('#EE9B00'), color('#CA6702'), color('#BB3E03'),color('#AE2012'),color('#9B2226')],[color('#ee4a1b'), color('#61d5d4'), color('#3e73a2'), color('#bebc9e'), color('#060b0a')],[color("#e3170a"),color("#2a2b2a"),color("#fdb833"),color("#7d8491"),color("#c04cfd")]];
  		cc=int(random(0,colorScheme.length));
  	}
  	else{
  		colorScheme=colorSchemeTwo;
  		cc=int(random(0,colorScheme.length));
  	}
  }
  if (key=='c') newColorScheme();
  if (key=='d') darkMode=(darkMode==true) ? false: true;
  // if (key=='d') debug=(debug==true) ? false: true;
  if (key=='r' || key=='p') paused=(paused==true) ? false: true;
  if (key=='o') opacity=(opacity==true) ? false: true;

}


function mouseWheel(event) {
  var e = Math.sign(event.delta);
  for (var i = 0; i < circles.length; i++) {
  		var oR=circles[i].or;
    	if (circles[i].r-e*0.01*oR>0.05*oR && circles[i].r-e*0.01*oR<3*oR){
    		circles[i].r-=e*0.01*oR;
    		// console.log(circles[i].r);
    	}
  }
}

function populateCircles() {
	for(let j=1; j<levels; j++){
		//var sw=0.5*j;
		sw=1;
		//var c=random(0,100);
		for (let i=0; i<total; i++) {
			var t=random(0,2*PI);
			//var t=2*PI/total*i;
			//var t=2*PI/radius*i;
			var r=random(j/100*radius,(j+1)*radius);
			sw=map(r,j*radius,(j+1)*radius,0.1,1);
			// console.log(cc);
			circles.push(new Circle(t,j,r,cc,sw));
		}
	}

}

function updateBgColor(){
	let colScheme=circles[circles.length-1].cc;
	let chCs=colorScheme[colScheme];
	let choice=int(random(0,chCs.length));
	bgChoice=chCs[choice];
	return bgChoice;
}

function newColorScheme(){
  // colorScheme=[[color('#333333'), color('#666A86'), color('#FF6700'), color('#E8DDB5')],[color('#238DA5'),color('#599D6B'), color('#FDBC2E'),color('#C84A4D'), color('#2A303E') ],[color('#FA8334'),color('#1E3888'),color('#191308'),color('#C45AB3'),color('#89937C')],[color('#0081A7'),color('#00AFB9'),color('#291F1E'),color('#FED9B7'),color('#F07167')],[color('#E07A5F'),color('#3D405B'),color('#81B29A'),color('#F2CC8F')],[color('#5F0F40'),color('#9A031E'),color('#FB8B24'),color('#E36414'),color('#0F4C5C')],[color('#c9cba3'),color('#ffe1a8'),color('#e26d5c'),color('#723d46'),color('#472d30')],[color('#dd6e42'),color('#e8dab2'),color('#4f6d7a'),color('#c0d6df'),color('#eaeaea')],[color('#001219'), color('#005F73'), color('#0A9396'), color('#94D2BD'), color('#E9D8A6'), color('#EE9B00'), color('#CA6702'), color('#BB3E03'),color('#AE2012'),color('#9B2226')],[color('#ee4a1b'), color('#61d5d4'), color('#3e73a2'), color('#bebc9e'), color('#060b0a')]];
  //if (opacity) toggleOpacity();
  cs=int(random(0,colorScheme.length));
    for (let k = 0; k < circles.length; k++) {
      var S1=circles[k];
      S1.cc=cs;
      S1.c=colorScheme[cs][int(random(0,colorScheme[cs].length))];
  }
}

class Circle{	
	//time, length (of position), circle radius, color selection, stroke weight
	constructor(t,l,r,cc,sw){
		// this.P=P;
		this.t=t;
		this.l=l;
		//this.c=c;
		this.r=r;
		this.or=r;
		this.sw=sw;
		this.tt=random(1,35*60);
		// this.P=createVector();
		this.dt=random(-0.03,0.03);
		// this.dt=0.04;
		this.dd=createVector(0,0);
		this.ddt=createVector(random(-0.01,0.01),random(-0.01,0.01));
		this.cc=cc;
		this.c=colorScheme[this.cc][int(random(0,colorScheme[this.cc].length))];
		this.ddFactor=ddFactor;
		this.oCor=createVector(width,height);
	}

	drawCircle(){
		//x=rsin(t),y=rcos(t)
		//stroke(this.c,100,0);
		strokeWeight(this.sw);
		// circle(radius/2*this.l*cos(this.t),radius/2*this.l*sin(this.t),radius);
		if (opacity) this.c.setAlpha(opacityAmt);
		else this.c.setAlpha(1);
		stroke(this.c);
		fill(this.c);
		// noFill();
		push();
		translate(this.r/2*this.l*cos(this.t),this.r/2*this.l*sin(this.t));
		circle(this.ddFactor*this.dd.x,this.ddFactor*this.dd.y,this.r);
		pop();
	}


}