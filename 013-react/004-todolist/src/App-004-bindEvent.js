/*
* @Author: Chen
* @Date:   2019-11-28 19:10:50
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-28 20:39:29
*/
import React,{Component,Fragment} from 'react'
import './App.css'

class App extends Component{
	handelClick(){
		console.log(this)
		console.log('btn click')
	}
	render(){
		return (
			<div className='App'>
				<input />
				<button className='btn' onClick={this.handelClick.bind(this)}>提交</button>
				<ul className='list'>
					<li>吃饭</li>
					<li>睡觉</li>
					<li>敲代码</li>
				</ul>
			</div>	
		)
	}
}


export default App