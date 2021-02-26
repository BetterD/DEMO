/*
 * @Descripttion:
 * @Author: Jason
 * @Date: 2021-02-26 15:32:28
 * @LastEditTime: 2021-02-27 01:14:45
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
    })
};
export default pmMap;
