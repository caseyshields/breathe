let time = 0;
let fr = 30;

let height = 400;
let width = 400;

let orbitColor;
let escapeColor;

let maxIteration = 100;
let cx = -0.4;
let cy = 0.6;

// let breath = new BreathingManager(2000, 2000, 2000, 2000);

function setup() {
  orbitColor = color(0,255,0);
  escapeColor = color(0,0,255);
  frameRate(fr);
  createCanvas(width, height);
  pixelDensity(1);
  noLoop();
  fractal = createImage(width,height);
}

function draw() {
  time = time + deltaTime;
  let r = 2;//Math.sqrt(cx*cx + cy*cy);

  fractal.loadPixels();

  // console.log(map(20,0,width,0,255));
  // let count = 4*width*height;
  // for (let n=0; n<count; n++) {
  //     fractal.pixels[n] = 255.0*n/count;
  // }

  //https://en.wikipedia.org/wiki/Julia_set
  for (let x=0; x<width; x++) {
    for (let y=0; y<height; y++) {

      // apparently image.set is slower...
      // fractal.set(x,y, 'purple');
      
      let n = 4*(x+(y*width));
      fractal.pixels[n] = 0;
      fractal.pixels[n+1] = 255*y/height;
      fractal.pixels[n+2] = 255.0*x/width;
      fractal.pixels[n+3] = 255;

      // let zx = 2*r*x/width - r;
      // let zy = 2*r*y/height - r;
      // let iteration = 0;
      // while ((zx*zx) + (zy*zy) < (r*r) && iteration < maxIteration) {
      //   zy = (2 * zx * zy) + cy;
      //   zx = (zx*zx) - (zy*zy) + cx;
      //   iteration++;
      // }

      // let r = x/width;

      // stroke( lerpColor(escapeColor, orbitColor, iteration/maxIteration) );
      // stroke( lerpColor(escapeColor, orbitColor, r) );
      // stroke('purple');
      // point(x,y);
    }
  }
  fractal.updatePixels();
  image(fractal,0,0);
}
