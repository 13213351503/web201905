/*
* @Author: Chen
* @Date:   2019-11-12 20:46:50
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-19 19:19:10
*/
const express = require('express')
const router = express.Router()
const CategoryModel = require('../models/category.js')
const ArticleModel = require('../models/article.js')
const pagination = require('../util/pagination.js')


//权限验证
router.use((req,res,next)=>{
	if(req.userInfo.isAdmin){
		next()
	}else{
		res.send('<h1>请使用管理员账号登录!!</h1>')
	}
})

//显示文章列表首页
router.get('/', (req, res) => {
	const options = {
		page:req.query.page / 1,
		model:ArticleModel,
		query:{},
		projection:'-__v',
		sort:{_id:1}
	}
	pagination(options)
	.then(result=>{
		res.render('admin/article_list',{
			userInfo:req.userInfo,
			articles:result.docs,
			page:result.page,
			list:result.list,
			pages:result.pages,
			url:'/article'
		})
	})
	.catch(err=>{
		console.log(err)
	})
})

//显示新增文章首页
router.get('/add', (req, res) => {
	//首先获取所有的分类名称传递给模板
	CategoryModel.find({},'name')
	.then(categories=>{
		res.render('admin/article_add',{
			userInfo:req.userInfo,
			categories
		})
	})
	.catch(err=>{
		res.render('admin/err',{
			userInfo:req.userInfo,
			message:'数据库操作错误,请稍后再试!!!'
		})
	})
})


//处理新增文章
router.post('/add',(req,res)=>{
	//1. 获取参数
	let { category,title,intro,content } = req.body
	
	//2. 将文章插入到数据库
	ArticleModel.insertMany({
		category,
		title,
		intro,
		content,
		user:req.userInfo._id
	})
	.then(result=>{
		res.render('admin/ok',{
			userInfo:req.userInfo,
			message:'新增文章成功',
			url:'/article'
		})
	})
	.catch(err=>{
		console.log(err)
		res.render('admin/err',{
			userInfo:req.userInfo,
			message:'数据库操作失败,请稍后再试!!!',
			url:'/article'
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


//处理删除分类
router.get('/delete/:id',(req,res)=>{
	const id = req.params.id
	//通过ID在数据库中查找该条数据并数据
	CategoryModel.deleteOne({_id:id})
	.then(category=>{
		res.render('admin/ok',{
			userInfo:req.userInfo,
			message:'删除分类成功',
			url:'/category'
		})
	})
	.catch(err=>{
		res.render('admin/err',{
			userInfo:req.userInfo,
			message:'数据库操作失败,请稍后再试!!!',
			url:'/category'
		})
	})
})



module.exports = router