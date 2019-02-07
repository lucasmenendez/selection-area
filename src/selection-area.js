import Area from "./area";

const defaultAreaId = 'selectionArea';
const defaultProperty = 'data-value';

/**
 * SelectionArea class listen mouse movements to create and adapt a selection 
 * area checking if intersects with any target child element and returns the 
 * content of defined property of that childs. 
 * @param  {Object} config Config object
 * @param  {Element} config.container DOM Element to make selectable
 * @param  {string} config.targetSelector DOM selector of selectables childs
 * @param  {string} [config.areaId] DOM ID for selection area to define styles
 * @param  {string} [config.property] Property to get from selected childs
 * @param  {function} [config.callback] Function to call when selection ends
 * @example 
 * import { SelectionArea } from 'selection-area';
 * 
 * let container = document.querySelector('.parent');
 * let targetSelector = '.child';
 * let callback = selection => {
 *      if (selection.length == 0) console.warn("empty selection");
 *      else console.log(selection);
 * }
 * 
 * let selectable = new Selectable({ container, targetSelector, callback });
 * @class
 */
export class SelectionArea {
    constructor(config) {
        this.checkConfig(config);
        this.listenMouse();
    }
    
    /**
     * Function stores user callback to invoke it when selection ends.
     * @param  {function} callback Function defined as callback by user
     */
    onSelect(callback) {
        this.callback = callback;
    }
    
    /**
     * Function that checks if all required configuration are provided as param,
     * extract whole configurayions inside it and stores into current instance. 
     * @param  {Onject} config Configuration object definition
     */
    checkConfig(config) {
        if (Object.prototype.hasOwnProperty.call(config, 'container')) {
            this.container = config.container;
        } else throw 'element target not provided';

        if (Object.prototype.hasOwnProperty.call(config, 'targetSelector')) {
            this.targets = this.container.querySelectorAll(config.targetSelector);
            if (this.targets.length == 0) throw 'no selectable childs found';
        } else throw 'target selector not provided';

        this.areaId = Object.prototype.hasOwnProperty.call(config, 'areaId') ? config.areaId : defaultAreaId;
        this.prop = Object.prototype.hasOwnProperty.call(config, 'property') ? config.property : defaultProperty;
        this.callback = Object.prototype.hasOwnProperty.call(config, 'callback') ? config.callback : null;
    }

    /**
     * Sets custom listeners to mouse down, move and up events.
     */
    listenMouse() {
        this.container.addEventListener('mousedown', e => this.initArea(e));
        document.addEventListener('mousemove', e => this.updateArea(e));
        document.addEventListener('mouseup', e => this.removeArea(e));
    }

    /**
     * initArea funtion clears current selection, creates new area with ID 
     * provided and instances it into current container.
     * @param  {MouseEvent} e 'mousedown' event metadata
     */
    initArea(e) {
        e.preventDefault();

        this.data = [];
        this.area = new Area(this.areaId, e.pageX, e.pageY);
        this.area.instance(this.container);
    }

    /**
     * updateArea captures current mouse position and updates current selection
     * area with that position, resizing area and moving it.
     * @param  {MouseEvent} e 'mousemove' event metadata.
     */
    updateArea(e) {
        e.preventDefault();
        if (this.area) {
            let [ x, y ] = [ e.pageX, e.pageY ];
            this.area.resize(x, y);
            this.area.move(x, y);
        }
    }

    /**
     * removeArea extract selected items, destroy current selection area and
     * invokes callback passing values of selected items.
     * @param  {MouseEvent} e 'mouseup' event metadata.
     */
    removeArea(e) {
        e.preventDefault();
        if (this.area) {
            this.checkIntersections();
            this.area.destroy();
            if (this.callback) this.callback(this.data);
        }
    }

    /**
     * checkIntersecionts iterates over all posible targets and checks if
     * current selection area intersects with each of them. Stores all included
     * values of user defined child property.
     */
    checkIntersections() {
        this.targets.forEach(t => {
            let val = t.getAttribute(this.prop);
            if (this.area.isOver(t) && this.data.indexOf(val) === -1) this.data.push(val);
        });
    }
}