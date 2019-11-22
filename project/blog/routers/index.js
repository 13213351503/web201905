/*
* @Author: Chen
* @Date:   2019-11-12 20:46:50
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-22 20:55:51
*/
const express = require('express')
const router = express.Router()
const CategoryModel = require('../models/category.js')
const ArticleModel = require('../models/article.js')

//获取共通数据函数
async function getCommonData(){
	//获取顶部导航分类列表
	const getCategoriesDataPromise = CategoryModel.find({},'name').sort({order:1})

	//获取点击排行榜文章数据
	const getTopArticlesDataPromise = ArticleModel.find({},'title click').sort({click:-1}).limit(10)

	const categories = await getCategoriesDataPromise
	const topArticles = await getTopArticlesDataPromise

	return {
		categories,
		topArticles
	}
}




//显示首页
router.get('/', (req, res) => {
	//获取cookie信息并返回给模板
	// console.log(req.cookies.get('userInfo'))
	/*
	let userInfo = {}
	if(req.cookies.get('userInfo')){
		userInfo = JSON.parse(req.cookies.get('userInfo'))
	}
	*/
	ArticleModel.getPaginationData(req)
	.then(result=>{
		getCommonData()
		.then(data=>{
			const { categories,topArticles } = data
			res.render('main/index',{
				userInfo:req.userInfo,
				categories,
				topArticles,
				//返回分页数据
				articles:result.docs,
				page:result.page,
				list:result.list,
				pages:result.pages,
				url:'/'
			})
		})
	})
})


//显示列表页
router.get('/list/:id', (req, res) => {
	const id = req.params.id
	ArticleModel.getPaginationData(req,{category:id})
	.then(result=>{
		getCommonData()
		.then(data=>{
			const { categories,topArticles } = data
			res.render('main/list',{
				userInfo:req.userInfo,
				categories,
				topArticles,
				//返回分页数据
				articles:result.docs,
				page:result.page,
				list:result.list,
				pages:result.pages,
				//分类id回传
				currentCategoryId:id
			})
		})
	})
})

//获取详情页数据
async function getArticleData(req){
	const id = req.params.id

	const getCommonDataPromise = getCommonData()
	//获取详情页具体文章
	const getArticleDataPromise = ArticleModel.findOneAndUpdate({_id:id},{$inc:{click:1}},{new:true})
								  .populate({ path: 'user', select: 'username'})
								  .populate({ path: 'category', select: 'name'})
	//为了保证点击排行榜点击量数据和详情点击量一致,
	//必须先获取详情文章信息再获取点击排行信息
	const articleData = await getArticleDataPromise
	const commonData = await getCommonDataPromise

	const { categories,topArticles } = commonData

	return {
		categories,
		topArticles,
		articleData
	}
}
//显示详情页
router.get('/detail/:id', (req, res) => {
	getArticleData(req)
	.then(data=>{
		const { categories,topArticles,articleData } = data
		res.render('main/detail',{
			userInfo:req.userInfo,
			categories,
			topArticles,
			articleData,
			//分类id回传
			currentCategoryId:articleData.category._id.toString()
		})
	})
	
})


//处理首页文章分页ajax
router.get('/articles',(req,res)=>{
	const id = req.query.id
	let query = {}
	if(id){
		query.category = id
	}
	ArticleModel.getPaginationData(req,query)
	.then(result=>{
		res.json({
			code:0,
			message:'获取文章成功',
			data:result
		})
	})
	.catch(err=>{
		console.log(err)
		res.json({
			code:10,
			message:'获取文章失败'
		})
	})
})

module.exports = router