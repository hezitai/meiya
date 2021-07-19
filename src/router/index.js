/*
 * @Author: hhh
 * @Date: 2021-07-12 10:48:26
 * @LastEditTime: 2021-07-19 19:36:43
 * @LastEditors: hhh
 * @Description: 
 * @FilePath: /zk/newapp/src/router/index.js
 */

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/recommend',
            component: () =>
                import ('../views/recommend'),
            meta: {
                title: '我的推荐'
            }
        },
        {
            path: '/earnings',
            component: () =>
                import ('../views/earnings'),
            meta: {
                title: '收益'
            }
        },
        {
            path: '/center',
            component: () =>
                import ('../views/center'),
            meta: {
                title: '个人中心'
            }
        },

        {
            path: '/viplevel',
            component: () =>
                import ('../views/vipLevel'),
            meta: {
                title: '会员'
            }
        },
        {
            path: '/404',
            component: () =>
                import ('../views/404'),
            meta: {
                title: '失效'
            }
        },
        {
            path: '*',
            redirect: '/recommend',
        }
    ]
})

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}