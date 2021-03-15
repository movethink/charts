const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common");

const prod = {
  mode: "production",
  entry: "./src/common/libreries/index.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bunble.js",
    library: "Charts",
    libraryTarget: "umd",
  },
  optimization: {
    minimize: false,
  },
  target: ["web", "es5"],
  // devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  plugins: [],
  // 把以下依赖不打入包中，让包文件去外部宿主中引入这些依赖
  externals: {
    echarts: {
      commonjs: "echarts",
      commonjs2: "echarts",
      amd: "echarts",
      root: "_",
    },
  },
};

module.exports = merge(common, prod);
