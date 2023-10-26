let time = 0;
let fr = 10;

let height = 400;
let width = 400;

let orbitColor;
let escapeColor;

let maxIteration = 255;
// let cx = -0.4;
// let cy = 0.6;
let r = 2;

// let breath = new BreathingManager(2000, 2000, 2000, 2000);

function setup() {
  orbitColor = color(0,255,0);
  escapeColor = color(0,0,255);
  frameRate(fr);
  createCanvas(width, height);
  pixelDensity(1);
  // noLoop();
  fractal = createImage(width,height);
}


function draw() {
  // time = time + deltaTime;

  // TODO implement pan, zoom and make right click edit control point.

  // TODO don't re-render if the mouse hasn't changed...
  let cx = map(mouseX,0,width,-r,r);
  let cy = map(mouseY,0,height,-r,r);

  let n=0;
  fractal.loadPixels();
  for (let y=0; y<height; y++) {
    for (let x=0; x<width; x++) {
      // map pixel coordinate into the complex plane
      let a = map(x,0,width,-r,r);
      let b = map(y,0,height,-r,r);
      let iteration = 0;
      do {
        a1 = a*a - b*b + cx;
        b1 = 2*a*b + cy;
        iteration ++;
        a = a1;
        b = b1;
      } while ( (a*a) + (b*b) < 1e10//(r*r) 
          && iteration < maxIteration)

      // apparently image.set is slower...
      // fractal.set(x,y, 'purple');

      iteration = iteration % 255; //Math.sqrt(iteration);
      fractal.pixels[n] = 0;
      fractal.pixels[n+1] = iteration;
      fractal.pixels[n+2] = 0;
      fractal.pixels[n+3] = 255;
      n+=4;
    }
  }
  fractal.updatePixels();
  image(fractal,0,0);
}
