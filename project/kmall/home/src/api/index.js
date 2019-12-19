/*
* @Author: Chen
* @Date:   2019-12-19 19:39:18
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-19 20:29:42
*/
var { API_CONFIG } = require('./config.js')
var _util = require('util')

const getApiObj = (API_CONFIG)=>{
	const apiObj = {}
	for(let key in API_CONFIG){
		apiObj[key] = (options)=>{
			let url = API_CONFIG[key][0] || '/'
			let method = API_CONFIG[key][1] || 'get'
			//发送请求
			return request({
				url:url,
				method:method,
				data:options.data,
				success:options.success,
				error:options.error
			})
		}
	}
 
	return apiObj
}
const request = (options)=>{
	$.ajax({
		url:options.url,
		method:options.method,
		dataType:'json',
		data:options.data,
		success:function(result){
			if(result.code == 0){
				options.success && options.success(result.data)
			}else if(result.code == 1){
				options.error && options.error(result.message)
			}else if(result.code == 10){
				_util.goLogin()
			}
		},
		error:function(err){
			options.error && options.error('网络错误,请稍后再试')
		}
	})
}

module.exports = getApiObj(API_CONFIG)