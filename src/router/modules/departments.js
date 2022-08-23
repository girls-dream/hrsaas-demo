import Layout from '@/layout'
export default {
  path: '/departments',
  component: Layout,
  meta: {
    id: 'departments',
  },
  children: [
    {
      path: '',
      component: () => import('@/views/departments'),
      name: '组织架构',

      meta: { title: '组织架构', icon: 'tree' },
    },
  ],
}
