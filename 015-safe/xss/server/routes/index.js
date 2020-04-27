var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	var xss = req.query.xss;
	res.set('X-XSS-Protection',0);
	// res.set('X-XSS-Protection',1);
	// res.set('X-XSS-Protection','1; report=https://www.baidu.com');
	// res.set('X-XSS-Protection','1;mode=block');
  	res.render('index', { title: 'Express',xss:xss });
});

module.exports = router;
