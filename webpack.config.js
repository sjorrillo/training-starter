import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';

const ROOT = path.resolve(__dirname, './');
const getRoot = path.join.bind(path, ROOT);

const webpackConfig = ({ entry, indexPath, outputPath }) => {
  const isDevelopment = (/development/i).test(process.env.NODE_ENV);
  const devtool = isDevelopment ? 'cheap-module-source-map' : 'source-map';

  /**
     * Webpack Development Server configuration
     * Description: The webpack-dev-server is a little node.js Express server.
     * The server emits information about the compilation state to the client,
     * which reacts to those events.
     *
     * See: https://webpack.github.io/docs/webpack-dev-server.html
     */
  const devServer = {
    port: process.env.PORT || 3000,
    host: 'localhost',
    historyApiFallback: true,
    watchOptions: {
      // if you're using Docker you may need this
      // aggregateTimeout: 300,
      // poll: 1000,
      ignored: /node_modules/,
    },
  };

  const config = {
    entry,
    mode: isDevelopment ? 'development' : 'production',
    resolve: {
      extensions: ['.json', '.js'],
    },
    devtool,
    output: {
      path: outputPath,
      filename: 'js/[name].bundle.js',
      sourceMapFilename: 'js/[name].bundle.map',
      chunkFilename: 'js/[id].chunk.js',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
              { loader: 'babel-loader' },
          ],
        },
      ]
    },
    plugins: [
       /*
      * Plugin: HtmlWebpackPlugin
      * Description: Simplifies creation of HTML files to serve your webpack bundles.
      * This is especially useful for webpack bundles that include a hash in the filename
      * which changes every compilation.
      *
      * See: https://github.com/ampedandwired/html-webpack-plugin
      */
      new HtmlWebpackPlugin({
        template: indexPath,
        title: 'Training Starter',
        chunksSortMode: 'dependency',
        inject: 'body'
      }),
    ],
    node: {
      global: true,
      crypto: 'empty',
      process: true,
      module: false,
      clearImmediate: false,
      setImmediate: false
    }
  };

  isDevelopment && Object.assign(config, { devServer });

  return config;
};

const config = webpackConfig({
  entry: {
    client: getRoot('src', 'client', 'client.js'),
  },
  indexPath: getRoot('src', 'client', 'index.html'),
  outputPath: getRoot('dist'),
});

export default config;