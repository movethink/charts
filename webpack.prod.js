const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const prod = {
  mode: "production",
  entry: "./src/common/libreries/yn-chart-middleware/index.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "yn-chart-middleware.js",
    library: "ynChartMiddleware",
    libraryTarget: "umd",
  },
  optimization: {
    minimize: true,
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
  plugins: [
    //打包环境去掉console.log
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          drop_console: true, //注释console
          drop_debugger: true, //注释debugger
        },
      },
      // chunkFilter: () => {
      //   return false;
      // },
    }),
  ],
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
