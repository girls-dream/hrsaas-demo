<template>
  <div>
    <el-upload
      v-loading="loading"
      element-loading-text="上传中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      action="#"
      :http-request="onRequest"
      :file-list="fileList"
      :on-change="onChange"
      :on-remove="onRemove"
      :on-preview="onPreview"
      :limit="1"
      class="custom-upload"
      :class="fileList.length ? 'hide' : ''"
      list-type="picture-card"
      :before-upload="beforeUpload"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog title="图片预览" :visible.sync="previewImgDialog">
      <img :src="imgUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
//SecretId: AKIDmOltmRq0va0A5lKhrmS1NVO1PXQ3RaUF
//SecretKey: iFakfXDfrpY2HH2av1tXw98sNdhYBZic
import COS from 'cos-js-sdk-v5'
var cos = new COS({
  SecretId: 'AKIDmOltmRq0va0A5lKhrmS1NVO1PXQ3RaUF',
  SecretKey: 'iFakfXDfrpY2HH2av1tXw98sNdhYBZic',
})
// console.log(COS)
export default {
  name: 'UploadImg',
  data() {
    return {
      fileList: [],
      previewImgDialog: false,
      imgUrl: '',
      loading: false,
    }
  },

  mounted() {},

  created() {},

  methods: {
    // 自定义请求
    onRequest({ file }) {
      // console.log(data)
      this.loading = true
      cos.putObject(
        {
          Bucket: 'hmhr-31-1313341688' /* 填入您自己的存储桶，必须字段 */,
          Region: 'ap-shanghai' /* 存储桶所在地域，例如ap-beijing，必须字段 */,
          Key: file.name /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */,
          StorageClass: 'STANDARD',
          Body: file, // 上传文件对象
          onProgress: function (progressData) {
            console.log(JSON.stringify(progressData))
          },
        },
        (err, data) => {
          if (err || data.statusCode !== 200) {
            return this.$message.error('上传失败')
          }
          this.$emit('onSuccess', {
            url: 'https://' + data.Location,
          })
          this.loading = false
        },
      )
    },
    onChange(file, fileList) {
      this.fileList = fileList
    },
    onRemove(file, fileList) {
      this.fileList = fileList
    },
    onPreview(file) {
      console.log(file)
      this.imgUrl = file.url
      this.previewImgDialog = true
    },
    beforeUpload(file) {
      const type = ['image/jpeg', 'image/gif']
      if (!type.includes(file.type)) {
        this.$message.error('请选择' + type.join('、') + '图片')
        return false
      }
      const maxSize = 2 * 1024 * 1024
      if (file.size > maxSize) {
        this.$message.error('选择的图片不能超出2mb')
        return false
      }
      console.log('上传前的检查', file)
    },
  },

  components: {},

  computed: {},
}
</script>

<style lang="scss">
.hide .el-upload--picture-card {
  display: none;
}
.custom-upload {
  width: 148px;
  height: 148px;
  overflow: hidden;
}
</style>
