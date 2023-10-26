
let time = 0;
let fr = 30;

let height = 400;
let width = 400;

let exhale = 2000;
let wait = 2000;
let inhale = 2000;
let hold = 2000;

let radius = 200;
let amp = 100;

function setup() {
  frameRate(fr)
  createCanvas(width, height);

  // create a timeline of the breathing sequence using the stage durations.
  wait += exhale;
  inhale += wait;
  hold += inhale;
}

function draw() {
  
  let emptyColor = color(0,128,64,255);
  let fullColor = color(0,255,255, 128);

  background(220);

  time = time + deltaTime;

  let offset = time % hold;
  let value = 0;

  // sinusoidal easing when breathing
  if (offset < exhale)
    value += cos( Math.PI * (offset/exhale) );

  else if (offset < wait)
    value -= 1;
  
  else if (offset < inhale)
    value -= cos( Math.PI * (offset-wait)/(inhale-wait) );
  
  else if (offset < hold)
    value += 1;

  stroke(0,0);
  fill( lerpColor(emptyColor, fullColor, (value+1)/2) );
  circle(width/2, height/2, radius + (amp*value));

  // might be worth extracting a piece-wise function that takes a list of bounds and functions as an argument...
  // some tweening library might be more clear way to write it too.
}
