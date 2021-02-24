/*
 * @Descripttion:
 * @Author: Jason
 * @Date: 2021-02-22 23:30:41
 * @LastEditTime: 2021-02-24 16:05:35
 */
import request from "@/utils/request";
const pmLine = {
  login: data =>
    request({
      method: "get",
      url: "/login",
      data
    }),
  getAqiLevleDes: data =>
    request({
      method: "get",
      url: "/aqiLevleDes",
      data
    }),
  getAqiRangeDes: data =>
    request({
      method: "get",
      url: "/aqiRangeDes",
      data
    }),
  getAqiLineData: data =>
    request({
      method: "get",
      url: "/getAqiLineData",
      data
    })
};
export default pmLine;
