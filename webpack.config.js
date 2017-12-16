const path = require('path');
const glob = require('glob');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const htmlPlugin = require('html-webpack-plugin');
const extractTextPlugin = require('extract-text-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');
const webpack = require('webpack');
const copyWbpackPlugin = require('copy-webpack-plugin');

console.log(encodeURIComponent(process.env.type))

var website = {
    publicPath: 'http://192.168.2.133:1717/'
}

module.exports = {
    devtool: "eval-source-map",
    entry: {
        entry: './src/entry.js',
        jquery: 'jquery',
        vue: 'vue'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: website.publicPath
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: extractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        { loader: 'css-loader', options: {importLoaders:1} },
                        'postcss-loader'
                    ]
                })
            },{
                test: /\.(png|jpg|gif)/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 5000,
                            outputPath: 'images/'
                        }
                    }
                ]
            },{
                test: /\.(htm|html)$/i,
                use: ['html-withimg-loader']
            },{
                test: /\.less$/,
                use: extractTextPlugin.extract({
                    use: [
                        {
                            loader: "css-loader"
                        },{
                            loader: "less-loader"
                        }
                    ],
                    fallback: "style-loader"
                })
            },{
                test: /\.scss/,
                use: extractTextPlugin.extract({
                    use: [
                        {
                            loader: "css-loader"
                        },{
                            loader: "sass-loader"
                        }
                    ],
                    fallback: "style-loader"
                })
            },{
                test: /\.(jsx|js)$/,
                use: {
                    loader: "babel-loader"       
                },
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['jquery','vue'],
            filename: 'assets/js/[name].js',
            minChunks: 2
        }),
        // new UglifyJsPlugin()
        new webpack.ProvidePlugin({
            $: "jquery"
        }),
        new htmlPlugin({
            minify: {
                removeAttributeQuotes: true
            },
            hash: true,
            template: './src/index.html'
        }),
        new extractTextPlugin("css/index.css"),
        new PurifyCSSPlugin({
            paths: glob.sync(path.join(__dirname, 'src/*.html'))
        }),
        new webpack.BannerPlugin("logyoo 版权所有！"),
        new copyWbpackPlugin([{
            from: __dirname+'/src/public',
            to: './public'
        }]),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        host: '192.168.2.133',
        compress: true,
        port: 1717
    },
    watchOptions: {
        poll: 1000,
        aggregeateTimeout: 500,
        ignored: /node_modules/,
    }
}