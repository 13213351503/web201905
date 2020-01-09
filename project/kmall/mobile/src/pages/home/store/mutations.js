/*
* @Author: Chen
* @Date:   2020-01-06 19:07:09
* @Last Modified by:   Chen
* @Last Modified time: 2020-01-08 20:03:55
*/
//唯一更改state的方法
//mutation必须是同步函数
import { GET_ADS,GET_FLOORS } from './types.js'
export default {
	[GET_ADS](state,payload){
		state.ads = payload.homeAds
	},
	[GET_FLOORS](state,payload){
		state.floors = payload.homeFloors
	},
}