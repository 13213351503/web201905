/*
* @Author: Chen
* @Date:   2019-12-17 18:16:09
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-22 17:38:48
*/
var nav = require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')
require('./index.css')

var api = require('api')
var _util = require('util')

var tpl = require('./index.tpl')

var page = {
	productsListParams:{
		category:_util.getParamsFormUrl('categoryId'),
		keyword:_util.getParamsFormUrl('keyword'),
		page:_util.getParamsFormUrl('page') || 1,
		orderBy:_util.getParamsFormUrl('orderBy') || 'default',
	},
	init:function(){
		//加载商品列表
		this.loadPorductsList()
	},
	loadPorductsList:function(){
		api.getProductsList({
			data:this.productsListParams,
			success:function(data){
				console.log(data)
				if(data.list.length > 0){
					var html = _util.render(tpl,{
						list:data.list
					})
					$('.product-list-box').html(html)
				}else{//没有该条件下的商品信息
					$('.product-list-box').html('<p class="empty-message">你搜索的商品走丢啦......</p>')
				}
				
			}
		})
	}
}

$(function(){
	page.init()
})