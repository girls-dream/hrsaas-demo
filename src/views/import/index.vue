<template>
  <div class="dashboard-container">
    <div class="app-container">
      <UploadExel
        :beforeUpload="excelSuccess"
        :onSuccess="onSuccess"
      ></UploadExel>
    </div>
  </div>
</template>

<script>
import employees from '@/constant/employees'
const { importMapKeyPath } = employees
import { importEmployee } from '@/api'
import UploadExel from '@/components/UpdateExel'
import { formatTime } from '@/filter'
export default {
  data() {
    return {}
  },

  created() {},
  components: {
    UploadExel,
  },
  methods: {
    excelSuccess({ name }) {
      if (!name.endsWith('.xlsx')) {
        this.$message.error('请选择xlsx文件')
        return false
      }
      return true
    },
    async onSuccess({ header, results }) {
      const newArr = results.map((item) => {
        const obj = {}
        for (let key in importMapKeyPath) {
          if (key == '入职日期' || key == '转正日期') {
            //excel时间戳
            const timestamp = item[key]
            //转换
            const date = new Date((timestamp - 1) * 24 * 3600000)
            date.setFullYear(date.getFullYear() - 70)
            obj[importMapKeyPath[key]] = formatTime(date)
          } else {
            obj[importMapKeyPath[key]] = item[key]
          }
        }
        return obj
      })

      await importEmployee(newArr)
      this.$message.success('导入成功')
      this.$router.back()
    },
  },
}
</script>

<style scoped lang="less"></style>
