import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { join } from 'path'
import { Configuration, DefinePlugin, HotModuleReplacementPlugin } from 'webpack'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'

import { version } from './package.json'

const env = process.env.NODE_ENV
const isDev = env !== 'production'

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
          },
        ],
        include: join(__dirname, 'src'),
      },
    ],
  },
  cache: {
    type: 'filesystem',
  },
}

if (env !== 'production') {
  baseConfig.devtool = 'cheap-module-source-map'
} else {
  baseConfig.plugins.push(new BundleAnalyzerPlugin())
}

export default baseConfig
