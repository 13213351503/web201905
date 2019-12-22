/*
* @Author: Chen
* @Date:   2019-12-17 18:15:41
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-22 11:15:00
*/
var nav = require('pages/common/nav')
require('pages/common/search')
var _side = require('pages/common/side')
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
		this.renderSide()
		this.bindEvent()
	},
	renderSide:function(){
		_side.render('user-update-password')
	},
	bindEvent:function(){
		var _this = this
		$('#btn-submit').on('click',function(){
			_this.submit()
		})
		//监听键盘事件,回车键提交数据
		$('.side-content input').on('keyup',function(ev){
			if(ev.keyCode == 13){
				_this.submit()
			}
		})
	},
	submit:function(){
		//1.获取表单数据
		var formData = {
			password:$.trim($('[name="password"]').val()),
			repassword:$.trim($('[name="repassword"]').val()),
		}
		//2.验证数据合法性
		var formDataValidate = this.validate(formData)
		//3.验证通过,发送ajax请求
		if(formDataValidate.status){
			formErr.hide()
			//发送ajax请求
			api.updateUsers({
				data:{
					password:formData.password
				},
				success:function(data){
					window.location.href = '/result.html?type=updatePassword'
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
		
		result.status = true
		return result
	}
}

$(function(){
	page.init()
})