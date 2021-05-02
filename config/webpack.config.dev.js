const webpack = require("webpack");
const path = require("path");
const nodeExternals = require("webpack-node-externals");
const autoprefixer = require("autoprefixer");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const LoadablePlugin = require('@loadable/webpack-plugin')

const browserConfig = {
  name: "client",
  mode: "development",
  devtool: "source-map",
  watch: true,
  node: {
    __dirname: false,
    __filename: false
  },
  entry: [path.resolve(__dirname, "../src/index.js")],
  module: {
    rules: [
      {
        test: /js$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        include: path.resolve(__dirname, "../src/"),
        query: { presets: ["react-app"] }
      },
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        include: path.resolve(__dirname, "../src/"),
        query: { presets: ["react-app"] },
        exclude: /node_modules/
      },
      // CSS Modules
      {
        test: /\.s(a|c)ss$/,
        exclude: [path.resolve(__dirname, "../src/styles")],
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              localsConvention: "camelCase",
              modules: true
            }
          },
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: () => [
                require("postcss-flexbugs-fixes"),
                autoprefixer({
                  flexbox: "no-2009"
                })
              ]
            }
          },
          {
            loader: "sass-loader",
            options: {
              includePaths: ["./node_modules"]
            }
          },
          "import-glob-loader"
        ].filter(Boolean)
      },

      // CSS
      {
        test: /\.s(a|c)ss$/,
        include: [path.resolve(__dirname, "../src/styles")],
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
              ident: "postcss",
              plugins: () => [
                require("postcss-flexbugs-fixes"),
                autoprefixer({
                  flexbox: "no-2009"
                })
              ]
            }
          },
          {
            loader: "sass-loader",
            options: {
              includePaths: ["./node_modules"]
            }
          },
          "import-glob-loader"
        ].filter(Boolean)
      },
      {
        test: /\.(jpg|svg|png|ico|gif|eot|woff|ttf)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              name: "images/[name].[ext]"
            }
          }
        ]
      },
      {
        test: /\.mp3$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "music/[name].[ext]"
            }
          }
        ]
      }
    ].filter(Boolean)
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
      chunkFilename: "css/[id].css"
    }),
    new webpack.HotModuleReplacementPlugin(),
    new LoadablePlugin()
  ],
  resolve: {
    extensions: [".mjs", ".js", ".jsx", ".tsx", ".scss", ".css"]
  },
  output: {
    path: path.join(__dirname, "../dist/static"),
    filename: "[name].bundle.js",
    chunkFilename: "[name].chunk.js",
    publicPath: "static/"
  }
};

const serverConfig = {
  name: "server",
  entry: ["webpack/hot/poll?100", path.resolve(__dirname, "../server/main.ts")],
  watch: true,
  context: __dirname,
  node: {
    __filename: false,
    __dirname: false
  },
  target: "node",
  externals: [
    '@loadable/component',
    nodeExternals({
      whitelist: ["webpack/hot/poll?100"]
    })
  ],
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
        // exclude: [resolvePath('./src/styles')],
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
        test: /\.(jpg|svg|png|ico|gif|eot|woff|ttf)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              name: "images/[name].[ext]"
            }
          }
        ]
      },
      {
        test: /\.mp3$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "music/[name].[ext]"
            }
          }
        ]
      }
    ]
  },
  mode: "development",
  resolve: {
    extensions: [".mjs", ".tsx", ".ts", ".js", ".jsx", ".gql", ".graphql"]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.WatchIgnorePlugin([/\.js$/, /\.d\.ts$/])
  ],
  output: {
    libraryTarget: "commonjs",
    path: path.join(__dirname, "..", "dist"),
    filename: "server.js"
  }
};

module.exports = [browserConfig, serverConfig];
