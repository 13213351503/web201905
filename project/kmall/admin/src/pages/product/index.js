/*
* @Author: Chen
* @Date:   2019-12-11 19:10:22
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-13 18:07:09
*/
import React,{Component} from 'react'
import {
  Switch,
  Route,
} from "react-router-dom";

import ProductList from './list.js'
import ProductSave from './save.js'


class Product extends Component{
	render(){
		return (
			<div className='Product'>
				<Switch>
					<Route exact path='/product/' component={ProductList} />
					<Route path='/product/save' component={ProductSave} />
				</Switch>
			</div>
		)
	}
}

export default Product