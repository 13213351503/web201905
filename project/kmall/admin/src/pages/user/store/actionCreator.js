/*
* @Author: Chen
* @Date:   2019-12-02 16:52:50
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-10 20:30:53
*/
import axios from 'axios'
import * as types from './actionTypes.js'
import api from 'api'


const getSetPageAction = (payload) =>({
	type:types.SET_PAGE,
	payload
})

export const getPageAction = (page)=>{
	return (dispatch,getState)=>{
		api.getUserList({
			page:page
		})
		.then(result=>{
			console.log(result)
			const data = result.data
			if(data.code == 0){
				dispatch(getSetPageAction(data.data))
			}
		})
		.catch(err=>{
			console.log(err)
		})
	}
}
