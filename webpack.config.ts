const WorkboxPlugin = require('workbox-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


const output = {
    path: __dirname + '/dist',
    filename: 'bundle.js'
}
module.exports = {
    entry: './src/index.js',
    output: output,
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader", "eslint-loader"]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            },
            {
                test: /\.(css|scss)$/,
                use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|jp(e*)g|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8000, // Convert images < 8kb to base64 strings
                        name: 'images/[hash]-[name].[ext]'
                    }
                }]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "src/index.html",
            filename: "index.html",
            favicon: "src/favicon.ico"
        }),
        new ScriptExtHtmlWebpackPlugin({
            defaultAttribute: 'defer',
        }),
        new MiniCssExtractPlugin({
            filename: "style.[contenthash].css"
        }),
        new WebpackPwaManifest({
            name: 'Applica Dev',
            orientation: 'portrait',
            display: 'standalone',
            start_url: '.',

            short_name: 'ApplicaDev',
            description: 'Simple PWA',
            background_color: '#2c2c2c',
            theme_color: '#2c2c2c',
            icons: [
                {
                    src: './src/icon.png',
                    sizes: '144x144',
                    type: 'image/png'
                },
            ],
        }),
        new WorkboxPlugin.GenerateSW({
            include: [/\.html$/, /\.js$/, /\.css$/, /\.jpg$/, /\.png$/, /\.ico$/],

            // Define runtime caching rules.
            runtimeCaching: [{
                // Match any request that ends with .png, .jpg, .jpeg or .svg.
                urlPattern: /\.(?:png|jpg|jpeg|svg)$/,

                // Apply a cache-first strategy.
                handler: 'CacheFirst',

                options: {
                    // Use a custom cache name.
                    cacheName: 'images',

                    // Only cache 10 images.
                    expiration: {
                        maxEntries: 10,
                    },
                },
            }],
        })
    ],
    stats: {
        colors: true,
    },
    devtool: 'source-map',
    mode: 'development',
    performance: {
        maxEntrypointSize: 512000,
        maxAssetSize: 512000,
    },
    devServer: {
        contentBase: './dist',
        inline: true,
        port: 3000,
    },
};