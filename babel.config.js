/**
 *
 * @param {{name?: string}} caller
 * @returns {boolean}
 */
function isBabelLoader(caller) {
  return caller?.name === 'babel-loader'
}
/**
 *
 * @param {import('@babel/core').ConfigAPI} api
 * @returns
 */
module.exports = function (api) {
  const isLoader = api.caller(isBabelLoader)
  const isProd = api.env('production')
  const isTest = api.env('test')

  const targets = isLoader
    ? { browsers: ['last 2 Chrome versions', 'last 2 Firefox versions', 'last 2 Edge versions'] }
    : { node: 'current' }

  return {
    presets: [
      '@babel/preset-typescript',
      [
        '@babel/preset-env',
        {
          targets,
        },
      ],
      ['@babel/preset-react', { runtime: 'automatic' }],
    ],
    plugins: [
      !isProd && !isTest && require.resolve('react-refresh/babel'),
      '@emotion',
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
      ['@babel/plugin-transform-runtime', { useESModules: isLoader }],
    ].filter(Boolean),
  }
}
