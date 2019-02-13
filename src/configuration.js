/**
 * Validate class verifies if user provided data complies with required 
 * parameters.
 * @param  {Object} data SelectionArea configuration provided by user
 * @class
 * @ignore
 */
export default class Validate {
    constructor(data) {
        this.data = data;
    }
    /**
     * container function checks if data provided by user contians a defined
     * container attribute and its contians a valid HTML Element to return it.
     */
    container() {
        if (
            !Object.prototype.hasOwnProperty.call(this.data, 'container') || 
            !this.data.container instanceof HTMLElement 
        ) throw '"container" attribute must be defined';
        
        return this.data.container;
    }
    /**
     * targets function check if data provided by user contains a attribute 
     * named as 'targets' and checks if that attributte is a String (so would be
     * the targets selector) or a Array of Strings with targets selector.
     * Otherwise, throw a error.
     */
    targets() {
        if (Object.prototype.hasOwnProperty.call(this.data, 'targets')) {
            if (typeof this.data.targets === 'string') {
                return [ this.data.targets ];
            } else if (this.data.targets instanceof Array) {
                let selectors = this.data.targets.filter(t => typeof t === 'string');
                if (selectors.length === 0) throw '"targets" property must be a String or a String Array.';
                
                return selectors;
            } else throw '"targets" attribute must be defined';
        } else throw '"targets" attribute must be defined';
    }
    /**
     * areaAttrs function check if data provided by user contains an attributte
     * named as 'area' with a new area id as String or an Object with the area 
     * ID and/or Class to overwrite the default one. Returns normalized attrs.
     */
    areaAttrs() {
        let attrs = {};
        if (Object.prototype.hasOwnProperty.call(this.data, 'area')) {
            if (typeof this.data.area === 'string') {
                return { id: this.data.area };
            } else if (this.data.area instanceof Object) {
                if (Object.prototype.hasOwnProperty.call(this.data.area, 'id')) attrs = { id: this.data.area};
                if (Object.prototype.hasOwnProperty.call(this.data.area, 'class')) attrs.class = this.data.area.class;

                return attrs;
            } else console.warn('"area" property must be a String or a Object.');
        }

        return attrs;
    }

    /**
     * touchable function check if data provided by user contains a attributte
     * named as 'touchable' and if that attribute is a boolean, returns its value.
     */
    touchable() {
        return (
            Object.prototype.hasOwnProperty.call(this.data, 'touchable') && 
            typeof this.data.touchable == 'boolean' && 
            this.data.touchable
        );
    }
    
    /**
     * autostart function check if data provided by user contains a attributte
     * named as 'autostart' and if that attribute is a boolean, returns its value.
     */
    autostart() {
        return (
            Object.prototype.hasOwnProperty.call(this.data, 'autostart') && 
            typeof this.data.autostart === 'boolean' && 
            this.data.autostart
        );
    }

    /**
     * callback function check if data provided by user contains a attributte
     * named as 'callback' and if that attribute is a function, returns it.
     */
    callback() {
        if (
            !Object.prototype.hasOwnProperty.call(this.data, 'callback') || 
            typeof this.data.callback !== 'function'
        ) return null;

        return this.data.callback;
    }
}