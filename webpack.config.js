const { resolve } = require( 'path' );

const webpack = require( 'webpack' );

// plugins
/**
 * This is a webpack plugin that simplifies creation of HTML files to serve your webpack bundles.
 * This is especially useful for webpack bundles that include a hash in the filename which changes every compilation.
 * https://github.com/ampedandwired/html-webpack-plugin
 */
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );

/**
 * It moves every require("style.css") in entry chunks into a separate css output file.
 * So your styles are no longer inlined into the javascript, but separate in a css bundle file (styles.css).
 * If your total stylesheet volume is big, it will be faster because the stylesheet bundle is loaded in parallel to the javascript bundle.
 * https://github.com/webpack/extract-text-webpack-plugin
 */
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );

/**
 * A progress bar plugin for Webpack.
 * https://github.com/clessg/progress-bar-webpack-plugin
 */
const ProgressBarPlugin = require( 'progress-bar-webpack-plugin' );

/**
 * Copy files and directories in webpack
 * We need this for handling /assets/*
 * https://github.com/kevlened/copy-webpack-plugin
 */
const CopyWebpackPlugin = require( 'copy-webpack-plugin' );

// PostCSS plugins
/**
 * PostCSS-cssnext is a PostCSS plugin that helps you to use the latest CSS syntax today.
 * It transforms CSS specs into more compatible CSS so you don’t need to wait for browser support.
 * https://github.com/MoOx/postcss-cssnext
 */
const cssnext = require( 'postcss-cssnext' );

/**
 * A PostCSS plugin to console.log() the messages (warnings, etc.) registered by other PostCSS plugins.
 * https://github.com/postcss/postcss-reporter
 */
const postcssReporter = require( 'postcss-reporter' );


// webpack config helpers
const { getIfUtils, removeEmpty } = require( 'webpack-config-utils' );


module.exports = ( env ) => {
  const { ifProd, ifNotProd } = getIfUtils( env );

  return {
    // The base directory, an absolute path, for resolving entry points and loaders from configuration.
    context: resolve( __dirname, 'src' ),
    // The point or points to enter the application.
    entry: {
      'polyfills': './polyfills.ts',
      'vendor': './vendor.ts',
      'main': './main.ts'
    },
    output: {
      filename: '[name].[hash].js',
      path: resolve( __dirname, 'dist' ),
      // publicPath: '/',
      // Include comments with information about the modules.
      pathinfo: ifNotProd(),
    },
    resolve: {
      extensions: [ '.js', '.ts', '.tsx' ],
    },


    /**
     * Developer tool to enhance debugging
     *
     * See: https://webpack.js.org/configuration/devtool/#devtool
     * See: https://github.com/webpack/docs/wiki/build-performance#sourcemaps
     */
    devtool: ifProd( 'source-map', 'source-map' ),

    module: {
      rules: [
        // {
        //   test: /\.html$/,
        //   use: ['raw-loader'],
        // },
        {
          test: /\.html$/,
          exclude: /index\.html/,
          use: [
            // {
            //   loader: 'file-loader',
            //   query: {
            //     name: '[name].[ext]'
            //   }
            // },
            // {
            //   loader: 'extract-loader',
            //   query: {
            //     publicPath: '/'
            //   }
            // },
            {
              loader: 'html-loader',
              query: {
                // interpolate: true,
                exportAsEs6Default: true,
              }
            }
          ],
        },
        // Typescript
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [ 'awesome-typescript-loader' ]
          // use: ['ts-loader']
        },
        // CSS
        {
          // Do not transform vendor's CSS with CSS-modules
          // The point is that they remain in global scope.
          test: /\.css$/,
          include: /node_modules/,
          // @TODO replace with "use", we need to use legacy "loader" instead of "use" to make ExtractTextPlugin@2-beta.4 work
          loader: ifNotProd(
            [
              'style-loader',
              {
                loader: 'css-loader',
                query: { sourceMap: true, }
              }
            ],
            ExtractTextPlugin.extract( {
              fallbackLoader: 'style-loader',
              loader: [
                {
                  loader: 'css-loader',
                  // @TODO replace with "options" when ExtractTextPlugin is fixed
                  query: {
                    minimize: true,
                  }
                }
              ],

            } )
          )
        },
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: [ 'to-string-loader', 'css-loader', 'sass-loader' ]
        },
        {
          test: /\.css$/,
          // only use CSS modules and CSS next on our CSS
          exclude: /node_modules/,
          // @TODO replace with "use", we need to use legacy "loader" instead of "use" to make ExtractTextPlugin@2-beta.4 work
          loader: ifNotProd(
            [
              'style-loader',
              {
                loader: 'css-loader',
                options: {
                  // A CSS Module is a CSS file in which all class names and animation names are scoped locally by default.
                  // https://github.com/css-modules/css-modules
                  modules: true,
                  // By default, the exported JSON keys mirror the class names. If you want to camelize class names (useful in Javascript)
                  camelCase: true,
                  sourceMap: true,
                  importLoaders: 1,
                  localIdentName: '[name]__[local]___[hash:base64:5]',
                }
              },
              {
                loader: 'postcss-loader',
                // @TODO allow this instead of legacy loader plugin config (webpack.LoaderOptionsPlugin) when https://github.com/postcss/postcss-loader/issues/99 is fixed
                /**
                 query: {
                  plugins: () => [
                    // Allow future CSS features to be used, also
                    // auto-prefixes the CSS...
                    cssnext( {
                      // ...based on this browser list
                      browsers: [ 'last 2 versions', 'IE > 10' ],
                    } ),
                    postcssReporter()
                  ]
                }
                 */
              }
            ],
            ExtractTextPlugin.extract( {
              // the loader(s) that should be used when the css is not extracted (i.e. in an additional chunk when allChunks: false)
              fallbackLoader: 'style-loader',
              /**
               * A CSS Module is a CSS file in which all class names and animation names are scoped locally by default.
               * Note that minimize uses cssnano
               * https://github.com/css-modules/css-modules
               */
              // @TODO replace with "use" ExtractTextPlugin doesn't follows latest webpack 2.0 api for loaders :(
              loader: [
                {
                  loader: 'css-loader',
                  // @TODO replace with "options" when ExtractTextPlugin is fixed
                  query: {
                    minimize: true,
                    modules: true,
                    importLoaders: 1,
                    localIdentName: '[name]__[local]___[hash:base64:3]',
                  }
                },
                { loader: 'postcss-loader' }
              ]
            } ) )
        },
        {
          test: /\.json$/,
          use: 'json-loader'
        },
        // Fonts Loading
        {
          test: /\.(woff(2)?|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
          use: 'file-loader'
        },
        // File loader for supporting images, for example, in CSS files.
        // @FIXME url from css doesnt work because bug with sourceMaps within css-loader https://github.com/webpack/css-loader/issues/296
        // @FIXME svg doesn't work, investigate
        {
          test: /\.(gif|png|jpe?g|svg)$/i,
          use: removeEmpty(
            [
              {
                // @TODO file loader doesn't support webpack 2 api (use,options)
                /**
                 * The url loader works like the file loader, but can return a Data Url if the file is smaller than a byte limit.
                 * The limit can be specified with a query parameter. (Defaults to no limit)
                 * If the file is greater than the limit (in bytes) the file-loader is used and all query parameters are passed to it.
                 */
                loader: 'url-loader',
                query: {
                  // byte limit in bytes ( 10kb )
                  limit: 10 * 1000,
                  hashType: 'sha512',
                  digestType: 'hex',
                  name: '[path][name].[hash].[ext]',
                }
              },
              ifProd(
                {
                  loader: 'image-webpack-loader',
                  query: {
                    optimizationLevel: 7,
                    interlaced: false,
                    pngquant: { quality: '65-90', speed: 4 },
                    mozjpeg: { quality: 65 }
                  }
                }
              )
            ]
          )
        },
      ],
    },

    // This is required, when using Hot Code Replacement between multiple
    // calls to the compiler.
    recordsPath: resolve( __dirname, './tmp/webpack-records.json' ),

    /**
     * Since Loaders only execute transforms on a per-file basis,
     * Plugins are most commonly used (but not limited to) performing actions and custom functionality on "compilations"
     * or "chunks" of your bundled modules (and so much more).
     * In order to use a plugin, you just need to require() it and add it to the plugins array.
     * Since most plugins are customizable via options, you need to create an instance of it by calling it with new.
     */
    plugins: removeEmpty( [

      new webpack.LoaderOptionsPlugin( {
        // The UglifyJsPlugin will no longer put loaders into minimize mode, and the debug option has been deprecated.
        // These options are simply moved into a new plugin, LoaderOptionsPlugin, for separation of concerns reasons.
        // Default webpack build options saves a couple of kBs
        minimize: ifProd( true ),
        debug: ifProd( false ),
        quiet: ifProd( true ),

        // Legacy loader plugin configs ( for plugins not yet ready for WebPack 2 Api )
        options: {
          context: __dirname,
          postcss: {
            plugins: [
              // Allow future CSS features to be used, also auto-prefixes the CSS...
              cssnext( {
                // ...based on this browser list
                browsers: [ 'last 2 versions', 'IE > 10' ],
              } ),
              postcssReporter()
            ]
          }
        }
      } ),

      /**
       * Use the HtmlWebpackPlugin plugin to make index.html a template so css and js can dynamically be added to the page.
       * This will also take care of moving the index.html file to the build directory using the index.html in src as a template.
       * https://github.com/ampedandwired/html-webpack-plugin
       */
      new HtmlWebpackPlugin( {
        template: resolve( 'src', 'index.html' ),
        // reverse order so we get [2:'polyfills',1:'vendor',0:'main']
        // chunksSortMode: (a,b) => {
        //   return  b.id - a.id;
        // },
        // https://github.com/kangax/html-minifier#options-quick-reference
        // will minify html
        minify: ifProd(
          {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            keepClosingSlash: true,
            minifyURLs: true
          },
          false
        )
      } ),

      /**
       * Plugin: CopyWebpackPlugin
       * Description: Copy files and directories in webpack.
       *
       * Copies project static assets.
       */
      new CopyWebpackPlugin( [
        {
          from: './assets',
          to: 'assets',
        }
      ] ),

      // Set NODE_ENV to enable production react version
      new webpack.DefinePlugin( {
        'process.env': { NODE_ENV: ifProd( '"production"', '"development"' ) }
      } ),

      // Add nice progress bar
      new ProgressBarPlugin(),

      // prints more readable module names in the browser console on HMR updates
      ifNotProd( new webpack.NamedModulesPlugin() ),

      // We use ExtractTextPlugin so we get a seperate CSS file instead
      // of the CSS being in the JS and injected as a style tag
      ifProd( new ExtractTextPlugin( {
        filename: '[name].[contenthash].css',
        allChunks: true,
      } ) ),

      ifProd( new webpack.optimize.CommonsChunkPlugin( {
        names: [ 'polyfills', 'vendor' ]
      } ) ),

      ifProd( new webpack.optimize.CommonsChunkPlugin( {
        minChunks: Infinity,
        name: 'inline',
      } ) ),

      // A plugin for a more aggressive chunk merging strategy.
      ifProd( new webpack.optimize.AggressiveMergingPlugin() ),

      // Deduplicate node modules dependencies
      // // Merge all duplicate modules
      ifProd( new webpack.optimize.DedupePlugin() ),

      // Uglify bundles
      ifProd( new webpack.optimize.UglifyJsPlugin( {
        compress: {
          screw_ie8: true,
          warnings: false,
        },
        output: { comments: false }
      } ) )

    ] ),
  }
};
