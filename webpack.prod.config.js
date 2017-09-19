const webpack = require('webpack');
const path    = require('path');
module.exports = {
  devtool: 'source-map',
  entry: [path.resolve(__dirname, 'js', 'index.js')],
  module: {
    loaders: [
      {
        exclude: /node_modules/,
         loader: 'babel-loader',
           test: /\.js$/,
      },  
      {
           test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
      }
    ],
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/public/'
  },
  devtool: "source-map",
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      minimize: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
     new webpack.LoaderOptionsPlugin({
    debug: true
  })
  ]
};