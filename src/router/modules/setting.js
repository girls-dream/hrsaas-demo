import Layout from '@/layout'
export default {
  path: '/setting',
  component: Layout,
  meta: {
    id: 'settings',
  },
  children: [
    {
      path: '',
      component: () => import('@/views/setting'),
      name: '公司设置',

      meta: { title: '公司设置', icon: 'setting' }
    }
  ]
}
