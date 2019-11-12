/*
* @Author: Chen
* @Date:   2019-11-11 19:12:42
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-11 19:44:12
*/
const express = require('express')
const app = express()

//处理静态资源
app.use(express.static('public'))

app.all('/',(req,res,next)=>{
	console.log('always do something ...')
	next()
})


app.get('/', (req, res) => res.send('get data response'))
app.post('/',(req, res) => res.send('post data response'))
app.put('/',(req, res) => res.send('put data response'))
app.delete('/',(req, res) => res.send('delete data response'))

app.listen(3000, () => console.log('Example app listening on port 3000!'))