/*
 * @Descripttion:
 * @Author: Jason
 * @Date: 2021-02-22 22:26:00
 * @LastEditTime: 2021-02-27 01:12:22
 */
import Vue from "vue";
import Router from "vue-router";
import pmLine from "@/view/pmLine";
import pmMap from "@/view/pmMap";

Vue.use(Router);

export default new Router({
  routes: [
    {
      //线性图
      path: "/",
      name: "pmLine",
      component: pmLine
    },
    {
      //地图图表
      path: "/pmMap",
      name: "pmMap",
      component: pmMap
    }
  ]
});
