/*
* @Author: Chen
* @Date:   2019-11-12 20:46:50
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-17 16:29:43
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

//显示分类列表首页
router.get('/', (req, res) => {
	res.render('admin/category_list',{
		userInfo:req.userInfo
	})
})




module.exports = router