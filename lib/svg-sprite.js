var fs = require('fs')
var path = require('path')
var mkdirp = require('mkdirp')
var fg = require('fast-glob')
var SVGSprite = require('svg-sprite')

/**
 * Compile svg and symbol js file.
 * @param  {String} name      Name of svg and js file.
 * @param  {String} icons     List of SVG files.
 * @param  {String} template  JavaScript output Mustache template.
 * @param  {String} svgDest   Main output directory.
 * @param  {String} jsDest    JavaScript output destination.
 */

module.exports = function (name, icons, template, svgDest, jsDest) {
  /**
   * Create and configure a spriter instance
   * @type {SVGSpriter}
   */
  var spriter = new SVGSprite({
    dest: '',
    mode: {
      symbol: {
        dest: '',
        sprite: path.join(process.cwd(), svgDest, name + '.svg'),
        render: {
          js: {
            dest: path.join(process.cwd(), jsDest, name + '.js'),
            template: path.join(process.cwd(), template)
          }
        }
      }
    }
  })

  // Add SVG source files
  var entries = fg.sync(
    path.join(process.cwd(), icons)
  )
  for (var i = 0; i < entries.length; i++) {
    spriter.add(entries[i], null, fs.readFileSync(entries[i], { encoding: 'utf-8' }))
  }

  // Compile svg and symbol js file.
  spriter.compile(function (error, result) {
    for (var mode in result) {
      for (var resource in result[mode]) {
        mkdirp.sync(path.dirname(result[mode][resource].path))
        fs.writeFileSync(result[mode][resource].path, result[mode][resource].contents)
      }
    }
    if (error) {
      throw error
    } else {
      console.info('Compiled symbol successfully.')
    }
  })
}
