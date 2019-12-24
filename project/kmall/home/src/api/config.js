/*
* @Author: Chen
* @Date:   2019-12-19 19:37:56
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-24 18:25:14
*/
var API_CONFIG = {
	login: 							['/sessions/users','post'],
	getUsername: 					['/sessions/username','get'],
	logout: 						['/sessions/users','delete'],
	register: 						['/users','post'],
	checkUsername: 					['/users/checkUsername','get'],
	getUserInfo: 					['/sessions/users','get'],
	updateUsers: 					['/users','put'],
	getHomeCategories: 				['/categories/homeCategories','get'],
	getHomeAds: 					['/ads/positionAds','get'],
	getHomeFloors: 					['/floors','get'],
	getProductsList: 				['/products/list','get'],
	getProductDetail: 				['/products/detail','get'],
}

module.exports = {
	API_CONFIG
}