/*
* @Author: Chen
* @Date:   2019-11-12 20:46:50
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-19 20:55:08
*/
const express = require('express')
const router = express.Router()
const CategoryModel = require('../models/category.js')
const ArticleModel = require('../models/article.js')
const pagination = require('../util/pagination.js')

const multer  = require('multer')
//dest表示将图片等资源存在后台对应文件夹下面
const upload = multer({ dest: 'public/uploads/'})


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
		res.render('admin/article_add_edit',{
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
//处理上传图片资源
//upload.single('upload')
//upload表示的是前台传递图片资源的字段名称
router.post('/uploadImg',upload.single('upload'),(req,res)=>{
	// console.log(req.file)
	const filePath = '/uploads/'+req.file.filename
	res.json({
		uploaded:true,
		url:filePath
	})
})


//显示编辑文章页面
router.get('/edit/:id', (req, res) => {
	const id = req.params.id
	//查找数据库获取对应分类
	CategoryModel.find({})
	.then(categories=>{
		ArticleModel.findById(id)
		.then(article=>{
			res.render('admin/article_add_edit',{
				userInfo:req.userInfo,
				categories,
				article
			})
		})
	})
	.catch(err=>{
		res.render('admin/err',{
			userInfo:req.userInfo,
			message:'数据库操作失败,请稍后再试!!!'
		})
	})
})

//处理编辑文章
router.post('/edit',(req,res)=>{
	//1.获取参数
	let { category,title,intro,content,id } = req.body
	//2.根据ID获取该条数据
	ArticleModel.updateOne({_id:id},{category,title,intro,content})
	.then(data=>{
		res.render('admin/ok',{
			userInfo:req.userInfo,
			message:'更新文章成功',
			url:'/article'
		})
	})
	.catch(err=>{
		res.render('admin/err',{
			userInfo:req.userInfo,
			message:'数据库操作失败,请稍后再试!!!'
		})
	})
})


//处理删除文章
router.get('/delete/:id',(req,res)=>{
	const id = req.params.id
	//通过ID在数据库中查找该条数据并数据
	ArticleModel.deleteOne({_id:id})
	.then(category=>{
		res.render('admin/ok',{
			userInfo:req.userInfo,
			message:'删除文章成功',
			url:'/article'
		})
	})
	.catch(err=>{
		res.render('admin/err',{
			userInfo:req.userInfo,
			message:'数据库操作失败,请稍后再试!!!',
			url:'/article'
		})
	})
})



module.exports = router