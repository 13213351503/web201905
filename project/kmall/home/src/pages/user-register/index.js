/*
* @Author: Chen
* @Date:   2019-12-17 18:15:41
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-24 19:39:59
*/
require('pages/common/logo')
require('pages/common/footer')
require('./index.css')

var _util = require('util')
var api = require('api')

var formErr ={
	show:function(msg){
		$('.error-item').show()
		$('.error-item')
		.find('.error-msg')
		.text(msg)
	},
	hide:function(){
		$('.error-item').hide()
		$('.error-item')
		.find('.error-msg')
		.text('')
	}
}

var page = {
	init:function(){
		this.bindEvent()
	},
	bindEvent:function(){
		var _this = this
		$('#btn-submit').on('click',function(){
			_this.submit()
		})
		//监听键盘事件,回车键提交数据
		$('input').on('keyup',function(ev){
			if(ev.keyCode == 13){
				_this.submit()
			}
		})
		//监听用户名失去焦点判断用户名是否存在
		$('[name="username"]').on('blur',function(){
			var username = $.trim($(this).val())
			//如果没有输入用户名或者用户名验证不合法则不需要向后台发送请求
			if(!_util.validate(username,'required')){
				return 
			}
			if(!_util.validate(username,'username')){
				return 
			}
			api.checkUsername({
				data:{
					username:username
				},
				success:function(data){
					formErr.hide()
				},
				error:function(msg){
					formErr.show(msg)
				}
			})
		})
	},
	submit:function(){
		//1.获取表单数据
		var formData = {
			username:$.trim($('[name="username"]').val()),
			password:$.trim($('[name="password"]').val()),
			repassword:$.trim($('[name="repassword"]').val()),
			phone:$.trim($('[name="phone"]').val()),
			email:$.trim($('[name="email"]').val()),
		}
		//2.验证数据合法性
		var formDataValidate = this.validate(formData)
		//3.验证通过,发送ajax请求
		if(formDataValidate.status){
			formErr.hide()
			//发送ajax请求
			api.register({
				data:formData,
				success:function(data){
					// window.location.href = '/result.html?type=register'
					_util.goResult('register')
				},
				error:function(msg){
					formErr.show(msg)
				}
			})

		}else{//验证不通过,错误提示
			formErr.show(formDataValidate.msg)
		}
	},
	validate:function(formData){
		var result ={
			status:false,
			msg:''
		}
		//验证
		//用户名不能为空
		if(!_util.validate(formData.username,'required')){
			result.msg = '用户名不能为空'
			return result
		}
		//验证用户名格式
		if(!_util.validate(formData.username,'username')){
			result.msg = '用户名格式不正确'
			return result
		}
		//密码不能为空
		if(!_util.validate(formData.password,'required')){
			result.msg = '密码不能为空'
			return result
		}
		//验证密码格式
		if(!_util.validate(formData.password,'password')){
			result.msg = '密码格式不正确'
			return result
		}
		//验证两次输入密码
		if(formData.password != formData.repassword){
			result.msg = '两次输入密码不一致'
			return result
		}
		//手机号不能为空
		if(!_util.validate(formData.phone,'required')){
			result.msg = '手机号不能为空'
			return result
		}
		//验证手机号格式
		if(!_util.validate(formData.phone,'phone')){
			result.msg = '手机号格式不正确'
			return result
		}
		//邮箱不能为空
		if(!_util.validate(formData.email,'required')){
			result.msg = '邮箱不能为空'
			return result
		}
		//验证手机号格式
		if(!_util.validate(formData.email,'email')){
			result.msg = '邮箱格式不正确'
			return result
		}
		result.status = true
		return result
	}
}

$(function(){
	page.init()
})