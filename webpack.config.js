const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");

const config = {
  entry: "./public/index.js",
  output: {
    path: __dirname + "/public/dist",
    filename: "bundle.js",
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  plugins: [
    new WebpackPwaManifest({
      filename: "manifest.json",
      inject: false,
      fingerprints: false,
      name: "Budget Tracker",
      short_name: "Budget Tracker",
      description: "An application for tracking your budget",
      background_color: "#01579b",
      theme_color: "#FFE1C4",
      start_url: "/",
      icons: [
        {
          src: path.resolve("public/assets/icons/icon-512x512.png"),
          sizes: [96, 128, 192, 256, 384, 512],
          destination: path.join("assets", "icons"),
        },
      ],
    }),
  ],
};

module.exports = config;
