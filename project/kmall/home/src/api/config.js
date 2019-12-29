/*
* @Author: Chen
* @Date:   2019-12-19 19:37:56
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-29 16:44:37
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
	addCarts: 						['/carts','post'],
	getCartsCount: 					['/carts/count','get'],
	getCarts: 						['/carts','get'],

	updateCartsChoice: 				['/carts/choices','put'],
	deleteCarts: 					['/carts','delete'],
	updateCartsCounts: 				['/carts/counts','put'],


	getOrdersList: 					['/orders/products','get'],
	
	addShippings: 					['/shippings','post'],
	getShippings: 					['/shippings/list','get'],
	deleteShippings: 				['/shippings','delete'],
	getShippingsDetail: 			['/shippings/detail','get'],
	updateShippingsDetail: 			['/shippings','put'],
	addOrders: 						['/orders','post'],

	getPayments: 					['/payments','get'],
	getPaymentsStatus: 				['/payments/status','get'],

	getOrderList: 					['/orders/list','get'],
	getOrderDetail: 				['/orders/detail','get'],
	updateOrderStatus: 				['/orders/status','put'],
}

module.exports = {
	API_CONFIG
}