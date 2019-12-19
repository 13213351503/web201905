/*
* @Author: Chen
* @Date:   2019-12-17 20:39:30
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-19 20:26:53
*/
require('./index.css')
var api = require('api')
var _util = require('util')

var page = {
	init:function(){
		this.loadUsername()
		this.bindEvent()
		return this
	},
	bindEvent:function(){
		$('#logout').on('click',function(){
			api.logout({
				success:function(data){
					window.location.reload()
				},
				error:function(err){
					_util.showErrMsg(err)
				}
			})
		})
	},
	loadUsername:function(){
		api.getUsername({
			success:function(data){
				$('.not-login').hide()
				$('.login')
				.show()
				.find('.username')
				.text(data.username)
			}
		})
	}
}

module.exports = page.init()