/*
* @Author: Chen
* @Date:   2019-12-17 18:16:09
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-29 16:01:51
*/
var nav = require('pages/common/nav')
var _side = require('pages/common/side')
require('pages/common/search')
require('pages/common/footer')
require('./index.css')

var api = require('api')
var _util = require('util')

var tpl = require('./index.tpl')

require('util/pagination')

var page = {
	orderListParams:{
		keyword:_util.getParamsFormUrl('keyword'),
		page:_util.getParamsFormUrl('page') || 1,
	},
	init:function(){
		this.$paginationBox = $('.pagination-box')
		//加载侧边栏
		this.renderSide()
		//初始化分页器
		this.initPagination()
		//加载订单列表
		this.loadOrdersList()
	},
	renderSide:function(){
		_side.render('order-list')
	},
	initPagination:function(){
		var _this = this
		this.$paginationBox.pagination()
		//监听事件获取最新页码
		this.$paginationBox.on('page-change',function(ev,page){
			//获取最新页码并发送请求
			_this.orderListParams.page = page
			_this.loadOrdersList()
		})
	},
	loadOrdersList:function(){
		var _this = this
		api.getOrderList({
			data:this.orderListParams,
			success:function(data){
				console.log(data)
				if(data.list.length > 0){
					//处理时间
					data.list.forEach(function(order){
						order.createdTime = new Date(order.createdAt).toLocaleString()
					})

					var html = _util.render(tpl,{
						list:data.list
					})
					$('.order-box').html(html)
					//构建分页器结构
					_this.$paginationBox.pagination('render',{
						current:data.current,
						pageSize:data.pageSize,
						total:data.total,
					})
				}else{//没有该条件下的商品信息
					$('.order-box').html('<p class="empty-message">您还没有订单</p>')
				}
				
			}
		})
	}
}

$(function(){
	page.init()
})