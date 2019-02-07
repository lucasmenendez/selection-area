(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/selection-area.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/area.js":
/*!*********************!*\
  !*** ./src/area.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Area; });\nconst defaultStyle = 'position: absolute; z-index: 1000; top: 0; left: 0;';\n/**\r\n * Area class includes all required functions to emulate the area behaviour.\r\n * Constructor initializes main params of area Element and stores \r\n * area DOM Element ID\r\n * @param  {string} id Area Element DOM ID\r\n * @param  {number} [x=0] Initial area position on x axis, default 0\r\n * @param  {number} [y=0] Initial area position on y axis, default 0\r\n * @class\r\n */\n\nclass Area {\n  constructor(id, x = 0, y = 0) {\n    this.id = id;\n    this.x = x;\n    this.y = y;\n    this.w = 0;\n    this.h = 0;\n  }\n  /**\r\n   * Instance function creates DOM Element for selection area, assings\r\n   * the ID provided and sets default style to it. The function receives \r\n   * container Element, append created area to it and stores both of them\r\n   * into the current instance.\r\n   * @param  {Element} parent Container Element to append selection area\r\n   */\n\n\n  instance(parent) {\n    let areaElem = document.createElement('div');\n    areaElem.setAttribute('id', this.id);\n    areaElem.setAttribute('style', defaultStyle);\n    parent.appendChild(areaElem);\n    this.parent = parent;\n    this.elem = document.getElementById(this.id);\n  }\n  /**\r\n   * Recalculates current area dimensions and call uptdate to reset current\r\n   * DOM Element.\r\n   * @param  {number} x Current cursor position on x axis\r\n   * @param  {number} y Current cursor position on y axis\r\n   */\n\n\n  resize(x, y) {\n    this.w = Math.abs(this.x - x);\n    this.h = Math.abs(this.y - y);\n  }\n  /**\r\n  * Recalculates current area DOM Element position based en current cursor \r\n  * position.\r\n  * @param  {number} posx Current cursor position on x axis\r\n  * @param  {number} posy Current cursor position on y axis\r\n  */\n\n\n  move(posx, posy) {\n    let pos = {\n      y: this.y >= posy ? posy : this.y,\n      x: this.x >= posx ? posx : this.x,\n      w: this.w,\n      h: this.h\n    };\n    this.elem.style.top = `${pos.y}px`;\n    this.elem.style.left = `${pos.x}px`;\n    this.elem.style.width = `${pos.w}px`;\n    this.elem.style.height = `${pos.h}px`;\n  }\n  /**\r\n   * Deletes current DOM Element from parent container.\r\n   */\n\n\n  destroy() {\n    if (this.parent.contains(this.elem)) this.parent.removeChild(this.elem);\n  }\n  /**\r\n   * Calculates if target Element dimensions and current selection area DOM\r\n   * Element dimensions intersects in any side.\r\n   * @param  {Element} target Target DOM Element to check if area is over it\r\n   * @returns Boolean with intersection result\r\n   */\n\n\n  isOver(target) {\n    let aRect = this.elem.getBoundingClientRect();\n    let bRect = target.getBoundingClientRect();\n    let a = {\n      top: aRect.top,\n      left: aRect.left,\n      bottom: aRect.top + aRect.height,\n      right: aRect.left + aRect.width\n    };\n    let b = {\n      top: bRect.top,\n      left: bRect.left,\n      bottom: bRect.top + bRect.height,\n      right: bRect.left + bRect.width\n    };\n    return !(b.left > a.right || b.right < a.left || b.top > a.bottom || b.bottom < a.top);\n  }\n\n}\n\n//# sourceURL=webpack:///./src/area.js?");

/***/ }),

/***/ "./src/selection-area.js":
/*!*******************************!*\
  !*** ./src/selection-area.js ***!
  \*******************************/
/*! exports provided: SelectionArea */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SelectionArea\", function() { return SelectionArea; });\n/* harmony import */ var _area__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./area */ \"./src/area.js\");\n\nconst defaultAreaId = 'selectionArea';\nconst defaultProperty = 'data-value';\n/**\r\n * SelectionArea class listen mouse movements to create and adapt a selection \r\n * area checking if intersects with any target child element and returns the \r\n * content of defined property of that childs. \r\n * @param  {Object} config Config object\r\n * @param  {Element} config.container DOM Element to make selectable\r\n * @param  {string} config.targetSelector DOM selector of selectables childs\r\n * @param  {string} [config.areaId] DOM ID for selection area to define styles\r\n * @param  {string} [config.property] Property to get from selected childs\r\n * @param  {function} [config.callback] Function to call when selection ends\r\n * @example \r\n * import { SelectionArea } from 'selection-area';\r\n * \r\n * let container = document.querySelector('.parent');\r\n * let targetSelector = '.child';\r\n * let callback = selection => {\r\n *      if (selection.length == 0) console.warn(\"empty selection\");\r\n *      else console.log(selection);\r\n * }\r\n * \r\n * let selectable = new Selectable({ container, targetSelector, callback });\r\n * @class\r\n */\n\nclass SelectionArea {\n  constructor(config) {\n    this.checkConfig(config);\n    this.listenMouse();\n  }\n  /**\r\n   * Function stores user callback to invoke it when selection ends.\r\n   * @param  {function} callback Function defined as callback by user\r\n   */\n\n\n  onSelect(callback) {\n    this.callback = callback;\n  }\n  /**\r\n   * Function that checks if all required configuration are provided as param,\r\n   * extract whole configurayions inside it and stores into current instance. \r\n   * @param  {Onject} config Configuration object definition\r\n   */\n\n\n  checkConfig(config) {\n    if (Object.prototype.hasOwnProperty.call(config, 'container')) {\n      this.container = config.container;\n    } else throw 'element target not provided';\n\n    if (Object.prototype.hasOwnProperty.call(config, 'targetSelector')) {\n      this.targets = this.container.querySelectorAll(config.targetSelector);\n      if (this.targets.length == 0) throw 'no selectable childs found';\n    } else throw 'target selector not provided';\n\n    this.areaId = Object.prototype.hasOwnProperty.call(config, 'areaId') ? config.areaId : defaultAreaId;\n    this.prop = Object.prototype.hasOwnProperty.call(config, 'property') ? config.property : defaultProperty;\n    this.callback = Object.prototype.hasOwnProperty.call(config, 'callback') ? config.callback : null;\n  }\n  /**\r\n   * Sets custom listeners to mouse down, move and up events.\r\n   */\n\n\n  listenMouse() {\n    this.container.addEventListener('mousedown', e => this.initArea(e));\n    this.container.addEventListener('mousemove', e => this.updateArea(e));\n    this.container.addEventListener('mouseup', e => this.removeArea(e));\n  }\n  /**\r\n   * initArea funtion clears current selection, creates new area with ID \r\n   * provided and instances it into current container.\r\n   * @param  {MouseEvent} e 'mousedown' event metadata\r\n   */\n\n\n  initArea(e) {\n    e.preventDefault();\n    this.data = [];\n    this.area = new _area__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.areaId, e.pageX, e.pageY);\n    this.area.instance(this.container);\n  }\n  /**\r\n   * updateArea captures current mouse position and updates current selection\r\n   * area with that position, resizing area and moving it.\r\n   * @param  {MouseEvent} e 'mousemove' event metadata.\r\n   */\n\n\n  updateArea(e) {\n    e.preventDefault();\n\n    if (this.area) {\n      let [x, y] = [e.pageX, e.pageY];\n      this.area.resize(x, y);\n      this.area.move(x, y);\n    }\n  }\n  /**\r\n   * removeArea extract selected items, destroy current selection area and\r\n   * invokes callback passing values of selected items.\r\n   * @param  {MouseEvent} e 'mouseup' event metadata.\r\n   */\n\n\n  removeArea(e) {\n    e.preventDefault();\n\n    if (this.area) {\n      this.checkIntersections();\n      this.area.destroy();\n      if (this.callback) this.callback(this.data);\n    }\n  }\n  /**\r\n   * checkIntersecionts iterates over all posible targets and checks if\r\n   * current selection area intersects with each of them. Stores all included\r\n   * values of user defined child property.\r\n   */\n\n\n  checkIntersections() {\n    this.targets.forEach(t => {\n      let val = t.getAttribute(this.prop);\n      if (this.area.isOver(t) && this.data.indexOf(val) === -1) this.data.push(val);\n    });\n  }\n\n}\n\n//# sourceURL=webpack:///./src/selection-area.js?");

/***/ })

/******/ });
});