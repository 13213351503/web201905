/*
* @Author: Chen
* @Date:   2020-01-05 15:26:02
* @Last Modified by:   Chen
* @Last Modified time: 2020-01-08 19:08:01
*/
const path = require('path')

module.exports = {
  	devServer:{
  	 	port:3003,
      proxy: 'http://127.0.0.1:3000',
  	},
  	pluginOptions: {
    	'style-resources-loader': {
   			preProcessor: 'less',
    		patterns: [
        		path.resolve(__dirname, './src/assets/less/index.less')
    		]
		}
	},
	chainWebpack:config =>{
	    config.resolve.alias
	    .set('pages',path.resolve(__dirname,'./src/pages'))
	    .set('api',path.resolve(__dirname,'./src/api'))
	} 
}