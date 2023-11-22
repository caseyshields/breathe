
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
</section
*/
export default class menu {

    p5; // the global p5 instance
    main; // the containing P5.element
    
    data;

    section;
    header;
    navigation;
    list;

    constructor(p5, parent, data) {
        this.p5 = p5;
        this.main = parent;
        this.data = data;

        this.section = p5.createElement('section');
        this.section.class(component);
        // this.section.id('');
        this.section.parent(parent);

        this.header = p5.createElement('header');
        this.header.parent(this.section);
        this.header.class(component);
        this.header.child( p5.createElement('h1', 'Credits') );

        this.navigation = p5.createElement('nav');
        this.navigation.parent(this.section);
        this.navigation.class(component);
        this.navigation.child( p5.createElement('span','nav\ntodo'))

        this.list = p5.createElement('dl');
        this.list.parent(this.section);
        this.list.class(component);

        for (let credit of data) {
            let term = p5.createElement('dt', credit.name);
            let def = p5.createElement('dd', credit.role)
            this.list.child(term);
            this.list.child(def);
        }
    }

    get section() {return this.section;}

    hide() {this.section.style('display', 'none');}
    show() {this.section.style('display', '');}
}
