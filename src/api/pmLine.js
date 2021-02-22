/*
 * @Descripttion: 
 * @Author: Jason
 * @Date: 2021-02-22 23:30:41
 * @LastEditTime: 2021-02-22 23:42:46
 */
import request from '@/utils/request'

const AuthLoginByAccount = '/login'; //账号登录
export function login(data) {
  return request({
    url: AuthLoginByAccount,
    method: 'get',
    data
  })
}