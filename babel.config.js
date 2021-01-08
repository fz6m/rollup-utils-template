module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false
      }
    ]
  ],
  plugins: [
    ['@emotion', { sourceMap: process.env.NODE_ENV !== 'production' }],
    ['@babel/plugin-transform-react-jsx', { runtime: 'automatic' }]
  ]
}
