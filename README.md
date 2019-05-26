[![JavaScript Style Guide](https://img.shields.io/github/package-json/dependency-version/ixiaer/icon/dev/eslint-config-standard.svg)](https://standardjs.com) [![Conventional Commits](https://img.shields.io/github/package-json/dependency-version/ixiaer/icon/dev/@commitlint/config-conventional.svg)](https://conventionalcommits.org)

## 📦 Installation

To install *@ixiaer/icon*

```bash
npm install @ixiaer/icon
```

## 💡 Getting started

Responsive website icon simple Node API and CLI solution. Support multi-color(symbol) and single color(font) icons.

1. Register a couple of SVG source files for processing.
2. Trigger the compilation process and receive the generated files(SVG, JS, Fonts, CSS).

## 🚸 Examples

* [svg -> font](https://github.com/ixiaer/icon-ionicons)
* [svg -> symbol](https://github.com/ixiaer/icon-logos)

## ⚙️ Generator

#### CLI

```bash
# Icon font.
npx icon font -i assets/icons/*.svg
# alias ixiaer-icon
npx ixiaer-icon symbol -i assets/icons/*.svg
```

```bash
# help
$ icon --help

Usage: icon [font|symbol] [options] [font|symbol options] [arguments]
       icon font -n ixiaer -i "icons/*.svg" --css-dest styles/

Options:
  -n, --name      $ icon -n ixiaer
  -i, --icons     $ icon -i "icons/*.svg"
  -t, --template  $ icon -t template/icon-font.css

Font options:
  --font-dest  $ icon --font-dest fonts/
  --css-dest   $ icon --css-dest styles/
  --font-type  $ icon --font-type "['svg', 'ttf', 'woff', 'woff2', 'eot']"
  --css-type   $ icon --css-type "['css', 'scss', 'less', 'stylus']"

Symbol options:
  --js-dest   $ icon --js-dest scripts/
```

> Templates
> * [icon-font.css](templates/icon-font.css)
> * [icon-symbol.js](templates/icon-symbol.js)

#### Node API

```javascript
const iconFont require('@ixiaer/icon/lib/icon-font.js')
const iconSymbol require('@ixiaer/icon/lib/icon-symbol.js')

/**
  * Options
  * @param {Object} opt - New assign options.
  * @param {string} opt.name - Name of font and base name of font files.
  * @param {string} opt.icons - List of SVG files.
  * @param {string} opt.template - Path of custom CSS template. Generator uses handlebars templates.
  * 
  * Font options
  * @param {string} opt.fontDest - Directory for generated font files.
  * @param {string} opt.cssDest - Path for generated CSS file.
  * @param {Array} opt.fontType - Font file types to generate. Possible values: ['svg', 'ttf', 'woff', 'woff2', 'eot'].
  * @param {Array} opt.cssType - Css file types to generate. Possible values: ['css', 'scss', 'less', 'stylus'].
  *
  * Symbol options
  * @param {string} opt.jsDest - JavaScript output destination.
  */
 
iconFont({
  name: 'ixiaer',
  icons: '../templates/logo.svg',
  template: '../templates/icon-font.css',
  fontDest: 'assets/fonts',
  cssDest: 'assets/styles',
  fontType: ['svg', 'ttf', 'eot', 'woff', 'woff2'],
  cssType: ['css', 'scss', 'less', 'stylus']
})

iconSymbol({
  name: 'ixiaer',
  icons: '../templates/logo.svg',
  template: '../templates/icon-symbol.js',
  jsDest: 'assets/scripts'
})
```

## 💎 Usage

#### Font

* Support **single color** icons
* Resize by font-size style
* Support for IE8+, and modern browsers

```javascript
// Webpack
import 'assets/styles/ixiaer.css'
```

```html
<!-- Or Browser -->
<link rel="stylesheet" type="text/css" href="assets/styles/ixiaer.css" />
```

```html
<!-- Use icons -->
<i class="ixiaer-foo"></i>
<i class="ixiaer-bar"></i>
```

#### Symbol

* Support for **multi-color** icons
* Resize by font-size style
* Support for IE9+, and modern browsers

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

> If you like this project, please reward a star. Thank you 🙏
