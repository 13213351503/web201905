/*
* @Author: Chen
* @Date:   2019-12-02 16:52:50
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-08 15:16:21
*/
import axios from 'axios'
import * as types from './actionTypes.js'
import { message } from 'antd'
import {saveUsername} from 'util'

const getLoginStartAction = () =>({
	type:types.LOGIN_REQUEST_START
})
const getLoginDoneAction = () =>({
	type:types.LOGIN_REQUEST_DONE
})

export const getLoginAction = (values)=>{
	return (dispatch,getState)=>{
		//发送请求前显示loading
		dispatch(getLoginStartAction())
		values.role = 'admin'
		axios({
			method:'post',
			url:'http://127.0.0.1:3000/sessions/users',
			data:values
		})
		.then(result=>{
			console.log(result)
			const data = result.data
			if(data.code == 0){//登录成功
				//1.将用户信息保存在前台
				saveUsername(data.data.username)
				//2.返回到后台首页
				window.location.href = '/'
			}else{//登录失败
				message.error(data.message)
			}
		})
		.catch(err=>{
			message.error('请求失败,请稍后再试!')
		})
		.finally(()=>{
			//请求完毕后loading取消
			dispatch(getLoginDoneAction())
		})
	}
}
