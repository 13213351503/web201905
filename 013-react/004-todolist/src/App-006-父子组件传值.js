/*
* @Author: Chen
* @Date:   2019-11-28 19:10:50
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-29 19:50:42
*/
import React,{Component,Fragment} from 'react'
import './App.css'
import Item from './Item.js'

class App extends Component{
	constructor(props){
		super(props)
		//初始化state
		this.state = {
			list:['吃饭','睡觉','学习','敲代码'],
			task:''
		}

		this.handleInput = this.handleInput.bind(this)
		this.handelAdd = this.handelAdd.bind(this)
	}
	handelAdd(){
		const list = [...this.state.list,this.state.task]
		this.setState((preState)=>({
			list:list,
			task:''
		}))
	}
	handleInput(ev){
		const val = ev.target.value
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
		return (
			<div className='App'>
				<input onChange={this.handleInput} value={this.state.task} />
				<button className='btn' onClick={this.handelAdd.bind(this)}>提交</button>
				<ul className='list'>
					{	
						this.getItems()
					}
				</ul>
			</div>	
		)
	}
}


export default App