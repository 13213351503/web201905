/*
* @Author: Chen
* @Date:   2019-11-11 20:44:25
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-12 18:43:04
*/
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

//处理静态资源
app.use(express.static('public'))

//处理post请求的中间件配置
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.post('/',(req, res) => {
	/*
	let body = ''
	req.on('data',(chunk)=>{
		body+=chunk
	})
	req.on('end',()=>{
		console.log(body)
	})
	*/
	console.log(req.body)

	res.send('post  response')
})


app.listen(3000, () => console.log('Example app listening on port 3000!'))