import {
  DefinePlugin,
  HashedModuleIdsPlugin,
  NamedModulesPlugin,
  optimize
} from 'webpack'

import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer'
import MinifyWebpackPlugin from 'babel-minify-webpack-plugin'
import {join} from 'path'
import {version} from './package.json'

const env = process.env.NODE_ENV

const babelConfig = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: [
            'last 2 Chrome versions',
            'last 2 Firefox versions',
            'last 2 Edge versions'
          ]
        },
        exclude: ['transform-regenerator'],
        modules: false
      }
    ],
    '@babel/preset-react'
  ],
  plugins: [
    [
      'transform-imports',
      {
        'lodash-es': {
          // eslint-disable-next-line no-template-curly-in-string
          transform: 'lodash-es/${member}',
          preventFullImport: true
        }
      }
    ],
    ['@babel/plugin-transform-runtime', {polyfill: false}],
    '@babel/plugin-proposal-class-properties',
    ['@babel/plugin-proposal-object-rest-spread', {useBuiltIns: true}],
    [
      'emotion',
      env === 'production' ? {hoist: true} : {sourceMap: true, autoLabel: true}
    ]
  ]
}

var baseConfig = {
  mode: env === 'production' ? 'production' : 'development',
  entry: ['react-hot-loader/patch', './src/index'],
  output: {
    path: join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  resolve: {
    mainFields: ['module', 'main']
  },
  plugins: [
    new DefinePlugin({
      __DEV__: env !== 'production',
      NODE_ENV: JSON.stringify(env),
      VERSION: JSON.stringify('v' + version),
      'process.env.NODE_ENV': JSON.stringify(env)
    })
  ],
  module: {
    rules: []
  }
}

if (env !== 'production') {
  baseConfig.devtool = 'cheap-module-source-map'
  baseConfig.plugins.push(new NamedModulesPlugin())
  baseConfig.module.rules.push({
    test: /\.js$/,
    use: [
      {
        loader: 'babel-loader',
        options: {
          babelrc: false,
          ...babelConfig
        }
      }
    ],
    include: join(__dirname, 'src')
  })
} else {
  baseConfig.plugins.push(new HashedModuleIdsPlugin())
  baseConfig.plugins.push(new optimize.ModuleConcatenationPlugin())
  baseConfig.plugins.push(new MinifyWebpackPlugin())
  baseConfig.plugins.push(new BundleAnalyzerPlugin())

  baseConfig.module.rules.push({
    test: /\.js$/,
    loader: 'babel-loader',
    options: {
      babelrc: false,
      ...babelConfig
    },
    include: join(__dirname, 'src')
  })
}

export default baseConfig
