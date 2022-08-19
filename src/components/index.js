import PageTools from '@/components/PageTools'
import UploadExel from '@/components/UpdateExel'
import UploadImg from '@/components/UploadImg'

// console.log(PageTools);
//第一种方式
// export default {
//   install(Vue) {
//     Vue.component('PageTools',PageTools)
//   }
// }

// 第二种方法
const components = [PageTools, UploadExel, UploadImg]
export default {
  install(Vue) {
    components.forEach((component) => {
      Vue.component(component.name, component)
    })
  },
}
