/*
* @Author: Chen
* @Date:   2019-12-02 17:43:57
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-02 17:47:10
*/
const http = require('http')

const server = http.createServer((req,res)=>{
	res.setHeader('Access-Control-Allow-Origin',"*")
	res.end(JSON.stringify(['learn js','learn react','learn css']))
})

server.listen(3000,'127.0.0.1',()=>{
	console.log('server is running in http://127.0.0.1:3000')
})