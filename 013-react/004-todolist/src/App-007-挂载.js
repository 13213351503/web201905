/*
* @Author: Chen
* @Date:   2019-11-28 19:10:50
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-01 11:26:30
*/
import React,{Component,Fragment} from 'react'
import './App.css'
import Item from './Item.js'

class App extends Component{
	constructor(props){
		console.log('App constructor')
		super(props)
		//初始化state
		this.state = {
			list:['吃饭','睡觉'],
			task:''
		}

		this.handleInput = this.handleInput.bind(this)
		this.handelAdd = this.handelAdd.bind(this)
	}
	static getDerivedStateFromProps(props, state){
		console.log('App getDerivedStateFromProps(props, state)',props, state)
		//返回的对象会state进行合并并返回最新的state
		/*state = {
			list:['吃饭','睡觉'],
			task:''
		}*/
		/*
		return {
			task:'aaa'
		}
		*/
		/*state ={
			list:['吃饭','睡觉'],
			task:'aaa'
		}*/
		return null
	}
	componentDidMount(){
		//当组件挂载完毕后再这个函数中发送ajax请求
		console.log('App componentDidMount()')
	}
	handelAdd(){
		const list = [...this.state.list,this.state.task]
		this.setState((preState)=>({
			list:list,
			task:''
		}),()=>{
			console.log(this.ul.childNodes)
		})
	}
	handleInput(ev){
		const val = this.input.value
		this.setState((preState)=>({
			task:val
		}))
	}
	handleDel(index){
		const list = [...this.state.list]
		list.splice(index,1)
		this.setState((preState)=>({
			list:list
		}))
	}
	getItems(){
		return this.state.list.map((item,index)=>{
			return (
				<Item 
					key={index} 
					task={item} 
					list={this.state.list} 
					index={index} 
					handleDel = {this.handleDel.bind(this,index)}
				/>
			)
		})
	}
	render(){
		console.log('App render')
		return (
			<div className='App'>
				<input ref={(input)=>{this.input = input}} onChange={this.handleInput} value={this.state.task} />
				<button className='btn' onClick={this.handelAdd.bind(this)}>提交</button>
				<ul className='list' ref={(ul)=>{this.ul = ul}}>
					{	
						this.getItems()
					}
				</ul>
			</div>	
		)
	}
}


export default App