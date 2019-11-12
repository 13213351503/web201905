/*
* @Author: Chen
* @Date:   2019-11-11 20:50:01
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-11 20:51:41
*/
const express = require('express')
const router = express.Router()


router.get('/', (req, res) => res.send('get user response'))
router.post('/',(req, res) => res.send('post user response'))
router.put('/',(req, res) => res.send('put user response'))
router.delete('/',(req, res) => res.send('delete user response'))

module.exports = router