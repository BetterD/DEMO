/*
 * @Descripttion: 
 * @Author: Jason
 * @Date: 2021-02-22 22:26:00
 * @LastEditTime: 2021-02-22 23:28:42
 */
import Vue from 'vue'
import Router from 'vue-router'
import pmLine from '@/view/pmLine'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'pmLine',
      component: pmLine
    }
  ]
})
