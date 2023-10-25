let time;
let fr;

let height;
let width;

let orbitColor;
let escapeColor;

let maxIteration;
let cx;
let cy;

// let breath = new BreathingManager(2000, 2000, 2000, 2000);

function setup() {
  time = 0;
  fr = 30;

  height = 400;
  width = 400;

  orbitColor = color(0,255,0);
  escapeColor = color(0,0,255);

  maxIteration = 1000;
  cx = -0.4;
  cy = 0.6;

  frameRate(fr)
  createCanvas(width, height);
}

function draw() {
  time = time + deltaTime;

  strokeWeight(1);
  let r = 2;//Math.sqrt(cx*cx + cy*cy);

  //https://en.wikipedia.org/wiki/Julia_set
  for (let x=0; x<width; x++) {
    for (let y=0; y<10; y++) {

      // let zx = 2*r*x/width - r;
      // let zy = 2*r*y/height - r;
      // let iteration = 0;
      // while ((zx*zx) + (zy*zy) < (r*r) && iteration < maxIteration) {
      //   zy = (2 * zx * zy) + cy;
      //   zx = (zx*zx) - (zy*zy) + cx;
      //   iteration++;
      // }

      let r = x/width;

      // stroke( lerpColor(escapeColor, orbitColor, iteration/maxIteration) );
      stroke( lerpColor(escapeColor, orbitColor, r) );
      // stroke('purple');
      // point(x,y);
      circle(x, y, 5);
      console.log(x,y,r);
    }
  }

}
