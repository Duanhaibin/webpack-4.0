var path = require('path');
const  HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    // entry: ['./src/script/a.js','./src/app.js'],
    entry:{
        page1: './src/app.js',
        page2: './src/script/a.js'

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
            }

        })
    ]
};