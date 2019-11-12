/*
* @Author: Chen
* @Date:   2019-11-10 11:24:19
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-10 17:26:16
*/
const mongoose = require('mongoose')
const moment = require('moment')
const UserModel = require('./models/user.js')
const BlogModel = require('./models/blog.js')
//链接数据库
// mongoose.connect('mongodb://localhost/kuazhu', {useNewUrlParser: true})
mongoose.connect('mongodb://localhost/kuazhu', { useUnifiedTopology: true,useNewUrlParser: true })

let getRandom = (min,max)=>{
	return Math.round(min+Math.random()*(max-min))
}
const names = ["Tom","Leo","Peter","Jane","Alice","Json","Bobi"]
const majors = ["Sport","Music","Computer","Art","Elec"]

let getNames = ()=>names[getRandom(0,names.length-1)]
let getMajors = ()=>majors[getRandom(0,majors.length-1)]





const db = mongoose.connection
db.on('error',(err)=>{
	console.log('connect db err ...')
	throw err
})
db.once('open', function() {
  	console.log('connect success !!!')
  	
	//3.根据模型进行数据库操作:CRUD
	//3.1新增
	//模拟数据
	//根据文章标题获取完成文章信息及用户信息
	/*
	BlogModel.findOne({title:"test 1"})
	.then(data=>{
		let result = {}
		// console.log(data)
		result.data = data
		UserModel.findById(data.author,(err,user)=>{
			if(err){
				console.log(err.message)
			}else{
				// console.log(user)
				result.user = user
				console.log(result)
			}
		})
	})	
	.catch(err=>{
		console.log(err.message)
	})
	*/


	/*
	BlogModel.findOne({title:"test 1"})
	.populate('author','name age -_id')
	.then(data=>{
		console.log(data)
	})
	.catch(err=>{
		console.log(err.message)
	})
	*/
	BlogModel.findBlogs({title:"test 1"})
	.then(data=>{
		console.log(data)
	})
	.catch(err=>{
		console.log(err.message)
	})
})