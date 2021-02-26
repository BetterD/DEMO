/*
 * @Descripttion:
 * @Author: Jason
 * @Date: 2021-02-22 23:28:01
 * @LastEditTime: 2021-02-27 03:32:38
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
Mock.mock("http://localhost:8080/getStationData", {
  data: [
    { name: "南京市监控站", coord: [118.78, 32.04], value: 66, type: 0 },
    { name: "江宁监控站", coord: [118.83, 31.95], value: 75, type: 1 },
    { name: "六合监控站", coord: [118.83, 32.36], value: 90, type: 1 },
    { name: "江浦监控站", coord: [118.62, 32.07], value: 106, type: 1 },
    { name: "徐州监控站", coord: [117.2, 34.26], value: 158, type: 1 },
    { name: "连云港监控站", coord: [119.16, 34.59], value: 43, type: 2 },
    { name: "南通监控站", coord: [120.86, 32.01], value: 80, type: 2 },
    { name: "苏州监控站", coord: [120.62, 31.32], value: 80, type: 3 },
    { name: "无锡监控站", coord: [120.29, 31.59], value: 200, type: 3 },
    { name: "常州监控站", coord: [119.95, 31.79], value: 80, type: 4 },
    { name: "丰县监控站", coord: [116.57, 34.79], value: 95, type: 4 },
    { name: "沛县监控站", coord: [116.93, 34.73], value: 80, type: 6 },
    { name: "赣榆监控站", coord: [119.11, 34.83], value: 80, type: 1 },
    { name: "东海监控站", coord: [118.75, 34.54], value: 80, type: 5 },
    { name: "新沂监控站", coord: [118.33, 34.38], value: 80, type: 5 },
    { name: "邳县监控站", coord: [117.97, 34.3], value: 43, type: 6 },
    { name: "睢宁监控站", coord: [117.94, 34.89], value: 20, type: 1 },
    { name: "太仓监控站", coord: [121.1, 31.45], value: 80, type: 1 }
  ]
});
Mock.mock("http://localhost:8080/getTimeListData", {
  data: [
    "2021-02-03 21时",
    "2021-02-03 22时",
    "2021-02-03 23时",
    "2021-02-04 00时",
    "2021-02-04 01时",
    "2021-02-04 02时",
    "2021-02-04 03时",
    "2021-02-04 04时",
    "2021-02-04 05时",
    "2021-02-04 06时",
    "2021-02-04 07时",
    "2021-02-04 08时",
    "2021-02-04 09时",
    "2021-02-04 10时",
    "2021-02-04 11时",
    "2021-02-04 12时"
  ]
});
Mock.mock("http://localhost:8080/getStationDecData", {
  data: {
    guo: 72,
    sheng: 90,
    bian: 6,
    zhi: 26,
    chuang: 14,
    nong: 10,
    sc: 11
  }
});
Mock.mock("http://localhost:8080/getTepData", {
  data: [
    { name: "南京", value: "40" },
    { name: "江宁", value: "20" },
    { name: "六合", value: "20" },
    { name: "江浦", value: "20" },
    { name: "徐州", value: "20" },
    { name: "连云港", value: "20" },
    { name: "南通", value: "40" },
    { name: "苏州", value: "40" },
    { name: "无锡", value: "40" },
    { name: "常州", value: "40" },
    { name: "丰县", value: "40" },
    { name: "沛县", value: "40" },
    { name: "赣榆", value: "25" },
    { name: "东海", value: "25" },
    { name: "新沂", value: "25" },
    { name: "邳县", value: "25" },
    { name: "睢宁", value: "15" },
    { name: "铜山", value: "15" },
    { name: "清江", value: "15" },
    { name: "灌云", value: "15" },
    { name: "灌南", value: "30" },
    { name: "沭阳", value: "30" },
    { name: "宿迁", value: "30" },
    { name: "泗阳", value: "30" },
    { name: "盱眙", value: "30" },
    { name: "涟水", value: "30" },
    { name: "淮阴", value: "30" },
    { name: "淮安", value: "35" },
    { name: "洪泽", value: "35" },
    { name: "泗洪", value: "35" },
    { name: "金湖", value: "35" },
    { name: "盐城", value: "20" },
    { name: "滨海", value: "20" },
    { name: "阜宁", value: "20" },
    { name: "射阳", value: "20" },
    { name: "建湖", value: "20" },
    { name: "响水", value: "20" },
    { name: "大丰", value: "20" },
    { name: "东台", value: "20" },
    { name: "海安", value: "20" },
    { name: "如皋", value: "20" },
    { name: "如东", value: "20" },
    { name: "启东", value: "15" },
    { name: "海门", value: "15" },
    { name: "南通", value: "15" },
    { name: "扬州", value: "15" },
    { name: "宝应", value: "15" },
    { name: "兴化", value: "15" },
    { name: "高邮", value: "15" },
    { name: "泰兴", value: "15" },
    { name: "泰县", value: "20" },
    { name: "泰州", value: "20" },
    { name: "靖江", value: "20" },
    { name: "江都", value: "20" },
    { name: "邗江", value: "20" },
    { name: "仪征", value: "20" },
    { name: "镇江", value: "20" },
    { name: "丹徒", value: "20" },
    { name: "扬中", value: "20" },
    { name: "丹阳", value: "20" },
    { name: "武进", value: "15" },
    { name: "宜兴", value: "15" },
    { name: "金坛", value: "15" },
    { name: "溧阳", value: "15" },
    { name: "句容", value: "20" },
    { name: "溧水", value: "20" },
    { name: "高淳", value: "20" },
    { name: "江阴", value: "6" },
    { name: "沙洲", value: "20" },
    { name: "常熟", value: "20" },
    { name: "太仓", value: "20" },
    { name: "昆山", value: "20" },
    { name: "吴县", value: "20" },
    { name: "吴江", value: "20" }
  ]
});
