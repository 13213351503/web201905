/*
* @Author: Chen
* @Date:   2019-11-12 20:16:20
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-24 10:59:59
*/
const express = require('express')
const app = express()
const swig = require('swig')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Cookies = require('cookies')
const session = require('express-session')
const MongoStore = require("connect-mongo")(session)

//处理静态资源
app.use(express.static('public'))

/*-----------------处理post请求获取参数的中间件配置-------------*/
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
// 配置中间件信息后post的参数会被存在req.body
/*-----------------处理post请求获取参数的中间件配置-------------*/

/*----------------连接数据库开始-------------*/
//链接数据库
mongoose.connect('mongodb://localhost/blog', { useUnifiedTopology: true,useNewUrlParser: true })
//生成db
mongoose.set('useFindAndModify', false)
const db = mongoose.connection
//连接失败
db.on('error',(err)=>{
	console.log('connect db err ...')
	throw err
})
//连接成功
db.once('open', function() {
  	console.log('connect mongodb success !!!')
})
/*----------------连接数据库结束-------------*/


/*------------------配置模板引擎开始----------------*/
//1.设置缓存
//开发阶段设置不走缓存
swig.setDefaults({
  	cache: false
})
//2.配置应用模板
//第一个参数是模板名称,同时也是模板文件的扩展名
//第二个参数是解析模板的方法
app.engine('html', swig.renderFile)
//3.配置模板的存放目录
//第一参数必须是views
//第二个参数是模板存放的目录
app.set('views', './views')
//4.注册模板引擎
//第一个参数必须是view engine
//第二个参数是模板名称,也就是app.engine的第一个参数
app.set('view engine', 'html')
/*------------------配置模板引擎结束----------------*/

/*---------------利用cookie+session+db保存用户状态信息开始------------*/
/*
app.use((req,res,next)=>{
	//生成cookies对象并存在req
	req.cookies = new Cookies(req,res)
	let userInfo = {}
	if(req.cookies.get('userInfo')){
		userInfo = JSON.parse(req.cookies.get('userInfo'))
	}
	req.userInfo = userInfo
	next()
})
*/
app.use(session({
    //设置cookie名称
    name:'kzid',
    //用它来对session cookie签名，防止篡改
    secret:'abc',
    //强制保存session即使它并没有变化
    resave: true,
    //强制将未初始化的session存储
    saveUninitialized: true, 
    //如果为true,则每次请求都更新cookie的过期时间
    rolling:true,
    //cookie过期时间 1天
    cookie:{maxAge:1000*60*60*24},
    //设置session存储在数据库中
    store:new MongoStore({ mongooseConnection: mongoose.connection })
}))

app.use((req,res,next)=>{
	//获取并将cookies信息存在req.userInfo上
	req.userInfo = req.session.userInfo || {}

	next()
})
/*---------------配置cookies保存用户状态信息结束------------*/









/*------------------配置路由开始----------------*/
app.use('/',require('./routers/index.js'))
app.use('/user',require('./routers/user.js'))
app.use('/admin',require('./routers/admin.js'))
app.use('/category',require('./routers/category.js'))
app.use('/article',require('./routers/article.js'))
app.use('/comment',require('./routers/comment.js'))
/*------------------配置路由结束----------------*/

app.listen(3000, () => console.log('server is running in the http://127.0.0.1:3000!'))