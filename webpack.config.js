const createExpoWebpackConfigAsync = require('@expo/webpack-config')

module.exports = async function (env, argv) {
  env.mode = 'development'
  const config = await createExpoWebpackConfigAsync(env, argv)
  delete config.devServer._assetEmittingPreviousFiles
  return config
}
