/*
* @Author: Chen
* @Date:   2019-11-28 19:10:50
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-28 20:02:46
*/
import React,{Component,Fragment} from 'react'
import './App.css'

class App extends Component{
	render(){
		return (
			<div className='App'>
				{
					//<input style={{width:500}} /><button className='btn'>提交</button>
				}
				<input /><button className='btn'>提交</button>
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