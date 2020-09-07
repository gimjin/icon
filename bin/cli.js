#!/usr/bin/env node

const parseArgs = require('minimist')
const iconSymbol = require('../lib/icon-symbol.js')
const iconFont = require('../lib/icon-font.js')
const chalk = require('chalk')

// CLI alias
const argv = parseArgs(process.argv.slice(2), {
  alias: {
    'name': 'n',
    'icons': 'i',
    'template': 't',
    'font-dest': 'fontDest',
    'css-dest': 'cssDest',
    'font-type': 'fontType',
    'css-type': 'cssType',
    'js-dest': 'jsDest',
    'help': 'h'
  }
})

// CLI help
if (argv.help || Object.keys(argv).length === 1) {
  console.info('')
  console.info('Usage: icon [font|symbol] [options] [arguments]')
  console.info('       icon -i "icons/*.svg" --css-dest styles/')
  console.info('')
  console.info('Must:')
  console.info('  -i, --icons  $ icon -i "icons/*.svg"')
  console.info('')
  console.info('Options:')
  console.info('  -n, --name      $ icon -n ixiaer')
  console.info('  -t, --template  $ icon -t template/icon-font.css')
  console.info('')
  console.info('Font options:')
  console.info('  --font-dest  $ icon --font-dest fonts/')
  console.info('  --css-dest   $ icon --css-dest styles/')
  console.info('  --font-type  $ icon --font-type "svg ttf woff woff2 eot"')
  console.info('  --css-type   $ icon --css-type "css scss less stylus"')
  console.info('')
  console.info('Symbol options:')
  console.info('  --js-dest  $ icon --js-dest scripts/')
  console.info('')
  console.info('Alias: ixiaer-icon > icon')
  console.info('')
  process.exit()
}

// Must argv.icons
if (argv.icons === undefined) {
  console.info('')
  console.info('Must:')
  console.info('  -i, --icons  $ icon -i "icons/*.svg"')
  console.info('')
  process.exit()
}

console.info('👉', chalk.yellowBright('https://github.com/ixiaer/icon'), '👈')
console.info('Compiling...')

if (argv._.includes('symbol')) {
  // Compile svg and symbol js file.
  iconSymbol(argv)
} else {
  // string to array
  if (argv.fontType) {
    argv.fontType = argv.fontType.split(' ')
  }
  if (argv.cssType) {
    argv.cssType = argv.cssType.split(' ')
  }
  iconFont(argv)
}
