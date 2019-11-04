/*
* @Author: Chen
* @Date:   2019-11-04 20:32:49
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-04 20:44:20
*/
const crypto = require('crypto')

const hmac = crypto.createHmac('sha512','safhasfhaslfalskffashfjkasf')


//加密数据
hmac.update("12345")
//生成加密后的数据
console.log(hmac.digest('hex'))