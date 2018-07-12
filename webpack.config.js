const path = require('path')
const webpack = require('webpack')
const MinifyWebpackPlugin = require('babel-minify-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin
const pkg = require('./package.json')
const env = process.env.NODE_ENV

var baseConfig = {
  mode: env === 'production' ? 'production' : 'development',
  entry: ['react-hot-loader/patch', './src/index'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  resolve: {
    mainFields: ['module', 'main']
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: env !== 'production',
      NODE_ENV: JSON.stringify(env),
      VERSION: JSON.stringify('v' + pkg.version),
      'process.env.NODE_ENV': JSON.stringify(env)
    })
  ],
  module: {
    rules: []
  }
}

if (env !== 'production') {
  baseConfig.devtool = 'cheap-module-source-map'
  baseConfig.plugins.push(new webpack.NamedModulesPlugin())
  baseConfig.module.rules.push({
    test: /\.js$/,
    use: [
      {
        loader: 'babel-loader'
      }
    ],
    include: path.join(__dirname, 'src')
  })
} else {
  baseConfig.plugins.push(new webpack.HashedModuleIdsPlugin())
  baseConfig.plugins.push(new webpack.optimize.ModuleConcatenationPlugin())
  baseConfig.plugins.push(new MinifyWebpackPlugin())
  baseConfig.plugins.push(new BundleAnalyzerPlugin())

  baseConfig.module.rules.push({
    test: /\.js$/,
    loader: 'babel-loader',
    include: path.join(__dirname, 'src')
  })
}

module.exports = baseConfig
