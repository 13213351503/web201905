/*
* @Author: Chen
* @Date:   2019-11-12 20:46:50
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-17 10:23:19
*/
const express = require('express')
const UserModel = require('../models/user.js')
const hmac = require('../util/hmac.js')



const router = express.Router()

//处理注册
router.post('/register', (req, res) => {
	//1. 获取参数信息
	const { username,password } = req.body
	//2. 查找数据库同名验证
	UserModel.findOne({username:username})
	.then(user=>{
		if(user){//该用户名已经存在不能插入数据
			res.json({
				code:10,
				message:'该用户名已经存在,请更换用户名'
			})
		}else{//该用户名可以插入
			UserModel.insertMany({
				username:username,
				password:hmac(password),
				// isAdmin:true
			})
			.then(result=>{
				res.json({
					code:0,
					message:'注册成功',
					user:result
				})
			})
			.catch(err=>{
				res.json({
					code:10,
					message:'数据库操作失败,请稍后再试'
				})
			})
		}
	})
	.catch(err=>{
		res.json({
			code:10,
			message:'数据库操作失败,请稍后再试'
		})
	})
	//3. 插入数据
})


//处理登录
router.post('/login', (req, res) => {
	//1. 获取参数信息
	const { username,password } = req.body
	//2. 查找数据库同名验证
	UserModel.findOne({username:username,password:hmac(password)},'-password')
	.then(user=>{
		if(user){//该用户名存在
			// 3.返回数据
			//设置cookie(同时可以设置过期时间)
			// req.cookies.set('userInfo',JSON.stringify(user),{maxAge:1000*60*60*24})
   
			req.session.userInfo = user
			res.json({
				code:0,
				message:'登录成功',
				user:user
			})
		}else{//该用户名不存在
			res.json({
				code:10,
				message:'用户名或密码不正确'
			})
		}
	})
	.catch(err=>{
		res.json({
			code:10,
			message:'数据库操作失败,请稍后再试'
		})
	})
})

//处理退出
router.get('/logout',(req,res)=>{
	//清除cookie
	// req.cookies.set('userInfo',null)
	req.session.destroy()
	res.json({
		code:0,
		message:'退出成功'
	})
})


module.exports = router