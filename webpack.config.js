var path = require('path')
var webpack = require('webpack')
var env = process.env.NODE_ENV

var baseConfig = {
  entry: [
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: env !== 'production',
      NODE_ENV: JSON.stringify(env),
      'process.env.NODE_ENV': JSON.stringify(env)
    })
  ],
  module: {
    loaders: [{
      test: /\.css$/,
      loader: 'style!css?modules',
      include: /flexboxgrid/,
    }]
  }
}

if (env !== 'production') {
  baseConfig.devtool = 'eval'
  baseConfig.entry.push(
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server'
  )
  baseConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin()
  )
  baseConfig.module.loaders.push({
    test: /\.js$/,
    loaders: ['react-hot', 'babel'],
    include: path.join(__dirname, 'src')
  })
} else {
  baseConfig.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      warning: false
    })
  )

  baseConfig.module.loaders.push({
    test: /\.js$/,
    loaders: ['babel'],
    include: path.join(__dirname, 'src')
  })
}

module.exports = baseConfig
