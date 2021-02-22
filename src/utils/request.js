/*
 * @Descripttion: 
 * @Author: Jason
 * @Date: 2021-02-22 23:30:09
 * @LastEditTime: 2021-02-22 23:58:14
 */

import axios from 'axios'
import '../mock/mock.js'
// create an axios instance
const service = axios.create({
  baseURL: 'http://localhost:8080', // api 的 base_ur
  timeout: 5000 // request timeout
})


// request 拦截器
service.interceptors.request.use(
  config => {
    // if (!config.headers['token']) {
    //   config.headers['token'] = `${window.localStorage.getItem(
    //     'Authorization'
    //   ) || ''}`;
    // }

    return config;
  },
  err => Promise.reject(err)
)

// response 拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code === 501) {
      Message({
        message: '网站内部错误，请联系网站维护人员',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject('error')
    } else {
      return response
    }
  }, error => {
    console.log("err" + error) // for debug
    if (error.response === undefined) {
      Message({
        message: "连接超时",
        type: 'error',
        duration: 5 * 1000
      })
    } else if (error.response.data.status === 500) {
      Message({
        message: "服务器内部错误",
        type: 'error',
        duration: 5 * 1000
      })
    } else if (error.response.data.status === 403) {
      Message({
        message: error.response.data.message,
        type: 'error',
        duration: 5 * 1000
      })
      window.location = '#/login/';
    } else {
      Message({
        message: error.response.data.message,
        type: 'error',
        duration: 5 * 1000
      })
    }

    return Promise.reject(error)
  })

export default service
