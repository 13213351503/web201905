/*
* @Author: Chen
* @Date:   2019-12-05 15:11:29
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-05 15:11:41
*/
const defaultState = {
	list:['吃饭','睡觉','学习'],
	task:''
}
import {
	CHANGE_ITEM,
	ADD_ITEM,
	DEL_ITEM,
	LOAD_DATA
} from './actionTypes.js'

export default (state=defaultState,action)=>{
	if(action.type == CHANGE_ITEM){
		const newState = JSON.parse(JSON.stringify(state))
		newState.task = action.payload

		return newState
	}
	if(action.type == ADD_ITEM){
		const newState = JSON.parse(JSON.stringify(state))
		newState.list.push(newState.task)
		newState.task = ''

		return newState
	}
	if(action.type == DEL_ITEM){
		const newState = JSON.parse(JSON.stringify(state))
		newState.list.splice(newState.payload,1)

		return newState
	}
	if(action.type == LOAD_DATA){
		const newState = JSON.parse(JSON.stringify(state))
		newState.list = action.payload
		return newState
	}
	return state
}