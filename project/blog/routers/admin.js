/*
* @Author: Chen
* @Date:   2019-11-12 20:46:50
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-17 15:19:21
*/
const express = require('express')
const router = express.Router()
const UserModel = require('../models/user.js')


//权限验证
router.use((req,res,next)=>{
	if(req.userInfo.isAdmin){
		next()
	}else{
		res.send('<h1>请使用管理员账号登录!!</h1>')
	}
})

//显示后台管理员首页
router.get('/', (req, res) => {
	res.render('admin/index',{
		userInfo:req.userInfo
	})
})
//显示用户列表
router.get('/users', (req, res) => {
	//获取用户信息渲染到模板

	/*分页
	前提条件:想要显示那一页必须知道页码,page有前台传入
	约定:每一页显示几条数据 limit = 2
	第1页: 显示1-2 	skip(1-1)*2 limit = 2
	第2页: 显示3-4	skip(2-1)*2 limit = 2
	第3页: 显示5-6	skip(3-1)*2 limit = 2
 	......
	第page页 显示    skip(page-1)*2 limit = 2


	*/
	const limit = 2
	let page = req.query.page / 1



	let skip = (page-1)*limit
	UserModel.find({})
	.skip(skip)
	.limit(limit)
	.then(users=>{
		res.render('admin/user_list',{
			userInfo:req.userInfo,
			users:users
		})
	})
	.catch(err=>{
		console.log(err)
	})
	
})



module.exports = router