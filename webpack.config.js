const path = require('path')
const webpack = require('webpack')

module.exports = {
  mode: 'development', // Establece el modo a 'development' o 'production'
  entry: './index.tsx', // Ruta al archivo de entrada principal
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src') // Configuración de alias para rutas absolutas
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx'] // Extensiones que Webpack debería resolver
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/, // Archivos que deberían ser procesados por babel-loader
        exclude: /node_modules/, // Excluir la carpeta node_modules
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env) // Definir process.env para evitar errores de 'process' no definido
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, 'public'), // Ruta a la carpeta que contiene archivos estáticos
    compress: true,
    port: 19006 // Puerto en el que se ejecutará el servidor de desarrollo
  }
}
