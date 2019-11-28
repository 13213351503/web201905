/*
* @Author: Chen
* @Date:   2019-11-26 20:30:40
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-26 20:49:21
*/
/*写法一
export const a = 1
export const b = 2
*/

/*写法二
const a = 1 
const b = 2
export {
	a,
	b
}
*/
/*写法三
const a = 1 
const b = 2
export {
	a,
	b
}
*/

/*写法四
const a = 1 
const b = 2
export {
	a as a1,
	b as b2
}
*/
export const b = 2
export const c = 22
const a = 11
export default a
// export default const a = 11
// export default 1
// export default 2



console.log('here is Module.js ...')