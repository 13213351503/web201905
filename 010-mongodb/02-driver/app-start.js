/*
* @Author: Chen
* @Date:   2019-11-08 18:46:44
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-08 18:52:33
*/
//引入数据库
const MongoClient = require('mongodb').MongoClient
const uri = "mongodb://127.0.0.1:27017"


const client = new MongoClient(uri, { useUnifiedTopology: true })
//链接数据库
client.connect(err => {
	if(err){
	 	console.log('connect db error')
	 	throw err
	}
	console.log('connect db success')

  	client.close();
})