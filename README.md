不同的分支  webpack实现不同的功能


base1: 
4.0 以后  webpack  app.js   app.boundle.js   命令变为   webpack  app.js   自动生成dist文件夹及main.js
webpack 引用 css 文件以前要用css-loader  .  css-loader和style-loader  一起使用。
css-loader:  让webpack 可以处理css文件
style-loader:  把css-loader 处理的文件 在html 中新建一个 style 标签 把css代码注入到html中
html 文件直接引入 打包后的 main.js  文件就行
方法一 ： import "style-loader!css-loader!./style/css.css"
方法二 ：命令行直接对应相应的loader 。webpack -help
                webpack hello.js --module-bind 'css=style-loader!css-loader'
                
                
webpack 常用参数：

 --watch   实时更新
 --progress   可以查看打包过程
 --display-modules   可以查看打包的模块（列出所有引用的模块及loader的处理方式）
 --display-reasons    可以查看为什么要打包某个模块


 base2:  
 当webpack.config.js  的名字不为这个时， 在命令行可以用 --config 来指定webpack 运行的对象。 
 不指定会运行webpack.config.js, 没有 则不运行。 
 例如：  webpack   --config   webpack.dev.config.js  才能运行 后者


 可以利用npm 的脚本来 设置webpack运行的对象, 设置位置是 package.json 中的scripts 中.
 例如："scripts": {
		"test": "echo \"Error: no test specified\" && exit 1",
		"dev": "webpack --config webpack.config.js --progress --display-modules --colors --watch "
	},

webpack.config.js 中的entry：
1. entry: './src/app.js'        单一入口文件
2. entry: ['./src/script/a.js','./src/app.js'],   将两个js 合并打包为一个出口文件js(main.js)
3: entry:{page1: './src/app.js',page2: './src/script/a.js'}     多入口配置文件
如果是多入口， 那么output 中的  filename 一定不能写成固定的  。  
webpack中提供三个值： 
	[name] 文件原来的名字。   
	[hash]哈希值，所有的文件都是一个。 是当次打包的hash
	[chunkhash]不同模块不同的哈希值。 每一个chunk自己的hash

关于hash值，  webpack 只有当代码发生变化时打包  hash才会发生变化， 这样对静态资源的管理非常友好
