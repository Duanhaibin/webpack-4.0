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

4： 上线时候output 会用到publicPath 属性。
	相当于一个占位符， 当设置后 需要上线， 引用的地址  会被替换为绝对地址以 publicPath 设置的host 开头的地址 。


base3 : 
plugins:  []
webpack  默认上下文是运行的目录，  即根目录 。 



1.html-webpack-plugin : 引入对应的js 的 webpack对html操作的 插件 .
    在filename中带上打包路径即可。 
    （1）该插件可以直接给html文件传递参数， 使用ejs 模板语法可以获取到。 但是首字母必须小写。
    例如： plugins:[
			new HtmlWebpackPlugin({
				template: 'index.html',
				inject: 'head',
				filename: 'pages/index-[hash].html',
				title: 'webpack  插件给html 直接传参,支持ejs 语法 。 但是首字母必须小写 。',
				date: new Date()

			})
		]
		html 文件中取值可以使用 <%=  htmlWebpackPlugin.options.title %>
	（2）ejs模板语法，执行语句用<%  %>  取值的语句用 <%=  %>
    例如:<div>
			<% for(var key in htmlWebpackPlugin) {%>
            	<%= key %>
       		<%}%>
		</div>
		的 编译结果是 files  和  options
	（3）为了满足一部分js 在head 中引用， 一部分js 在body 后引用的要求， ejs 模板需要就需要用到了。
		<script type="text/javascript" src="<%= htmlWebpackPlugin.files.chunks.page1.entry %>"></script>
		单独设置引用的位置。  ejs 循环输出 htmlWebpackPlugin.files 可以看具体信息。
		inject  要配置为false.  否则会默认注入两边
	（3）html 压缩配置 。 npm 官网 还有很多配置项  。
			minify: {
                removeComments: true,
                collapseWhitespace: true
            }

base4 : 多页面应用
	1.  多页面应用中， 原始的html 中不能有直接因引用的script 标签， 注释掉也是不管用的， 需要删除。
	2.  html-webpack-plugin插件的配置项： excludeChunks: ['page4'], 引入所有，排除page4.
	3.  有的需要初始化的时候以in-line的方式 引入页面 ： 
		<script type="text/script">
			<%= compilation.assets[htmlWebpackPlugin.files.chunks.main.entry.substr(htmlWebpackPlugin.files.publicPath.length)].source() %>
		</script>
		inject 需要设置为fasle ，  和第一点冲突 。  实例中没有体现例子。

  