/*
* @Author: Chen
* @Date:   2019-11-10 11:24:19
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-10 15:10:30
*/
const mongoose = require('mongoose')
const moment = require('moment')
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
	BlogModel.insertMany({
		title:"test 1",
		content:"blog for test 1",
		author:"5dc78455589522377c39008b"
	})
	.then(data=>{
		console.log(data)
	})
	.catch(err=>{
		console.log(err.message)
	})
	
	/*
	BlogModel.findOne({_id:"5dc785c36bb98525883d8485"})
	.then(data=>{
		// console.log(data)
		// console.log(data.createAt.toLocaleString())
		console.log(moment(data.createAt).format('YYYY - MM - DD HH:mm:ss'))
	})
	.catch(err=>{
		console.log(err.message)
	})
	*/

	
})