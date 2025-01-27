const createExpoWebpackConfigAsync = require('@expo/webpack-config')

module.exports = async function (env, argv) {
  env.mode = 'development'
  const config = await createExpoWebpackConfigAsync(env, argv)
  config.devServer = {
    ...config.devServer,
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin-allow-popups'
    }
  }

  delete config.devServer._assetEmittingPreviousFiles
  return config
}
