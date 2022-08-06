import request from '@/utils/request'

// 获取部门
export const getDeptsApi = (data) => {
  return request({
    url: '/company/department',
  })
}
// 删除部门
export const delDeptsApi = (id) => {
  return request({
    url: `/company/department/${id}`,
    method:'DELETE'
  })
}