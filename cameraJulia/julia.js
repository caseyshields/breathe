// import BreathingManager from "./breath.js";

let time = 0;
let fr = 10;

let height = 400;
let width = 400;

let maxIteration = 255;
// let cx = -0.4;
// let cy = 0.6;
let r = 2;

let breath;

// let breath = new BreathingManager(2000, 2000, 2000, 2000);

function setup() {
  orbitColor = color(0,255,0);
  escapeColor = color(0,0,255);
  frameRate(fr);
  createCanvas(width, height);
  pixelDensity(1);
  // noLoop();
  fractal = createImage(width,height);
  breath = new BreathingManager(1000,1000,1000,1000);
  breath.play();
}


function draw() {
  // time = time + deltaTime;
  breath.update(deltaTime);
  // console.log(deltaTime, breath.value);

  // TODO implement pan, zoom and make right click edit control point.

  // TODO don't re-render if the mouse hasn't changed...
  let cx = map(mouseX,0,width,-r,r);
  let cy = map(mouseY,0,height,-r,r);
  let a2, b2;
  let n=0;
  fractal.loadPixels();
  for (let y=0; y<height; y++) {
    for (let x=0; x<width; x++) {
      // map pixel coordinate into the complex plane
      let a = map(x,0,width,-r,r);
      let b = map(y,0,height,-r,r);
      let iteration = 0;
      do {
        a2 = a*a;
        b2 = b*b;
        ta = a2 - b2 + cx;
        tb = 2*a*b + cy;
        iteration ++;
        a = ta;
        b = tb;
      } while ( a2 + b2 < 1e10//(r*r) 
          && iteration < maxIteration)

      // create a triangle wave from a sawtooth...
      // let tw32 = 32*Math.abs((((8*breath.value)+iteration)%8)-4);
      let tw16 = 16*Math.abs((((16*breath.value)+iteration)%16)-8);
      let tw8 = 8*Math.abs((((32*breath.value)+iteration)%32)-16); // I think this can be more optimized...
      fractal.pixels[n] = 0;
      fractal.pixels[n+1] = tw8;
      fractal.pixels[n+2] = tw16;
      fractal.pixels[n+3] = 255;
      n+=4;
    }
  }
  fractal.updatePixels();
  image(fractal,0,0);
}

//TODO stop using P5's global mode.

/** A fractal created by measuring how fast this iterated function diverges; <br>
 * <code>Z<sub>n-1</sub> = Z<sub>n</sub><super>2</super> + C</code><br>
 * Where Z is a point in the complex plane projected from an image pixel, and C is a control point.
*/
class Julia {

  /** 
   * @param {Number} width width of the screen in pixels
   * @param {Number} height of the screen in pixels 
   * // TODO let user set initial coordinates too?
  */
  constructor(width=512, height=512) {
    this.width = width/2;
    this.height = height/2;
    this.Or = 0;
    this.Oi = 0;
    this.Cr = 0;
    this.Ci = 0;
    this.scale = 2/this.width;
    this.escape = 1e10;
    this.maxIteration;
    this.image = createImage(width,height);
  }

  update() {
    let iteration; //
    let r2, i2; // temp vars for avoiding duplicate multiplications
    let r, i; // temp vars for the value of the iterated function
    
    image.loadPixels();

    // TODO
    // I'm trying to reduce the number of operations, just additions rather than a bunch of linear scaling. 
    // but adding small number like this can be poorly conditioned...
    // Let's try using image widths that are powers of two and not zoom in to far to start...

    let n = 0; // pixel index
    let Zi = this.Oi - (this.width*this.scale);
    let Zimax = this.Oi + (this.width*this.scale);
    while(Zi < Zimax) {

      let Zr = this.Or - (this.height*this.scale);
      Zrmax = this.Or + (this.height*this.scale);
      while (Zi < Zrmax) {
        iteration = 0;

        // measure how fast the complex iterated function for this pixel diverges
        r = Zr;
        i = Zi;
        do {
          r2 = r*r;
          i2 = i*i;
          tZr = r2 - i2 + cx;
          tZi = 2*r*i + cy;
          iteration ++;
          r = tZr;
          i = tZi;
        } while ( r2 + i2 < this.escape //(r*r) 
            && iteration < this.maxIteration)

        // map it to a color
        fractal.pixels[n] = 0;
        fractal.pixels[n+1] = 8*Math.abs((((32*breath.value)+iteration)%32)-16);
        fractal.pixels[n+2] = 16*Math.abs((((16*breath.value)+iteration)%16)-8);
        fractal.pixels[n+3] = 255;
        // I think this can be more optimized...
        // TODO We need to remove the dependence on breath;
        // make color map offsets public fields?
        // make color functions fields?

        // increment pixel and complex coordinates
        n+=4;
        Zr += this.scale;
      }
      Zi += this.scale;
    }
    this.image.updatePixels();
  }

    /** Position of the center of the image in the complex plane.
   * @param {Number} r the real or horizontal part.
   * @param {Number} i the imaginary or vertical part.
   */
    setPosition(r,i) {
      this.Or = r;
      this.Oi = i;
    }

  
    /**  */
    setControl(r,i) {
      this.Cr = r;
      this.Ci = i;
    }

    setScale(s) {
      this.scale = s;
    }
    // TODO differential versions of these?
    // TODO getters
    // TODO image to plane coordinate transform and its inverse?
    // TODO resize image?
}

/** @class BreathingManager meters out breathing. */
class BreathingManager {

  // should we track the number of breaths for sustained targets and such?

  #time = 0; // the current time in ms in the current cycle of breath
  #breath = 0; // a Number in [0,1] that represents the current lung volume
  #phase = []; // the end of each phase in ms in one cycle of breath
  #running = false;
  #inhale;
  #hold;
  #exhale;
  #wait;
      
  /** @constructor 
   * @param {Number} inhale duration in milliseconds
   * @param {Number} hold duration in milliseconds
   * @param {Number} exhale duration in milliseconds
   * @param {Number} wait duration in milliseconds
  */
  constructor(inhale, hold, exhale, wait) {
      // super();
      this.#time = 0; // the current time in ms in the current cycle of breath
      this.#breath = 0; // a Number in [0,1] that represents the current lung volume
      this.#phase = []; // the end of each phase in ms in one cycle of breath
      this.#running = false;
      this.#inhale = inhale;
      this.#hold = hold;
      this.#exhale = exhale;
      this.#wait = wait;
      this.#updatePhases();
  }
  
  #updatePhases() {
      this.#phase[0] = this.#inhale;
      this.#phase[1] = this.#hold + this.#phase[0];
      this.#phase[2] = this.#exhale + this.#phase[1];
      this.#phase[3] = this.#wait + this.#phase[2];
  }

  /** Update the current breath volume. Inhalation and exhalation are sinusoidally eased. */
  update(deltaTime) {
    // It is likely we'll adopt easing or animation modules. If so we might just use the easing provided by them.

    // do not breath if the game is paused
    if (!this.#running) return;
    // TODO should pause be moved to the game session?

    // track elapsed time in the cycle
    this.#time = (this.#time + deltaTime) % this.#phase[3];
    
    // inhale
    if (this.#time < this.#phase[0])
      this.#breath = (1 - Math.cos(Math.PI * this.#time / this.#inhale)) / 2;
    
    // hold
    else if (this.#time < this.#phase[1])
      this.#breath = 1;

    // exhale
    else if (this.#time < this.#phase[2])
      this.#breath = (1 + Math.cos(Math.PI * (this.#time-this.#phase[1]) / this.#exhale)) / 2;

    // wait
    else // if (this.#time < this.#phase[3])
      this.#breath = 0;
  }
  
  /** halt the breathing timer */
  pause() { this.#running = false; }

  /** start the breathing timer */
  play() { this.#running = true; }

  /** @returns a number in [0,1] representing the current volume of the lungs */
  get value() { return this.#breath; }

  /** @return {Number} the duration in ms */
  get inhale() { return this.#inhale; }

  /** @return {Number} the duration in ms */
  get hold() { return this.#hold; }

  /** @return {Number} the duration in ms */
  get exhale() { return this.#exhale; }

  /** @return {Number} the duration in ms */
  get wait() { return this.#wait; }

  // TODO add duration setters which correctly update time so no animation skips
  // (scale the offset in the current phase to the new boundaries)
}
