[![JavaScript Style Guide](https://img.shields.io/github/package-json/dependency-version/ixiaer/icon/dev/eslint-config-standard.svg)](https://standardjs.com) [![Conventional Commits](https://img.shields.io/github/package-json/dependency-version/ixiaer/icon/dev/@commitlint/config-conventional.svg)](https://conventionalcommits.org)

## 📦 Installation

To install *@ixiaer/icon*

```bash
npm install @ixiaer/icon
```

## 💡 Getting started

Responsive website icon simple Node API and CLI solution. Support **multi-color**(symbol icon) and **single color**(font icon) icons.

1. Register a couple of SVG source files for processing.
2. Trigger the compilation process and receive the generated files(SVG, JS, Fonts, CSS).

## 💻 CLI Generator

```bash
# help
$ icon --help

Usage: icon [font|symbol] [options] [arguments]
       icon -i "icons/*.svg" --css-dest styles/

Must:
  -i, --icons     $ icon -i "icons/*.svg"

Options:
  -n, --name      $ icon -n ixiaer
  -t, --template  $ icon -t template/icon-font.css

Font options:
  --font-dest  $ icon --font-dest fonts/
  --css-dest   $ icon --css-dest styles/
  --font-type  $ icon --font-type "['svg', 'ttf', 'woff', 'woff2', 'eot']"
  --css-type   $ icon --css-type "['css', 'scss', 'less', 'stylus']"

Symbol options:
  --js-dest   $ icon --js-dest scripts/

Alias: ixiaer-icon > icon
```

> Templates
> * [icon-font.css](templates/icon-font.css)
> * [icon-symbol.js](templates/icon-symbol.js)

## 🧩 Node API

```javascript
/**
  * Must:
  * @param {string} opt.icons - List of SVG files.
  *
  * Options:
  * @param {string} opt.name - Name of font and base name of font files.
  * @param {string} opt.template - Path of custom CSS template. Generator uses handlebars templates.
  *
  * Font options:
  * @param {string} opt.fontDest - Directory for generated font files.
  * @param {string} opt.cssDest - Path for generated CSS file.
  * @param {Array} opt.fontType - Font file types to generate. Possible values: ['svg', 'ttf', 'woff', 'woff2', 'eot'].
  * @param {Array} opt.cssType - Css file types to generate. Possible values: ['css', 'scss', 'less', 'stylus'].
  *
  * Symbol options:
  * @param {string} opt.jsDest - JavaScript output destination.
  */

const iconFont require('@ixiaer/icon/lib/icon-font.js')
const iconSymbol require('@ixiaer/icon/lib/icon-symbol.js')

iconFont({
  name: 'ixiaer',
  icons: 'icons/*.svg',
  template: 'templates/icon-font.css',
  fontDest: 'assets/fonts',
  cssDest: 'assets/styles',
  fontType: ['svg', 'ttf', 'eot', 'woff', 'woff2'],
  cssType: ['css', 'scss', 'less', 'stylus']
})

iconSymbol({
  name: 'ixiaer',
  icons: 'icons/*.svg',
  template: 'templates/icon-symbol.js',
  jsDest: 'assets/scripts'
})
```

> Templates
> * [icon-font.css](templates/icon-font.css)
> * [icon-symbol.js](templates/icon-symbol.js)

## 💛 Font Icon Usage

```javascript
// Webpack
import 'assets/styles/ixiaer.css'
```

```html
<!-- CDN -->
<link href="assets/styles/ixiaer.css" rel="stylesheet" type="text/css" />
```

```html
<!-- Use icons -->
<i class="ixiaer-foo"></i>
<i class="ixiaer-bar"></i>
```

> <img src="https://raw.githubusercontent.com/ixiaer/icon-ionicons/master/icon-font.png" width="400"><br>
> [Click try it!](https://ixiaer.github.io/icon-ionicons/example.html)

## 💝 Symbol Icon Usage

```javascript
// Webpack
import 'assets/scripts/ixiaer.js'
```

```html
<!-- Or Browser -->
<script type="text/javascript" src="assets/scripts/ixiaer.js"></script>
```

```html
<!-- Use icons -->
<svg class="ixiaer" aria-hidden="true">
  <use xlink:href="#ixiaer-foo" />
</svg>
<svg class="ixiaer" aria-hidden="true">
  <use xlink:href="#ixiaer-bar" />
</svg>
```
> <img src="https://raw.githubusercontent.com/ixiaer/icon-logos/master/icon-symbol.png" width="400"><br>
> [Click try it!](https://ixiaer.github.io/icon-logos/example.html)

## 🔗 Compatibility

Font Icon: Support for IE8+, and modern browsers<br>
Symbol Icon: Support for IE9+, and modern browsers

> If you like this project, please reward a star. Thank you 🙏
