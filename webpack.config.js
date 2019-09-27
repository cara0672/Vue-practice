const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');


module.exports = {
    entry: path.join(__dirname, './src/main.js'),
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'bundle.js'
    },
    plugins: [
        new htmlWebpackPlugin({ //该插件在内存中生成页面, 并且自动引用bundle.js
            template: path.join(__dirname, './src/index.html'),
            filename: 'index.html'
        }),
        new VueLoaderPlugin(),

    ],
    module: {
        rules: [
            {test: /\.css$/, use: ['style-loader', 'css-loader']}, //处理顺序: 在use数组中, 从后往前调用处理器,将css-loader处理结果交给前一个style-loader处理
            {test: /\.(jpg|jpeg|png|gif)$/, use: 'url-loader?limit=1&name=[hash:8]'},
            {test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader'},//处理完毕后,会把处理结果交给webpack进行打包合并,最终合并到bundle.js
            {test: /\.vue$/, use: 'vue-loader'},
        ]
    }, //用于配置第三方模块的加载器
    resolve: {
        alias: {
            "vue$": "vue/dist/vue.js"
        }
    }


};