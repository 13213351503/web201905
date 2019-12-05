/*
* @Author: Chen
* @Date:   2019-12-02 16:52:50
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-03 15:40:47
*/
import axios from 'axios'
import {
	CHANGE_ITEM,
	ADD_ITEM,
	DEL_ITEM,
	LOAD_DATA
} from './actionTypes.js'

export const getChangeItemAction = (val)=>({
	type:CHANGE_ITEM,
	payload:val
})
export const getAddItemAction = ()=>({
	type:ADD_ITEM
})
export const getDeleteItemAction = (index)=>({
	type:DEL_ITEM,
	payload:index
})




const getLoadInitAction = (data) =>({
	type:LOAD_DATA,
	payload:data
})

export const getRequestLoadDataAction = ()=>{
	return (dispatch,getState)=>{
		axios.get('http://127.0.0.1:3000')
		.then(result=>{
			//派发action
			dispatch(getLoadInitAction(result.data))
		})
		.catch(err=>{
			console.log(err)
		})
	}
}
