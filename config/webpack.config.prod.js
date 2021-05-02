const webpack = require("webpack");
const path = require("path");
const nodeExternals = require("webpack-node-externals");
const autoprefixer = require("autoprefixer");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const eslintFormatter = require("react-dev-utils/eslintFormatter");
const TerserPlugin = require("terser-webpack-plugin");
const LoadablePlugin = require('@loadable/webpack-plugin')

const browserConfig = {
  mode: "production",
  target: "web",
  node: {
    __dirname: false,
    __filename: false,
    dgram: "empty",
    fs: "empty",
    net: "empty",
    tls: "empty"
  },
  entry: {
    main: "./src/index.js"
  },
  module: {
    rules: [
      {
        test: /js$/,
        enforce: "pre",
        exclude: /(node_modules)/,
        loader: "babel-loader",
        query: { presets: ["react-app"] }
      },
      {
        test: /js$/,
        enforce: "pre",
        use: [
          {
            options: {
              formatter: eslintFormatter
            },
            loader: "eslint-loader"
          }
        ],
        exclude: /(node_modules)/,
        include: path.resolve(__dirname, "./src/")
      },
      {
        test: /\.(js|jsx)$/,
        include: path.resolve(__dirname, "./src/"),
        loader: "babel-loader",
        options: {
          compact: true
        }
      },
      {
        test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
        loader: "url-loader?limit=100000"
      },
      {
        test: /\.mp3$/,
        loader: "file-loader?limit=100000"
      },
      {
        test: /\.s(a|c)ss/,
        exclude: [path.resolve("src/styles")],
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: true,
              camelCase: true
            }
          },
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: () => [
                require("postcss-flexbugs-fixes"),
                autoprefixer({
                  overrideBrowserslist: ["last 2 versions", "not ie < 11"],
                  flexbox: "no-2009"
                })
              ]
            }
          },
          "sass-loader",
          "import-glob-loader"
        ]
      },
      {
        test: /\.s(a|c)ss$/,
        include: [path.resolve("src/styles")],
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: () => [
                require("postcss-flexbugs-fixes"),
                autoprefixer({
                  overrideBrowserslist: ["last 2 versions", "not ie < 11"],
                  flexbox: "no-2009"
                })
              ]
            }
          },
          "sass-loader",
          "import-glob-loader"
        ]
      }
    ]
  },
  plugins: [
    // new webpack.DefinePlugin(env.forWebpackDefinePlugin),
    // new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    // new LodashModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash:8].css",
      publicPath: 'static/'
    }),
    new ManifestPlugin({
      fileName: "asset-manifest.json"
    }),
    new LoadablePlugin()
  ],
  resolve: {
    extensions: [".mjs", ".js", ".jsx", ".scss", '.css']
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
        parallel: true,
        sourceMap: true,
        terserOptions: {
          output: {
            comments: false
          }
        },
        extractComments: false
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  output: {
    path: path.join(__dirname, "..", "/dist/static"),
    filename: "[name].[chunkhash:8].js",
    chunkFilename: "[name].[chunkhash:8].chunk.js",
    publicPath: "static/"
  }
};

const serverConfig = {
  entry: "../server/main.ts",
  mode: "production",
  target: "node",
  context: __dirname,
  node: {
    __dirname: false,
    __filename: false
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader"
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        query: { presets: ["react-app"] }
      },
      {
        test: /\.s(a|c)ss$/,
        exclude: [path.resolve("src/styles")],
        use: [
          {
            loader: "css-loader",
            options: {
              localsConvention: "camelCase",
              modules: true
            }
          },
          {
            loader: "sass-loader",
            options: {
              includePaths: ["./node_modules"]
            }
          },
          "import-glob-loader"
        ]
      },
      {
        test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
        loader: "url-loader?limit=100000"
      },
      {
        test: /\.mp3$/,
        loader: "file-loader?limit=100000"
      },
    ]
  },
  optimization: {
    minimize: false,
    namedModules: true,
    namedChunks: true,
    moduleIds: "named"
  },
  resolve: {
    extensions: [".mjs", ".tsx", ".ts", ".js"]
  },
  output: {
    path: path.join(__dirname, "..", "dist"),
    filename: "server.js",
    publicPath: "static/",
    libraryTarget: 'commonjs2'
  }
};

module.exports = [browserConfig, serverConfig];
