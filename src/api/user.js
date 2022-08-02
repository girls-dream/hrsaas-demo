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
