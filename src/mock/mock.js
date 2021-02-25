/*
 * @Descripttion:
 * @Author: Jason
 * @Date: 2021-02-22 23:28:01
 * @LastEditTime: 2021-02-25 15:26:29
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
    56,
    77,
    69,
    74,
    66,
    59,
    65,
    90,
    68,
    59,
    59,
    84,
    86,
    102,
    70,
    49,
    60,
    105,
    74,
    69
  ],
  expectYLow: [
    36,
    57,
    49,
    54,
    46,
    39,
    45,
    70,
    48,
    39,
    39,
    54,
    56,
    82,
    50,
    29,
    30,
    85,
    54,
    49
  ]
});
Mock.mock("http://localhost:8080/getAqiLevleData", {
  //输出数据
  data: [
    { date: "2021-02-04", except: [0, 1], real: 0, deviation: 0 },
    { date: "2021-02-05", except: [0, 1], real: 0, deviation: 0 },
    { date: "2021-02-06", except: [1, 2], real: 0, deviation: 1 },
    { date: "2021-02-07", except: [0], real: 0, deviation: 0 },
    { date: "2021-02-08", except: [0, 1], real: 0, deviation: 0 },
    { date: "2021-02-09", except: [0, 1], real: 0, deviation: 0 },
    { date: "2021-02-10", except: [3, 5], real: 2, deviation: 1 },
    { date: "2021-02-11", except: [0], real: 0, deviation: 0 },
    { date: "2021-02-12", except: [0, 1], real: 0, deviation: 0 },
    { date: "2021-02-13", except: [0, 1], real: 1, deviation: 0 },
    { date: "2021-02-14", except: [0, 1], real: 4, deviation: 2 },
    { date: "2021-02-15", except: [0, 1], real: 0, deviation: 0 },
    { date: "2021-02-16", except: [0], real: 0, deviation: 0 },
    { date: "2021-02-17", except: [0, 1], real: 0, deviation: 0 },
    { date: "2021-02-18", except: [0, 1], real: 1, deviation: 0 },
    { date: "2021-02-19", except: [0, 1], real: 0, deviation: 0 },
    { date: "2021-02-20", except: [0, 1], real: 0, deviation: 0 },
    { date: "2021-02-21", except: [0, 1], real: 1, deviation: 0 },
    { date: "2021-02-22", except: [0, 1], real: 0, deviation: 0 },
    { date: "2021-02-23", except: [0, 1], real: 0, deviation: 0 }
  ]
});
