/*
* @Author: Chen
* @Date:   2019-11-28 19:10:50
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-03 17:30:48
*/
import React,{Component} from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import './App.css'
import { Input,Button,Row,Col,List   } from 'antd'

import {
	getChangeItemAction,
	getAddItemAction,
	getDeleteItemAction,
	getRequestLoadDataAction
} from './store/actionCreator.js'


//容器组件
class App extends Component{
	componentDidMount(){
		//发送ajax
		this.props.handleInit()
	}
	render(){
		const { list,task,handleInput,handelAdd,handleDel }= this.props
		return(
			<div className='App'>
				<Row>
					<Col span={18}>
						<Input 
							onChange={handleInput}
							value={task}
						/>
					</Col>
					<Col span={6}>
						<Button 
							type="primary"
							onClick={handelAdd}
						>
							提交
						</Button>
					</Col>
				</Row>
				<List
					style={{marginTop:15}}
			      	bordered
			      	dataSource={list}
			      	renderItem={(item,index) => (
				        <List.Item onClick={()=>{handleDel(index)}}>
				          {item}
				        </List.Item>
			      	)}
			    />
			</div>	
		)
	}
}




//将属性映射到组件中
const mapStateToProps = (state)=>{
	console.log(state)
	return {
		list:state.list,
		task:state.task
	}
}
//将方法映射到组件
const mapDispatchToProps = (dispatch)=>{
	return {
		handleInput:(ev)=>{
			const val = ev.target.value
			dispatch(getChangeItemAction(val))
		},
		handelAdd:()=>{
			dispatch(getAddItemAction())
		},
		handleDel:(index)=>{
			dispatch(getDeleteItemAction(index))
		},
		handleInit:()=>{
			dispatch(getRequestLoadDataAction())
		}
	}
}


export default connect(mapStateToProps,mapDispatchToProps)(App)