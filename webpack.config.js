const path = require('path')
const webpack = require('webpack')
const BabiliWebpackPlugin = require('babili-webpack-plugin')
const pkg = require('./package.json')
const env = process.env.NODE_ENV

var baseConfig = {
  entry: ['./src/index'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
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
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              module: true
            }
          }
        ],
        include: /flexboxgrid/
      }
    ]
  }
}

if (env !== 'production') {
  baseConfig.devtool = 'eval'
  baseConfig.entry.push(
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server'
  )
  baseConfig.plugins.push(new webpack.HotModuleReplacementPlugin())
  baseConfig.module.rules.push({
    test: /\.js$/,
    use: [
      {
        loader: 'react-hot-loader'
      },
      {
        loader: 'babel-loader'
      }
    ],
    include: path.join(__dirname, 'src')
  })
} else {
  baseConfig.plugins.push(new BabiliWebpackPlugin())

  baseConfig.module.rules.push({
    test: /\.js$/,
    loader: 'babel-loader',
    include: path.join(__dirname, 'src')
  })
}

module.exports = baseConfig
