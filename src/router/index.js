/*
 * @Descripttion:
 * @Author: Jason
 * @Date: 2021-02-22 22:26:00
 * @LastEditTime: 2021-02-25 16:08:45
 */
import Vue from "vue";
import Router from "vue-router";
import pmLine from "@/view/pmLine";
import pmMap from "@/view/pmMap";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "pmLine",
      component: pmLine
    },
    {
      path: "/pmMap",
      name: "pmMap",
      component: pmMap
    }
  ]
});
