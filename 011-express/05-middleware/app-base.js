/*
* @Author: Chen
* @Date:   2019-11-11 20:44:25
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-12 18:16:06
*/
const express = require('express')
const app = express()

//处理静态资源
app.use(express.static('public'))

app.use('/',(req,res,next)=>{
	console.log('do something for TaskA')
	next()
})
app.use('/',(req,res,next)=>{
	console.log('do something for TaskB')
	next()
})

app.get('/', (req, res) => res.send('get  response'))
app.post('/',(req, res) => res.send('post  response'))
app.put('/',(req, res) => res.send('put  response'))
app.delete('/',(req, res) => res.send('delete  response'))



app.listen(3000, () => console.log('Example app listening on port 3000!'))