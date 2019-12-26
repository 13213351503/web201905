/*
* @Author: Chen
* @Date:   2019-12-19 18:34:23
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-26 18:50:36
*/
var Hogan = require('hogan.js')
module.exports = {
	validate:function(value,type){
		//非空验证
		if(type == 'required'){
			return !!value
		}
		//验证用户名
		if(type == 'username'){
			return /^[a-z][a-z0-9_]{2,5}$/.test(value)
		}
		//验证密码
		if(type == 'password'){
			return /^\w{3,6}$/.test(value)
		}
		//验证手机号
		if(type == 'phone'){
			return /^1[35678]\d{9}$/.test(value)
		}
		//验证邮箱:110110@qq.com
		if(type == 'email'){
			return /^\w+@\w+\.\w{2,6}$/.test(value)
		}
	},
	showSuccessMsg:function(msg){
		alert(msg)
	},
	showErrMsg:function(msg){
		alert(msg)
	},
	goLogin:function(){
		window.location.href = '/user-login.html?redirect='+encodeURIComponent(window.location.href)
	},
	goResult:function(type){
		window.location.href = '/result.html?type='+type
	},
	showConfirm:function(msg){
		return window.confirm(msg)
	},
	getParamsFormUrl:function(key){
		var query = window.location.search.substr(1)
		//type=register
		//type=register&name=tom
		//name=tom&type=register
		//name=tom&type=register&age=18
		var reg = new RegExp('(^|&)'+key+'='+'([^&]*)($|&)')
		var result = query.match(reg)
		return result ? decodeURIComponent(result[2]) : null
	},
	render:function(tpl,data){
		var template = Hogan.compile(tpl);
		var html = template.render(data)
		return html
	}
}