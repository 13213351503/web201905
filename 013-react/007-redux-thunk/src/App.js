/*
* @Author: Chen
* @Date:   2019-11-28 19:10:50
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-03 15:39:41
*/
import React,{Component} from 'react'
import store from './store/index.js'
import AppUI from './AppUI.js'
import axios from 'axios'

import {
	getChangeItemAction,
	getAddItemAction,
	getDeleteItemAction,
	getRequestLoadDataAction
} from './store/actionCreator.js'


//容器组件
class App extends Component{
	constructor(props){
		super(props)
		//初始化state
		this.handleInput = this.handleInput.bind(this)
		this.handelAdd = this.handelAdd.bind(this)
		this.handleDel = this.handleDel.bind(this)

		this.state = store.getState()
		store.subscribe(()=>{
			this.setState(store.getState())
		})
	}
	componentDidMount(){
		//发送ajax
		store.dispatch(getRequestLoadDataAction())
	}
	handelAdd(){
		const list = [...this.state.list,this.state.task]
		//派发action
		store.dispatch(getAddItemAction())
	}
	handleInput(ev){
		const val = ev.target.value
		//派发action 
		store.dispatch(getChangeItemAction(val))
	}
	handleDel(index){
		store.dispatch(getDeleteItemAction(index))
	}
	render(){
		return (
			<AppUI 
				task = {this.state.task}
				list = {this.state.list}
				handleInput = {this.handleInput}
				handelAdd = {this.handelAdd}
				handleDel = {this.handleDel}
			/>
		)
	}
}


export default App