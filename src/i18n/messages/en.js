import enLocale from 'element-ui/lib/locale/lang/en'
export default {
  name: 'en',
  dashboard: {
    calendar: 'calendar',
    progress: 'progress',
  },
  ...enLocale,
  route: {
    首页: 'dashboard',
    员工: 'employees',
    组织架构: 'department',
    权限管理: 'permission',
    考勤: 'attendances',
    工资: 'salarys',
    公司设置: 'setting',
    社保: 'social',
    审批: 'approvals',
  },
}
