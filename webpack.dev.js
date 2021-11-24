const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const VueLoaderPlugin = require("vue-loader/lib/plugin-webpack5");
const Webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const dev = {
  mode: "development",
  entry: {
    app: ["./src/main.js"],
    vendor: ["vue"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
  },
  optimization: {
    minimize: false,
  },
  devtool: "source-map",
  devServer: {
    contentBase: "./dist",
  },
  stats: {
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.vue$/,
        use: [{ loader: "vue-loader" }],
      },
      {
        test: /\.svg/,
        use: ["file-loader"],
      },
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js", ".vue"],
    alias: {
      vue: "vue/dist/vue.js",
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public/index.html"),
    }),
    new VueLoaderPlugin(), //配置vueloader插件
    // 全局注入 Vue, 避免在每个 .vue 文件中重复引入
    new Webpack.ProvidePlugin({
      Vue: ["vue/dist/vue.esm.js", "default"],
    }),
    new CleanWebpackPlugin(),
  ],
};

module.exports = merge(common, dev);
