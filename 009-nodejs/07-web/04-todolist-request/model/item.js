/*
* @Author: Chen
* @Date:   2019-11-03 11:09:36
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-03 16:07:51
*/
const fs = require('fs')
const path = require('path')
const util = require('util')

const filepath = path.normalize(__dirname+'/../data/item.json')

//异步处理获取数据
const readFile = util.promisify(fs.readFile)
//异步处理添加数据
const writeFile = util.promisify(fs.writeFile)

async function get(){
	//1.读取文件数据
	const data = await readFile(filepath,{flag:'r',encoding:'utf-8'})
	//2.返回数据
	// console.log(data)
	const arr = JSON.parse(data)
	return arr
}


async function add(task){
	//1.读取文件获取数据
	const data = await readFile(filepath,{flag:'r',encoding:'utf-8'})
	//2.将字符串数据转化成数组
	const arr = JSON.parse(data)
	//3.生成任务对象并将其添加到数组中(时间托)
	const obj = {
		id:Date.now().toString(),
		task:task
	}
	arr.push(obj)
	//4.将更新的数组转化为字符串覆盖写入到文件中
	await writeFile(filepath,JSON.stringify(arr))
	//5.返回任务对象
	return obj
}
module.exports = {
	get,
	add
}