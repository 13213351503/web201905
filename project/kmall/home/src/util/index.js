/*
* @Author: Chen
* @Date:   2019-12-19 18:34:23
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-19 20:55:43
*/
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
			return /^\w+@$\w+\.\w{2,6}$/.test(value)
		}
	},
	showSuccessMsg:function(msg){
		alert(msg)
	},
	showErrMsg:function(msg){
		alert(msg)
	},
	goLogin:function(){
		window.location.href = '/user-login.html'
	}
}