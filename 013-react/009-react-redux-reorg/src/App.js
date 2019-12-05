/*
* @Author: Chen
* @Date:   2019-11-28 19:10:50
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-03 17:43:28
*/
import React,{Component} from 'react'
import './App.css'

import TodoList from './pages/todolist/index.js'


class App extends Component{
	render(){
		return(
			<TodoList />
		)
	}
}



export default App