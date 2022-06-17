const { getBaseWebpackConfig } = require("./webpack.config.base");

module.exports = function getProdWebpackConfig() {
  return getBaseWebpackConfig({
    isProduction: true,
  });
};
