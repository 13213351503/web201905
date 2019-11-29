/*
* @Author: Chen
* @Date:   2019-11-29 18:39:53
* @Last Modified by:   Chen
* @Last Modified time: 2019-11-29 20:26:02
*/
import React,{Component} from 'react'
import PropTypes from 'prop-types'

class Item extends Component{
	constructor(props){
		super(props)
	}
	render(){
		const { handleDel,task } = this.props
		return (
			<li onClick={handleDel}>{task}</li>
		)
	}
}

Item.propTypes = {
	handleDel:PropTypes.func,
	task:PropTypes.string.isRequired
}
Item.defaultProps = {
	task:'learn js'
}  

export default Item