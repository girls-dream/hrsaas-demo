import PageTools from '@/components/PageTools'
import UploadExel from '@/components/UpdateExel'
import UploadImg from '@/components/UploadImg'
import Calendar from '@/components/Calendar'
import FullScreen from '@/components/FullScreen'
import ToggleLang from '@/components/ToggleLang'

// console.log(PageTools);
//第一种方式
// export default {
//   install(Vue) {
//     Vue.component('PageTools',PageTools)
//   }
// }

// 第二种方法
const components = [
  PageTools,
  UploadExel,
  UploadImg,
  Calendar,
  FullScreen,
  ToggleLang,
]
export default {
  install(Vue) {
    components.forEach((component) => {
      Vue.component(component.name, component)
    })
  },
}
