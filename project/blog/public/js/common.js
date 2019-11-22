/*
* @Author: TomChen
* @Date:   2019-03-13 18:10:45
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-22 18:48:25
*/
;(function($){
	//1.登录注册面板切换
	var $login = $('#login')
	var $register = $('#register')
	var $userInfo = $('#user-info')
	//1.1 登录=>注册
	$('#go-register').on('click',function(){
		$login.hide()
		$register.show()
	})
	//1.2 注册=>登录
	$('#go-login').on('click',function(){
		$login.show()
		$register.hide()
	})


	//2.点击注册发送请求
	$('#sub-register').on('click',function(){
		//2.1获取注册信息
		var username = $register.find("[name='username']").val()
		var password = $register.find("[name='password']").val()
		var repassword = $register.find("[name='repassword']").val()
		var $err = $register.find('.err')
		//2.2验证数据合法性
		// 用户名以字母开头的包含字母数字下划线的3-10位字符
		var userReg = /^[a-z][a-z0-9_]{2,9}$/i
		// 密码是3-6位的任意字符
		var passwordReg = /^\w{3,6}$/
		var errMsg = ''
		//验证用户名
		if(!userReg.test(username)){
			errMsg = '用户名以字母开头的包含字母数字下划线的3-10位字符'
		}
		//验证密码
		else if(!passwordReg.test(password)){
			errMsg = '密码是3-6位的任意字符'
		}
		//确认密码
		else if(password != repassword){
			errMsg = '两次密码输入不一致'
		}
		//验证通过
		else {
			errMsg = ''
		}

		if(errMsg){
			$err.html(errMsg)
		}else{
			$err.html('')
			//2.3发送ajax请求
			$.ajax({
				url:'/user/register',
				type:'POST',
				dataType:'json',
				data:{
					username:username,
					password:password
				}
			})
			.done(function(data){
				if(data.code == 0){//注册成功
					//返回登录面板
					$('#go-login').trigger('click')
				}else{
					$err.html(data.message)
				}
			})
			.fail(function(err){
				$err.html('请求失败,请稍后再试!!!')
			})
		}	
	})

	//3.点击登录发送请求
	$('#sub-login').on('click',function(){
		//3.1获取登录信息
		var username = $login.find("[name='username']").val()
		var password = $login.find("[name='password']").val()
		var $err = $login.find('.err')
		//3.2验证数据合法性
		// 用户名以字母开头的包含字母数字下划线的3-10位字符
		var userReg = /^[a-z][a-z0-9_]{2,9}$/i
		// 密码是3-6位的任意字符
		var passwordReg = /^\w{3,6}$/
		var errMsg = ''
		//验证用户名
		if(!userReg.test(username)){
			errMsg = '用户名以字母开头的包含字母数字下划线的3-10位字符'
		}
		//验证密码
		else if(!passwordReg.test(password)){
			errMsg = '密码是3-6位的任意字符'
		}
		//验证通过
		else {
			errMsg = ''
		}

		if(errMsg){
			$err.html(errMsg)
		}else{
			$err.html('')
			//3.3发送ajax请求
			$.ajax({
				url:'/user/login',
				type:'POST',
				dataType:'json',
				data:{
					username:username,
					password:password
				}
			})
			.done(function(data){
				if(data.code == 0){//登录成功
					/*
					$userInfo.find('span').html(data.user.username)
					$userInfo.show()
					$login.hide()
					*/
					window.location.reload()
				}else{
					$err.html(data.message)
				}
			})
			.fail(function(err){
				$err.html('请求失败,请稍后再试!!!')
			})
		}	
	})

	//4.点击退出登录
	/*
	$('#logout').on('click',function(){
		$.ajax({
			url:'/user/logout',
			type:'get'
		})
		.done(function(data){
			// console.log(data)
			if(data.code == 0){
				//退出成功返回首页
				window.location.href = '/'
			}
		})
		.fail(function(err){
			$userInfo.find('.err').html('请求失败,请稍后再试!!!')
		})
	})
	*/


	//5.首页分页逻辑
	var $articlePage = $('#article-page')
	function buildArticleHtml(articles){
		var html = ''
			articles.forEach(function(article){
				var createdTime = moment(article.createdAt).format('YYYY - MM - DD HH:mm:ss')
				html += `
					<div class="panel panel-default content-item">
				        <div class="panel-heading">
				          <h3 class="panel-title">
				            <a href="/detail/${article._id.toString()}" class="link" target="_blank">${article.title}</a>
				          </h3>
				        </div>
				        <div class="panel-body">
				          ${article.intro}
				        </div>
				        <div class="panel-footer">
				          <span class="glyphicon glyphicon-user"></span>
				          <span class="panel-footer-text text-muted">${article.user.username}</span>
				          <span class="glyphicon glyphicon-th-list"></span>
				          <span class="panel-footer-text text-muted">${article.category.name}</span>
				          <span class="glyphicon glyphicon-time"></span>
				          <span class="panel-footer-text text-muted">${createdTime}</span>
				          <span class="glyphicon glyphicon-eye-open"></span>
				          <span class="panel-footer-text text-muted"><em>${article.click}</em>已阅读</span>
				        </div>
				    </div>`
			})
		return html
	}
	function buildPaginationHtml(page,pages,list){
		var html = ''
		if(page == 1){
			html += `<li class="disabled">`
		}else{
			html += `<li>`
		}
		html += `<a href="javascript:;" aria-label="Previous">
			        <span aria-hidden="true">&laquo;</span>
			      </a>
			    </li>`
		list.forEach(function(i){
			if(page == i){
				html += '<li class="active"><a href="javascript:;">'+i+'</a></li>'
			}else{
				html += '<li><a href="javascript:;">'+i+'</a></li>'
			}
		})
		if(page == pages){
			html += `<li class="disabled">`
		}else{
			html += `<li>`
		}
		html += `<a href="javascript:;" aria-label="Next">
			        <span aria-hidden="true">&raquo;</span>
			      </a>
			    </li>`
		return html
	}
	$articlePage.on('get-data',function(ev,data){
		// console.log(data)
		//获取首页文章分页数据
		//构建文章列表结构
		$('#article-wrap').html(buildArticleHtml(data.docs))
		//构建分页器结构
		var $pagination = $articlePage.find('.pagination')
		if(data.pages > 1){
			$pagination.html(buildPaginationHtml(data.page,data.pages,data.list))
		}else{
			$pagination.html('')
		}
	})
	$articlePage.pagination({
		url:'/articles'
	})
	
})(jQuery);