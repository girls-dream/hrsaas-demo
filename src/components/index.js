import PageTools from '@/components/PageTools'
// console.log(PageTools);
//第一种方式
// export default {
//   install(Vue) {
//     Vue.component('PageTools',PageTools)
//   }
// }

// 第二种方法
const components = [PageTools]
export default {
  install(Vue) {
    components.forEach((component) => {
      Vue.component(component.name, component)
    })
  },
}
