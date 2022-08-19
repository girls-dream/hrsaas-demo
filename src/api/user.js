import request from '@/utils/request'

export const login = (data) => {
  return request({
    url: '/sys/login',
    method: 'POST',
    data,
  })
}
//获取员工信息
export const getUserInfo = (data) => {
  return request({
    url: '/sys/profile',
    method: 'POST',
    data,
  })
}
//获取员工基本信息
export const userAllInfo = (id) => {
  return request({
    url: `/sys/user/${id}`,
  })
}

/** *
 *  更新用户详情的基础信息
 * **/
export function saveUserDetailById(data) {
  return request({
    url: `/sys/user/${data.id}`,
    method: 'put',
    data,
  })
}
