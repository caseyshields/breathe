import BreathingManager from "./breath.js";
/** A fractal created by measuring how fast this iterated function diverges; <br>
 * <code>Z<sub>n-1</sub> = Z<sub>n</sub><super>2</super> + C</code><br>
 * Where Z is a point in the complex plane projected from an image pixel, and C is a control point.
*/
export default class Julia {

  /** 
   * @param {Number} width width of the screen in pixels
   * @param {Number} height of the screen in pixels 
   * // TODO let user set initial coordinates too?
  */
  constructor(p5, width=512, height=512) {
    this.p5 = p5;
    this.width = width/2;
    this.height = height/2;
    this.Or = 0; // camera origin
    this.Oi = 0;
    this.Cr = 0; // Control point
    this.Ci = 0;
    this.scale = 2/this.width; // scaling factor from screen to complex plane
    this.escape = 1e10; // if the iterated function grows larger than this, we consider it divergent
    this.maxIteration = 512; // if the function iterates this many times we assume it never will
    this.image = p5.createImage(width,height);
  }

  update() {
    let iteration; //
    let r2, i2; // temp vars for avoiding duplicate multiplications
    let r, i; // temp vars for the value of the iterated function
    
    this.image.loadPixels();

    // TODO
    // I'm trying to reduce the number of operations, just additions rather than a bunch of linear scaling. 
    // but adding small number like this can be poorly conditioned...
    // Let's try using image widths that are powers of two and not zoom in to far to start...

    let n = 0; // pixel index
    let Zi = this.Oi - (this.width*this.scale);
    let Zimax = this.Oi + (this.width*this.scale);
    while(Zi < Zimax) {

      let Zr = this.Or - (this.height*this.scale);
      let Zrmax = this.Or + (this.height*this.scale);
      while (Zr < Zrmax) {

        // measure how fast the complex iterated function for this pixel diverges
        r = Zr;
        i = Zi;
        iteration = 0;
        do {
          r2 = r*r;
          i2 = i*i;
          let tZr = r2 - i2 + this.Cr;
          let tZi = 2*r*i + this.Ci;
          iteration ++;
          r = tZr;
          i = tZi;
        } while ( r2 + i2 < this.escape //(r*r) 
            && iteration < this.maxIteration)

        // map it to a color
        let breathvalue = 0.5;
        this.image.pixels[n] = 0;
        this.image.pixels[n+1] = 8*Math.abs((((32*breathvalue)+iteration)%32)-16);
        this.image.pixels[n+2] = 16*Math.abs((((16*breathvalue)+iteration)%16)-8);
        this.image.pixels[n+3] = 255;
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

    // image(fractal,0,0);
  }

  /** draws the image to the given context 
   * @param g a P5 graphics context
  */
  render(g) {
    g.image(this.image,0,0);
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
