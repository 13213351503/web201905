/*
* @Author: Chen
* @Date:   2019-11-11 18:50:46
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-11 18:58:23
*/
const express = require('express')
const app = express()

//处理静态资源
// app.use(express.static('public'))

app.use('/static', express.static('public'))

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(3000, () => console.log('Example app listening on port 3000!'))