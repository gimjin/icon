var path = require('path')
var fg = require('fast-glob')
var stylelint = require('stylelint')
var webfontsGenerator = require('webfonts-generator')

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

module.exports = function (name, icons, template, fontsDest, cssDest, fontType) {
  // set default
  var _name = name || 'icon'
  if (icons) {
    var _icons = fg.sync(path.join(process.cwd(), icons))
  } else {
    console.error('Error: Can not find icons source. Please set config glob path.')
    process.exit()
  }
  var _dest = fontsDest
    ? path.join(process.cwd(), fontsDest)
    : path.join(process.cwd(), 'assets/fonts')
  var _cssDest = cssDest
    ? path.join(process.cwd(), cssDest, _name + '.css')
    : path.join(process.cwd(), 'assets/styles', _name + '.css')
  var _cssFontsUrl = path.relative(path.parse(_cssDest).dir, _dest)
  var _fontType = fontType || ['svg', 'ttf', 'eot', 'woff', 'woff2']
  var _cssTemplate = template
    ? path.join(process.cwd(), template)
    : path.resolve(__dirname, '../templates/webfonts-generator.hbs')

  // Compile the webfont
  webfontsGenerator({
    files: _icons,
    fontName: _name,
    types: _fontType,
    dest: _dest,
    cssDest: _cssDest,
    cssFontsUrl: _cssFontsUrl,
    cssTemplate: _cssTemplate,
    templateOptions: {
      classPrefix: _name + '-',
      baseSelector: '.' + _name
    }
  }, function (error) {
    if (error) {
      throw error
    } else {
      // stylelint fix
      stylelint.lint({
        configFile: path.resolve(__dirname, '../.stylelintrc.js'),
        files: _cssDest,
        fix: true
      })
        .then(function (data) {
          // do things with data.output, data.errored,
          // and data.results
        })
        .catch(function (err) {
          // do things with err e.g.
          throw err.stack
        })
      console.info('Compiled fonts successfully.')
    }
  })
}
