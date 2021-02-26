/*
 * @Descripttion:
 * @Author: Jason
 * @Date: 2021-02-22 23:30:41
 * @LastEditTime: 2021-02-27 01:13:52
 */
import request from "@/utils/request";
const pmLine = {
  //获取污染等级描述
  getAqiLevleDes: data =>
    request({
      method: "get",
      url: "/aqiLevleDes",
      data
    }),
  //获取AQI描述
  getAqiRangeDes: data =>
    request({
      method: "get",
      url: "/aqiRangeDes",
      data
    }),
  //获取AQI图标数据
  getAqiLineData: data =>
    request({
      method: "get",
      url: "/getAqiLineData",
      data
    }),
  //获取污染等级图表数据
  getAqiLevleData: data =>
    request({
      method: "get",
      url: "/getAqiLevleData",
      data
    })
};
export default pmLine;
