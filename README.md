[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) [![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

Installation
------------

To install *@ixiaer/icon* globally

```bash
npm install @ixiaer/icon -g
```

Getting started
---------------

Crafting font-icon or svg-symbol with *@ixiaer/icon* typically follows these steps:

1. Create a config file .iconrc.js, .iconrc.json or an iconrc field in a package.json file, all of which *@ixiaer/icon* will look for and read automatically, or you can specify a configuration file on the command line. If none of the above will use the node_modules/@ixiaer/icon/.iconrc.js
2. Register a couple of SVG source files for processing.
3. Trigger the compilation process and receive the generated files(SVG, JS, Fonts, CSS).

Step 1 - Generator
------------------

### API

###### ES6 modules
```javascript
import svgSprite from '@ixiaer/icon/lib/svg-sprite.js'

/**
 * Compile svg and symbol js file.
 * @param  {String|null} name      Name of svg and js file.
 * @param  {String}      icons     List of SVG files.
 * @param  {String|null} template  JavaScript output Mustache template.
 * @param  {String|null} svgDest   Main output directory.
 * @param  {String|null} jsDest    JavaScript output destination.
 * @return {void}
 */
svgSprite(
  'icon',
  'assets/icons/*.svg',
  'assets/templates/svg-sprite.hbs',
  'assets/images',
  'assets/scripts'
)
```

###### CommonJS
```javascript
var webfontsGenerator require('@ixiaer/icon/lib/webfonts-generator.js')

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
webfontsGenerator(
  'icon',
  'assets/icons/*.svg',
  'assets/templates/webfonts-generator.hbs',
  'assets/fonts',
  'assets/styles',
  ['svg', 'ttf', 'eot', 'woff', 'woff2']
)
```

### CLI

###### 1. Create config

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
    template: 'assets/templates/svg-sprite.hbs',
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
    template: 'assets/templates/webfonts-generator.hbs',
    fontsDest: 'assets/fonts',
    cssDest: 'assets/styles',
    fontType: ['svg', 'ttf', 'eot', 'woff', 'woff2']
  }
}
```

###### 2. Processing

```bash
# automatically
icon
# or assign config file
icon config/my-config.js
# or use ixiaer-icon
ixiaer-icon config/my-config.js
```

### Templates

* [.iconrc.js](.iconrc.js)
* [svg-sprite.hbs](template/svg-sprite.hbs)
* [webfonts-generator.hbs](template/webfonts-generator.hbs)

Step 2 - Usage
--------------

### Font class

* Support **single color** icons
* Resize by font-size style
* Support for IE8+, and modern browsers

```html
<link rel="stylesheet" href="icon.css">
<i class="icon icon-foo" />
<i class="icon icon-bar" />
```

### Symbol

* Support for **multi-color** icons
* Resize by font-size style
* Support for IE9+, and modern browsers

```html
<!-- icon.js insert style and svg DOM -->
<style>
.icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  overflow: hidden;
}
</style>
<svg width="0" height="0" style="position:absolute">
  <symbol id="icon-foo">...</symbol>
  <symbol id="icon-bar">...</symbol>
</svg>
<!-- use icon -->
<svg class="icon" aria-hidden="true">
  <use xlink:href="#icon-foo"></use>
</svg>
<svg class="icon" aria-hidden="true">
  <use xlink:href="#icon-bar"></use>
</svg>
```

To do
---------
* [icon-webpack-plugin](#)
* [vue-icon](#)
* [react-icon](#)
* [angular-icon](#)
