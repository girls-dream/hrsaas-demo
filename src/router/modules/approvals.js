import Layout from '@/layout'
export default {
  path: '/approvals',
  component: Layout,
  meta: {
    id: 'approvals',
  },
  children: [
    {
      path: '',
      component: () => import('@/views/approvals'),
      name: '审批',

      meta: { title: '审批', icon: 'tree-table' }
    }
  ]
}
