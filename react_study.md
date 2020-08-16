
## react
##### 一、react
 1. react介绍
   - 声明式(强调结果 声明式写ui, 相对的'命令式')
	 - 组件化(良好的封装、代码测试 代码分离 代码复用简单化)
	 - 一次学习 随处编写(可以使用node进行服务器端渲染、native开发原生移动应用)

 2. react基础
   **可参考`https://www.imooc.com/learn/1045`**
   - props
	 - state
	 - 生命周期
	   `挂载(初始化) 更新 卸载`
	 - 状态提升 和 单向数据流
	   `在父组件里改变传入的数据源  自上而下`

 3. react环境
   - 官方脚手架`create-react-app`
	   ```js
				// npx create-react-app react-study-my --typescript --registry=https://registry.npm.taobao.org
				
				// npx
				// 1.避免安装全局模块
		 ```
    
 
##### 二、React Hook
 1. React hook
   - 1. react16.8带来的全新特性，即将替代class的写法
	 - 2. 没有破坏性改动，避免大量改写
	   `完全可选 ,100%向后兼容, 没有计划从react中移除class`
	 - 3. 组件很难复用 状态逻辑
	   `HOC 或者 render Props`
	 - 4. 复杂组件难以理解，尤其是生命周期函数
	 - 5. react组件一直是函数，使用hook完全拥抱函数
	 - 6. **hook规则：只在最顶层使用hook,只在react函数中调用hook**
	 - 7. **官方文档`https://zh-hans.reactjs.org/docs/hooks-intro.html`**
	 - 8. 光放推荐学习的网站`https://usehooks.com/`

 2. State Hook
   - 1. Hook是什么？
	   特殊的函数，可以购入react的特性
	 - 2. 什么时候会用useState Hook?
	   在使用函数组件中，加入`const [like, setLike] = useState(0)`

 3. Effect Hook **(每次组件渲染完，都会被触发useEffect(cb)里的函数)**
   - 1. 无需清除的副作用
	 - 2. 在class组件中得考虑在什么生命周期了使用,hook中用`useEffect(cb,[like])`
	      **（第二个参数是监听条件,如果只想在挂载和卸载的时候,使用[]）**
   - 3. **【src/components/MouseTracker.tsx】**

 4. hook的逻辑复用
   - **【src/hooks/useMousePosition.tsx】**
 
 5. useRef
   - 1. 在任何一次渲染中,props 和 state 是保持不变的
	 - 2. props 和 state在不同的渲染中是相互独立的话，使用到他们的组件 状态事件也是独立的
	 - 3. useRef值变化，是不会触发render`const likeRef = useRef(0)` 取值`likeRef.current`, 可结合`useState`在`useEffect`里做判断
	 - 4. 访问dom节点
	 - 5. **【src/components/likeButton.tsx】**

 6. useContext
   - 1. 样式转换器demo
	 - 2. **【src/components/likeButton.tsx】**
	 - 3. **【src/App.tsx】**

 7. useReducer

 8. useCallback

##### 三、HOC -higher order component
 1. 高阶组件就是一个函数，接收一个组件作为参数，返回一个新的组件
 2. **【src/components/HOC_withLoader.tsx】**
 3. **【src/App_HOC.tsx】**

##### 四、自定义hook
 1. 约定`use`开头，方便查看
 2. **【src/hooks/useURLLoader.tsx'】**
 3. **【src/App_HOOK.tsx】**

