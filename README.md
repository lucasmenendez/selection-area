<center>
<img src="https://raw.githubusercontent.com/lucasmenendez/selection-area/master/assets/images/logo.svg?sanitize=true" width="80">

# Selection Area


[![npm version](https://img.shields.io/badge/npm%20package-1.1.0-green.svg)](https://www.npmjs.com/package/selection-area) [![documentation](https://img.shields.io/badge/docs-link-blue.svg)](docs/README.md)

<br/>

Simple JavaScript mouse & touch seletion area to any DOM container element.

<br/>

[How to use](#how-to-use) | [API Reference](docs/README.md) | [Demo](http://lucasmenendez.github.io/selection-area/)

<br/>

</center>

## How to use

### Download

#### Install with `npm`

```sh
npm install selection-area
```

#### Install with `yarn`

```sh
yarn add selection-area
```

#### From Source Code

Clone or download zipped source code into `node_modules` project folder.

```sh
git clone https://github.com/lucasmenendez/selection-area.git <project>/node_modules/selection-area
```

### Import

#### Local dist version
Import using `script` html tags with vendor path:

```html
<script src="/node_modules/selection-area/dist/selection-area.js"></script>
```

Or import using ES6 `import`:

```javascript
import { SelectionArea } from 'selection-area';
```

#### CDN version
Importing with [unpkg.com](https://unpkg.com):

```html
<script src="https://unpkg.com/selection-area"></script>
```

### Example
Define container for selection area and selectable childs.

```html
<div class="parent">
    <div class="child">0</div>
    <div class="child">1</div>
    <div class="child">2</div>
    <div class="child">3</div>
    <div class="child">4</div>
    <div class="child">5</div>
    <div class="child">6</div>
    <div class="child">7</div>
    <div class="child">8</div>
    <div class="child">9</div>
</div>
```

Define `SelectionArea` behaviour with `configuration` object, check available parameters [here](docs/README.md#parameters). 

```js
let config = {
    container: document.querySelector('.parent'),
    area: {
        class: 'custom-area'
    },
    targets: '.child',
    touchable: true,
    autostart: true,
    callback: selection => {
        if (selection.length == 0) alert("empty selection");
        else alert(`${ selection.length } items selected`);
    }
}

let selectable = new SelectionArea(config);
```

Also you can stylize the selection area element adding style yo defined class.

```css
.custom-area {
    background: rgba(52, 152, 219, 0.2);
    border: 2px dotted #2980b9;
}

```