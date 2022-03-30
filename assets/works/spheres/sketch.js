//spheres.js
//Created by David Holcer
//Non-commercial license
//Sep 15,2021


var levels,radius,P,total;
let shapes=[];
let angle=0;
let colorScheme;
var sunR,smallMoonR;
var bRotate;

function setup(){
	createCanvas(windowWidth,windowHeight,WEBGL);
	console.log(width,height);
	slength=min(windowWidth,windowHeight);
	xwidth=(windowWidth-slength)/2;
	radius=150*width/1600;
	// levels=40;
	// total=25;
	levels=6;
	total=10;
	bRotate=true;
	smooth();
	console.log('v2');
	// pixelDensity(2);
	// noStroke();

	colorScheme=[[color('#333333'), color('#666A86'), color('#FF6700'), color('#E8DDB5')],[color('#238DA5'),color('#599D6B'), color('#FDBC2E'),color('#C84A4D'), color('#2A303E') ],[color('#FA8334'),color('#1E3888'),color('#191308'),color('#C45AB3'),color('#89937C')],[color('#0081A7'),color('#00AFB9'),color('#291F1E'),color('#FED9B7'),color('#F07167')],[color('#E07A5F'),color('#3D405B'),color('#81B29A'),color('#F2CC8F')],[color('#5F0F40'),color('#9A031E'),color('#FB8B24'),color('#E36414'),color('#0F4C5C')],[color('#c9cba3'),color('#ffe1a8'),color('#e26d5c'),color('#723d46'),color('#472d30')],[color('#dd6e42'),color('#e8dab2'),color('#4f6d7a'),color('#c0d6df'),color('#eaeaea')],[color('#001219'), color('#005F73'), color('#0A9396'), color('#94D2BD'), color('#E9D8A6'), color('#EE9B00'), color('#CA6702'), color('#BB3E03'),color('#AE2012'),color('#9B2226')],[color('#ee4a1b'), color('#61d5d4'), color('#3e73a2'), color('#bebc9e'), color('#060b0a')]];

	//colorMode(HSB);

	sunR=200;
	smallMoonR=50;

	populateShapes();
	console.log(shapes.length);

	//populateSpheres();
	//createLoop({duration:3, gif:true});
}

function draw(){
	ambientLight(200);
	background(0);
	
	//noFill();

	//	rotateZ(angle);

	let rAmtX=mouseX-width/2;
	rotateY(rAmtX/200);
	let rAmtY=mouseY-height/2;
	rotateX(-rAmtY/200);
	// angle+=0.01;

	// rotateX(angle);
	// rotateY(angle);
	// angle+=0.01;

	strokeWeight(0.1);

	const dirY = (mouseY / height - 0.5) * 4;
	const dirX = (mouseX / width - 0.5) * 4;
	directionalLight(255, 255, 255, dirX, dirY, 1);

	// let locX = mouseX - width / 2;
 //  let locY = mouseY - height / 2;
 //  pointLight(255, 255, 255, locX, locY, 50);
	//pointLight(255,255,255,0,-100,-100);


	// push();
	//P=createVector(-width/2,-height/2,0);
	//translate(P.x,P.y)
	// for (var i = 0; i < levels; i++) {
	// 	noStroke();
	// 	if (i==0) {ambientMaterial(0,0,0,200 );}
	// 	else if (i>=1) {ambientMaterial(20*i,20*2*i,77*i,80*(5-i));}
	// 	sphere(radius*(i+1));	
	// 	translate(60,0);
	// }
	// pop();

	// circles array per level with circles on current level circle base.
	for (var i = 0; i < shapes.length; i++) {
		push();
		//translate(width/2,height/2);
		//rotate(frameCount / 100.0)
		fill(255);
		if (shapes[i].p<0.6) shapes[i].drawSphere();
		else shapes[i].drawCube();
		pop();		
	}

	if (bRotate){
		for (var i = 0; i < shapes.length; i++) {	
		shapes[i].t+=shapes[i].dt;
		shapes[i].u+=shapes[i].du;
		//shapes[i].P.set(radius/2*shapes[i].l*sin(shapes[i].t),radius/2*shapes[i].l*cos(shapes[i].t));
		}
	}
	

	push();
	translate(0,0,-2000);
	sphere(sunR);
	console.log(sunR);
	pop();
	push();
	translate(-4000,20,50);
	sphere(smallMoonR);
	pop();
}

function keyTyped() {
  if (key == 'c') {
    newColorScheme();
  }

  if (key == ' '|| key=='n') {
      shapes=[];
      populateShapes();
      //newColorScheme();
  }

  if (key=='r' || key=='p'){
  	bRotate= (bRotate==true) ? false: true;
  }

}


function mouseWheel(event) {
  var e = event.delta;
  for (var i = 0; i < shapes.length; i++) {
  	//if (shapes[i].r-e/10>50*width/1600*shapes[i].l/10 && shapes[i].r-e/10<200*width/1600*shapes[i].l/10){
    	if (shapes[i].r-e/5>10){
    		shapes[i].r-=e/5;
    	}
    	if (sunR-e/10>40){
    		sunR-=e/3000;
    	}
    	if (smallMoonR-e/10>10){
    		smallMoonR-=e/3000;
    	}
    	
  	//}
  }
  
}


function newColorScheme(){
  colorScheme=[[color('#333333'), color('#666A86'), color('#FF6700'), color('#E8DDB5')],[color('#238DA5'),color('#599D6B'), color('#FDBC2E'),color('#C84A4D'), color('#2A303E') ],[color('#FA8334'),color('#1E3888'),color('#191308'),color('#C45AB3'),color('#89937C')],[color('#0081A7'),color('#00AFB9'),color('#291F1E'),color('#FED9B7'),color('#F07167')],[color('#E07A5F'),color('#3D405B'),color('#81B29A'),color('#F2CC8F')],[color('#5F0F40'),color('#9A031E'),color('#FB8B24'),color('#E36414'),color('#0F4C5C')],[color('#c9cba3'),color('#ffe1a8'),color('#e26d5c'),color('#723d46'),color('#472d30')],[color('#dd6e42'),color('#e8dab2'),color('#4f6d7a'),color('#c0d6df'),color('#eaeaea')],[color('#001219'), color('#005F73'), color('#0A9396'), color('#94D2BD'), color('#E9D8A6'), color('#EE9B00'), color('#CA6702'), color('#BB3E03'),color('#AE2012'),color('#9B2226')],[color('#ee4a1b'), color('#61d5d4'), color('#3e73a2'), color('#bebc9e'), color('#060b0a')]];
  //if (opacity) toggleOpacity();

  cs=int(random(0,colorScheme.length));
    for (let k = 0; k < shapes.length; k++) {
      var S1=shapes[k];
      S1.cc=cs;
      S1.c=colorScheme[cs][int(random(0,colorScheme[cs].length))];
  }
}

function populateShapes() {
	var cc=int(random(0,colorScheme.length));
	for(let j=1; j<levels; j++){
		//var sw=0.5*j;
		sw=0.1;
		var c=100;
		for (let i=0; i<total; i++) {
			var t=random(0,2*PI);
			var u=random(0,PI);
			//var t=2*PI/total*i;
			//var t=2*PI/radius*i;
			shapes.push(new Shape(t,u,j,cc,sw))
		}
	}
}


class Shape{	
	constructor(t,u,l,cc,sw){
		// this.P=P;
		this.t=t;
		this.dt=random(0,0.01);
		this.u=u;
		this.du=random(0,0.01);
		this.l=l;
		this.sw=sw;
		this.d=random(-radius/2*l,radius/2*l);
		this.cc=cc;
		this.c=colorScheme[this.cc][int(random(0,colorScheme[this.cc].length))];
		this.r=radius*this.l/3;
		this.p=random();
		//this.P=createVector(radius/2*this.l*sin(this.t),radius/2*this.l*cos(this.t));
		this.rot=random(0,2*PI);
	}

	drawSphere(){
		strokeWeight(this.sw);
		//noStroke();
		//fill(20,40,20,100)
		this.c.setAlpha(100);
		//fill(this.c);
		specularColor(this.c)
		push();
		//translate(this.P.x,this.P.y,this.d);
		translate(2*this.r*cos(this.t)*sin(this.u),2*this.r*sin(this.t)*sin(this.u),2*this.r*cos(this.u));
		//fill(255);
		//sphere(this.r/5,24,24);

		for (var i = 0; i < 4; i++) {
			this.c.setAlpha(255-50*i);
			//fill(this.c);
			specularMaterial(this.c);
  		shininess(20);
			sphere(this.r/20*(i+1),24,24);
			//box(this.r*(i+1)/10);
			//box(10);
		}

		pop();
	}

	drawCube(){
		push();
		strokeWeight(this.sw);
		//translate(this.P.x,this.P.y,this.d);
		//console.log(this.r);
		translate(2*this.r*cos(this.t)*sin(this.u),2*this.r*sin(this.t)*sin(this.u),2*this.r*cos(this.u));
		//fill(255);
		//box(this.r*2);
		//fill(0);
		rotate(this.rot);
		for (var i = 0; i < 4; i++) {
			this.c.setAlpha(255-50*i);
			specularMaterial(this.c);
  		shininess(50);
			box(this.r*(i+1)/10);
			//box(10);
		}
		pop();
	}
}