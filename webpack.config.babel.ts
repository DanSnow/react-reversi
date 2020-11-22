import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { join } from 'path'
import { Configuration, DefinePlugin, HotModuleReplacementPlugin } from 'webpack'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'

import { version } from './package.json'

const env = process.env.NODE_ENV
const isDev = env !== 'production'

const babelConfig = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: ['last 2 Chrome versions', 'last 2 Firefox versions', 'last 2 Edge versions'],
        },
        exclude: ['transform-regenerator'],
        modules: false,
      },
    ],
    ['@babel/preset-react', { runtime: 'automatic' }],
  ],
  plugins: [
    isDev && require.resolve('react-refresh/babel'),
    [
      'transform-imports',
      {
        'lodash-es': {
          // eslint-disable-next-line no-template-curly-in-string
          transform: 'lodash-es/${member}',
          preventFullImport: true,
        },
      },
    ],
    ['@babel/plugin-transform-runtime', { useESModules: true }],
    '@babel/plugin-proposal-class-properties',
    ['@babel/plugin-proposal-object-rest-spread', { useBuiltIns: true }],
    '@emotion',
  ].filter(Boolean),
}

const baseConfig: Configuration = {
  mode: env === 'production' ? 'production' : 'development',
  entry: ['./src/index'],
  output: {
    path: join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  resolve: {
    mainFields: ['module', 'main'],
    extensions: ['.ts', '.tsx', '.js', '.json'],
    fallback: { querystring: require.resolve('querystring-es3') },
  },
  plugins: [
    isDev && new HotModuleReplacementPlugin(),
    isDev && new ReactRefreshWebpackPlugin(),
    new DefinePlugin({
      __DEV__: env !== 'production',
      NODE_ENV: JSON.stringify(env),
      VERSION: JSON.stringify('v' + version),
      'process.env.NODE_ENV': JSON.stringify(env),
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
  ].filter(Boolean),
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: {
              babelrc: false,
              ...babelConfig,
            },
          },
        ],
        include: join(__dirname, 'src'),
      },
    ],
  },
}

if (env !== 'production') {
  baseConfig.devtool = 'cheap-module-source-map'
} else {
  baseConfig.plugins.push(new BundleAnalyzerPlugin())
}

export default baseConfig
