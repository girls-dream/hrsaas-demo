import Layout from '@/layout'
export default {
  path: '/employees',
  component: Layout,
  meta: {
    id: 'employees',
  },
  children: [
    {
      path: '',
      component: () => import('@/views/employees'),
      name: '员工',
      meta: { title: '员工', icon: 'people' },
    },
    {
      path: 'detail/:id',
      component: () => import('@/views/employees/detail'),
      hidden: true,
    },
    {
      path: 'printer/:id',
      component: () => import('@/views/employees/printer'),
      hidden: true,
    },
  ],
}
