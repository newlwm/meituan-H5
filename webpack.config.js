const path = require("path")
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// nodejs核心模块，直接使用
const os = require("os");
// cpu核数
const threads = os.cpus().length;

module.exports = {
        // 入口entry
        entry:path.join(__dirname, "./src/main.js"),
        // 输出 output
        output:{
            path:path.join(__dirname, '/dist'),
            filename:'bundle.js',
            // filename:""
            // clean:true,
        },
        // 加载器 loader
        module:{
            rules:[
                {
                    test: /\.css$/,
                    use: ["style-loader", "css-loader"],
                },
                {
                    test: /\.less$/,
                    use: [
                     "style-loader",
                     "css-loader",
                     {
                        loader: "postcss-loader",
                        options: {
                          postcssOptions: {
                            plugins: [
                              "postcss-preset-env", // 能解决大多数样式兼容性问题
                            ],
                          },
                        },
                      },
                     'less-loader',
                    ],
                },
                {
                    test: /\.s[ac]ss$/,
                    use: [
                    "style-loader", 
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                          postcssOptions: {
                            plugins: [
                              "postcss-preset-env", // 能解决大多数样式兼容性问题
                            ],
                          },
                        },
                      },
                    'sass-loader',
                ],
                },
                {
                    test: /\.styl$/,
                    loader: "stylus-loader", 
                },
                {   //处理图片的文件
                    test: /\.(png|jpe?g|gif|svg)$/,
                    type: 'asset',
                    parser: {
                       dataUrlCondition: {
                       maxSize: 10 * 1024 // 4kb
                     },
                    },
                    generator: {
                        filename: 'static/images/[hash:10][ext][query]'
                      },
                },
                {   //处理字体图标的文件
                    test: /\.(woff2?|ttf)$/,
                    type: 'asset/resource',
                    generator: {
                        filename: 'static/media/[hash:10][ext][query]'
                      }
                },
                // 使用babel解决向下兼容性的问题
                {
                    test: /\.js$/,
                    exclude: /(node_modules)/,
                    loader: 'babel-loader',
                    use:[
                      {
                          loader:"thread-loader",
                          options:{
                              workers:{
                                  threads
                              }
                          }
                      },
                      {
                      loader: 'babel-loader',
                      options: {
                          cacheDirectory:true,
                          cacheCompression:false,
                          plugins: ["@babel/plugin-transform-runtime"], // 减少代码体积
                        },
                  }]

                }
            ]
        },
        // 插件 plugins
        plugins:[
          
            new ESLintPlugin({
                context:path.resolve(__dirname,'../src'),
                exclude:"node_modules",
                cache:true,
                cacheLocation:path.resolve(__dirname,'../node_modules/.cache/.eslintcache'),
                threads, // 
            }),
            new HtmlWebpackPlugin({
                template:path.resolve(__dirname,'../public/index.html')
            })
        ],
         // 开发服务器
        devServer: {
            host: "localhost", // 启动服务器域名
            port: "8080", // 启动服务器端口号
            open: true, // 是否自动打开浏览器
            hot: true, // 是否自动打开浏览器
            },
        // 开发模式
        mode:"development",
        devtool: "cheap-module-source-map",
}


