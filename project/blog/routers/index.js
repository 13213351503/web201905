/*
* @Author: Chen
* @Date:   2019-11-12 20:46:50
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-15 19:31:55
*/
const express = require('express')
const router = express.Router()

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

	res.render('main/index',{
		userInfo:req.userInfo
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