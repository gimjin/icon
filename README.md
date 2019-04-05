[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) [![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

# 📦 Installation

To install *@ixiaer/icon*

```bash
npm install @ixiaer/icon
```

# 💡 Getting started

Crafting font-icon or svg-symbol with *@ixiaer/icon* typically follows these steps:

1. Create a config file icon.config.js, icon.config.json or an icon field in a package.json file, all of which *@ixiaer/icon* will look for and read automatically, or you can specify a configuration file on the command line. If none of the above will use the node_modules/@ixiaer/icon/icon.config.js
2. Register a couple of SVG source files for processing.
3. Trigger the compilation process and receive the generated files(SVG, JS, Fonts, CSS).

# ⚙️ Generator

### Node API

```javascript
// ES6 modules
import iconSymbol from '@ixiaer/icon/lib/icon-symbol.js'
// also use CommonJS
var iconFont require('@ixiaer/icon/lib/icon-font.js')

/**
 * Compile svg and symbol js file.
 * @param  {String|null} name      Name of svg and js file.
 * @param  {String}      icons     List of SVG files.
 * @param  {String|null} template  JavaScript output Mustache template.
 * @param  {String|null} svgDest   Main output directory.
 * @param  {String|null} jsDest    JavaScript output destination.
 * @return {void}
 */
iconSymbol(
  'icon',
  'assets/icons/*.svg',
  'assets/templates/icon-symbol.hbs',
  'assets/images',
  'assets/scripts'
)

/**
 * Compile fonts and css file.
 * @param  {String|null} name         Name of font and base name of font files.
 * @param  {String}      icons        List of SVG files.
 * @param  {String|null} template     Path of custom CSS template. Generator uses handlebars templates.
 * @param  {String|null} fontsDest    Directory for generated font files.
 * @param  {String|null} cssDest      Path for generated CSS file.
 * @param  {Array|null}  fontType     Font file types to generate. Possible values: [svg, ttf, woff, woff2, eot].
 * @return {void}
 */
iconFont(
  'icon',
  'assets/icons/*.svg',
  'assets/templates/icon-font.hbs',
  'assets/fonts',
  'assets/styles',
  ['svg', 'ttf', 'eot', 'woff', 'woff2']
)
```

### CLI

##### 1. Create config

```javascript
// symbol or font can be used alone
module.exports = {
  /**
   * {String|null} name      Name of svg and js file.
   * {String}      icons     List of SVG files.
   * {String|null} template  JavaScript output Mustache template.
   * {String|null} svgDest   Main output directory.
   * {String|null} jsDest    JavaScript output destination.
   */
  symbol: {
    name: 'icon',
    icons: 'assets/icons/*.svg',
    template: 'assets/templates/icon-symbol.hbs',
    svgDest: 'assets/images',
    jsDest: 'assets/scripts'
  },
  /**
   * {String|null} name       Name of font and base name of font files.
   * {String}      icons      List of SVG files.
   * {String|null} template   Path of custom CSS template. Generator uses handlebars templates.
   * {String|null} fontsDest  Directory for generated font files.
   * {String|null} cssDest    Path for generated CSS file.
   * {Array|null}  fontType   Font file types to generate. Possible values: [svg, ttf, woff, woff2, eot].
   */
  font: {
    name: 'icon',
    icons: 'assets/icons/*.svg',
    template: 'assets/templates/icon-font.hbs',
    fontsDest: 'assets/fonts',
    cssDest: 'assets/styles',
    fontType: ['svg', 'ttf', 'eot', 'woff', 'woff2']
  }
}
```

##### 2. Processing

```bash
# automatically
npx icon
# or assign config file
npx icon config/my-config.js
# or use ixiaer-icon
npx ixiaer-icon config/my-config.js
# or use package.json
# "scripts": {
#   "icon": "ixiaer-icon"
# }
npm run icon
```

> Templates
> * [icon.config.js](icon.config.js)
> * [icon-symbol.hbs](templates/icon-symbol.hbs)
> * [icon-font.hbs](templates/icon-font.hbs)

# 💎 Usage

### Font

* Support **single color** icons
* Resize by font-size style
* Support for IE8+, and modern browsers

```javascript
// Webpack
import 'assets/styles/icon.css'
```

```html
<!-- Or Browser -->
<link rel="stylesheet" type="text/css" href="assets/styles/icon.css" />
```

```html
<!-- Use icons -->
<i class="icon foo" />
<i class="icon bar" />
```

### Symbol

* Support for **multi-color** icons
* Resize by font-size style
* Support for IE9+, and modern browsers

```javascript
// Webpack
import 'assets/scripts/icon.js'
```

```html
<!-- Or Browser -->
<script type="text/javascript" src="assets/scripts/icon.js"></script>
```

```html
<!-- Use icons -->
<svg class="icon" aria-hidden="true">
  <use xlink:href="#foo" />
</svg>
<svg class="icon" aria-hidden="true">
  <use xlink:href="#bar" />
</svg>
```
