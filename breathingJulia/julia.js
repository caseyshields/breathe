// import BreathingManager from "./breath.js";

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

      // apparently image.set is slower...
      // fractal.set(x,y, 'purple');

      // create a triangle wave from a sawtooth...
      // let tw32 = 32*Math.abs((((8*breath.value)+iteration)%8)-4);
      let tw16 = 16*Math.abs((((16*breath.value)+iteration)%16)-8);
      let tw8 = 8*Math.abs((((32*breath.value)+iteration)%32)-16); // I think this can be more optimized...
      fractal.pixels[n] = 0;
      fractal.pixels[n+1] = tw8;
      fractal.pixels[n+2] = tw16;
      fractal.pixels[n+3] = 255;
      
      // tried a bunch of approaches...
      // let v = 32+Math.floor(breath.value * 32);
      // let inv = 256/v;
      // fractal.pixels[n+2] = (iteration+64)%255 + (inv*(iteration%v));
      // fractal.pixels[n+2] = (iteration-1%255)>(breath.value*250.0)?255:0;
      // fractal.pixels[n+2] = (iteration-1%255)<(255-breath.value*250.0)?255:0;
      
      n+=4;
    }
  }
  fractal.updatePixels();
  image(fractal,0,0);
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
