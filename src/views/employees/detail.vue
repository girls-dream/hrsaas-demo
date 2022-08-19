<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane name="account" label="登录账户设置">
            <!-- 放置表单 -->
            <el-form
              label-width="120px"
              style="margin-left: 120px; margin-top: 30px"
            >
              <el-form-item label="姓名:">
                <el-input v-model="formData.username" style="width: 300px" />
              </el-form-item>
              <el-form-item label="密码:">
                <el-input
                  v-model="formData.password"
                  style="width: 300px"
                  type="password"
                />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSave">更新</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane name="user" label="个人详情">
            <!-- 放置个人详情 -->
            <Userinfo></Userinfo>
            <!-- <user-info /> -->
          </el-tab-pane>
          <el-tab-pane name="job" label="岗位信息">
            <jobInfo></jobInfo>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { userAllInfo, saveUserDetailById } from '@/api'
import Userinfo from './components/user-info.vue'
import jobInfo from './components/job-info.vue'

import Cookies from 'js-cookie'
export default {
  data() {
    return {
      formData: {},
      activeName: Cookies.get('employeeDetailTab') || 'account',
    }
  },

  mounted() {},

  created() {
    this.loadUserDatil()
  },

  methods: {
    async loadUserDatil() {
      const res = await userAllInfo(this.$route.params.id)
      this.formData = res
    },
    async onSave() {
      await saveUserDetailById(this.formData)
      this.$message.success('更新成功')
    },
    handleClick() {
      Cookies.set('employeeDetailTab', this.activeName)
    },
  },

  components: {
    Userinfo,
    jobInfo
  },

  computed: {},
}
</script>

<style scoped></style>
