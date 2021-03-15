const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const VueLoaderPlugin = require("vue-loader/lib/plugin-webpack5");
const Webpack = require("webpack");

const dev = {
  mode: "development",
  entry: {
    app: "./src/main.js",
    vendor: ["vue"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
  },
  optimization: {
    minimize: false,
  },
  devtool: "eval",
  devServer: {
    contentBase: "./dist",
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
    ],
  },
  resolve: {
    extensions: [".ts", ".js", ".vue"],
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
  ],
};

module.exports = merge(common, dev);
