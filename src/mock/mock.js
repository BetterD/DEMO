/*
 * @Descripttion: 
 * @Author: Jason
 * @Date: 2021-02-22 23:28:01
 * @LastEditTime: 2021-02-22 23:58:34
 */
import Mock from 'mockjs';
Mock.mock('http://localhost:8080/login', { //输出数据
  'name': 'jasonduan', //随机生成姓名
  //还可以自定义其他数据
});
Mock.mock('/list', { //输出数据
  'name': '@name', //随机生成姓名
  'age|10-20': 10
  //还可以自定义其他数据
});