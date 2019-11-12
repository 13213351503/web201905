/*
* @Author: Chen
* @Date:   2019-11-11 19:12:42
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-11 20:30:45
*/
const express = require('express')
const app = express()

//处理静态资源
app.use(express.static('public'))

app.all('/',(req,res,next)=>{
	console.log('always do something ...')
	next()
})


app.get('/', (req, res) => {
	// res.end('hello world')
	// res.end('<h1>hello world</h1>')
	// res.end('{name:"Tom"}')

	/*
	res.json({
		name:"Tom"
	})
	
	res.json('hello world')
	
	res.json('<h1>hello world</h1>')
	*/

	// res.send('hello world')
	// res.send('<h1>hello world</h1>')
	res.send({
		name:"Tom"
	})
})


app.listen(3000, () => console.log('Example app listening on port 3000!'))