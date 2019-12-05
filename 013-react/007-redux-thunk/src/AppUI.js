/*
* @Author: Chen
* @Date:   2019-12-02 17:13:43
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-02 17:25:33
*/
import React,{Component} from 'react'
import './App.css'
import { Input,Button,Row,Col,List   } from 'antd'

//UI组件
/*
class AppUI extends Component{
	render(){
		return(
			<div className='App'>
				<Row>
					<Col span={18}>
						<Input 
							onChange={this.props.handleInput}
							value={this.props.task}
						/>
					</Col>
					<Col span={6}>
						<Button 
							type="primary"
							onClick={this.props.handelAdd}
						>
							提交
						</Button>
					</Col>
				</Row>
				<List
					style={{marginTop:15}}
			      	bordered
			      	dataSource={this.props.list}
			      	renderItem={(item,index) => (
				        <List.Item onClick={()=>{this.props.handleDel(index)}}>
				          {item}
				        </List.Item>
			      	)}
			    />
			</div>	
		)
	}
}
*/


//无状态组件
const AppUI = (props) =>{
	const { list,task,handleInput,handelAdd,handleDel }= props
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


export default AppUI