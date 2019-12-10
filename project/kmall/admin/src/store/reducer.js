/*
* @Author: Chen
* @Date:   2019-12-01 17:24:50
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-08 15:30:29
*/
// import { combineReducers } from 'redux'
import {combineReducers} from 'redux-immutable'
import {reducer as loginReducer} from 'pages/login/store'
import {reducer as homeReducer} from 'pages/home/store'

export default combineReducers({
	login:loginReducer,
	home:homeReducer
})