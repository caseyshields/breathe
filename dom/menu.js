/** Trying out P5 interaction with the DOM */

export default class menu {

    p5; // the global p5 instance
    main; // the containing P5.element
    fractal; // the julia fractal this menu controls

    div;
    control;
    center;
    scale;
    mouse;

    zoom = 1;


    constructor(instance, parent, julia) {
        this.p5 = instance;
        this.main = parent;
        this.fractal = julia;
        
        this.div = this.p5.createDiv('testing');
        this.div.parent(this.main);
        this.div.id("#menu");
        //this.div.class('hidden');

        this.center = this.p5.createDiv();
        this.center.parent(this.div);
        this.center.id('center');

        this.control = this.p5.createDiv();
        this.control.parent(this.div);
        this.control.id('control');

        this.scale = this.p5.createDiv();
        this.scale.parent(this.div);
        this.scale.id('scale');

        this.mouse = this.p5.createDiv();
        this.mouse.parent(this.div);
        this.mouse.id('mouse');

        let slider = this.p5.createSlider(1, 100, 1, 1); // min max value step
        slider.parent(this.div);
        slider.id('#zoom');
        slider.input( (e)=>{
            let z = Math.pow(0.9, slider.value());
            this.fractal.scale = z/this.fractal.width;
        });

        // elements can be hidden and shown
        let check = this.p5.createCheckbox('menu', true );
        check.parent(this.main);
        check.changed( (e)=>{
            if (check.checked())
                this.div.show();
            else this.div.hide();
        });
    }

    // the mousewheel updates the fractal zoom
    mouseWheel(event) {
        if (event.delta<0)
            this.zoom *= 0.9;
        else if (event.delta>0)
            this.zoom *= 1.1;
        this.fractal.scale = this.zoom / this.fractal.width;
        this.scale.html("scale = "+this.fractal.scale);
    }

    // 
    mouseMoved(event) {
        let M = [this.p5.mouseX, this.p5.mouseY];
        let I = this.fractal.screenToImage(M);
        let M2 = this.fractal.imageToScreen(I);
        this.mouse.html( "mouse = ("+I[0]+", "+I[1]+"i)");
        // coordinates.innerText = "mouse = ("+I[0]+", "+I[1]+"i)";
        // DEBUG
        // if (M[0]!=M2[0] || M[1]!=M2[1])
        //   console.error(M,I,M2);
    }
}
