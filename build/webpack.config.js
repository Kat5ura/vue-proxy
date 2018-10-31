const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
const {VueLoaderPlugin} = require('vue-loader');
const webpack = require('webpack');
const merge = require('webpack-merge');
const glob = require('glob');

let baseConfig = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.vue$/,
        use: [
          'vue-loader'
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader'
      },
    ]
  },
  mode: process.env.NODE_ENV || 'development',
  devtool: 'source-map',
  plugins: [
    // new CleanWebpackPlugin([path.resolve(__dirname, '../dist')], {
    //   root: path.resolve(__dirname, '..')
    // }),
    new VueLoaderPlugin(),
  ]
};


module.exports = function getWebpackConfig(config) {
  return merge(baseConfig, {
    entry: getEntries(config),
    output: {
      filename: 'scripts/[name].js',
      path: path.resolve(__dirname, '../dist/' + config.target + '/')
    },

    plugins: [
      ...getHtmlPluginConfig(config)
    ]

  });
};

function getEntries() {
  let files = glob.sync(path.resolve(__dirname, '../src/pages/*.js'));
  let res = {};
  files.forEach((path) => {
    let start = path.lastIndexOf('/');
    let filename = path.slice(start + 1);
    res[filename.replace('.js', '')] = './src/pages/' + filename;
  })

  return res;
}

function getHtmlPluginConfig(config) {
  let res = [];

  let entries = Object.keys(getEntries());
  entries.forEach((entry) => {
    res.push(new HtmlWebpackPlugin({
      filename: entry + '.html',
      chunks: [entry],
      inject: true,
      template: path.resolve(__dirname, `../public/${entry}.html`),
      title: entry + ' Page'
    }))
  });

  return res;


}