/*
 * @Author: hhh
 * @Date: 2021-07-12 10:04:17
 * @LastEditTime: 2021-07-12 10:56:48
 * @LastEditors: hhh
 * @Description: 
 * @FilePath: /zk/newapp/src/main.js
 */
import Vue from 'vue'
import App from './App.vue'
import Vant from 'vant';
import 'vant/lib/index.css';
// import 'vant/lib/index.less';
import router from './router'

Vue.use(Vant);
Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')