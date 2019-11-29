/*
* @Author: Chen
* @Date:   2019-11-28 19:10:50
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-29 18:37:30
*/
import React,{Component,Fragment} from 'react'
import './App.css'

class App extends Component{
	constructor(props){
		super(props)
		//初始化state
		this.state = {
			list:['吃饭','睡觉','学习','敲代码'],
			task:''
		}
	}
	handelAdd(){
		/*
		console.log(this)
		console.log('btn click')
		console.log(this.state)
		this.state.list.push(this.state.task)
		console.log(this.state)
		*/
		// console.log(this.state)
		const list = [...this.state.list,this.state.task]
		this.setState((preState)=>({
			list:list,
			task:''
		}))
	}
	handleInput(ev){
		/*
		console.log(ev.target.value)
		console.log(this.state)
		this.state.task = ev.target.value
		console.log(this.state)
		*/
		/*
		this.setState({
			task:ev.target.value
		})
		*/
		const val = ev.target.value
		this.setState((preState)=>({
			task:val
		}))
	}
	handleDel(index){
		// console.log(index)
		const list = [...this.state.list]
		list.splice(index,1)
		/*
		this.setState({
			list:list
		})
		*/
		this.setState((preState)=>({
			list:list
		}))
	}
	render(){
		return (
			<div className='App'>
				<input onChange={this.handleInput.bind(this)} value={this.state.task} />
				<button className='btn' onClick={this.handelAdd.bind(this)}>提交</button>
				<ul className='list'>
					{	
						this.state.list.map((item,index)=>{
							return (
								<li 
									key={index}
									onClick={this.handleDel.bind(this,index)}
								>
									{item}
								</li>
							)
						})
					}
				</ul>
			</div>	
		)
	}
}


export default App