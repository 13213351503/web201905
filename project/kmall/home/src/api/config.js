/*
* @Author: Chen
* @Date:   2019-12-19 19:37:56
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-20 18:14:35
*/
var API_CONFIG = {
	login: 							['/sessions/users','post'],
	getUsername: 					['/sessions/username','get'],
	logout: 						['/sessions/users','delete'],
	register: 						['/users','post'],
	checkUsername: 					['/users/checkUsername','get'],
}

module.exports = {
	API_CONFIG
}