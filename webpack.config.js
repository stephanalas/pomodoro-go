const dotenv = require('dotenv');
const webpack = require('webpack');
const fs = require('fs');
const path = require('path');
const currentPath = path.join(__dirname);
const basePath = currentPath + '/.env';
const envPath = basePath + '.' + process.env.NODE_ENV;
const finalPath = fs.existsSync(envPath) ? envPath : basePath;

const fileEnv = dotenv.config({ path: finalPath }).parsed;
console.log(fileEnv);
let envKeys;
if (fileEnv) {
  envKeys = Object.keys(fileEnv).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
    return prev;
  }, {});
}
console.log('env keys', envKeys);
const webpackConfig = {
  entry: ['./client/index.js'],
  output: {
    path: __dirname,
    filename: './public/bundle.js',
  },
  devtool: 'source-map',

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-react'],
        },
      },
    ],
  },
};

if (fileEnv) {
  webpackConfig.plugins = [new webpack.DefinePlugin(envKeys)];
}

module.exports = webpackConfig;
