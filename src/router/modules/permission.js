import Layout from '@/layout'
export default {
  path: '/permission',
  component: Layout,
  meta: {
    id: 'permissions',
  },
  children: [
    {
      path: '',
      component: () => import('@/views/permission'),
      name: '权限管理',

      meta: { title: '权限管理', icon: 'lock' }
    }
  ]
}
