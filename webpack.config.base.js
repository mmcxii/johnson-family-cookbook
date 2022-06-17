const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

/**
 * @typedef {import("webpack").Configuration} Configuration
 *
 * @typedef {{
 *   isProduction: boolean;
 *   port?: Configuration['devServer']['port']
 * }} GetBaseWebpackConfigParams
 *
 * @typedef {Configuration} GetBaseWebpackConfigResponse;
 *
 * @param {GetBaseWebpackConfigParams} params
 * @returns {GetBaseWebpackConfigResponse}
 */
function getBaseWebpackConfig(params) {
  const { isProduction, port } = params;

  return {
    devServer: {
      historyApiFallback: true,
      port,
    },
    devtool: isProduction ? undefined : "source-map",
    entry: {
      app: ["./src/browser/index.tsx"],
    },
    mode: isProduction ? "production" : "development",
    module: {
      rules: [
        {
          enforce: "pre",
          loader: "source-map-loader",
          test: /\.js/,
        },
        {
          loader: "ts-loader",
          sideEffects: true,
          test: /\.tsx?/,
        },
        {
          sideEffects: true,
          test: /\.css/,
          use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
        },
        {
          test: /\.svg/,
          type: "asset",
        },
      ],
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          react: {
            chunks: "all",
            name: "react",
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          },
        },
      },
    },
    output: {
      chunkFilename: isProduction ? "[name].[contenthash].js" : "[name].js",
      filename: isProduction ? "[name].[contenthash].js" : "[name].js",
      path: path.join(__dirname, "dist", "browser"),
      publicPath: "/",
    },
    plugins: [
      new HtmlWebpackPlugin({
        chunks: ["app"],
        publicPath: "/",
        template: "./src/browser/index.html",
        title: "Project L",
      }),
      new MiniCssExtractPlugin({
        chunkFilename: isProduction ? "[name].[contenthash].css" : "[name].css",
        filename: isProduction ? "[name].[contenthash].css" : "[name].css",
      }),
    ],
    resolve: {
      extensions: [".json", ".html", ".js", ".ts", ".tsx", ".css"],
    },
    stats: {
      preset: "normal",
    },
    target: ["web"],
  };
}

module.exports = {
  getBaseWebpackConfig,
};
