/*
* @Author: Chen
* @Date:   2019-11-10 17:50:32
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-10 17:54:05
*/
const express = require('express')
const app = express()
// get => 127.0.0.1:3000/
app.get('/', (req, res) => res.send('Hello World!'))

app.listen(3000, () => console.log('Example app listening on port 3000!'))