/*
* @Author: Chen
* @Date:   2019-12-05 15:11:29
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-10 20:28:37
*/
import { fromJS } from 'immutable'
const defaultState = fromJS({
	list:[],
	usernum:0,
	ordernum:0,
	productnum:0
})
import * as types from './actionTypes.js'

export default (state=defaultState,action)=>{
	if(action.type == types.SET_PAGE){
		return state.set('list',fromJS(action.payload.list))
	}
	return state
}