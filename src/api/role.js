import request from '@/utils/request'

/**
 *
 * 获取角色列表
 *
 */
export const getRolesApi = (params) => {
  return request({
    url: '/sys/role',
    params,
  })
}

/**
 *
 * 添加角色列表
 *
 */
export const addRolesApi = (data) => {
  return request({
    url: '/sys/role',
    method: 'POST',
    data,
  })
}

// 分配权限
export const getRolesInfo = (id) => {
  return request({
    url: '/sys/role/' + id,
  })
}

// 给角色分配权限
export function assignPerm(data) {
  return request({
    url: '/sys/role/assignPrem',
    method: 'put',
    data,
  })
}
