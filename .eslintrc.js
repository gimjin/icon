module.exports = {
  parser: 'esprima',
  extends: [
    'standard',
    'canonical-jsdoc'
  ],
  rules: {
    'no-console': [
      'error',
      { allow: ['info', 'warn', 'error'] }
    ],
    'no-debugger': 'error'
  },
  env: {
    node: true
  }
}
