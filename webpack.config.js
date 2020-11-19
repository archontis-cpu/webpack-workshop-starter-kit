const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");
const chalk = require("chalk");
const path = require("path");

const mode = process.env.NODE_ENV;
const isDev = mode === "development";
console.log(chalk.black.bgGreen.bold(`Environment set to ${mode} mode`));

module.exports = {
  entry: path.resolve(__dirname, "src", "index.js"),
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].[contenthash:6].bundle.js",
    publicPath: "./",
  },
  mode,
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.resolve(__dirname, "public", "index.html"),
      favicon: path.resolve(__dirname, "public", "favicon.png"),
      title: "Webpack Tutorial",
    }),
    new CleanWebpackPlugin(),
    // new CopyWebpackPlugin({
    //   patterns: [
    //     {
    //       from: path.resolve(__dirname, "src", "assets"),
    //       to: "assets",
    //       globOptions: {
    //         ignore: ["*.DS_Store"],
    //       },
    //     },
    //   ],
    // }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@assets": path.resolve(__dirname, "src", "assets"),
    },
  },
  devServer: {
    contentBase: path.resolve(__dirname, "build"),
    open: true,
    compress: true,
    port: 5000,
    publicPath: "/",
    noInfo: true,
  },
  module: {
    rules: [
      {
        test: /\.(svg|ttf)$/,
        type: "asset/inline",
      },

      {
        test: /\.(scss|css)$/,
        use: [
          isDev ? "style-loader" : MiniCssExtractPlugin.loader,
          { loader: "css-loader" },
          { loader: "sass-loader" },
        ],
      },
    ],
  },
};
