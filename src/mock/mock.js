/*
 * @Descripttion:
 * @Author: Jason
 * @Date: 2021-02-22 23:28:01
 * @LastEditTime: 2021-02-24 16:44:38
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
});
Mock.mock("http://localhost:8080/aqiRangeDes", {
  //输出数据

  percent: "69",
  height: "10",
  low: "21",
  expect: "42",
  real: "41"
});
Mock.mock("http://localhost:8080/getAqiLineData", {
  //输出数据
  expect: "",
  X: [
    "2021-02-04",
    "2021-02-05",
    "2021-02-06",
    "2021-02-07",
    "2021-02-08",
    "2021-02-09",
    "2021-02-10",
    "2021-02-11",
    "2021-02-12",
    "2021-02-13",
    "2021-02-14",
    "2021-02-15",
    "2021-02-16",
    "2021-02-17",
    "2021-02-18",
    "2021-02-19",
    "2021-02-20",
    "2021-02-21",
    "2021-02-22",
    "2021-02-23"
  ],
  realY: [
    50,
    64,
    60,
    72,
    67,
    55,
    60,
    82,
    65,
    52,
    50,
    72,
    77,
    98,
    67,
    48,
    60,
    105,
    75,
    66
  ],
  expectYHeight: [
    55,
    70,
    67,
    72,
    66,
    59,
    65,
    85,
    68,
    56,
    58,
    79,
    80,
    102,
    70,
    49,
    60,
    105,
    74,
    69
  ],
  expectYLow: [
    45,
    60,
    55,
    66,
    60,
    50,
    58,
    80,
    61,
    50,
    45,
    66,
    72,
    91,
    61,
    41,
    54,
    98,
    71,
    61
  ],
  percent: "69",
  height: "10",
  low: "21",
  expect: "42",
  real: "41"
});
