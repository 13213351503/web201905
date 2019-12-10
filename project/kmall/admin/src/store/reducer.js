/*
* @Author: Chen
* @Date:   2019-12-01 17:24:50
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-10 19:58:16
*/
// import { combineReducers } from 'redux'
import {combineReducers} from 'redux-immutable'
import {reducer as loginReducer} from 'pages/login/store'
import {reducer as homeReducer} from 'pages/home/store'
import {reducer as userReducer} from 'pages/user/store'

export default combineReducers({
	login:loginReducer,
	home:homeReducer,
	user:userReducer,
})