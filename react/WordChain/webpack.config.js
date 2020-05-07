const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  devtool: 'eval',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  
  entry: {
    app: ['./client'],
  },

  module: {
    rules: [{
      test: /\.jsx?/,
      loader: 'babel-loader',
      options: {
        presets: [
          ['@babel/preset-env', {
            targets: {
              browsers: [
                '> 3% in KR', 
                'last 2 chrome versions',
                'not dead',
              ],
            },
            debug: true,
          }], 
          '@babel/preset-react',
        ],
        plugins: ['@babel/plugin-proposal-class-properties'],
      },
    }],
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({ debug: true }),
  ],

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js',
  },
};