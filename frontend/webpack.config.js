const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DotEnv = require('dotenv-webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ReactRefreshTypeScript = require('react-refresh-typescript');
const CopyPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const isDevelopment = process.env.NODE_ENV === 'development';

module.exports = (env) => ({
  entry: resolve(__dirname, 'src', 'index.tsx'),
  output: {
    path: resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].bundle.js',
    chunkFilename: '[name].[chunkhash].chunk.bundle.js',
    assetModuleFilename: 'assets/[name][ext]',
    clean: true,
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '...'],
    alias: {
      types: resolve(__dirname, 'src', 'types'),
      pages: resolve(__dirname, 'src', 'pages'),
      components: resolve(__dirname, 'src', 'components'),
      hooks: resolve(__dirname, 'src', 'hooks'),
      apis: resolve(__dirname, 'src', 'apis'),
      utils: resolve(__dirname, 'src', 'utils'),
      assets: resolve(__dirname, 'src', 'assets'),
      constants: resolve(__dirname, 'src', 'constants'),
      contexts: resolve(__dirname, 'src', 'contexts'),
      store: resolve(__dirname, 'src', 'store'),
      style: resolve(__dirname, 'src', 'style'),
      models: resolve(__dirname, 'src', 'models'),
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
        test: /\.(png|jpg|jpeg|webp)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.svg$/,
        include: [resolve(__dirname, 'src'), resolve(__dirname, 'src', 'types', 'module.d.ts')],
        issuer: /\.[jt]sx?$/,
        use: ['@svgr/webpack', 'url-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(__dirname, 'public', 'index.html'),
    }),
    new DotEnv({
      path: resolve(__dirname, 'env', `${env.environment}.env`),
    }),
    ...(isDevelopment ? [new ReactRefreshWebpackPlugin()] : []),
    new CopyPlugin({
      patterns: [
        {
          from: resolve(__dirname, 'public', 'assets'),
          to: resolve(__dirname, 'dist', 'assets'),
        },
        {
          from: resolve(__dirname, 'public', 'fonts'),
          to: resolve(__dirname, 'dist', 'fonts'),
        },
      ],
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
      generateStatsFile: true,
      statsFilename: 'bundle-report.json',
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  devServer: {
    open: true,
    port: 8282,
    static: {
      directory: resolve(__dirname, 'public'),
    },
    historyApiFallback: true,
  },
});
