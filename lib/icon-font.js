const fs = require('fs')
const path = require('path')
const fg = require('fast-glob')
const chalk = require('chalk')
const webfontsGenerator = require('webfonts-generator')
const Css2stylus = require('css2stylus')

/**
  * Compile fonts and css file.
  * @param {Object} opt - New assign options.
  * @param {string} opt.name - Name of font and base name of font files.
  * @param {string} opt.icons - List of SVG files.
  * @param {string} opt.template - Path of custom CSS template. Generator uses handlebars templates.
  * @param {string} opt.fontDest - Directory for generated font files.
  * @param {string} opt.cssDest - Path for generated CSS file.
  * @param {Array} opt.fontType - Font file types to generate. Possible values: ['svg', 'ttf', 'woff', 'woff2', 'eot'].
  * @param {Array} opt.cssType - Css file types to generate. Possible values: ['css', 'scss', 'less', 'stylus'].
  */

module.exports = function (opt) {
  // Set default
  let options = Object.assign({
    name: 'ixiaer',
    icons: '../templates/logo.svg',
    template: '../templates/icon-font.hbs',
    fontDest: 'assets/fonts',
    cssDest: 'assets/styles',
    fontType: ['svg', 'ttf', 'eot', 'woff', 'woff2'],
    cssType: ['css', 'scss', 'less', 'stylus']
  }, opt)

  // Compile the webfont.
  webfontsGenerator({
    fontName: options.name,
    files: opt.icons
      ? fg.sync(path.join(process.cwd(), options.icons))
      : fg.sync(path.resolve(__dirname, options.icons)),
    cssTemplate: opt.template
      ? path.join(process.cwd(), options.template)
      : path.resolve(__dirname, options.template),
    dest: path.join(process.cwd(), options.fontDest),
    cssDest: path.join(process.cwd(), options.cssDest, options.name + '.css'),
    types: options.fontType,
    cssFontsUrl: path.relative(path.parse(path.join(process.cwd(), options.cssDest, options.name + '.css')).dir, path.join(process.cwd(), options.fontDest)),
    templateOptions: {
      classPrefix: '',
      baseSelector: '.' + options.name
    }
  }, err => {
    if (err) { throw err }
    // Beautify code
    console.info(chalk.cyanBright('[ok]'), 'Beautify css code.')
    // Get css content
    let css = fs.readFileSync(path.join(process.cwd(), options.cssDest, options.name + '.css'), { encoding: 'utf-8' })
    // Create style files
    for (var i = 0; i < options.cssType.length; i++) {
      switch (options.cssType[i]) {
        case 'scss':
          fs.writeFileSync(path.join(process.cwd(), options.cssDest, options.name + '.scss'), css)
          break
        case 'less':
          fs.writeFileSync(path.join(process.cwd(), options.cssDest, options.name + '.less'), css)
          break
        case 'stylus':
          let converter = new Css2stylus.Converter(css)
          converter.processCss()
          fs.writeFileSync(path.join(process.cwd(), options.cssDest, options.name + '.styl'), converter.getStylus())
          break
      }
    }
    console.info(chalk.cyanBright('[ok]'), 'Compiling ' + options.cssType)
    // Clean basic file
    if (!options.cssType.includes('css')) {
      fs.unlinkSync(path.join(process.cwd(), options.cssDest, options.name + '.css'))
    }
    if (!options.fontType.includes('svg')) {
      fs.unlinkSync(path.join(process.cwd(), options.fontDest, options.name + '.svg'))
    }
    console.info(chalk.cyanBright('[ok]'), 'Generator font successfully.')
  })
}
