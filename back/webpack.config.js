module.exports = {
  mode: 'production',
  entry: "./script.js",
  output: {
      filename: "./build.js",
  },
  watch: true,
  watchOptions: {
    aggregateTimeout: 200,
    poll: 3000,
    ignored: /node_modules/,
  },
};