const path = require('path')
//  导入提取样式的webpack插件
const ExtractTextPlugin = require("extract-text-webpack-plugin");
//引入自动生成引入文件
const HtmlWebpackPlugin = require("html-webpack-plugin");
// 导入清除插件
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
// 引入vue-loader插件
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    //匹配项目入口文件 使用相对路径就可以
    entry: {
        main:'./src/main.js'
    },
    output: {
        //匹配项目输出的文件
        filename: 'js/[name].bundle.js',
        //匹配项目输出的文件名 使用绝对路径
        path: path.resolve('dist'),

    },
    // 模块加载器配置项
    module: {
        rules: [
            // {
            //     test: /\.css$/,			// 匹配css扩展名文件
            //     use:[					// 配置loader加载器
            //         'style-loader',		// 把css代码写入到网页中
            //         'css-loader',		// 读取css的代码
            //     ]	
            // },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({ // 提取css
                    fallback: "vue-style-loader",
                    use: ["css-loader"]
                })
            },
            // {
            //     test: /\.less$/,			// 匹配css扩展名文件
            //     use:[					// 配置loader加载器
            //         'style-loader',		// 把css代码写入到网页中
            //         'css-loader',		// 读取css的代码
            //          'less-loader'
            //     ]	
            // }
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({ // 提取less
                    fallback: "vue-style-loader",
                    use: ["css-loader", "less-loader"]
                })
            },
            {
                test: /\.vue$/,
                use: ['vue-loader']
            },
            
            {
                test: /\.(png|svg|jpg|gif)$/, // 匹配图片文件
                use: [{
                    loader: "file-loader", // 处理图片文件返回链接
                    options: {
                        publicPath: "./images/", //  引入图片时会在路径前面加上该选项
                        outputPath: "images" //  输出到dist下的images目录
                    }
                }]
            }
        ],
    },
    plugins: [
        new ExtractTextPlugin('./style/cxx.css'), // 提取到dist的style文件夹中
        // 调用清除打包目录插件
        new CleanWebpackPlugin(),

        new HtmlWebpackPlugin({
            template: "public/index.html" // template指定默认html模板
        }),
        new VueLoaderPlugin()
    ],
    // + 提取公共模块配置
    optimization: {
        splitChunks: {
            chunks: 'all' // 提取所有文件的共同模块
        }
    },
     //  + 添加模块解释
     resolve: {
        alias: {
            // 1.以后@符号就是src目录
            '@': path.resolve(__dirname, "../src"),
        },
            // 2.省略导入模块时的后缀名。
            extensions: ['.js', '.json', '.vue']
        
    },
}