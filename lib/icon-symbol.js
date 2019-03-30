var fs = require('fs')
var path = require('path')
var mkdirp = require('mkdirp')
var fg = require('fast-glob')
var SVGSprite = require('svg-sprite')

/**
 * Compile svg and symbol js file.
 * @param  {String|null} name      Name of svg and js file.
 * @param  {String}      icons     List of SVG files.
 * @param  {String|null} template  JavaScript output Mustache template.
 * @param  {String|null} svgDest   Main output directory.
 * @param  {String|null} jsDest    JavaScript output destination.
 * @return {void}
 */

module.exports = function (name, icons, template, svgDest, jsDest) {
  // set default
  var _name = name || 'icon'
  if (icons) {
    var _icons = fg.sync(path.join(process.cwd(), icons))
  } else {
    console.error('Error: Can not find icons source. Please set config glob path.')
    process.exit()
  }
  var _dest = jsDest
    ? path.join(process.cwd(), jsDest, _name + '.js')
    : path.join(process.cwd(), 'assets/scripts', _name + '.js')
  var _sprite = svgDest
    ? path.join(process.cwd(), svgDest, _name + '.svg')
    : path.join(process.cwd(), 'assets/images', _name + '.svg')
  var _template = template
    ? path.join(process.cwd(), template)
    : path.resolve(__dirname, '../templates/icon-symbol.hbs')
  /**
   * Create and configure a spriter instance
   * @type {SVGSprite}
   */
  var spriter = new SVGSprite({
    dest: '',
    variables: {
      name: _name
    },
    shape: {
      transform: [{
        svgo: {
          plugins: [
            { removeXMLNS: true }
          ]
        }
      }]
    },
    mode: {
      symbol: {
        dest: '',
        sprite: _sprite,
        render: {
          js: {
            dest: _dest,
            template: _template
          }
        }
      }
    }
  })

  for (var i = 0; i < _icons.length; i++) {
    spriter.add(_icons[i], null, fs.readFileSync(_icons[i], { encoding: 'utf-8' }))
  }

  // Compile svg and symbol js file.
  spriter.compile(function (error, result, data) {
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
