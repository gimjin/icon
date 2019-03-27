#!/usr/bin/env node

var path = require('path')
var fg = require('fast-glob')
var argv = require('minimist')(process.argv.slice(2))
var svgSprite = require('../lib/svg-sprite.js')
var webfontsGenerator = require('../lib/webfonts-generator.js')

// CLI help.
if (argv.h || argv.help) {
  console.info('Usage: ixiaer-icon <config>')
  process.exit()
}

// Find .iconrc.(js|json) package.json(iconrc) custom config file.
try {
  var config
  if (argv._.length === 1) {
    // set config file
    config = require(
      path.resolve(process.cwd(), argv._[0])
    )
  } else if (process.env.npm_package_iconrc) {
    // find package.json setting
    config = process.env.npm_package_iconrc
  } else {
    // top-most EditorConfig file
    var configs = fg.sync(path.resolve(process.cwd(), '**/.iconrc.(js|json)'), {
      dot: true,
      deep: true,
      ignore: ['node_modules', 'bower_components', '.DS_Store', '.git']
    })
    config = require(configs[0])
  }
  // There is no config file in the project, use the icon's default config file
  if (!config) {
    config = require('../.iconrc.js')
  }
} catch (e) {
  throw e
}

// Compile svg and symbol js file.
if (config.symbol) {
  svgSprite(
    config.symbol.name,
    config.symbol.icons,
    config.symbol.template,
    config.symbol.svgDest,
    config.symbol.jsDest
  )
}

// Compile fonts and fonts css file.
if (config.font) {
  webfontsGenerator(
    config.font.name,
    config.font.icons,
    config.font.template,
    config.font.fontsDest,
    config.font.cssDest,
    config.font.fontType
  )
}
