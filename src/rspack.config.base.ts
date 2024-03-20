// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
import rspack from "@rspack/core";
import miniSVGDataURI from 'mini-svg-data-uri';

const rules = [
  // TODO: put this behind an optional (opt-in or opt-out?) flag
  {
    test: /\.ts$/,
    exclude: [/node_modules/],
    loader: "builtin:swc-loader",
    options: {
      sourceMap: true,
      jsc: {
        parser: {
          syntax: "typescript",
        },
      },
    },
    type: "javascript/auto",
  },
  { test: /\.raw\.css$/, type: "asset/source" },
  { test: /\.txt$/, type: "asset/source" },
  { test: /\.md$/, type: "asset/source" },
  { test: /\.(jpg|png|gif)$/, type: "asset/resource" },
  { test: /\.js.map$/, type: "asset/resource" },
  {
    test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
    type: "asset/resource",
  },
  {
    test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
    type: "asset/resource",
  },
  {
    test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
    type: "asset/resource",
  },
  { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, type: "asset/resource" },
  {
    // In .css files, svg is loaded as a data URI.
    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
    issuer: /\.css$/,
    type: 'asset',
    generator: {
        dataUrl: {
          content:(content: any) => miniSVGDataURI(content.content),
          mimetype: 'image/svg+xml'
        }
    }
  },
  {
    // In .ts and .tsx files (both of which compile to .js), svg files
    // must be loaded as a raw string instead of data URIs.
    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
    issuer: /\.js$/,
    type: "asset/source",
  },
  {
    test: /\.m?js$/,
    type: "javascript/auto",
  },
  {
    test: /\.m?js/,
    resolve: {
      fullySpecified: false,
    },
  },
  {
    test: /\.c?js/,
    resolve: {
      fullySpecified: false,
    },
  },
];

const watch = process.argv.includes("--watch");

module.exports = {
  bail: !watch,
  module: { rules },
  resolve: {
    fallback: {
      url: false,
      buffer: false,
      crypto: false,
      // See https://github.com/webpack/webpack/blob/3471c776059ac2d26593ea39f9c47c1874253dbb/lib/ModuleNotFoundError.js#L13-L42
      path: require.resolve("path-browserify"),
      process: require.resolve("process/browser"),
    },
  },
  watchOptions: {
    poll: 500,
    aggregateTimeout: 1000,
  },
  output: {
    hashFunction: "xxhash64",
  },
  plugins: [
    new rspack.ProvidePlugin({
      process: "process/browser",
    }),
  ],
};
