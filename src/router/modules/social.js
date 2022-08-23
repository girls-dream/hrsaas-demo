import Layout from '@/layout'
export default {
  path: '/social',
  component: Layout,
  meta: {
    id: 'social',
  },
  children: [
    {
      path: '',
      component: () => import('@/views/social'),
      name: '社保',

      meta: { title: '社保', icon: 'table' },
    },
  ],
}
