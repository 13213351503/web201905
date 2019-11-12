/*
* @Author: Chen
* @Date:   2019-11-11 19:12:42
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-11 19:22:20
*/
const express = require('express')
const app = express()

//处理静态资源
app.use(express.static('public'))


app.get('/get', (req, res) => res.send('get data response'))
app.post('/post',(req, res) => res.send('post data response'))
app.put('/put',(req, res) => res.send('put data response'))
app.delete('/delete',(req, res) => res.send('delete data response'))

app.listen(3000, () => console.log('Example app listening on port 3000!'))