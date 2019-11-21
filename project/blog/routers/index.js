/*
* @Author: Chen
* @Date:   2019-11-12 20:46:50
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-21 19:22:24
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

	getCommonData()
	.then(data=>{
		const { categories,topArticles } = data
		res.render('main/index',{
			userInfo:req.userInfo,
			categories,
			topArticles
		})
	})
	
})
//显示列表页
router.get('/list', (req, res) => {
	res.render('main/list',{
		userInfo:req.userInfo
	})
})
//显示详情页
router.get('/detail', (req, res) => {
	res.render('main/detail',{
		userInfo:req.userInfo
	})
})

module.exports = router