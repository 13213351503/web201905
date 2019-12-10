/*
* @Author: Chen
* @Date:   2019-12-05 15:11:29
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-08 17:51:14
*/
import { fromJS } from 'immutable'
const defaultState = fromJS({
	usernum:0,
	ordernum:0,
	productnum:0
})
import * as types from './actionTypes.js'

export default (state=defaultState,action)=>{
	
	return state
}