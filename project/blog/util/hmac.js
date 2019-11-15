/*
* @Author: Chen
* @Date:   2019-11-14 20:06:31
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-15 18:34:37
*/
const crypto = require('crypto')

module.exports = (str)=>{
	const hmac = crypto.createHmac('sha512','safhasfhaslfalskffashfjkasf')
	//加密数据
	hmac.update(str)
	//生成加密后的数据
	return hmac.digest('hex')
}