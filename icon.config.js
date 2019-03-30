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
