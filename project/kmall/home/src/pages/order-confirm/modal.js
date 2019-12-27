/*
* @Author: Chen
* @Date:   2019-12-27 18:30:59
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-27 20:24:32
*/
var api = require('api')
var _util = require('util')

var modalTpl = require('./modal.tpl')

var _city = require('util/city')

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

module.exports = {
	show:function(){
		this.$modalBox = $('.modal-box')
		//加载地址弹出层
		this.loadModal()
		//监听事件
		this.bindEvent()
		//加载省份
		this.loadProvinces()
	},
	loadProvinces:function(){
		//加载省份信息
		var provinces = _city.getProvinces()
		var provincesSelectOption = this.getSelectOptions(provinces)
		var provincesSelect = this.$modalBox.find('.province-select')
		provincesSelect.html(provincesSelectOption)
	},
	loadCities:function(province){
		//加载省份对应的城市信息
		var cities = _city.getCities(province)
		var citiesSelectOption = this.getSelectOptions(cities)
		var citiesSelect = this.$modalBox.find('.city-select')
		citiesSelect.html(citiesSelectOption)
	},
	getSelectOptions:function(arr){
		var html = '<option value="">请选择</option>'
		for(var i=0;i<arr.length;i++){
			html += '<option value="'+arr[i]+'">'+arr[i]+'</option>'
		}
		return html
	},
	loadModal:function(){
		var html = _util.render(modalTpl)
		this.$modalBox.html(html)
	},
	bindEvent:function(){
		var _this = this
		//1.点击关闭地址弹出层
		this.$modalBox.on('click','.close',function(){
			_this.hideModal()
		})
		//阻止事件冒泡防止用户点击表单时关闭弹出层
		this.$modalBox.on('click','.modal-container',function(ev){
			ev.stopPropagation()
		})
		//2.监听对应省份加载对应城市信息
		this.$modalBox.on('change','.province-select',function(){
			//获取当前省份信息
			var province = $(this).val()
			_this.loadCities(province)
		})
		//3.提交新增地址
		this.$modalBox.find('#btn-submit').on('click',function(){
			_this.submit()
		})
		//监听键盘事件,回车键提交数据
		this.$modalBox.find('input').on('keyup',function(ev){
			if(ev.keyCode == 13){
				_this.submit()
			}
		})
	},
	hideModal:function(){
		this.$modalBox.empty()
	},
	//提交表单逻辑
	submit:function(){
		var _this = this
		//1.获取表单数据
		var formData = {
			name:$.trim($('[name="name"]').val()),
			province:$.trim($('[name="province"]').val()),
			city:$.trim($('[name="city"]').val()),
			address:$.trim($('[name="address"]').val()),
			phone:$.trim($('[name="phone"]').val()),
			phone:$.trim($('[name="phone"]').val()),
			zip:$.trim($('[name="zip"]').val()),
		}
		//2.验证数据合法性
		var formDataValidate = this.validate(formData)
		//3.验证通过,发送ajax请求
		if(formDataValidate.status){
			formErr.hide()
			//发送ajax请求
			api.addShippings({
				data:formData,
				success:function(shippings){
					//新增地址成功后处理
					//1.关闭弹出层
					_this.hideModal()
					//2.通过自定义事件传递最新地址数据
					$('.shipping-box').trigger('get-shippings',[shippings])
					//3.成功提示信息
					_util.showSuccessMsg('新增地址成功')
				},
				error:function(msg){
					_util.showErrMsg('新增地址失败,请稍后再试!')
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
		if(!_util.validate(formData.name,'required')){
			result.msg = '用户姓名不能为空'
			return result
		}
		//省份不能为空
		if(!_util.validate(formData.province,'required')){
			result.msg = '省份不能为空'
			return result
		}
		//城市不能为空
		if(!_util.validate(formData.city,'required')){
			result.msg = '城市不能为空'
			return result
		}
		//地址不能为空
		if(!_util.validate(formData.address,'required')){
			result.msg = '地址不能为空'
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
		
		result.status = true
		return result
	}
}