/*
* @Author: Chen
* @Date:   2019-11-12 20:46:50
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-17 16:11:03
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

	if(isNaN(page)){
		page = 1
	}
	//上一页边界控制
	if(page == 0){
		page = 1
	}

	UserModel.countDocuments((err,count)=>{
		// console.log(count)
		const pages = Math.ceil(count / limit)
		//下一页边界控制
		if(page > pages){
			page = pages
		}
		//由于swig无法对数字进行循环遍历,因此需要在后台生成页码
		let list = []
		for(let i = 1;i<=pages;i++){
			list.push(i)
		}
		let skip = (page-1)*limit
		UserModel.find({},'-password -__v')
		.sort({_id:-1})
		.skip(skip)
		.limit(limit)
		.then(users=>{
			res.render('admin/user_list',{
				userInfo:req.userInfo,
				users:users,
				page:page,
				list:list,
				pages:pages
			})
		})
		.catch(err=>{
			console.log(err)
		})
	})
	
	
})



module.exports = router