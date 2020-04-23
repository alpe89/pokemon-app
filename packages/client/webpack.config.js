const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",

  entry: "./src/index.tsx",

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },

  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader"
          }
        ]
      },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
};