/*
* @Author: Chen
* @Date:   2019-12-11 19:15:30
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-11 19:44:13
*/
import React,{Component} from 'react'
import { Breadcrumb,} from 'antd'


import Layout from 'common/layout'

class CategoryAdd extends Component{
	render(){
		return (
			<div className='CategoryAdd'>
				<Layout>
					<Breadcrumb style={{ margin: '16px 0' }}>
			          <Breadcrumb.Item>首页</Breadcrumb.Item>
			          <Breadcrumb.Item>分类管理</Breadcrumb.Item>
			          <Breadcrumb.Item>新增分类</Breadcrumb.Item>
			        </Breadcrumb>
				</Layout>
			</div>
		)
	}
}

export default CategoryAdd