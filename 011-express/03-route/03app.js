/*
* @Author: Chen
* @Date:   2019-11-11 19:12:42
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-11 20:10:46
*/
const express = require('express')
const app = express()

//处理静态资源
app.use(express.static('public'))

app.all('/',(req,res,next)=>{
	console.log('always do something ...')
	next()
})


// /users/123/books/456
// /users/userId/books/bookId
app.get('/users/:userId/books/:bookId',(req,res)=>{
	console.log(req.params)
	res.send('get data response')
})

// /?name=tom&age=18
app.get('/', (req, res) => {
	console.log(req.query)
	res.send('get data response')
})


app.listen(3000, () => console.log('Example app listening on port 3000!'))