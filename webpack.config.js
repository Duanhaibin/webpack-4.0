var path = require('path');
const  HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    // entry: ['./src/script/a.js','./src/app.js'],
    entry:{
        page1: './src/app.js',
        page2: './src/script/a.js',
        page3: './src/script/b.js',
        page4: './src/c.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name]-[hash].js'
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: 'index.html',
            inject: 'head',
            filename: 'pages/index-[hash].html',
            title: 'webpack  插件给html 直接传参,支持ejs 语法 。 但是首字母必须小写 。',
            date: new Date(),
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },


        }),
        new HtmlWebpackPlugin ({
            template: 'page.html',
            inject: 'head',
            title: '这是一个多页面应用  。',
            filename: 'pages/page-[hash].html',
            chunks: ['page2']

        }),
        new HtmlWebpackPlugin ({
            template: 'page.html',
            inject: 'head',
            title: '这是一个多页面应用  。',
            filename: 'pages/page222-[hash].html',
            excludeChunks: ['page4']

        })
    ]
};