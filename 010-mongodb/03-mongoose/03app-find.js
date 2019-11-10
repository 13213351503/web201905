/*
* @Author: Chen
* @Date:   2019-11-08 19:36:14
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-08 20:53:51
*/
const mongoose = require('mongoose')
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
  	//1.定义文档模型
  	const UserSchema = new mongoose.Schema({
	  	name: String,
	  	age:Number,
	  	major:String
	})
	//2.根据文档模型生成对应模型(集合)
	//2.1第一个参数就是需要生成的集合名称,mongoose子自动将集合名称转化为复数
	//2.2第二个参数就是前面定义的文档模型
	const UserModel = mongoose.model('user', UserSchema)
	//3.根据模型进行数据库操作:CRUD
	//3.1新增
	/*
	UserModel.find({age:{$lt:30}},'name age -_id',(err,docs)=>{
		if(err){
			console.log(err.message)
		}else{
			console.log(docs)
		}
	})
	*/
	/*
	UserModel.find({age:{$lt:30}},null,{limit:2},(err,docs)=>{
		if(err){
			console.log(err.message)
		}else{
			console.log(docs)
		}
	})
	

	UserModel.findById('5dc5644e8794d338fc8b3f63',(err,docs)=>{
		if(err){
			console.log(err.message)
		}else{
			console.log(docs)
		}
	})
	*/

	UserModel.findOne({age:{$lt:30}},(err,docs)=>{
		if(err){
			console.log(err.message)
		}else{
			console.log(docs)
		}
	})
})