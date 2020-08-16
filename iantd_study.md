
## iantd组件
##### 0、组件库介绍
 1. react+ts打造自己的组件库
   - npm地址：`https://www.npmjs.com/package/vikingship`
	 - storybook地址：`http://vikingship.xyz/?path=/story/%E6%AC%A2%E8%BF%8E%E6%9D%A5%E5%88%B0%E8%AF%BE%E7%A8%8B--welcome`
##### 一、项目初始化
 1. create-react-app脚手架
   - 命令`npx create-react-app iantd-react-my --typescript --registry=https://registry.npm.taobao.org`
 2. create-react-app的config配置化命令`npm run eject`
 3. 如果不用eslint校验, 在【**config/webpack.config.js**】中可以去注释，可以忽略
   - 博客上有参考配置eslint的文章`https://blog.csdn.net/qq_21651453/article/details/103012388?utm_medium=distribute.pc_relevant_t0.none-task-blog-BlogCommendFromMachineLearnPai2-1.edu_weight&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-BlogCommendFromMachineLearnPai2-1.edu_weight`
   - eslint官网文档`https://cn.eslint.org/docs/rules/`

##### 二、基础样式
 1. 样式解决方案
   - inline css 
	 - css in js
	   **流行的库styled-components**
	   ```ts
				const Button = 
					styled.button`
						font-size: 1em;
						margin: 5px;
						color: ${props => props.priamry ? 'yellow' : 'green'};
					`
		```
	 - sass/less
	   ```js
				// 需要安装依赖
				// npm i node-sass --registry=https://registry.npm.taobao.org

				// 编译scss文件
				// npx node-sass .\_variables.scss a.css
		```

 2. 创建自己组件库的色彩体系
   - 系统色板 - 基础色板 + 中性色板(黑白灰)
	 - 产品色板 - 品牌色 + 功能色板
   - 网站推荐: 中国色`http://zhongguose.com/`

 3. 添加组件库样式
   - 初始化样式normalize.css初始化大部分浏览器的样式，github地址`https://github.com/necolas/normalize.css`
	 - 复用样式_mixin.scss
	   ```scss
				@mixin button-size($padding-y, $padding-x, $font-size, $border-raduis) {
					padding: $padding-y $padding-x;
					font-size: $font-size;
					border-radius: $border-raduis;
				}
				// 使用
				@include button-size( $btn-padding-y,  $btn-padding-x,  $btn-font-size,  $border-radius);
		```
   - 入口文件导入`index.scss`
		 ```scss
        @import "variables";
		  // _variables.scss这种文件单独编译不了，只能模块化被引入  @import "variables"; 就行

		```
   - 组件库样式变量分类: 基础色彩系统 字体系统 表单 按钮 边框和阴影 可配置开关
   - 代码 **【src/styles/_variables.scss】**
	   ```scss
				$white: #fff !default;
				//!default表示默认值。给一个未通过!default声明赋值的变量赋值，此时，如果变量已经被赋值，不会再被重新赋值;但是如果变量还没有被赋值，则会被赋予新的值。
		```

##### 三、组件开发
 1. Button组件
   - 下载classnames库,`npm i classnames --registry=https://registry.npm.taobao.org`,`npm install @types/classnames`
	 - 代码中的补充知识
	   ~~~ts
        // Partial< > 可选的
				export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>
				// AnchorButtonProps 控件
		 ~~~
	 - 代码 **【src/components/Button】**
	 - 代码 **【src/App_Button.tsx】**
	 - 单元测试代码 **【src/components/Button/button.test.ts】**

 2. Menu导航组件
   - 样式flexbox,百度搜css-tricks ,地址`https://css-tricks.com/` 网站里搜flowbox
	 - `:scoped`,CDN找到css搜scope
	   ```js
				expect(menuElement.querySelectorAll(':scope > li').length).toEqual(5) 
				// :scope指的是menuElement本身,:scope > li是指它本身下面的li
		```
   - 一些bug
	   ```ts
				// 不能将类型“string”分配给类型“"vertical" | "horizontal" | undefined”
				// 参考地址: `https://stackoverflow.com/questions/53671306/type-requireablestring-is-not-assignable-to-type-validatorhorizontal`
				
				// 解决方法1
				/*
					<TransMenu
						defaultIndex="0"
						defaultOpenSubMenus={[]}
						mode="horizontal"
						onSelect={function noRefCheck(){}}
					>
				*/

				// 解决方法2
				import TransMenu from './components/Menu'
				import { MenuProps } from './components/Menu/menu'
				const testProps: MenuProps = {
					defaultIndex: '0',
					mode: 'vertical',
					onSelect: ()=>{alert('自定义onSelect事件')
					},
					className: 'test'
				}
				
				/*
				<TransMenu {...testProps}>
					<TransMenu.Item>
						active
					</TransMenu.Item>
				</TransMenu>
			  */

			 
		```
   - 代码 **【src/components/Menu】**
	 - 代码 **【src/App_Menu_Icon.tsx】**
	 - 单元测试代码 **【src/components/Menu/menu.test.ts】**

 3. Input组件
   - 代码中的补充知识
	   ~~~ts
				 // Omit ts中忽略的值 
				 interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size' >{

				 }
		 ~~~
   - 代码 **【src/components/Input】**
	 - 代码 **【src/App_Input.tsx】**
	 - 单元测试代码 **【src/components/Input/input.test.ts】**

 4. AutoComplete组件
   - lodash官网推荐`https://lodash.com/`
	   ~~~ts
		    // 防抖函数
				// _.debounce(func, [wait=0], [options={}])
				/*
					Arguments
						func （Function）：防抖动功能。
						[wait=0] （number）：要延迟的毫秒数。
						[options={}] （Object）：选项对象。
						[options.leading=false] （布尔值）：指定在超时的前沿调用。
						[options.maxWait] （number）：func允许延迟最大时间，然后才调用它。
						[options.trailing=true] （布尔值）：指定在超时的后沿调用。
					Returns
					 （Function）：返回新的去抖动功能。 
				*/
				var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
				var source = new EventSource('/stream');
				jQuery(source).on('message', debounced);
				
				// Cancel the trailing debounced invocation.
				jQuery(window).on('popstate', debounced.cancel);
		 ~~~
   - 代码中的补充知识
	   ~~~ts
				/* fetch 用法 */
				const handleFetch = (query: string) => {
					return fetch(`https://api.github.com/search/users?q=${query}`)
						.then(res => res.json())
						.then(({ items }) => {
							console.log(items)
							return items.slice(0, 10).map((item: any) => ({ value: item.login, ...item}))
						})
				}
				/* 是否是Promise对象  results instanceof Promise */
				if(results instanceof Promise){

				}
				/* 
					泛型 DataSourceType<T = {}> = T & DataSourceObject
					T 传参,  输出 T & DataSourceObject
				*/
				export type DataSourceType<T = {}> = T & DataSourceObject
				// 使用 DataSourceType<GithubUserProps>
		 ~~~
	 - 防抖封装代码 **【src/hooks/useDebounce】**
   - 代码 **【src/components/AutoComplete】**
	 - 代码 **【src/App_AutoComplete.tsx】**
	 - 单元测试代码 **【src/components/AutoComplete/autoComplete.test.ts】**

 5. Process组件
   - 代码 **【src/components/Process】**
	 - 代码 **【src/App_Upload_Process.tsx】**

 6. Upload组件
   - upload一个文件的生命周期
	   1. 开始点击按钮选择文件
		 2. beforeUpload(file)
		 3. onProgress(event,file)
		 4. onChange(file)   
		 5. onSuccess(response,file) ==> onRemoved(file)   ,   onError(error,file)
   
	 - 文件上传的三种方式 (推荐资料`https://www.jianshu.com/p/0d2566f3ec8f`)
	   ~~~html
				<!-- 文件上传的三种方式 -->
				<!-- 
					1. form表单文件上传 
					- 图片上传的请求方式必须为post
					- enctype="multipart/form-data" 参数不能少
				-->
				<form action="https://jsonplaceholder.typicode.com/posts/1" method="post" encType="multipart/form-data">
						<input type="file" name="file">
						<input type="submit" value="Upload" />
				</form>
				<!-- 
					2. 借助form的js文件上传 
					- processData设置为false。因为data值是FormData对象，不需要对数据做处理。
					- <form>标签添加enctype="multipart/form-data"属性。
					- cache设置为false，上传文件不需要缓存。
					- contentType设置为false。因为是由<form>表单构造的FormData对象，且已经声明了属性enctype="multipart/form-data"，所以这里设置为false。
				
				$(function () {
						$('#upload').click(function() {
								$.ajax({
										url: "http://localhost:8081/images",
										type: "post",
										data: new FormData($('#uploadForm')[0]),
										cache: false,
										processData:false,
										contentType:false,
										success: function(res) {
												console.log(res)
										},
										error: function(err) {
												console.log(err)    
										}
								})
						})
				})
				-->
        
				<!-- 3. 不借助form的js文件上传 -->
				<input type="file" name="file" onChange={handleFileChange} />
		 ~~~
		 ~~~ts
		 		// handleFileChange里的内容
				const files = e.target.files
				if(files){
					const uploadedFile = files[0]
					const formData = new FormData() // xhr2
					formData.append(uploadedFile.name, uploadedFile)
					// api
					const res = await axios.post('https://jsonplaceholder.typicode.com/posts', 
						formData, 
						{
							headers: { 'Content-Type': 'multipart/form-data'}
						}
					)
					console.log('file-res:',res)
				}
		 ~~~

	 - 代码中的补充知识
	   ~~~ts
				// 1.判断result是个Promise
				if (result && result instanceof Promise) {}
				
				// 2.对象遍历
				const formData = new FormData()
				if (data) {
					Object.keys(data).forEach(key => {
						console.log(key, data[key])

						formData.append(key, data[key])
				  })
				} 
				
				//3. react useState 异步
				export default function Kk() {
						const [a,setA] = useState(1)
						function change() {
								setA(5)
								
								console.log(a) //1
						}
						useEffect(()=>{
								console.log(a) //5
						},[a])
						return (<span onClick={()=>change()} > setA </span> )
				}
		 ~~~
   - 代码 **【src/components/Upload】**
	 - 代码 **【src/App.tsx】**
	 - 单元测试代码(jest mock axios异步 结合) **【src/components/Upload/upload.test.ts】** 

##### 四、图标icon
 1. 图标icon的解决方案
   - 上古时代 雪碧图(css sprite)
   - 近代 Font icon
   - 现代和未来 svg

 2. svg的优势
   - 完全可控
	 - svg即取即用,Font icon要下载全部字体文件
	 - Font icon还有很多奇怪的bug

 3. fontawesome库
   - github搜fontawesome,找`react-fortawesome`,地址`https://github.com/FortAwesome/react-fontawesome`
	   ```js
		    // 下载依赖项
        // npm i --save @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome
		```
	 - icon官网地址`https://fontawesome.com/` ICON栏下找**free并且solid**,`https://fontawesome.com/icons?d=gallery&s=solid&m=free`
	 - 代码 **【src/components/Icon】**
	 - 代码 **【src/App_Menu_Icon.tsx】**
	 - scss @each
	   ```scss
				$theme-colors: 
				(
					"primary":    $primary,
					"secondary":  $secondary,
					"success":    $success,
					"info":       $info,
					"warning":    $warning,
					"danger":     $danger,
					"light":      $light,
					"dark":       $dark
				);
				@each $key, $val in $theme-colors {
					.icon-#{$key} {
						color: $val;
					}
				}
		```
	 - 2种使用方式 **(参考github react-fortawesome)**
	   1. Explicit Import
        ```ts
					import ReactDOM from 'react-dom'
					import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
					import { faCoffee } from '@fortawesome/free-solid-svg-icons'
					const element = <FontAwesomeIcon icon={faCoffee} />
					ReactDOM.render(element, document.body)
			```

		 2. Build a Library
		    ```ts
					 import React from 'react'
					 import { library } from '@fortawesome/fontawesome-svg-core'
					 // fab fas 所有类型集合
					 import { fab } from '@fortawesome/free-brands-svg-icons' 
					 import { fas } from '@fortawesome/free-solid-svg-icons' 
					 library.add(fab, fas)
					 import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
					 export const test = () => (
						 /*
						 <div>
							 <Icon icon="coffee" size="10x" theme="danger"></Icon>
							 <Icon icon={['fas','coffee']} size="6x" theme="secondary"></Icon>
							 <Icon icon={['fab','airbnb']} size="6x" theme="warning"></Icon>
						 </div>
						 */
					 )
			```

##### 五、transition动画效果
 1. react Transition Group库
   - react官方推荐,在`FAQ--样式及css`栏处找
	 - 选择CSSTransition,地址`https://reactcommunity.org/react-transition-group/`
	 - 安装依赖
	   ```ts
        // npm install @types/react-transition-group react-transition-group  --save
		```
	 - 库使用方法 **(具体参见react Transition Group库官方文档)**
	   ```ts
				/*
						in --显示组件；触发进入或退出状态
						unmountOnExit --动态添加/删除children元素，不需要display:none/block;
						appear --默认情况下，子组件在首次安装时不执行回车转换，而与的值无关in。
									如果您想要这种行为，请将appear和都设置in为true。
				*/

        <CSSTransition
          in={menuOpen}
          timeout={300}
          classNames="zoom-in-top"
          appear
          unmountOnExit>
          <ul className={subMenuClasses}>
            {childrenComponent}
          </ul>
        </CSSTransition>
		```
		 ```scss
		  // 对应上述 classNames="zoom-in-top"
		  .zoom-in-top-enter { 
          opacity: 0;
        }
        .zoom-in-top-enter-active {
          opacity: 1;
          transition: opacity 200ms;
        }
        .zoom-in-top-exit {
          opacity: 1;
        }
        .zoom-in-top-exit-active {
          opacity: 0;
          transition: opacity 200ms;
        }
		 ```
	 - 代码 **【src/components/Transition】**
	   ```ts
				/*
					<CSSTransition
						in={menuOpen}
						timeout={300}
						classNames="zoom-in-top"
						appear
						unmountOnExit>
						<ul className={subMenuClasses}>
							{childrenComponent}
						</ul>
					</CSSTransition>
				*/

				// 封装成
				/*
					<Transition
						in={show}
						timeout={5000}
						animation="zoom-in-left"
						wrapper={true}>  
							<Button btnType="primary" size="lg"
							   onClick={ () => { setShow(!show) } }>
								 A large Button 
							</Button>
					</Transition>

				*/

		```
	 - 代码 **【src/App_Transition.tsx】**

##### 六、单元测试 
 1. react特别适合单元测试
   - component组件
	 - function函数
	 - 单向数据流

 2. 测试框架jest **[`npx jest`或 `npm run test`]**
   - 断言库(using Matchers) --有点像假设
   - create-react-app推荐的测试框架 内置了依赖,官网`https://jestjs.io/` 
	 - 根据情况修改package.json(这边自动查找src下的目录) **(已经npm run eject 需要修改根目录)**
	   ```json
        "jest": {
						"roots": [
							"<rootDir>/"
						],
						// 设置识别哪些文件是测试文件（glob形式），与testRegex互斥，不能同时写
						"testMatch": [
							"<rootDir>/**/__tests__/**/*.{js,jsx,ts,tsx}",
							"<rootDir>/**/*.{spec,test}.{js,jsx,ts,tsx}"
						]
				}
		```
	 - 新建`src/jest.test.js`,
	 - 启动测试命令 
	   ```js
				// 测试命令
				// npx jest  // 会自动找
				// npx jest  jest.test.js

				// watch -- 修改就会自动运行 
				// npx jest jest.test.js --watch

				// create-react-app脚手架自带
				// npm run test  //会自动找且会带watch效果
				// npm test -- -t "auto" // 会自动找 带auto的测试文件
		```

 3. 结合测试库Testing Library
   - 可以理解为断言库
   - react官方推荐的, 官网API REFERENCE 下 Test Utilities, `https://react.docschina.org/docs/test-utils.html`
	 - React Testing Library官方地址`https://testing-library.com/docs/react-testing-library/intro`
	   jest-dom, github搜`https://github.com/testing-library/jest-dom`
	   ```ts
				// 旧版本需要安装依赖(create-react-app3.0版本以上不需要)
				// npm install --save-dev @testing-library/react
				// npm install --save-dev @testing-library/jest-dom
		```
	 - 根目录新建`setupTests.ts`文件(create-react-app3.0版本以上不需要)
	   ```ts
				// jest-dom adds custom jest matchers for asserting on DOM nodes.
				// allows you to do things like:
				// expect(element).toHaveTextContent(/react/i)
				// learn more: https://github.com/testing-library/jest-dom
				import '@testing-library/jest-dom/extend-expect';
		```

 4. jest接管axios写法(异步测试)
   - jest官网Mock functions栏
	 - jest结合Mock的一些知识
	   ```ts
				/* 1.jest模拟<Icon icon="spinner" spin theme="primary" /> */
				jest.mock('../Icon/icon', () => {
					return ({icon, onClick}) => {
						return <span onClick={onClick}>{icon}</span>
					}
				})
				// 使用
				expect(queryByText('spinner')).toBeInTheDocument()
				
				/* 2.异步测试  jest接管axios --jest官网Mock functions栏 */
				jest.mock('axios') 
				const mockedAxios = axios as jest.Mocked<typeof axios> // axios断言 JestMock对象
				// 使用

				// 写法1 
				// mockedAxios.post.mockImplementation(() => {
				//   return Promise.resolve({'data': 'cool'})
				// })
				// 写法2 
				mockedAxios.post.mockResolvedValue({'data': 'cool'}) // mockedAxios 为axios断言 的 JestMock对象
		 ```
	 - 代码 **【src/components/Upload/upload.test.tsx】**




##### 七、storybook
  1. 目前开发的痛点
    - create-react-app入口文件不适合管理组件库
		- 缺少行为追踪和属性调试功能

  2. 组件完美开发工具应有的特点
		- 分开展示各个组件不同属性下的状态
		- 能追踪组件的行为并且具有属性调试功能
		- 可以为组件自动生成文档和属性列表

	3. Storybook安装及配置 **[启动 `npm run storybook`]**
	  - 官网地址`https://storybook.js.org/`
		- 自动安装 (Guides里找Storybook for React) [小tips`git diff`可以查看变化]
		  ```ts
					// npx -p @storybook/cli sb init
		  ```
		- 启动 `npm run storybook`
	  - 支持Typescript配置 **【.storybook/】**  **20200711官网上的配置不是特别详细 有问题，参考课程上的**
		  1. 官网不是特别详细 有问题,配置结构`.storybook/main.js`
			   【Configurations里找TypeScript Config,参考Setting up TypeScript with babel-loader】
			2. 建议参考课程的配置结构 `.storybook/ webpack.config.js  config.tsx  addons.tsx`
	 
	4. Storybook的3种写法 (Basics里找writing-stories)  【推荐使用storyOfAPI的方式】
		- Component Story Format（CSF） **具体见`stories/xxx.stories.jsx`**
		- storiesOf API **【src/components/Button/button.stories.tsx】**
		  ```js
        	/* 样式文件需要在.storybook/config.tsx 中在引入 */
					import '../src/styles/index.scss'
			```
		- MDX syntax (还在测试阶段)


  5. storybook addon info (第三方插件)
	  - 作用：丰富story的info信息
		- git搜storybook,addon里找info，链接会跳转到`storybookjs/deprecated-addons/addons/info/`
	  - 安装
		  ```ts
					// npm i -D @storybook/addon-info
					
					// 有的包不带ts依赖需要 在下
        	// npm i --save @types/storybook__addon-info 
			```

	6. react-docgen (第三方插件)
	  - github搜react-docgen,`https://github.com/reactjs/react-docgen`，找Adding documentation comments to your code, **(storybook自带依赖react-docgen，但要制裁ts需要其他依赖)**
	  - 作用：自动生成文档，且注释也会出现在说明部分
		- github搜react-docgen-typescript-loader，找到Limitations进入 **【有些写法照文档 .storybook/ config.tsx】**
		  ```ts
			    // 安装依赖
					// npm install --save-dev react-docgen-typescript-loader
			```
		- github搜react-docgen-typescript，找到Options **【然后参考配置，自定义配置文档内容 .storybook/ webpack.config.js】**
	  - jsdoc代码注释:  jsdo参考地址`https://jsdoc.app/about-getting-started.html`


##### 八、Http库
 1. Fetch
  - 基于Promise封装的
	- fetch缺点:
		~~~ts
				// 1.只对网络请求报错，400，500都当做成功的请求
				// 2.默认不会携带cookie
				// 3.不支持abort 不支持超时控制
				// 4.没有办法原生监测请求的进度
		~~~

 2. axios
  - github星多 vue作者尤雨溪推荐
	- github搜axios,地址`https://github.com/axios/axios`
	- mock server
		1. JSONPlaceholder库, 官网地址:`http://jsonplaceholder.typicode.com/`
		2. Mocky库, 头部栏NEW MOCK 官方网址:`https://designer.mocky.io/`

	
##### 九、模块化打包
 1. js模块化发展历史 (commonjs AMD ES6modules)
 2. webpack --bundler神奇工具
	- 安装webpack依赖`npm i webpack webpack-cli `
	- 编译文件`npx webpack main.js`
 3. typescript打包过程
  - 编译过程:`.tsx --> es6 modules .jsx --> 入口文件引入需要的文件 index.tsx --> module.bundler`
	- 新建文件
	  ```ts
				// 1.新建入口文件`index.tsx`  **(把create-react-app脚手架自带index文件删掉)**
				// 2.新建`tsconfig.build.json`文件  **(针对build环境)**
				// 另外create-react-app脚手架自带 ts文件配置`tsconfig.json` **(主要针对dev环境)**
		```
	- 安装rimraf包(删除命令 兼容window)
	  ~~~ts
				// 删除命令 兼容window
				// linux删除命令`rm -rf 文件`
				// package.json配置后的命令 npm run clean
		~~~
	- package.json配置
	  ~~~json
				"scripts": {
    			"build": "npm run clean && npm run build-ts && npm run build-css",
					"build-ts": "tsc -p tsconfig.build.json",
					"build-css": "node-sass ./src/styles/index.scss ./dist/index.css",
					"clean": "rimraf ./dist"
				},
		~~~
	
 4. npm link测试本地组件库
	- 被link项目目录下执行命令`npm link`,本地创建软连接到全局
	  ~~~ts
				// C:\Users\zhangshengtao\AppData\Roaming\npm\node_modules\iantd-react-my -> D:\x\project-study\react-project-study\react-ts-antd\react-ts-antd-my\iantd-react-my
		~~~
	- link项目下执行`npm link iantd-react-my`,连接软连接
	  ~~~ts
				// D:\x\project-study\react-project-study\react-ts-antd\react-ts-antd-my\create-react-appdemo\node_modules\iantd-react-my -> C:\Users\zhangshengtao\AppData\Roaming\npm\node_modules\iantd-react-my -> D:\x\project-study\react-project-study\react-ts-antd\react-ts-antd-my\iantd-react-my
		~~~
	- 被link项目目录下package.json配置 入口文件
	  ```json
					"main": "dist/index.js",
  				"module": "dist/index.js",
  				"types": "dist/index.d.ts"
		```
	- 一些问题
	  ```ts
				// 1.如果react版本不一样
				// 在被link项目下执行下面命令
				// npm link ../link项目/node_moudles/react
				// npm link ..\create-react-appdemo\node_modules\react 
		```

 5. 在测试link项目下
	- 引入依赖
	  ~~~ts
				import 'iantd-react-my/dist/index.css';
        import { Button, Upload, AutoComplete, Icon, Menu as TransMenu, Transition } from 'iantd-react-my'
		~~~
	- 在package.json里加个 假依赖
	  ~~~json
				"dependencies": {
					"iantd-react-my": "0.1.0"
				}
		~~~


##### 十、npm上传
 1. npm介绍 登录
	- npm主要功能
		~~~ts
				// 1.下载别人编写的第三方包到本地
				// 2.下载并安装别人编写的命令行程序到本地使用
				// 3.将自己编写的包或者命令行程序上传到npm服务器
		~~~
	- 命令行登录npm
	  ~~~ts
				// 1.检测有没有登录npm
				// npm whoami
				// 2. 查看config，有没taobao镜像,需要初始化
				// npm config set registry=https://registry.npm.taobao.org
				// npm config set registry https://registry.npmjs.org
				// npm config get registry
				// npm config ls 
				// 3.登录/注册npm
				// 输入用户名 密码 email
				// npm adduser

		~~~
 2. 发布组件到npm **(执行`npm publish`)**
	- package.json配置
	  ~~~json
				{ 
					"version": "0.1.0", // 版本号(主版本.次版本.修订号)
					"private": false, // 不是私有包
					"description": "React components library",
					"author": "91-zhangshengtao",
					"license": "MIT", // 开源协议
					"keywords": [ // 关键字搜索
						"iantd-react-my",
						"iantd-react-test"
					],
					// 首页/仓库
					"homepage": "https://github.com/91-zhangshengtao/iantd-react",
					"repository": {
						"type": "git",
						"url": "https://github.com/91-zhangshengtao/iantd-react"
					},
					"files": [ //上传dist文件夹下的 到npm (但一些package.json REAME.md 还是会上传的)
						"dist"
					],
					"scripts": {
						"build": "npm run clean && npm run build-ts && npm run build-css",
						"test": "node scripts/test.js",
						"lint": "eslint --ext js,ts,tsx src --max-warnings 5", // eslint效验
						"build-ts": "tsc -p tsconfig.build.json",
						"build-css": "node-sass ./src/styles/index.scss ./dist/index.css",
						"clean": "rimraf ./dist",
						"prepublishOnly": "npm run lint && npm run build" // run publish之前的钩子函数
					}
				}
		~~~
  - 一些问题(详看.eslintrc.json)
	  ~~~json
				// 详解React开发必不可少的eslint配置： https://www.jb51.net/article/134474.htm
				{
					/*
						报如下错误 需要添加
						Parsing error: ImportDeclaration should appear when the mode is ES6 and in the module context.
					*/
					"parserOptions": {
						"ecmaVersion": 6,
						"sourceType": "module",
						"ecmaFeatures": {
							"modules": true
						}
					},
					/*
						Warning: React version not specified in eslint-plugin-react settings.
					*/
					"settings": {
						"react": {
								"pragma": "React",
								"version": "detect"
						}
					},
					"rules": {
						"react/prop-types": 0, // 去掉react/prop-types
						"react/display-name": 0 // react/display-name
					}
				}
		~~~

 3. 精简package.json
  - 区分dev和build **(其他放devDependencies)**
	  ~~~json
				{
					"dependencies": {
						"@fortawesome/fontawesome-svg-core": "^1.2.29",
						"@fortawesome/free-brands-svg-icons": "^5.13.1",
						"@fortawesome/free-solid-svg-icons": "^5.13.1",
						"@fortawesome/react-fontawesome": "^0.1.11",
						"axios": "^0.19.2",
						"classnames": "^2.2.6",
						"react-transition-group": "^4.4.1",
					},
					// 依赖react react-dom
					"peerDependencies": {
						"react": ">=16.8.0",
						"react-dom": ">=16.8.0"
					},
				}
		~~~

	  

 4. git commit代码前 添加 验证
  - 原来项目中`npm run test`只是个watch状态 不返回结果
	- 跨平台设置环境变量 (安装依赖`npm i cross-env --save-dev`)
	- package.json配置
	  ~~~json
				 "scripts": {
					"build": "npm run clean && npm run build-ts && npm run build-css",
					"lint": "eslint --ext js,ts,tsx src --max-warnings 5",
					"test:nowatch": "cross-env CI=true react-scripts test",
					"storybook": "start-storybook -p 6006",
					"build-storybook": "build-storybook",
					"build-ts": "tsc -p tsconfig.build.json",
					"build-css": "node-sass ./src/styles/index.scss ./dist/index.css",
					"clean": "rimraf ./dist",
					"prepublishOnly": "npm run test:nowatch && npm run lint && npm run build"
				}
		~~~
	- (husky插件 pre-commit)package.json配置 (安装husky依赖`npm i husky --save-dev`)
	  ~~~json
				"husky": {
					"hooks": {
						"pre-commit": "npm run test:nowatch && npm run lint"
					}
  			}
		~~~



##### 十一、storybook生成静态文件
 1. storybook首页 **【src/welocome.stories.tsx】**
 2. 打包storybook文件`npm run build-storybook`,打包完后在文件夹storybook-static中
 3. 部署到服务器上 

##### 十二、CI/CD
 1. CI持续集成
	- 频繁的将代码集成到主干 master

 2. CD持续交付 持续部署
	- 频繁地将软件的新版本，交付给质量团队或用户

 3. Travis cli
  - 官网 推荐`https://travis-ci.com/` 另一个`.org`
	  ~~~ts
				// 进入官网注册 关联github
				// 选择项目授权安装travis-ci
		~~~
	- 一些注意事项
	  ~~~ts
				// 1.**有yarn文件删掉,travis会默认执行yarn里的**
				// 2.`npm ci` 对比 `npm install`
				//    ci 安装package-lock.json里的
				//    install 安装package.json里的
		~~~**

  - 生成新分支test,`.travis.yml`文件配置  **[每次`git push`自动运行测试]**
	  ~~~ts
				// 1.git checkout -b test
				// 2.https://travis-ci.com/ 看变化
		~~~
	- 自动发布文档页面 github pages, 官网`https://pages.github.com/`
	  ~~~yml
				# Travis CI Tutorial 栏找到`More than running tests` 找到deploy to GitHub pages 点击链接
				script:
  				- npm run build-storybook # 不然会默认执行npm run test
        deploy:
  				provider: pages
  				skip_cleanup: true
  				github_token: $github_token # 要与travis.com 上配置的 变量名一致
  				local_dir: storybook-static # 上传那个文件夹的内容
  				on:
   					branch: master # 哪个分支触发deploy github pages
		~~~
	- github 生成令牌
	  ~~~ts
				// settings ==> developer settings ==>Personal access tokens
		~~~

	- travis.com 链接github_token
	  ~~~ts
				// 导航More options ==> settings ==> Environment Variables
		~~~