require("dotenv/config");
const { getBaseWebpackConfig } = require("./webpack.config.base");

const WEBPACK_DEV_SERVER_PORT = process.env.WEBPACK_DEV_SERVER_PORT;

module.exports = function getDevWebpackConfig() {
  return getBaseWebpackConfig({
    isProduction: false,
    port: WEBPACK_DEV_SERVER_PORT,
  });
};
