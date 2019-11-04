/*
* @Author: Chen
* @Date:   2019-11-04 20:32:49
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-04 20:40:10
*/
const crypto = require('crypto')

//md5 =>不可逆
// const hash = crypto.createHash('md5')
// const hash = crypto.createHash('sha256')
const hash = crypto.createHash('sha512')

//加密数据
hash.update("12345")
//生成加密后的数据
console.log(hash.digest('hex'))