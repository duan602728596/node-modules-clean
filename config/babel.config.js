module.exports = {
  presets: [
    [
      '@babel/env',
      {
        targets: {
          node: '4'
        },
        debug: false,
        modules: 'commonjs',
        useBuiltIns: 'usage',
        uglify: false
      }
    ],
    '@babel/flow'
  ]
};