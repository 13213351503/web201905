/*
* @Author: Chen
* @Date:   2019-12-10 18:42:54
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-10 20:24:06
*/
export const SERVER = 'http://127.0.0.1:3000'

export const API_CONFIG = {
	login: 					['/sessions/users','post'],
	logout: 				['/sessions/users','delete'],
	getCounts: 				['/counts','get'],
	getUserList: 			['/users/list','get'],
}