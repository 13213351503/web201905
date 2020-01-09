import Vue from 'vue'
import App from './App.vue'

//加载公共css样式
import './assets/css/common.css'
//加载全局vant组件
import './plugins/vant'
//注册全局过滤器
import filters from './filters'
Object.keys(filters).forEach(key=>Vue.filter(key,filters[key]))

Vue.config.productionTip = false
//共享store组件信息
import store from './store'

//引入路由
import router from './router/index.js'

new Vue({
	router,
	store,
  	render: h => h(App),
}).$mount('#app')
