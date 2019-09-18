const webpack = require('webpack');
const path = require('path');
const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length});
// const CopyWebpackPlugin = require('copy-webpack-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const htmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin');
const smw = new SpeedMeasureWebpackPlugin();
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const htmlPlugins = require('./webpack.html.config');

module.exports = smw.wrap({
    context: path.resolve(__dirname, "../"),
    // stats: 'minimal',
    stats: 'errors-only',
    entry: {
        index:'./src/pages/index/Index.jsx',
        personal:'./src/pages/personal/Personal.jsx',
    },
    // output:{
    //     publicPath:'/'
    // },
    module: {
        noParse: /jquery|lodash/,
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: ['happypack/loader?id=js'],
                // use: ['babel-loader'],
                // 这里是可以排除的，不用担心 antd 按需加载会失效
                // 因为 babel-loader 是针对你项目中自己写的 js/jsx 文件处理解析的
                // 当匹配文件时，就会读取 .babelrc 文件里面的配置，然后才做按需加载
                exclude: [/node_modules/, /public/, /(.|_)min\.js$/],
            },
            {
                test: /\.(woff|woff2|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                exclude: /node_modules/,
                loader: 'url-loader?limit=1024&name=./fonts/[name].[contenthash:8].[ext]',
                // use:{
                //     loader:'url-loader',
                //     options:{
                //         limit:10*1024,
                //         // 指定文件输出名
                //         // name: '[path][name].[ext]',
                //         // name 相当于下面两个组合
                //         // 指定目标文件输出（将要被拷贝到）的文件路径，默认 undefined
                //         // 把图片拷贝到 images 目录下
                //         outputPath:'images',
                //         // 指定目标文件的自定义公共路径
                //         publicPath:'/images'
                //     }
                // }
            },
            {
                test: /\.(png|jpg|gif|jpeg|ico|cur|svg)$/,
                exclude: /node_modules/,
                loader: 'url-loader?limit=8192&name=./img/[name].[contenthash:8].[ext]'
            },
        ]
    },
    plugins: [
        ...htmlPlugins,
        new HappyPack({
            id: 'js',
            loaders: ['babel-loader?cacheDirectory=true'],
            threadPool: happyThreadPool
        }),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [path.resolve('dist')],
        }),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    ],
    resolve: {
        extensions: [" ", '.js', '.jsx', '.less', '.css', '.json'],
        alias: {
            "@src": path.resolve('src'),
            "@public": path.resolve('public'),
            "@assets": path.resolve('src/assets'),
            "@utils": path.resolve('src/utils'),
            "@common": path.resolve('src/common'),
        },
    },
    externals: {
        // jquery: 'jQuery'
    }
});
