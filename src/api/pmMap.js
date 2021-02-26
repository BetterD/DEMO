/*
 * @Descripttion:
 * @Author: Jason
 * @Date: 2021-02-26 15:32:28
 * @LastEditTime: 2021-02-26 15:32:29
 */

import request from "@/utils/request";
const pmMap = {
  getStationData: data =>
    request({
      method: "get",
      url: "/getStationData",
      data
    })
};
export default pmMap;
