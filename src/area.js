const defaultId = 'selectionArea';
const defaultStyle = 'position: absolute; z-index: 1000; top: 0; left: 0;';

/**
 * Area class includes all required functions to emulate the area behaviour.
 * Constructor initializes main params of area Element and stores 
 * area DOM Element ID
 * @param  {Object} def Area object definition
 * @param  {string} def.id Area DOM Element ID definition
 * @param  {string} [def.class] Area DOM Element class definition
 * @param  {number} [x=0] Initial area position on x axis, default 0
 * @param  {number} [y=0] Initial area position on y axis, default 0
 * @class
 * @ignore
 */
export default class Area {
    constructor(def,  x = 0, y = 0) {
        this.id = Object.prototype.hasOwnProperty.call(def, 'id') ? def.id : defaultId;
        this.class = Object.prototype.hasOwnProperty.call(def, 'class') ? def.class : false;
        this.x = x;
        this.y = y;
        this.w = 0;
        this.h = 0;
    }
    /**
     * Instance function creates DOM Element for selection area, assings
     * the ID provided and sets default style to it. The function receives 
     * container Element, append created area to it and stores both of them
     * into the current instance.
     * @param  {Element} parent Container Element to append selection area
     */
    instance(parent) {
        let areaElem = document.createElement('div');
        areaElem.setAttribute('id', this.id);
        areaElem.setAttribute('style', defaultStyle);
        if (this.class) areaElem.setAttribute('class', this.class);

        parent.appendChild(areaElem);
        this.parent = parent;        
        this.elem = document.getElementById(this.id);
    }

    /**
     * Recalculates current area dimensions and call uptdate to reset current
     * DOM Element.
     * @param  {number} x Current cursor position on x axis
     * @param  {number} y Current cursor position on y axis
     */
    resize(x, y) {
        this.w = Math.abs(this.x - x);
        this.h =  Math.abs(this.y - y);
    }

     /**
     * Recalculates current area DOM Element position based en current cursor 
     * position.
     * @param  {number} posx Current cursor position on x axis
     * @param  {number} posy Current cursor position on y axis
     */
    move(posx, posy) {
        let pos = {
            y: (this.y >= posy) ? posy: this.y,
            x: (this.x >= posx) ? posx: this.x,
            w: this.w,
            h: this.h
        }
        
        this.elem.style.top = `${ pos.y }px`;
        this.elem.style.left = `${ pos.x }px`;
        this.elem.style.width = `${ pos.w }px`;
        this.elem.style.height = `${ pos.h }px`;
    }

    /**
     * Deletes current DOM Element from parent container.
     */
    destroy() {
        if (this.parent.contains(this.elem)) this.parent.removeChild(this.elem);
    }

    /**
     * Calculates if target Element dimensions and current selection area DOM
     * Element dimensions intersects in any side.
     * @param  {Element} target Target DOM Element to check if area is over it
     * @returns Boolean with intersection result
     */
    isOver(target) {
        let aRect = this.elem.getBoundingClientRect();
        let bRect = target.getBoundingClientRect();

        let a = {
            top: aRect.top,
            left: aRect.left,
            bottom: aRect.top + aRect.height,
            right: aRect.left + aRect.width
        }

        let b = {
            top: bRect.top,
            left: bRect.left,
            bottom: bRect.top + bRect.height,
            right: bRect.left + bRect.width
        }

        return !( b.left > a.right || b.right < a.left || b.top > a.bottom || b.bottom < a.top );
    }
}