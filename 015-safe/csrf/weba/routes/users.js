var express = require('express');
var router = express.Router();

// referer 验证
/*
router.use((req,res,next)=>{
    let refer = req.headers['referer']||req.headers['refer']
    if(refer == 'http://localhost:3000/'){
        next()
    }else{
        res.render('msg',{title: 'Express',msg:'攻击可耻'})
    }
})
*/
// token验证
router.use((req,res,next)=>{
    if(req.session.userInfo && req.session.userInfo.token == req.query.token){
        next()
    }else{
        res.render('msg',{title: 'Express',msg:'攻击可耻'})
    }
})


router.use((req,res,next)=>{
    if(req.session.userInfo){
        next()
    }else{
        res.render('msg',{title: 'Express',msg:'没有权限'})
    }
})

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/forward', function(req, res, next) {
  res.render('msg', { title: 'Express',msg:'转账成功' });
});

module.exports = router;
