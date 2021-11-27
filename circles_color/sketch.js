//Created by David Holcer3
//Non-commercial license
//Sep 15,2021

var levels, radius, P, total;
let circles = [];
var bRotate;
var dtime, ddTime,clickTime,ctime;
var ddFactor;
var debug;
var decreasing;
let factorAmt;
let retTime, goTime;
let opacity, opacityAmt, spdAmt;
let bgColor, bgChoice, bgCycleTime;
let bDay, darkMode;
let cc;
let playedCount;
let colorScheme, colorSchemeTwo;
let cOrig;
let clicked;
let randPow;
let density;
let a,b,c,d,shapeProbs;

function setup() {
	createCanvas(windowWidth, windowHeight);
	console.log(width, height);
	slength = min(windowWidth, windowHeight);
	xwidth = (windowWidth - slength) / 2;
	// levels=40;
	console.log(fxhash);
	console.log(getHash(fxhash));
	randomSeed(getHash(fxhash));
	let a=int(random(0,10e6));
	console.log(a);
	randomSeed(a);
	colorMode(HSB);

	// total=25;
	//make this distribution uniform
	levels = floor(random(4, 15));
	radius = 50 * slength / 1800 * 6 / (levels * 1.5);
	// total=random(5,25);
	total = 30;
	paused = false;
	ddFactor = 10;
	debug = false;
	decreasing = false;

	opacity = false;
	opacityAmt = 0.7;
	spdAmt = 0.005;
	ctime=2000;
	randPow=random(3,4);
	// density=random(0.1,0.95);
	density=1;

	a=random();
	b=random(a,1);
	c=random(b,1);
	d=random(c,1);
	shapeProbs=[a,b,c,d];
	console.log(shapeProbs);

	bRotate=true;
	rectMode(CENTER);

	clicked = false;

	// bgColor=50;
	bgCycleTime = int(random(20, 40)) * 60;

	factorAmt = 0.2;

	let turnColor = (colorArray) => {
		cA = []
		console.log(colorArray);
		for (let i = 0; i < colorArray.length; i++) {
			if (colorArray[i][0]=='#') cA.push(color(colorArray[i]));
			else cA.push(color('#'+colorArray[i]));
		}
		nS.push(cA)
	}

	cOrig = true;

	colorScheme = [
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
	let nS = []
	colorScheme.forEach(turnColor);
	colorSchemeTwo = nS;

	colorScheme = [['333333', '666A86', 'FF6700', 'E8DDB5'], 
	['238DA5', '599D6B', 'FDBC2E', 'C84A4D', '2A303E'],
	['FA8334', '1E3888', '191308', 'C45AB3', '89937C'],
	['0081A7', '00AFB9', '291F1E', 'FED9B7', 'F07167'],
	['E07A5F', '3D405B', '81B29A', 'F2CC8F'],
	['5F0F40', '9A031E', 'FB8B24', 'E36414', '0F4C5C'],
	['c9cba3', 'ffe1a8', 'e26d5c', '723d46', '472d30'],
	['dd6e42', 'e8dab2', '4f6d7a', 'c0d6df', 'eaeaea'],
	['001219', '005F73', '0A9396', '94D2BD', 'E9D8A6', 'EE9B00', 'CA6702', 'BB3E03', 'AE2012', '9B2226'],
	['ee4a1b', '61d5d4', '3e73a2', 'bebc9e', '060b0a'],
	["e3170a", "2a2b2a", "fdb833", "7d8491", "c04cfd"],
	["4f345a","e59500","7ebdc3","e3879e","f25c54"],
	['F0B700','373000','E76C00','BA0000','CFCFC5'],
	['85ADB3','BBBF45','A2A641','E7D7AD','BF544B'],
	['#ABCEC0','#F6DEB0','#FFA034','#26839C','#252A2B']

];
	nS = []
	colorScheme.forEach(turnColor);
	colorScheme= nS;

	cc = int(random(0, colorScheme.length));

	// console.log(colorScheme[0][1]);
	// console.log(colorScheme[0][1]._array[2]=0.1);
	console.log(colorScheme[0][1]);

	playedCount = 0;
	dtime, ddTime = 0;

	retTime = int(random(20, 50));
	goTime = int(random(3, 20));

	frameRate(60);

	// console.log('cool');

	var now = new Date();
	if (now.getHours() >= 18 || now.getHours() < 6) {
		bDay = 0;
		darkMode = true;
	}
	else if (now.getHours() >= 6 && now.getHours() < 18) {
		bDay = 1;
		darkMode = false;
	}
	checkTime(now);



	// createLoop({duration:5, gif:true});
	populateCircles();
	bgColor = updateBgColor();

}

function draw() {
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
		translate(width / 2, height / 2);
		circles[i].drawShape();
		circles[i].rotate();
		pop();
	}
	//fill(0);

	if (!paused) {
		// console.log('neww version');
		for (var i = 0; i < circles.length; i++) {
			var C = circles[i];
			var x = width / 2 + C.r / 2 * C.l * cos(C.t) + ddFactor * C.dd.x;
			var y = height / 2 + C.r / 2 * C.l * sin(C.t) + ddFactor * C.dd.y;

			// var nextX = width / 2 + C.r / 2 * C.l * cos(C.t + C.dt) + ddFactor * C.dd.x;
			// var nextY = height / 2 + C.r / 2 * C.l * sin(C.t + C.dt) + ddFactor * C.dd.y;

			// point(x,y);
			C.t += C.dt;
			C.tt += 1;

			if (debug) {
				stroke(C.c);
				line(width - C.r / 2, 0, width - C.r / 2, height);
				line(C.r, 0, C.r, height);
				line(0, height - C.r / 2, width, height - C.r / 2);
				line(0, C.r / 2, width, C.r / 2);
			}

			if (!clicked && x <= width - C.r / 2 && x >= C.r / 2 && y <= height - C.r / 2 && y >= C.r / 2 && ((int(C.tt / 60) % goTime) == 0 || (int(C.tt / 60) % goTime == 1)) && ((int(C.tt / 60) % retTime) != 0 && (int(C.tt / 60) % retTime) != 1) && (C.tt / 60) != 0) { // && decreasing==false && int(abs(C.t))!=0){
				if (C.ddFactor < 800) {
					C.ddFactor += C.of;
				}
			}

			// if (clicked) C.ddFactor = returnToCenterMult(C.ddFactor, 0.99);
			if (clicked){
				let ea=easeOut(constrain((millis()-clickTime),0,ctime)/ctime);
				// console.log(ea);
				C.ddFactor=ea*C.pcddFactor;
				// console.log(C.pcdd.x/2,lerp(C.pcdd.x/2,C.pcdd.x,sqrt(ea) ),C.pcdd.x);
				C.dd=createVector(lerp(0,C.pcdd.x,sqrt(ea) ),lerp(0,C.pcdd.y,sqrt(ea) ) );
			}
			if (int(C.tt / 60) % retTime == 0 || int(C.tt / 60) % retTime == 1 && (C.tt / 60) != 0) C.ddFactor = returnToCenter(C.ddFactor, 8*C.of);
			

			C.dd.add((circles[i].ddt.x), (circles[i].ddt.y));

			// original pos max x: C.r/2*C.l*cos(0)
			let maxX = width - C.r / 2 - (width / 2 + C.r / 2 * C.l * cos(0));
			// original pos max y: C.r/2*C.l*sin(PI/2)
			let maxY = height - C.r / 2 - (height / 2 + C.r / 2 * C.l * sin(PI / 2));
			// console.log(maxX,maxY);

			C.dd.set(constrain(C.dd.x, -maxX / C.ddFactor, maxX / C.ddFactor), constrain(C.dd.y, -maxY / C.ddFactor, maxY / C.ddFactor));
			// console.log(C.dd);

			//shapes[i].P.set(radius/2*shapes[i].l*sin(shapes[i].t),radius/2*shapes[i].l*cos(shapes[i].t));
		}
	}

	if (millis() - dtime >= ddTime) {// && !paused) {
		newDd();
	}

	// let bgTime=1-(abs(300-(frameCount%(600)) ) /300);
	let bgTime = 1 - (abs((bgCycleTime / 2) - (playedCount % (bgCycleTime))) / (bgCycleTime / 2));
	if (!paused) {
		changeBg(bgTime, bgChoice);
		playedCount += 1;
	}

	if (keyIsDown(188) && opacity) {
		adjusT(-spdAmt);
	}
	else if (keyIsDown(190) && opacity) {
		adjusT(spdAmt);
	}
}

// let easeOut=t=>1-sin(PI*t/2);
// let easeOut=t=>pow(1-t,randPow);
// let easeOut=t=>t<0.5?1-4*pow(t,3):pow(-2*t+2,3)/2;
// let easeOut=t=>t<0.5?1-t:1+(cos(PI*t)-1)/2;
let easeOut=t=>(1+(cos(PI*t)-1)/2)**2;

function returnToCenter(multFactor, amt) {
	return ((multFactor - amt < 0) ? 0 : multFactor - amt)
}

function returnToCenterMult(multFactor, amt) {
	return ((multFactor - amt < 0) ? 0 : multFactor*amt)
}

function adjusT(inputAmt) {
	if (opacityAmt + inputAmt <= 0.95 && opacityAmt + inputAmt >= 0.1) opacityAmt += inputAmt;
}

function changeBg(time, bgChoice) {
	// console.log(choice);
	var bgColorMinDark = color(hue(bgChoice), saturation(bgChoice), brightness(bgChoice) / 1.1);
	var bgColorMinLight = color(hue(bgChoice), saturation(bgChoice), brightness(bgChoice) * 1.1);
	var bgColorMaxDark = color(hue(bgChoice), saturation(bgChoice), brightness(bgChoice) / 5);
	var bgColorMaxLight = color(hue(bgChoice), saturation(bgChoice), brightness(bgChoice) * 3);

	if (darkMode) bgColor = lerpColor(bgColorMinDark, bgColorMaxDark, time);
	else bgColor = lerpColor(bgColorMinLight, bgColorMaxLight, time);

	bgColor.setAlpha(0.6);
}


function checkTime(someDate) {
	//(not inverted and night) or (inverted and day)
	let cDay;
	if (someDate.getHours() >= 18 || someDate.getHours() < 6) cDay = 0;
	else if (someDate.getHours() >= 6 && someDate.getHours() < 18) cDay = 1;
	//if it switches to night then invert bg
	if (cDay != bDay && ((cDay == 1 && darkMode) || (cDay == 0 && !darkMode))) {
		darkMode = (darkMode == true) ? false : true;
		if (cDay) bDay = 1;
		else bDay = 0
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

function newDd() {
	for (var i = 0; i < circles.length; i++) {
		circles[i].dd.set(random(-1, 1), random(-1, 1));
	}
}

function keyTyped() {
	switch (key) {
		case ' ': case 'n':
			circles = [];
			populateCircles();
			updateBgColor();
			break;
		//newColorScheme();
		case 'x':
			cOrig = !cOrig;
			if (cOrig) {
				colorScheme = [[color('#333333'), color('#666A86'), color('#FF6700'), color('#E8DDB5')], [color('#238DA5'), color('#599D6B'), color('#FDBC2E'), color('#C84A4D'), color('#2A303E')], [color('#FA8334'), color('#1E3888'), color('#191308'), color('#C45AB3'), color('#89937C')], [color('#0081A7'), color('#00AFB9'), color('#291F1E'), color('#FED9B7'), color('#F07167')], [color('#E07A5F'), color('#3D405B'), color('#81B29A'), color('#F2CC8F')], [color('#5F0F40'), color('#9A031E'), color('#FB8B24'), color('#E36414'), color('#0F4C5C')], [color('#c9cba3'), color('#ffe1a8'), color('#e26d5c'), color('#723d46'), color('#472d30')], [color('#dd6e42'), color('#e8dab2'), color('#4f6d7a'), color('#c0d6df'), color('#eaeaea')], [color('#001219'), color('#005F73'), color('#0A9396'), color('#94D2BD'), color('#E9D8A6'), color('#EE9B00'), color('#CA6702'), color('#BB3E03'), color('#AE2012'), color('#9B2226')], [color('#ee4a1b'), color('#61d5d4'), color('#3e73a2'), color('#bebc9e'), color('#060b0a')], [color("#e3170a"), color("#2a2b2a"), color("#fdb833"), color("#7d8491"), color("#c04cfd")]];
				cc = int(random(0, colorScheme.length));
				newColorScheme();
			}
			else {
				colorScheme = colorSchemeTwo;
				cc = int(random(0, colorScheme.length));
				newColorScheme();
			}
			break;
		case 'c': newColorScheme(); break;
		case 'd': darkMode = !darkMode; break;
		// if (key=='d') debug=(debug==true) ? false: true;
		case 'p': paused = !paused; break;
		case 'r':
			bRotate=!bRotate;
			for (var i = 0; i < circles.length; i++) {
				var C=circles[i];
				if (bRotate) C.dra=C.odra;
				else C.dra=0;
			}
			break;
		case 'o': opacity = !opacity; break;
	}

}


function mouseWheel(event) {
	var e = Math.sign(event.delta);
	for (var i = 0; i < circles.length; i++) {
		var oR = circles[i].or;
		if (circles[i].r - e * 0.01 * oR > 0.05 * oR && circles[i].r - e * 0.01 * oR < 3 * oR) {
			circles[i].r -= e * 0.01 * oR;
			// console.log(circles[i].r);
		}
	}
}

function mousePressed() {
	console.log('clicked');
	clicked = true;
	clickTime=millis();
	for (var i = 0; i < circles.length; i++) {
		var C = circles[i];
		C.pcddFactor=C.ddFactor+0.0;
		C.pcdd=createVector(0, 0).set(C.dd);
	}
}

function mouseReleased() {
	clicked = false;
}

function populateCircles() {
	let strokee=random();
	for (let j = 1; j < levels; j++) {
		//var sw=0.5*j;
		
		if (strokee<0.3) sw=2;
		else sw = random(0,1);
		//var c=random(0,100);
		for (let i = 0; i < total; i++) {
			var t = random(0, 2 * PI);
			//var t=2*PI/total*i;
			//var t=2*PI/radius*i;
			var r = random(j / 100 * radius, (j + 1) * radius);
			// sw=map(r,j*radius,(j+1)*radius,0.1,1);
			// sw = 1;
			// console.log(cc);
			let cutoff=random();
			if (cutoff<density){
				circles.push(new Circle(t, j, r, cc, sw));
			}
		}
	}

}

function updateBgColor() {
	let colScheme = circles[circles.length - 1].cc;
	let chCs = colorScheme[colScheme];
	let choice = int(random(0, chCs.length));
	bgChoice = chCs[choice];
	return bgChoice;
}

function newColorScheme() {
	// colorScheme=[[color('#333333'), color('#666A86'), color('#FF6700'), color('#E8DDB5')],[color('#238DA5'),color('#599D6B'), color('#FDBC2E'),color('#C84A4D'), color('#2A303E') ],[color('#FA8334'),color('#1E3888'),color('#191308'),color('#C45AB3'),color('#89937C')],[color('#0081A7'),color('#00AFB9'),color('#291F1E'),color('#FED9B7'),color('#F07167')],[color('#E07A5F'),color('#3D405B'),color('#81B29A'),color('#F2CC8F')],[color('#5F0F40'),color('#9A031E'),color('#FB8B24'),color('#E36414'),color('#0F4C5C')],[color('#c9cba3'),color('#ffe1a8'),color('#e26d5c'),color('#723d46'),color('#472d30')],[color('#dd6e42'),color('#e8dab2'),color('#4f6d7a'),color('#c0d6df'),color('#eaeaea')],[color('#001219'), color('#005F73'), color('#0A9396'), color('#94D2BD'), color('#E9D8A6'), color('#EE9B00'), color('#CA6702'), color('#BB3E03'),color('#AE2012'),color('#9B2226')],[color('#ee4a1b'), color('#61d5d4'), color('#3e73a2'), color('#bebc9e'), color('#060b0a')]];
	//if (opacity) toggleOpacity();
	cs = int(random(0, colorScheme.length));
	for (let k = 0; k < circles.length; k++) {
		var S1 = circles[k];
		S1.cc = cs;
		S1.c = colorScheme[cs][int(random(0, colorScheme[cs].length))];
	}
}

class Circle {
	//time, length (of position), circle radius, color selection, stroke weight
	constructor(t, l, r, cc, sw) {
		// this.P=P;
		this.t = t;
		this.l = l;
		//this.c=c;
		this.r = r;
		this.or = r;
		this.sw = sw;
		this.rand = random();
		this.tt = random(1, 35 * 60);
		this.dt = random(-0.01, 0.01);
		// this.dt=0.04;
		this.dd = createVector(0, 0);
		this.ddt = createVector(random(-0.01, 0.01), random(-0.01, 0.01));
		this.cc = cc;
		this.c = colorScheme[this.cc][int(random(0, colorScheme[this.cc].length))];
		this.ddFactor = ddFactor;
		this.oCor = createVector(width, height);
		this.ra=0;
		this.dra=random(-2*PI/(60*3),2*PI/(60*3));
		this.odra=this.dra;
		//out factor
		this.of=random(0.05,0.1);
	}

	drawShape() {
		push();
		strokeWeight(this.sw);
		if (opacity) this.c.setAlpha(opacityAmt);
		else this.c.setAlpha(1);
		stroke('black');
		fill(this.c);
		translate(this.r / 2 * this.l * cos(this.t), this.r / 2 * this.l * sin(this.t));
		translate(this.ddFactor * this.dd.x, this.ddFactor * this.dd.y);
		
		rotate(this.ra);
		// console.log(this.rand,shapeProbs[0],shapeProbs[1])
		// console.log(shapeProbs[0]<this.rand<shapeProbs[1])
		if (this.rand < shapeProbs[0]){
			let tf=1.15;
			triangle(sin(2*PI/3)*this.r/2*tf,cos(2*PI/3)*this.r/2*tf,sin(2*PI*2/3)*this.r/2*tf,cos(2*PI*2/3)*this.r/2*tf,sin(2*PI)*this.r/2*tf,cos(2*PI)*this.r/2*tf)
		}
		else if (shapeProbs[0]<this.rand && this.rand<shapeProbs[1]){
			// console.log('LINE')
			strokeWeight(this.sw*3);
			line(-this.r/2,0,this.r/2,0);
		}
		else if (shapeProbs[1]<this.rand && this.rand<shapeProbs[2]){
			square(0, 0, this.r);
		}
		else circle(0, 0, this.r);
		pop();
	}

	rotate(){
		this.ra+=this.dra;
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