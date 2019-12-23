/*
* @Author: Chen
* @Date:   2019-12-17 18:16:09
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-23 20:45:44
*/
var nav = require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')
require('./index.css')

var api = require('api')
var _util = require('util')

var tpl = require('./index.tpl')

require('util/pagination')

var page = {
	productsListParams:{
		category:_util.getParamsFormUrl('categoryId'),
		keyword:_util.getParamsFormUrl('keyword'),
		page:_util.getParamsFormUrl('page') || 1,
		orderBy:_util.getParamsFormUrl('orderBy') || 'default',
	},
	init:function(){
		this.$paginationBox = $('.pagination-box')
		//初始化分页器
		this.initPagination()
		//加载商品列表
		this.loadPorductsList()
		//绑定事件
		this.bindEvent()
	},
	initPagination:function(){
		var _this = this
		this.$paginationBox.pagination()
		//监听事件获取最新页码
		this.$paginationBox.on('page-change',function(ev,page){
			//获取最新页码并发送请求
			_this.productsListParams.page = page
			_this.loadPorductsList()
		})
	},
	bindEvent:function(){
		var _this = this
		$('.sort-item').on('click',function(){
			var $this = $(this)
			//默认排序
			if($this.hasClass('default')){
				if($this.hasClass('active')){
					return 
				}
				//点击选中状态,取消兄弟元素选中状态
				$this.addClass('active')
				.siblings('.sort-item')
				.removeClass('active')
				_this.productsListParams.orderBy = 'default'
				
			}
			//按照价格排序
			else if($this.hasClass('price')){
				//点击选中状态,取消兄弟元素选中状态
				$this.addClass('active')
				.siblings('.sort-item')
				.removeClass('active')
				//降序
				if($this.hasClass('asc')){
					$this.removeClass('asc')
					.addClass('desc')
					_this.productsListParams.orderBy = 'price_desc'
				}
				//升序
				else if($this.hasClass('desc')){
					$this.removeClass('desc')
					.addClass('asc')
					_this.productsListParams.orderBy = 'price_asc'
				}
			}
			//更新参数信息再次发送请求更新排序
			_this.productsListParams.page = 1
			_this.loadPorductsList()
		})
	},
	loadPorductsList:function(){
		var _this = this
		api.getProductsList({
			data:this.productsListParams,
			success:function(data){
				// console.log(data)
				if(data.list.length > 0){
					var html = _util.render(tpl,{
						list:data.list
					})
					$('.product-list-box').html(html)
					//构建分页器结构
					_this.$paginationBox.pagination('render',{
						current:data.current,
						pageSize:data.pageSize,
						total:data.total,
					})
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