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

let r;
let delta;
let total, angleTotal;
let points;

var L = 600;
var w_l = 0.17;
var S = 0.58;
var d = 0.5
var gradientColor1 = '#ffffff'
var gradientColor2 = '#000000'
var gradientColor = false;
let B, D, w;

var rotationFactor = 20;
let playedCount = 0;

var lineDensity = 0.05;

let lightBg = 240;
let darkBg = 15;

let rZs;
let probs;
let radii;

let t;
var brown = true;
var darkMode = false;
var rainbow = false;
var lines=true;
var paused = false;
var visible = true;
var spotted = true;
var shell = true;
var pDots=[]

let bDecide;
var easycam;
// let rotationFactor;
// let gB,gW,gR;
var gui;

// var capture = true; // default is to not capture frames, can be changed with button in browser
// var capturer = new CCapture({
//   format:'gif',
//   workersPath:'js/',
//   framerate:15,
//   verbose:true
// });
// const NUM_FRAMES = 300;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  colorMode(HSB);
  easycam = createEasyCam();
  easycam.rotateX(-PI / 2 + 0.3);
  easycam.zoom(400);
  // console.log(easycam.getZoomScale());

  // r=200;
  total = 100;
  angleTotal = 100;
  // rotationFactor=random(5,40);
  points = Array.from(Array(angleTotal + 1), () => new Array(total + 1));

  // setRandom();
  frameRate(60);
  // noLoop();

  brown = bDecide();
  pdots=[random(0.2,0.25),random(0.1,0.15)];
  // pdots=[0.22,0.12];
  
  populateProbs()
  
  gui = createGui('Options');
  sliderRange(100, 1000, 1);
  gui.addGlobals('L');
  sliderRange(0.05, 1, 0.01);
  gui.addGlobals('w_l', 'S');
  sliderRange(0.05, 3, 0.01);
  gui.addGlobals('d');
  // sliderRange(0.001, 1000, 0.001);
  // gui.addGlobals('ww');
  sliderRange(0.001, 1, 0.001);
  gui.addGlobals('lineDensity');
  sliderRange(-100, 100, -1);
  gui.addGlobals(
    'rotationFactor',
    'spotted',
    'shell',
    'lines',
    'gradientColor',
    'gradientColor1',
    'gradientColor2',
    'rainbow',
    'brown',
    'darkMode');

  w = w_l * L;
  B = S * L;
  D = d * L;
  // n=1.5;

  // ww=(L-B)/(2*n);

  // console.log(w,B,D,L);

  populateRzs();
  populateRadii();
  // makeRandom(0.1,2);
  updateSpots();
  // populateRzs();
  updateSpots();
  // makeRandom(1,5);


  let P, Tt, Pp;
  peggPoints();

}

function draw() {
  // if (capture && frameCount==1) capturer.start();
  // ambientLight(200);
  if (darkMode) background(darkBg);
  else background(lightBg);

  // if (gradientColor) {brown=false;rainbow=false;}
  // if (rainbow){brown=false;gradientColor=false}

  w = w_l * L;
  // console.log(w);
  B = S * L;
  // console.log(B);
  D = d * L;
  // ww=(L-B)/(2*n);
  // console.log(D);
  // console.log(w,B,D,L);
  if (!paused) playedCount += 1;

  points = Array.from(Array(angleTotal + 1), () => new Array(total + 1));
  updateSpots();
  updateSpots();
  peggPoints();


  stroke('black');
  strokeWeight(.01);
  translate(0, 0, 0);

  // }
  // console.log(points);
  // pop();

  // push();
  for (let i = 0; i < angleTotal; i++) {
    beginShape(TRIANGLE_STRIP);
    // fill('red');
    // specularColor('#red')
    // normalMaterial();
    for (let j = 0; j <= total; j++) {
      let v1 = points[i][j][2];
      // strokeWeight(0.01);
      // stroke('black');
      let locX = mouseX - length / 2;
      let locY = mouseY - width / 2;


      // ambientLight(60, 60, 60);
      // pointLight(30, 30, 30, locX, locY,10);

      noStroke();
      // let hue=map(v1.z,-L/2,L/2,16.3,50);
      // // ambientMaterial(hue,81.6,93.7);
      // fill(hue,81.6,93.7);
      
      let col=getCol(v1);
      fill(col[0], col[1], col[2]);
      if (shell) {
        vertex(v1.x, v1.y, v1.z);
        // console.log(v1.x,v1.y,v1.z)
        let v2 = points[i + 1][j][2];
        vertex(v2.x, v2.y, v2.z);
      }

      // console.log(v2.x,v2.y,v2.z)

    }
    endShape();
    // pop();
  }

  for (let i = 0; i < angleTotal; i++) {
    for (let j = 0; j <= total; j++) {
      // let v1=points[i][j][5];
      // let v2=points[i+1][j][5];

      let rV1 = points[i][j][0];
      let rV2 = points[i + 1][j][0];
      // let rRadius=2;
      // let rRadius=radii[i][j][0];
      let rRadius = radii[i][j][0] / 600 * L;

      let rrV1 = points[i][j][1];
      let rrV2 = points[i + 1][j][1]
      // let rrRadius=5;
      // let rrRadius=radii[i+1][j][1];
      let rrRadius = radii[i][j][1] / 600 * L;
      // console.log(rV1,rV2);

      let pV1 = probs[i][j][0];
      let pV2 = probs[i][j][1];
      let pLines = probs[i][j][2];

      if (pLines < lineDensity && lines) {
        push()
        rotateZ(playedCount / 500 * rotationFactor);
        let col=getCol(rV1);
        stroke(col[0], col[1], col[2]);

        // strokeWeight(map(dist(rV1.x,rV1.y,rV1.z,rV2.x,rV2.y,rV2.z),0,L,0.01,.5) );
        strokeWeight(0.5);
        line(rV1.x, rV1.y, rV1.z, rV2.x, rV2.y, rV2.z);
        pop()
      }

      if (pV1 < pdots[0]) {
        push();
        stroke('#110504');
        noStroke();
        // fill('#00000015');
        fill('#895A46');
        // strokeWeight(1);
        rotateZ(playedCount / 500 * rotationFactor);
        // translate(1.1*rV1.x,1.1*rV1.y,1.1*rV1.z);
        let d = 1;
        translate(d * rV1.x, d * rV1.y, d * rV1.z);

        if (spotted) sphere(rRadius, 24, 24);
        translate(-d * rV1.x, -d * rV1.y, -d * rV1.z);
        // rotateZ(-2*frameCount/50);
        // translate(rV1.x,rV1.y,rV1.z);
        stroke('#622E19')
        pop();
      }

      if (pV2 < pdots[1]) {
        push();
        stroke('#110504');
        noStroke();
        // fill('#00000015');
        // strokeWeight(1);
        rotateZ(playedCount / 500 * rotationFactor);
        // translate(1.1*rV1.x,1.1*rV1.y,1.1*rV1.z);
        let d = 0.99;
        translate(d * rrV1.x, d * rrV1.y, d * rrV1.z);
        // fill('#521D0B');
        fill('#171615');
        if (spotted) sphere(rrRadius, 24, 24);
        pop();
      }
    }
  }
  // if (capture){
  //   capturer.capture( canvas ); // if capture is 'true', save the frame
  //   if (frameCount-1 == NUM_FRAMES){ //stop and save after NUM_FRAMES
  //       capturer.stop(); 
  //       capturer.save(); 
  //       // noLoop(); 
  //   }
  // }
}

function getCol(vec) {
  if (brown && !rainbow && !gradientColor) return gB(vec);
  else if (!brown && !rainbow && !gradientColor) return gW(vec);
  else if (gradientColor && !rainbow) return gC(vec,gradientColor1,gradientColor2);
  else return gR(vec);
}
function gB(vec) { return [map(vec.z, -L / 2, L / 2, 15, 35), map(vec.z, -L / 2, L / 2, 61, 80), map(vec.x, -L / 2, L / 2, 60, 75)]; }
function gW(vec) { return [map(vec.z, -L / 2, L / 2, 38, 30), map(vec.z, -L / 2, L / 2, 31, 30), map(vec.x, -L / 2, L / 2, 80, 100)]; }
function gR(vec) { return [map(vec.z, -L / 2, L / 2, 0, 255), 50, map(vec.x, -L / 2, L / 2, 80, 100)]; }
function gC(vec, c1, c2) { return [map(vec.z, -L / 2, L / 2, hue(c1), hue(c2)), map(vec.z, -L / 2, L / 2, saturation(c1), saturation(c2)), map(vec.x, -L / 2, L / 2, brightness(c1), brightness(c2))]; }

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function updateSpots() {
  let P, Tt, Pp;
  for (let i = 0; i <= angleTotal; i++) {
    for (let j = 0; j <= total; j++) {
      let rZ = rZs[i][j][0];
      pL = rZs[i][j][1];
      rZ = map(rZ, -pL, pL, -L / 2, L / 2);
      // let rX;
      // if (pyro) rX=pyroEquation(rZ);
      let rX = equation(rZ);
      let rY = 0;

      // console.log(rX,rY,rZ);
      P = [[rX], [rY], [rZ]]
      //rotating by rand angle about y axis
      t = rZs[i][j][2];
      Tt = T(t);
      Pp = multiplyMatrices(Tt, P);

      rX = Pp[0];
      rY = Pp[1];
      if (points[i][j]) points[i][j].push(createVector(rX, -rY, rZ));
      else points[i][j] = [createVector(rX, -rY, rZ)];
      // points[i][j].push(random(minR,maxR));
    }
  }
}

function populateRzs() {
  rZs = Array.from(Array(angleTotal + 1), () => new Array(total + 1));
  for (let i = 0; i <= angleTotal; i++) {
    for (let j = 0; j <= total; j++) {
      let rZ = random(-L / 2, L / 2);
      rZs[i][j] = [rZ];
      rZs[i][j].push(L / 2);
      rZs[i][j].push(random(0, 2 * PI))
    }
  }
}

function populateRadii() {
  radii = Array.from(Array(angleTotal + 1), () => new Array(total + 1));
  for (let i = 0; i <= angleTotal; i++) {
    for (let j = 0; j <= total; j++) {
      let r1 = random(0.1, 2);
      let r2 = random(1, 5);
      radii[i][j] = [r1];
      radii[i][j].push(r2)
    }
  }
}

function populateProbs() {
  probs = Array.from(Array(angleTotal + 1), () => new Array(total + 1));
  for (let i = 0; i <= angleTotal; i++) {
    for (let j = 0; j <= total; j++) {
      let pV1 = random();
      let pV2 = random();
      let pLine = random();
      probs[i][j] = [pV1, pV2, pLine];
    }
  }
}

function keyTyped() {
  switch (key) {
    case ' ': case 'n':
      points = Array.from(Array(angleTotal + 1), () => new Array(total + 1));
      randomSeed();
      // setRandom();

      // w_l=random(0.1,0.2);
      // S=random(0.7,0.9);
      L = random(600, 1000);
      w_l = random(0.1, 0.3);
      S = random(0.6, 0.9);
      w = w_l * L;
      B = S * L;
      d = random(0.1, 0.5);
      // D=random(1.5,2.5)*L;

      populateRzs();
      // makeRandom(0.1,2);
      updateSpots();
      // populateRzs();
      // makeRandom(1,5);

      peggPoints();
      rotationFactor = random(1, 10);
      brown = bDecide();

      break;
    // console.log('new!');
    case 'b': darkMode = !darkMode;break;
    case 'd': spotted = !spotted; break;
    case 'l': lines = !lines; break;
    case 's': shell = !shell; break;
    case 'p': case 'r': paused = !paused; break;
    case 'o': visible = !visible; if (visible) gui.show(); else gui.hide();
  }
}

const multiplyMatrices = (a, b) => {
  if (!Array.isArray(a) || !Array.isArray(b) || !a.length || !b.length) {
    throw new Error('arguments should be in 2-dimensional array format');
  }
  let x = a.length,
    z = a[0].length,
    y = b[0].length;
  if (b.length !== z) {
    // XxZ & ZxY => XxY
    throw new Error('number of columns in the first matrix should be the same as the number of rows in the second');
  }
  let productRow = Array.apply(null, new
    Array(y)).map(Number.prototype.valueOf, 0);
  let product = new Array(x);
  for (let p = 0; p < x; p++) {
    product[p] = productRow.slice();
  }
  for (let i = 0; i < x; i++) {
    for (let j = 0; j < y; j++) {
      for (let k = 0; k < z; k++) {
        product[i][j] += a[i][k] * b[k][j];
      }
    }
  }
  return product;
}

//populate egg points
function peggPoints() {
  for (let i = 0; i <= angleTotal; i++) {
    for (let j = 0; j <= total; j++) {
      // console.log(height);
      let z = map(j, 0, total, -L / 2, L / 2);
      // let x;
      // if (pyro) x=pyroEquation(z);
      let x = equation(z)
      let y = 0;

      P = [[x], [y], [z]]
      t = 2 * PI * i / angleTotal;
      Tt = T(t);
      Pp = multiplyMatrices(Tt, P);

      x = Pp[0];
      y = Pp[1];
      if (points[i][j].length < 3) points[i][j].push(createVector(x, -y, z));
      else points[i][j][2] = createVector(x, -y, z);
    }
  }
}

// let equation = (y) => B/2*sqrt((L**2-4*y**2)/(L**2+8*w*y+4*w**2));
// let pyroEquation=(y)=>B/2*sqrt((L**2-4*y**2)/(2*(L-2*ww)*y**2+(L**2+8*L*ww-4*ww**2)*y+2*L*ww**2+L**2*ww+L**3))
let equation = (y) => B / 2 * sqrt((L ** 2 - 4 * y ** 2) / (L ** 2 + 8 * w * y + 4 * w ** 2)) * pF(y);
let T = (t) => [[cos(t), sin(t), 0], [-sin(t), cos(t), 0], [0, 0, 1]];
let pF = (y) => 1 - ((((sqrt(5.5 * L ** 2 + 11 * L * w + 4 * w ** 2) * (sqrt(3) * B * L - 2 * D * sqrt(L ** 2 + 2 * w * L + 4 * w ** 2))) / (sqrt(3) * B * L * sqrt(5.5 * L ** 2 + 11 * L * w + 4 * w ** 2) - 2 * sqrt(L ** 2 + 2 * w * L + 4 * w ** 2)))) * (1 - sqrt((L * (L ** 2 + 8 * w * y + 4 * w ** 2) / (2 * (L - 2 * w) * y ** 2 + (L ** 2 + 8 * L * w - 4 * w ** 2) * y + 2 * L * w ** 2 + L ** 2 * w + L ** 3)))));
bDecide = () => random() > 0.5;