/*
* @Author: Chen
* @Date:   2019-11-04 19:31:50
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-04 20:13:53
*/
class Controller {
	index(req,res,...args){
		res.setHeader('Content-type','text/html;charset="utf-8"')
		res.end('<a href="/Item/index">go todolist </a>')
	}
}

module.exports = new Controller()