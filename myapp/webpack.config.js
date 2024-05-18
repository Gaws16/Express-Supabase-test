const path = require("path");

module.exports = {
  resolve: {
    extensions: [".ts", ".js"],
    alias: {
      "@models": path.resolve(__dirname, "src/models/"),
      "@controllers": path.resolve(__dirname, "src/controllers/"),
      "@utils": path.resolve(__dirname, "src/utils/"),
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  entry: "./src/index.ts",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
};
