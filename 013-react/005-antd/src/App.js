/*
* @Author: Chen
* @Date:   2019-11-28 19:10:50
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-01 16:08:12
*/
import React,{Component,Fragment} from 'react'
import './App.css'
// import 'antd/dist/antd.css'
import Item from './Item.js'
import { Input,Button,Row,Col,List   } from 'antd'

class App extends Component{
	constructor(props){
		super(props)
		//初始化state
		this.state = {
			list:['吃饭','睡觉'],
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
	render(){
		return (
			<div className='App'>
				<Row>
					<Col span={18}>
						<Input 
							onChange={this.handleInput}
							value={this.state.task}
						/>
					</Col>
					<Col span={6}>
						<Button 
							type="primary"
							onClick={this.handelAdd}
						>
							提交
						</Button>
					</Col>
				</Row>
				<List
					style={{marginTop:15}}
			      	bordered
			      	dataSource={this.state.list}
			      	renderItem={(item,index) => (
				        <List.Item onClick={this.handleDel.bind(this,index)}>
				          {item}
				        </List.Item>
			      	)}
			    />
			</div>	
		)
	}
}


export default App