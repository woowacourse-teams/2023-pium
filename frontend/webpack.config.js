const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ReactRefreshTypeScript = require('react-refresh-typescript');

const isDevelopment = process.env.NODE_ENV === 'development';

module.exports = {
  entry: resolve(__dirname, 'src', 'index.tsx'),
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    assetModuleFilename: 'assets/[name][ext]',
    clean: true,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '...'],
    alias: {
      types: resolve(__dirname, 'src', 'types'),
      pages: resolve(__dirname, 'src', 'pages'),
      components: resolve(__dirname, 'src', 'components'),
      hooks: resolve(__dirname, 'src', 'hooks'),
      utils: resolve(__dirname, 'src', 'utils'),
      assets: resolve(__dirname, 'src', 'assets'),
      constants: resolve(__dirname, 'src', 'constants'),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/i,
        exclude: /node_modules/,
        loader: 'ts-loader',
        options: {
          getCustomTransformers: () => ({
            before: isDevelopment ? [ReactRefreshTypeScript()] : [],
          }),
          transpileOnly: isDevelopment,
        },
      },
      {
        test: /\.(png|jpg|jpeg|svg|woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(__dirname, 'public', 'index.html'),
    }),
    ...(isDevelopment ? [new ReactRefreshWebpackPlugin()] : []),
  ],
  devServer: {
    open: true,
    port: 8282,
    static: {
      directory: resolve(__dirname, 'public'),
    },
  },
};
