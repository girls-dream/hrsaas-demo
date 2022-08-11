import request from '@/utils/request'

// 获取简单员工
export const getEmployeesApi = () => {
  return request({
    url: '/sys/user/simple',
  })
}

/** Promise
 * 获取员工列表
 */
export const getEmployeesInfo = (params) => {
  return request({
    url: '/sys/user',
    params,
  })
}
