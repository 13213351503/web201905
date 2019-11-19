/*
* @Author: Chen
* @Date:   2019-11-12 20:46:50
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-18 21:06:12
*/
const express = require('express')
const router = express.Router()
const CategoryModel = require('../models/category.js')
const pagination = require('../util/pagination.js')


//权限验证
router.use((req,res,next)=>{
	if(req.userInfo.isAdmin){
		next()
	}else{
		res.send('<h1>请使用管理员账号登录!!</h1>')
	}
})

//显示分类列表首页
router.get('/', (req, res) => {
	const options = {
		page:req.query.page / 1,
		model:CategoryModel,
		query:{},
		projection:'-__v',
		sort:{order:1}
	}
	pagination(options)
	.then(result=>{
		res.render('admin/category_list',{
			userInfo:req.userInfo,
			categories:result.docs,
			page:result.page,
			list:result.list,
			pages:result.pages,
			url:'/category'
		})
	})
	.catch(err=>{
		console.log(err)
	})
})
//显示新增分类首页
router.get('/add', (req, res) => {
	res.render('admin/category_add_edit',{
		userInfo:req.userInfo
	})
})
//处理新增分类
router.post('/add',(req,res)=>{
	//1. 获取参数
	let { name,order } = req.body
	if(!order){
		order = 0
	}
	//2. 查找数据库进行同名验证
	CategoryModel.findOne({name:name})
	.then(category=>{
		if(category){//该分类名称已经存在
			res.render('admin/err',{
				userInfo:req.userInfo,
				message:'该分类名称已经存在'
			})
		}else{//可以插入该分类名称
			//3. 插入数据
			CategoryModel.insertMany({name,order})
			.then(result=>{
				res.render('admin/ok',{
					userInfo:req.userInfo,
					message:'新增分类成功',
					url:'/category'
				})
			})
			.catch(err=>{
				console.log(err)
				res.render('admin/err',{
					userInfo:req.userInfo,
					message:'数据库操作失败,请稍后再试!!!'
				})
			})
		}
	})
	.catch(err=>{
		console.log(err)
		res.render('admin/err',{
			userInfo:req.userInfo,
			message:'数据库操作失败,请稍后再试!!!'
		})
	})
	
})


//显示编辑分类页面
router.get('/edit/:id', (req, res) => {
	const id = req.params.id
	//查找数据库获取对应分类
	CategoryModel.findById(id)
	.then(category=>{
		res.render('admin/category_add_edit',{
			userInfo:req.userInfo,
			category
		})
	})
	.catch(err=>{
		res.render('admin/err',{
			userInfo:req.userInfo,
			message:'数据库操作失败,请稍后再试!!!'
		})
	})
	
})
//处理编辑分类
router.post('/edit',(req,res)=>{
	//1.获取参数
	let { name,order,id } = req.body
	if(!order){
		order = 0
	}
	//2.根据ID获取该条数据
	CategoryModel.findById(id)
	.then(category=>{
		if(category.name == name && category.order == order){//数据没有更改
			res.render('admin/err',{
				userInfo:req.userInfo,
				message:'数据没有更改,请修改后在提交'
			})
		}else{//可以更改数据
			CategoryModel.findOne({name:name,_id:{$ne:id}})
			.then(category=>{
				if(category){//数据库中有该分类名称,不可同名
					res.render('admin/err',{
						userInfo:req.userInfo,
						message:'该分类名称已经存在,请换一个名称'
					})
				}else{//可以更新名称
					CategoryModel.updateOne({_id:id},{name,order})
					.then(data=>{
						res.render('admin/ok',{
							userInfo:req.userInfo,
							message:'更新分类成功',
							url:'/category'
						})
					})
					.catch(err=>{
						res.render('admin/err',{
							userInfo:req.userInfo,
							message:'数据库操作失败,请稍后再试!!!'
						})
					})
				}
			})
			.catch(err=>{
				res.render('admin/err',{
					userInfo:req.userInfo,
					message:'数据库操作失败,请稍后再试!!!'
				})
			})
		}
	})
	.catch(err=>{
		res.render('admin/err',{
			userInfo:req.userInfo,
			message:'数据库操作失败,请稍后再试!!!'
		})
	})
	//3.验证数据是否可以更新
})



module.exports = router