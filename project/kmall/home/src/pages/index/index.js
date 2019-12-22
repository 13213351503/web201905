/*
* @Author: Chen
* @Date:   2019-12-17 18:15:41
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-22 16:59:03
*/
var nav = require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')
require('./index.css')
require('node_modules/swiper/css/swiper.min.css')

var api = require('api')
var _util = require('util')
import Swiper from 'swiper'

var categoriesTpl = require('./categories.tpl')
var swiperTpl = require('./swiper.tpl')
var floorsTpl = require('./floors.tpl')

var page = {
	init:function(){
		//加载首页分类列表
		this.loadHomeCategories()
		//集成swiper加载首页轮播图广告
		this.loadSwiper()
		//加载首页楼层
		this.loadHomeFloors()
	},
	loadHomeCategories:function(){
		api.getHomeCategories({
			success:function(categories){
				var html = _util.render(categoriesTpl,{
					categories:categories
				})
				$('.categories').html(html)
			}
		})
	},
	loadSwiper:function(){
		//只有当广告结构和样式生成后再集成swiper
		//加载广告
		api.getHomeAds({
			data:{
				position:1
			},
			success:function(data){
				var html = _util.render(swiperTpl,{
					slides:data
				})
				$('.swiper-container .swiper-wrapper').html(html)

				var mySwiper = new Swiper ('.swiper-container', {
				    loop: true, // 循环模式选项
				    autoplay:true,//自动轮播
				    
				    // 如果需要分页器
				    pagination: {
				      el: '.swiper-pagination',
				      //底部按钮可以点击
				      clickable :true,
				    },
				    
				    // 如果需要前进后退按钮
				    navigation: {
				      nextEl: '.swiper-button-next',
				      prevEl: '.swiper-button-prev',
				    },

				})
			}
		})
	},
	loadHomeFloors:function(){
		api.getHomeFloors({
			success:function(data){
				var html = _util.render(floorsTpl,{
					floors:data
				})
				$('.floor-wrap').html(html)
			}
		})
	}
}


$(function(){
	page.init()
})