/*
 * @Descripttion:
 * @Author: Jason
 * @Date: 2021-02-22 23:30:41
 * @LastEditTime: 2021-02-23 23:54:42
 */
import request from "@/utils/request";

const AuthLoginByAccount = "/login"; //账号登录
export function login(data) {
  return request({
    url: AuthLoginByAccount,
    method: "get",
    data
  });
}
const AqiLevleDes = "/aqiLevleDes"; //账号登录
export function getAqiLevleDes(data) {
  return request({
    url: AqiLevleDes,
    method: "get",
    data
  });
}
const AqiRangeDes = "/aqiRangeDes"; //账号登录
export function getAqiRangeDes(data) {
  return request({
    url: AqiRangeDes,
    method: "get",
    data
  });
}
