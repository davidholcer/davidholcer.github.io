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
let total,angleTotal;
let points;

let L,w_l,S,w,B;

var easycam;

function setup() {
  createCanvas(710, 400, WEBGL);

  easycam = createEasyCam(this,20);
  r=200;
  total=10;
  angleTotal=5;
  points = Array.from(Array(angleTotal+1), () => new Array(total+1)); 
  frameRate(20);
  // console.log(points);
  // delta=0.00000000001;

//   for (var i = 0; i < 6; i++) {
//     if (i === 2) {
//       sliderGroup[i] = createSlider(10, 400, 200);
//     } else {
//       sliderGroup[i] = createSlider(-400, 400, 0);
//     }
//     h = map(i, 0, 6, 5, 85);
//     sliderGroup[i].position(10, height + h);
//     sliderGroup[i].style('width', '80px');
//   }
}

function draw() {
  background(255);
  rotateZ(millis() / 1000);
  box();
}