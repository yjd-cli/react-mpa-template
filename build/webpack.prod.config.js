const webpack = require('webpack');
const path = require('path');
const glob = require('glob');
const { smart } = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const baseConfig = require('./webpack.base.config');

module.exports = smart(baseConfig, {
    mode: 'production',
    devtool: 'none',
    output: {
        path: path.resolve('dist'),
        filename: './js/[name].[contenthash:8].js',
        chunkFilename: './js/[name].[contenthash:8].js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            localsConvention: 'camelCase',
                            modules: {
                                localIdentName: '[local]--[hash:base64:5]'
                            },
                        }
                    }, 'postcss-loader', 'less-loader']
            },
        ],
    },
    plugins: [
        new CopyWebpackPlugin([
            //     {
            //         from: 'public',
            //         to: 'public',
            //         // toType:'dir',
            //         ignore:['libs.dll.js','libs.manifest.json']
            //     }
            {
                from: 'src/assets/fonts/',
                to: 'fonts/',
            },
        ]),
        new MiniCssExtractPlugin({
            filename: './css/[name].[contenthash:8].css',
        }),
        // 不知道是这个插件不支持 CSS 模块化还是 MiniCssExtractPlugin 不支持，会认为该 CSS 模块化后的样式没有被使用，然后清除它
        // new PurgecssPlugin({
        //     paths: glob.sync(`${path.resolve('src')}/**/*`, { nodir: true }),
        // }),
    ],
    optimization: {
        minimizer: [
            new OptimizeCSSAssetsPlugin({
                cssProcessor: require('cssnano'),
                cssProcessorOptions: {
                    discardComments: { removeAll: true },
                    parser: require('postcss-safe-parser'),
                    autoprefixer: { disable: true }
                },
                canPrint: true
            }),
            new TerserPlugin({
                test: /\.js(\?.*)?$/i,
                // include: ['src/'],
                exclude: /\.min\.js$/,
                parallel: true,
                cache: true,
                // sourceMap: true,
            }),
        ],
        // 新版的 webpack 不需要设置这个了
        // runtimeChunk: {
        //     name: "manifest"
        // },
        splitChunks: {
            minSize: 1000,
            minChunks: 2,
            cacheGroups: {
                // default:false,
                vendors: {
                    chunks: 'all',
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    priority: 20,
                },
                common: {
                    chunks: 'all',
                    name: 'common',
                    priority: 10,
                },
            }
        }
    },
});


