/*
* @Author: Chen
* @Date:   2019-12-02 16:52:50
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-15 11:43:53
*/
import axios from 'axios'
import * as types from './actionTypes.js'
import api from 'api'
import { message } from 'antd'


//处理新增商品action
const setMainImageErrAction = ()=>({
	type:types.SET_MAIN_IMAGE_ERR
})
const setImagesErrAction = ()=>({
	type:types.SET_IMAGES_ERR
})
export const getSaveProductAction = (err,values)=>{
	return (dispatch,getState)=>{
		// console.log(values)
		const state = getState().get('product')
		const mainImage = state.get('mainImage')
		const images = state.get('images')
		const detail = state.get('detail')
		//自定义组件验证
		if(!mainImage){
			dispatch(setMainImageErrAction())
		}
		if(!images){
			dispatch(setImagesErrAction())
		}
		/*
		api.addCategories(values)
		.then(result=>{
			// console.log(result)
			const data = result.data
			if(data.code == 0){
				message.success('新增分类成功')
				dispatch(setLevelCategoriesAction(data.data))
			}else{
				message.error(data.message)
			}
		})
		.catch(err=>{
			console.log(err)
		})
		*/
	}
}

//处理自定义组件存值到store
export const getMainImageAction = (payload)=>({
	type:types.SET_MAIN_IMAGE,
	payload
})
export const getImagesAction = (payload)=>({
	type:types.SET_IMAGES,
	payload
})
export const getDetailAction = (payload)=>({
	type:types.SET_DETAIL,
	payload
})


const setLevelCategoriesAction = (payload)=>({
	type:types.SET_LEVEL_CATEGORIES,
	payload
})
//处理获取最新父级分类数据
export const getLevelCategoriesAction = ()=>{
	return (dispatch,getState)=>{
		api.getLevelCategories({
			level:3
		})
		.then(result=>{
			const data = result.data
			if(data.code == 0){
				dispatch(setLevelCategoriesAction(data.data))
			}else{
				message.error('请求失败,请稍后再试!')
			}
		})
		.catch(err=>{
			console.log(err)
		})
	}
}
//处理分类列表分页数据
const getPageStartAction = () =>({
	type:types.PAGE_REQUEST_START
})
const getPageDoneAction = () =>({
	type:types.PAGE_REQUEST_DONE
})
const getSetPageAction = (payload) =>({
	type:types.SET_PAGE,
	payload
})
export const getPageAction = (page)=>{
	return (dispatch,getState)=>{
		//发送请求前显示loading
		dispatch(getPageStartAction())
		api.getCategoriesList({
			page:page
		})
		.then(result=>{
			// console.log(result)
			const data = result.data
			if(data.code == 0){
				dispatch(getSetPageAction(data.data))
			}else{
				message.error('请求失败,请稍后再试!')
			}
		})
		.catch(err=>{
			console.log(err)
			message.error('请求失败,请稍后再试!')
		})
		.finally(()=>{
			//请求完毕后loading取消
			dispatch(getPageDoneAction())
		})
	}
}
//处理更新分类名称
export const getUpdateNameAction = (id,newName)=>{
	return (dispatch,getState)=>{
		const page = getState().get('category').get('current')
		api.updateCategoriesName({
			id:id,
			name:newName,
			page:page
		})
		.then(result=>{
			// console.log(result)
			const data = result.data
			if(data.code == 0){
				message.success('更新分类成功')
				dispatch(getSetPageAction(data.data))
			}else{
				message.error('请求失败,请稍后再试!')
			}
		})
		.catch(err=>{
			console.log(err)
			message.error('请求失败,请稍后再试!')
		})
	}
}
//处理更新手机分类名称
export const getUpdateMobileNameAction = (id,newMobileName)=>{
	return (dispatch,getState)=>{
		const page = getState().get('category').get('current')
		api.updateCategoriesMobileName({
			id:id,
			mobileName:newMobileName,
			page:page
		})
		.then(result=>{
			const data = result.data
			if(data.code == 0){
				message.success('更新手机分类成功')
				dispatch(getSetPageAction(data.data))
			}else{
				message.error('请求失败,请稍后再试!')
			}
		})
		.catch(err=>{
			console.log(err)
			message.error('请求失败,请稍后再试!')
		})
	}
}
//处理更新排序
export const getUpdateOrderAction = (id,newOrder)=>{
	return (dispatch,getState)=>{
		const page = getState().get('category').get('current')
		api.updateCategoriesOrder({
			id:id,
			order:newOrder,
			page:page
		})
		.then(result=>{
			const data = result.data
			if(data.code == 0){
				message.success('更新排序分类成功')
				dispatch(getSetPageAction(data.data))
			}else{
				message.error('请求失败,请稍后再试!')
			}
		})
		.catch(err=>{
			console.log(err)
			message.error('请求失败,请稍后再试!')
		})
	}
}
//更新显示隐藏
export const getUpdateIsShowAction = (id,newIsShow)=>{
	return (dispatch,getState)=>{
		const page = getState().get('category').get('current')
		api.updateCategoriesIsShow({
			id:id,
			isShow:newIsShow,
			page:page
		})
		.then(result=>{
			const data = result.data
			if(data.code == 0){
				message.success('更新显示隐藏分类成功')
				dispatch(getSetPageAction(data.data))
			}else{
				message.error('请求失败,请稍后再试!')
			}
		})
		.catch(err=>{
			console.log(err)
			message.error('请求失败,请稍后再试!')
		})
	}
}
