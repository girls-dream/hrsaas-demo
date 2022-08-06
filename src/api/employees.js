import request from '@/utils/request'

export const getEmployeesApi=() => {
  return request({
    url: '/sys/user/simple'
  })
}
// 新增部门
export const addEmployeesApi=(data) => {
  return request({
    url: '/company/department',
    method: 'POST',
    data
  })
}