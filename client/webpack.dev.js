const path = require("path");
const common = require("./webpack.common");
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
  mode: "development",
  devtool: "none",
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [{
      test: /\.s[ac]ss$/i,
      use: [
        // Creates `style` nodes from JS strings
        'style-loader',
        // Translates CSS into CommonJS
        'css-loader',
        // Compiles Sass to CSS
        'sass-loader',
      ],
    }]
  },
  plugins: [new HtmlWebpackPlugin({
    template: './src/streaming.html'
  })],
  devServer: {
    proxy: {
      '/api/movies/code/undefined': {
        target: 'http://localhost:3000/api/movies/code/the-boys-s01e07-28616',
        pathRewrite: {'^/api/movies/code/undefined' : ''},
        secure: false
      },
      '/': {
        target: 'http://localhost:3000/',
        secure: false
      }
    }
  }
});