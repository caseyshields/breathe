
const component = 'credits';

/** Proof of concept for programmatically creating game menus in the DOM
 * 
<section class="credit">
    <header class="credit">
    </header>
    <nav class="credit">
    </nav>
    <dl>
        <dt></dt>
        <dd></dd>
    </dl>
    <article class="credit">
    </article>
</section
*/
export default class menu {

    p5; // the global p5 instance
    main; // the containing P5.element
    
    section;
    header;
    navigation;
    div;

    constructor(p5, parent, julia) {
        this.p5 = p5;
        this.main = parent;
        this.fractal = julia;

        this.section = p5.createElement('section', "section");
        this.section.class(component);
        // this.section.id('');
        this.section.parent(parent);

        this.header = p5.createElement('header', "header");
        this.header.parent(this.section);
        this.header.class(component);

        this.navigation = p5.createElement('nav', 'navigation')
        this.navigation.parent(this.section);
        this.navigation.class(component);

        this.div = p5.createDiv('entries');
        this.div.parent(this.section);
        this.div.class(component);
    }

    get section() {return this.section;}

    hide() {this.section.style('display', 'none');}
    show() {this.section.style('display', '');}
}
