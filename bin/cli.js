#!/usr/bin/env node

const parseArgs = require('minimist')
const iconSymbol = require('../lib/icon-symbol.js')
const iconFont = require('../lib/icon-font.js')

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
    'svg-dest': 'svgDest',
    'js-dest': 'jsDest',
    'help': 'h'
  }
})

// CLI help.
if (argv.help) {
  console.info('')
  console.info('Usage: icon [font|symbol] [options] [font|symbol options] [arguments]')
  console.info('       icon font -n ixiaer -i "icons/*.svg" --css-dest styles/')
  console.info('')
  console.info('Options:')
  console.info('  -n, --name      $ icon -n ixiaer')
  console.info('  -i, --icons     $ icon -i "icons/*.svg"')
  console.info('  -t, --template  $ icon -t template/icon-font.hbs')
  console.info('')
  console.info('Font options:')
  console.info('  --font-dest  $ icon --font-dest fonts/')
  console.info('  --css-dest   $ icon --css-dest styles/')
  console.info('  --font-type  $ icon --font-type "\'svg\', \'ttf\', \'woff\', \'woff2\', \'eot\']"')
  console.info('  --css-type   $ icon --css-type "[\'css\', \'scss\', \'less\', \'stylus\']"')
  console.info('')
  console.info('Symbol options:')
  console.info('  --svg-dest  $ icon --svg-dest images/')
  console.info('  --js-dest   $ icon --js-dest scripts/')
  console.info('')
  process.exit()
}

console.info('👉 https://github.com/ixiaer/icon 👈')
console.info('Compiling...')

// Compile fonts and fonts css file.
if (argv._.includes('font') || argv._.length === 0) {
  let strToArr = str => {
    let arr = str.slice(1, -1).split(',')
    return arr.map(value => {
      return value.trim().slice(1, -1)
    })
  }
  // string to array
  if (argv.fontType) {
    argv.fontType = strToArr(argv.fontType)
  }
  if (argv.cssType) {
    argv.cssType = strToArr(argv.cssType)
  }
  iconFont(argv)
}

// Compile svg and symbol js file.
if (argv._.includes('symbol') || argv._.length === 0) {
  iconSymbol(argv)
}
