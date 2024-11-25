const path = require("path");

module.exports = {
  resolve: {
    fallback: {
      "https": require.resolve("https-browserify"),
    },
  },
  // Otras configuraciones de Webpack, como entrada y salida, si son necesarias
};