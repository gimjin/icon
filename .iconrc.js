module.exports = {
  symbol: {
    name: 'ixiaer',
    icons: 'icons/*.svg',
    template: 'templates/svg-sprite.hbs',
    svgDest: 'dist/images',
    jsDest: 'dist/scripts'
  },
  font: {
    name: 'ixiaer',
    icons: 'icons/*.svg',
    template: 'templates/webfonts-generator.hbs',
    fontsDest: 'dist/fonts',
    cssDest: 'dist/styles',
    cssFontsUrl: '../fonts',
    fontType: ['svg', 'ttf', 'eot', 'woff', 'woff2']
  }
}
