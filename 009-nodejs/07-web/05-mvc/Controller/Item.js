/*
* @Author: Chen
* @Date:   2019-11-04 19:29:26
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-04 19:41:20
*/
class Controller {
	index(req,res,...args){
		res.end('doing something.....')
	}
}

module.exports = new Controller()