<template>
  <div>
    <el-dialog
      @open="onOpen"
      @close="onClose"
      title="分配角色"
      :visible="visible"
      width="50%"
    >
      <template>
        <el-checkbox-group v-model="checkList">
          <el-checkbox
            v-for="(item, index) in roles"
            :key="index"
            :label="item.id"
            >{{ item.name }}</el-checkbox
          >
        </el-checkbox-group>
      </template>
      <div slot="footer">
        <el-button @click="onClose">取 消</el-button>
        <el-button type="primary" @click="assignRoles">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getRolesApi, userAllInfo, assignRoles } from '@/api'
export default {
  data() {
    return {
      checkList: [],
      roles: [],
    }
  },
  props: {
    visible: {
      type: Boolean,
      required: false,
    },
    employeesId: {
      type: String,
      required: true,
    },
  },

  mounted() {},

  created() {},

  methods: {
    onClose() {
      this.$emit('update:visible', false)
    },
    async getRoleList() {
      const role = await getRolesApi()
      // console.log(role)
      this.roles = role.rows
    },
    onOpen() {
      this.getRoleList()
      this.getEmployeesRoles()
    },
    async getEmployeesRoles() {
      const { roleIds } = await userAllInfo(this.employeesId)
      // console.log(roleIds)
      this.checkList = roleIds
    },
    async assignRoles() {
      if (!this.checkList.length) return this.$message.error('请选择角色')
      // console.log(this.checkList)
      await assignRoles({
        id: this.employeesId,
        roleIds: this.checkList,
      })
      this.$message.success('角色分配成功')
      this.onClose()
    },
  },

  components: {},

  computed: {},
}
</script>

<style scoped></style>
