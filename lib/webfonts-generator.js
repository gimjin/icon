var path = require('path')
var fg = require('fast-glob')
var stylelint = require('stylelint')
var webfontsGenerator = require('webfonts-generator')

/**
 * Compile fonts and fonts css file.
 * @param  {String} name         Name of font and base name of font files.
 * @param  {String} icons        List of SVG files.
 * @param  {String} template     Path of custom CSS template. Generator uses handlebars templates.
 * @param  {String} fontsDest    Directory for generated font files.
 * @param  {String} cssDest      Path for generated CSS file.
 * @param  {String} cssFontsUrl  Fonts url used in CSS file.
 * @param  {String} fontType     Font file types to generate. Possible values: svg, ttf, woff, woff2, eot.
 */

module.exports = function (name, icons, template, fontsDest, cssDest, cssFontsUrl, fontType) {
  // Glob path to array
  var entries = fg.sync(
    path.join(process.cwd(), icons)
  )

  // Compile the webfont
  webfontsGenerator({
    files: entries,
    fontName: name,
    types: fontType,
    dest: path.join(process.cwd(), fontsDest),
    cssDest: path.join(process.cwd(), cssDest, name + '.css'),
    cssFontsUrl: path.join(cssFontsUrl),
    cssTemplate: path.join(process.cwd(), template),
    templateOptions: {
      classPrefix: name + '-',
      baseSelector: '.' + name
    }
  }, function (error) {
    if (error) {
      throw error
    } else {
      // stylelint fix
      stylelint.lint({
        files: path.join(process.cwd(), cssDest, name + '.css'),
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
