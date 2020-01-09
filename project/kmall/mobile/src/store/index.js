/*
* @Author: Chen
* @Date:   2020-01-06 19:09:48
* @Last Modified by:   Chen
* @Last Modified time: 2020-01-07 20:50:04
*/
import Vue from 'vue'
import Vuex from 'vuex'

import home from 'pages/home/store'

Vue.use(Vuex);

export default new Vuex.Store({
    modules:{
        home:home
    }
}) 
