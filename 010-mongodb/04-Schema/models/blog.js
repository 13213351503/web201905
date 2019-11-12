/*
* @Author: Chen
* @Date:   2019-11-10 11:24:41
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-10 17:27:33
*/
const mongoose = require('mongoose')


//1.定义文档模型
	const BlogSchema = new mongoose.Schema({
	  	title:{
	  		type:String
	  	},
	  	content:{
	  		type:String
	  	},
	  	author:{
	  		type:mongoose.Schema.Types.ObjectId,
	  		ref:'user'
	  	}
	})


	//定义静态方法
	BlogSchema.statics.findBlogs = function(query){
		// console.log(query)
		return this.findOne(query).populate("author",'name age')
	}




//2.根据文档模型生成对应模型(集合)
//2.1第一个参数就是需要生成的集合名称,mongoose子自动将集合名称转化为复数
//2.2第二个参数就是前面定义的文档模型
const BlogModel = mongoose.model('blog', BlogSchema)


module.exports = BlogModel