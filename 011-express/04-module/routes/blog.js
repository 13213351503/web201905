/*
* @Author: Chen
* @Date:   2019-11-11 20:50:01
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-11 20:53:38
*/
const express = require('express')
const router = express.Router()


router.get('/', (req, res) => res.send('get blog response'))
router.post('/',(req, res) => res.send('post blog response'))
router.put('/',(req, res) => res.send('put blog response'))
router.delete('/',(req, res) => res.send('delete blog response'))

module.exports = router