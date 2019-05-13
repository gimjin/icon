const fs = require('fs')
const path = require('path')
const mkdirp = require('mkdirp')
const fg = require('fast-glob')
const chalk = require('chalk')
const SVGSprite = require('svg-sprite')

/**
  * Compile svg and symbol js file.
  * @param {Object} opt - New assign options.
  * @param {string} opt.name - Name of svg and js file.
  * @param {string} opt.icons - List of SVG files.
  * @param {string} opt.template - JavaScript output Mustache template.
  * @param {string} opt.jsDest - JavaScript output destination.
  */

module.exports = function (opt) {
  // set default
  let options = Object.assign({
    name: 'ixiaer',
    icons: '../templates/logo.svg',
    template: '../templates/icon-symbol.js',
    jsDest: 'assets/scripts'
  }, opt)

  // Create and configure a spriter instance
  let spriter = new SVGSprite({
    dest: '',
    variables: {
      name: options.name
    },
    shape: {
      id: {
        generator: options.name + '-%s'
      },
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
        sprite: path.join(process.cwd(), options.jsDest, options.name + '.svg'),
        render: {
          js: {
            dest: path.join(process.cwd(), options.jsDest, options.name + '.js'),
            template: opt.template
              ? path.join(process.cwd(), options.template)
              : path.resolve(__dirname, options.template)
          }
        }
      }
    }
  })

  let _icons = opt.icons
    ? fg.sync(path.join(process.cwd(), options.icons))
    : fg.sync(path.resolve(__dirname, options.icons))
  for (let i = 0; i < _icons.length; i++) {
    spriter.add(_icons[i], null, fs.readFileSync(_icons[i], { encoding: 'utf-8' }))
  }

  // Compile svg and symbol js file.
  spriter.compile(function (error, result, data) {
    for (let mode in result) {
      for (let resource in result[mode]) {
        mkdirp.sync(path.dirname(result[mode][resource].path))
        fs.writeFileSync(result[mode][resource].path, result[mode][resource].contents)
      }
    }
    if (error) { throw error }
    // Clean basic file
    fs.unlinkSync(path.join(process.cwd(), options.jsDest, options.name + '.svg'))
    console.info(chalk.cyanBright('[ok]'), 'Generator symbol successfully.')
  })
}
