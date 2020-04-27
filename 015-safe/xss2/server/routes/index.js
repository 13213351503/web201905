var express = require('express');
var router = express.Router();
var comment = {

}

/* GET home page. */
router.get('/', function(req, res, next) {
	var xss = req.query.xss;
	res.set('X-XSS-Protection',0);
	// res.set('X-XSS-Protection',1);
	// res.set('X-XSS-Protection','1; report=https://www.baidu.com');
	// res.set('X-XSS-Protection','1;mode=block');
  	res.render('index', { title: 'Express',xss:xss });
});
router.get('/add',function(req,res,next){
	comment.val = req.query.val
	res.json({
		code:0,
		message:'添加成功'
	})
})
router.get('/get',function(req,res,next){
	res.json({
		code:0,
		message:'获取成功',
		data:comment.val
	})
})

module.exports = router;
