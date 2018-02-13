/**
 * Created by zhangbin on 2017/4/1.
 */
const webpack = require('webpack');
//const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

const publicPath = '../public/';
const publicUrl = publicPath.slice(0, -1);

module.exports = {
    context: __dirname + "/src",
    entry: "./index.js",
    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-2'],
                    plugins: ['transform-decorators-legacy', 'react-html-attrs']

                }
            },
            //下面是使用 ant-design 的配置文件
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.(jpg|png|svg)$/,
                loader: 'url-loader',
                options: {
                    limit: 25000,
                },
            },
        ]
    },
    plugins: [
        new InterpolateHtmlPlugin('production'),
        // Generates an `index.html` file with the <script> injected.
        new HtmlWebpackPlugin({
            inject: true,
            template: '../public/index.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
            },
        }),
        new SWPrecacheWebpackPlugin({
            // By default, a cache-busting query parameter is appended to requests
            // used to populate the caches, to ensure the responses are fresh.
            // If a URL is already hashed by Webpack, then there is no concern
            // about it being stale, and the cache-busting can be skipped.
            dontCacheBustUrlsMatching: /\.\w{8}\./,
            filename: 'service-worker.js',
            logger(message) {
                if (message.indexOf('Total precache size is') === 0) {
                    // This message occurs for every build and is a bit too noisy.
                    return;
                }
                if (message.indexOf('Skipping static resource') === 0) {
                    // This message obscures real errors so we ignore it.
                    // https://github.com/facebookincubator/create-react-app/issues/2612
                    return;
                }
                console.log(message);
            },
            minify: true,
            // For unknown URLs, fallback to the index page
            navigateFallback: publicUrl + '/index.html',
            // Ignores URLs starting from /__ (useful for Firebase):
            // https://github.com/facebookincubator/create-react-app/issues/2237#issuecomment-302693219
            navigateFallbackWhitelist: [/^(?!\/__).*/],
            // Don't precache sourcemaps (they're large) and build asset manifest:
            staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
        }),
        // new CopyWebpackPlugin([
        //     { from: '../public/order.php', to: '../build/order.php' },
        //     { from: '../public/payment.php', to: '../build/payment.php' },
        //     { from: '../public/test_site.php', to: '../build/test_site.php' }
        // ])
    ],
    output: {
        path: __dirname + '/build',
        publicPath: '/',
        filename: "app.js"
    }
}