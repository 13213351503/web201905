/*
* @Author: Chen
* @Date:   2019-11-18 18:49:59
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-21 18:37:03
*/

/*
	options = {
		page:当前显示的页码
		model:需要操作的文档模型
		query:查询条件
		projection:显示字段信息
		sort:排序
		populates:关联查询
	}

*/
async function pagination(options){
	/*分页
	前提条件:想要显示那一页必须知道页码,page有前台传入
	约定:每一页显示几条数据 limit = 2
	第1页: 显示1-2 	skip(1-1)*2 limit = 2
	第2页: 显示3-4	skip(2-1)*2 limit = 2
	第3页: 显示5-6	skip(3-1)*2 limit = 2
 	......
	第page页 显示    skip(page-1)*2 limit = 2


	*/
	const limit = 2
	let { page,model,query,projection,sort,populates } = options

	if(isNaN(page)){
		page = 1
	}
	//上一页边界控制
	if(page == 0){
		page = 1
	}

	const count = await model.countDocuments()

	const pages = Math.ceil(count / limit)

	//下一页边界控制
	if(page > pages){
		page = pages
	}
	if(page == 0){
		page = 1
	}
	//由于swig无法对数字进行循环遍历,因此需要在后台生成页码
	let list = []
	for(let i = 1;i<=pages;i++){
		list.push(i)
	}
	let skip = (page-1)*limit

	//关联查询
	let result = model.find(query,projection)
	if(populates){
		populates.forEach(function(populate){
			return result.populate(populate)
		})
	}


	const docs = await result.sort(sort).skip(skip).limit(limit)

	return {
		docs:docs,
		page:page,
		list:list,
		pages:pages
	}

}


module.exports = pagination