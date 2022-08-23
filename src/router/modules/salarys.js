import Layout from '@/layout'
export default {
  path: '/salarys',
  component: Layout,
  meta: {
    id: 'salarys',
  },
  children: [
    {
      path: '',
      component: () => import('@/views/salarys'),
      name: '工资',

      meta: { title: '工资', icon: 'money' },
    },
  ],
}
