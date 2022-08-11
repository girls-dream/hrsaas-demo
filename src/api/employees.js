import request from '@/utils/request'

export const getEmployeesApi = () => {
  return request({
    url: '/sys/user/simple',
  })
}
// 新增部门
export const addEmployeesApi = (data) => {
  return request({
    url: '/company/department',
    method: 'POST',
    data,
  })
}
// 编辑部门(查询)
export const queryEmployeesApi = (id) => {
  return request({
    url: `/company/department/${id}`,
  })
}
// 根据ID修改部门详情
export const editEmployeesApi = (data) => {
  return request({
    url: `/company/department/${data.id}`,
    method: 'PUT',
    data
  })
}
