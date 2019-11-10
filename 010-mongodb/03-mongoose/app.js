/*
* @Author: Chen
* @Date:   2019-11-08 19:36:14
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-08 20:07:14
*/
const mongoose = require('mongoose')
//链接数据库
// mongoose.connect('mongodb://localhost/kuazhu', {useNewUrlParser: true})
mongoose.connect('mongodb://localhost/kuazhu', { useUnifiedTopology: true,useNewUrlParser: true })

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
	const user = new UserModel({name:"Tom",age:18,major:"Computer"})
	user.save((err,docs)=>{
		if(err){
			console.log("insert err::",err.message)
		}else{
			console.log('insert success::',docs)
		}
	})
	*/

	//3.2查找
	/*
	UserModel.findOne({name:"Tom"},(err,docs)=>{
		if(err){
			console.log("find err::",err.message)
		}else{
			console.log('find success::',docs)
		}
	})
	*/

	//3.3更新
	/*
	UserModel.updateOne({name:"Tom"},{$set:{age:100}},(err,docs)=>{
		if(err){
			console.log("updateOne err::",err.message)
		}else{
			console.log('updateOne success::',docs)
		}
	})
	*/

	//3.4删除
	UserModel.deleteOne({name:"Tom"},(err,docs)=>{
		if(err){
			console.log("deleteOne err::",err.message)
		}else{
			console.log('deleteOne success::',docs)
		}
	})

})