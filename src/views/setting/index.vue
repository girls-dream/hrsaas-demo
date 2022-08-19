<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 放置页签 -->
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="用户管理" name="first">
          <!-- 新增角色按钮 -->
          <el-row style="height: 60px">
            <el-button
              @click="dialogVisible = true"
              icon="el-icon-plus"
              size="small"
              type="primary"
              >新增角色</el-button
            >
          </el-row>
          <!-- 表格 -->
          <el-table :data="tableData" style="width: 100%">
            <el-table-column type="index" label="序号"> </el-table-column>
            <el-table-column prop="name" label="角色"> </el-table-column>
            <el-table-column prop="description" label="描述"> </el-table-column>
            <el-table-column label="操作">
              <template>
                <el-button size="small" type="success" @click="showRightsDialog"
                  >分配权限</el-button
                >
                <el-button size="small" type="primary">编辑</el-button>
                <el-button size="small" type="danger">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            layout="sizes, prev,pager, next"
            :page-sizes="[2, 5, 7, 11]"
            :page-size="pageSize"
            :total="total"
          >
          </el-pagination>
        </el-tab-pane>
        <!-- 添加弹框 -->
        <el-dialog
          @close="dialogvisible"
          title="新增角色"
          :visible.sync="dialogVisible"
          width="50%"
        >
          <el-form
            :model="addRoleFrom"
            :rules="addRoleFromRules"
            ref="form"
            label-width="80px"
          >
            <el-form-item label="角色名称" prop="name">
              <el-input v-model="addRoleFrom.name" />
            </el-form-item>
            <el-form-item label="角色描述">
              <el-input v-model="addRoleFrom.description" />
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="onClose">取 消</el-button>
            <el-button type="primary" @click="onAddRole">确 定</el-button>
          </span>
        </el-dialog>
        <el-tab-pane label="配置管理" name="second">
          <el-alert
            title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
            type="info"
            show-icon
            :closable="false"
          />
          <el-form label-width="120px" style="margin-top: 50px">
            <el-form-item label="公司名称">
              <el-input
                v-model="companyInfo.name"
                disabled
                style="width: 400px"
              />
            </el-form-item>
            <el-form-item label="公司地址">
              <el-input
                v-model="companyInfo.companyAddress"
                disabled
                style="width: 400px"
              />
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input
                v-model="companyInfo.mailbox"
                disabled
                style="width: 400px"
              />
            </el-form-item>
            <el-form-item label="备注">
              <el-input
                v-model="companyInfo.remarks"
                type="textarea"
                :rows="3"
                disabled
                style="width: 400px"
              />
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 添加角色权限弹层 -->
    <el-dialog title="给角色分配权限" :visible.sync="assignDialog" width="50%">
      <el-tree
        :data="perssions"
        show-checkbox
        :props="{ label: 'name' }"
        :default-checked-keys="defaultCheckKeys"
        default-expand-all
        node-key="id"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="assignDialog = false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getRolesApi,
  addRolesApi,
  getCompanyInfo,
  getPermissionList,
} from '@/api'
import { totree } from '@/utils'
export default {
  data() {
    return {
      activeName: 'first', //标签页高亮
      tableData: [],
      pageSize: 2,
      total: 0,
      page: 1,
      dialogVisible: false,
      addRoleFrom: {
        name: '',
        description: '',
      },
      addRoleFromRules: {
        name: [{ required: true, message: '请填写部门名称', trigger: 'blur' }],
      },
      companyInfo: {},
      assignDialog: false,
      perssions: [], //分配权限
      defaultCheckKeys: ['1', '1063313020819738624'],
    }
  },

  created() {
    this.getRoles()
    this.getCompany()
  },

  methods: {
    handleClick(tab, event) {
      // console.log(tab, event)
    },
    async getRoles() {
      const { rows, total } = await getRolesApi({
        page: this.page,
        pagesize: this.pageSize,
      })
      this.tableData = rows
      this.total = total
    },
    //点击下一页
    handleCurrentChange(val) {
      this.page = val
      this.getRoles()
    },
    // 一页显示条数
    handleSizeChange(val) {
      this.pageSize = val
      this.getRoles()
    },
    onClose() {
      this.dialogVisible = false
    },
    // 点击确定
    async onAddRole() {
      await this.$refs.form.validate()
      await addRolesApi(this.addRoleFrom)
      this.$message.success('添加成功')
      this.dialogVisible = false
      this.getRoles()
    },
    // 监听对话框关闭
    dialogvisible() {
      this.$refs.form.resetFields()
      this.addRoleFrom.description = ''
    },
    async getCompany() {
      const res = await getCompanyInfo(
        this.$store.state.user.userInfo.companyId,
      )
      // console.log(res)
      this.companyInfo = res
    },
    showRightsDialog() {
      this.assignDialog = true
      this.getPermissions()
    },
    async getPermissions() {
      const res = await getPermissionList()
      const treePermission = totree(res, '0')
      console.log(treePermission)
      this.perssions = treePermission
    },
  },
}
</script>

<style scoped lang="less"></style>
