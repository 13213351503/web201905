/*
* @Author: Chen
* @Date:   2019-12-13 20:10:45
* @Last Modified by:   Chen
* @Last Modified time: 2019-12-15 10:34:35
*/
import React,{Component} from 'react'
import Simditor from 'simditor'
import $ from 'jquery'
import 'simditor/styles/simditor.css'

class RichEditor extends Component{
	constructor(props){
		super(props)
		this.state  = {
			toolbar:[
				'title',
				'bold',
				'italic',
				'underline',
				'strikethrough',
				'fontScale',
				'color',
				'ol',            
				'ul',            
				'blockquote',
				'code',           
				'table',
				'link',
				'image',
				'hr',             
				'indent',
				'outdent',
				'alignment',
			]
		}

		//携带cookie
		$.ajaxSetup({
			xhrFields: {
		      	withCredentials: true
		   	}
		})
	}
	componentDidMount(){
		this.editor = new Simditor({
		  	textarea: this.textarea,
		  	toolbar:this.state.toolbar,
		  	upload:{
		  		url:this.props.url,
		  		fileKey:'upload'
		  	}
		})
		this.editor.on('valuechanged',()=>{
			this.props.getValues(this.editor.getValue())
		})
	}
	render(){
		return(
			<textarea ref={(textarea)=>{this.textarea = textarea}} id="editor"></textarea>
		)
	}
}

export default RichEditor