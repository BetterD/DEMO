/*
 * @Descripttion:
 * @Author: Jason
 * @Date: 2021-02-26 15:32:28
 * @LastEditTime: 2021-02-27 03:07:28
 */

import request from "@/utils/request";
const pmMap = {
  //获取图表站点数据
  getStationData: data =>
    request({
      method: "get",
      url: "/getStationData",
      data
    }),
  //获取时间列表
  getTimeListData: data =>
    request({
      method: "get",
      url: "/getTimeListData",
      data
    }),
  //获取站点数量描述
  getStationDecData: data =>
    request({
      method: "get",
      url: "/getStationDecData",
      data
    }),
  //获取温度信息
  getTepData: data =>
    request({
      method: "get",
      url: "/getTepData",
      data
    })
};
export default pmMap;
