/*
 * @Descripttion:
 * @Author: Jason
 * @Date: 2021-02-22 23:28:01
 * @LastEditTime: 2021-02-23 23:55:15
 */
import Mock from "mockjs";
Mock.mock("http://localhost:8080/login", {
  //输出数据
  name: "jasonduan" //随机生成姓名
  //还可以自定义其他数据
});
Mock.mock("http://localhost:8080/aqiLevleDes", {
  //输出数据

  percent: "93",
  height: "0",
  low: "4",
  expect: "42",
  real: "41"
  //随机生成姓名
  //还可以自定义其他数据
});
Mock.mock("http://localhost:8080/aqiRangeDes", {
  //输出数据

  percent: "69",
  height: "10",
  low: "21",
  expect: "42",
  real: "41"
  //随机生成姓名
  //还可以自定义其他数据
});
Mock.mock("/list", {
  //输出数据
  name: "@name", //随机生成姓名
  "age|10-20": 10
  //还可以自定义其他数据
});
