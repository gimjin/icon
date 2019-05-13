function liteready (callback) {
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    // Already ready or interactive, execute callback
    callback.call()
  } else if (document.attachEvent) {
    // Old browsers
    document.attachEvent('onreadystatechange', function () {
      if (document.readyState === 'interactive') {
        callback.call()
      }
    })
  } else if (document.addEventListener) {
    // Modern browsers
    document.addEventListener('DOMContentLoaded', callback)
  }
}

liteready(function () {
  var body = document.getElementsByTagName('body')[0]
  // add svg DOM
  var div = document.createElement('div')
  div.style.cssText = 'position: absolute; width: 0; height: 0; overflow: hidden;'
  div.innerHTML = '<svg>{{#shapes}}{{{svg}}}{{/shapes}}</svg>'
  body.appendChild(div)
  // add style DOM
  var style = document.createElement('style')
  style.type = 'text/css'
  style.innerHTML = '.{{name}} { width: 1em; height: 1em; fill: currentColor; vertical-align: middle; display: inline-block; line-height: 1; overflow: hidden; }'
  body.appendChild(style)
})
