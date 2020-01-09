/*
* @Author: Chen
* @Date:   2020-01-07 18:13:58
* @Last Modified by:   Chen
* @Last Modified time: 2020-01-08 20:07:08
*/
export default {
	formatPrice:function(price=0){
		return '￥' + parseFloat(price).toFixed(2)
	}
}