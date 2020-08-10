const path = require("path");
const webpack = require("webpack");
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports = {
  entry: {
    main: "./src/index.js",
    vendor: "./src/vendor.js"
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
        options: {
          attributes: {
            list: [
              {
                tag: 'img',
                attribute: 'src',
                type: 'src',
              },
              {
                tag: 'section',
                attribute: 'data-bg',
                type: 'src',
              },
            ],
          }
        }
      },
      {
        test: /\.(svg|png|jpg)$/i,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[contentHash].[ext]",
            outputPath: "imgs"
          }
        }
      },
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),
    new FaviconsWebpackPlugin('./src/icon/favicon-32x32.png')
  ]
}