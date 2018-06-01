var path = require('path');

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
    }
};