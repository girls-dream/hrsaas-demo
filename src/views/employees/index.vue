<template>
  <div class="dashboard-container">
    <div class="app-container">
      <PageTools left-icon="el-icon-eleme">
        <template #left-tag>
          <span slot="before">共166条记录</span>
        </template>
        <template #right>
          <el-button size="small" type="warning" @click="importModules"
            >导入</el-button
          >
          <!-- v-if="isHas('employees-export')" -->
          <el-button
            size="small"
            type="danger"
            @click="educe"
            v-isHas="point.employees.import"
            >导出</el-button
          >
          <el-button
            v-if="point.employees.add"
            size="small"
            type="primary"
            @click="showVisible = true"
            >新增员工</el-button
          >
        </template>
      </PageTools>
      <!-- 放置表格和分页 -->
      <el-card>
        <el-table :data="employees" border>
          <el-table-column label="序号" sortable="" type="index" />
          <el-table-column label="姓名" sortable="" prop="username" />
          <el-table-column label="员工" sortable="">
            <template slot-scope="{ row }">
              <img
                v-imgErr="require('../../assets/common/head.jpg')"
                :src="row.staffPhoto"
                style="height: 60px"
                alt=""
                @click="showErCodeDialog(row.staffPhoto)"
              />
            </template>
          </el-table-column>
          <el-table-column label="工号" sortable="" prop="workNumber" />
          <el-table-column
            label="聘用形式"
            sortable=""
            :formatter="formatFormOfEmployment"
            prop="formOfEmployment"
          />
          <el-table-column label="部门" sortable="" prop="departmentName" />
          <el-table-column label="入职时间" sortable="">
            <template slot-scope="{ row }">
              {{ row.timeOfEntry | formatTime }}
            </template>
          </el-table-column>
          <el-table-column label="账户状态" sortable="">
            <template slot-scope="{ row }">
              <el-switch
                :value="row.enableState === 1"
                active-color="#13ce66"
                inactive-color="#ff4949"
              ></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <template slot-scope="{ row }">
              <el-button
                type="text"
                size="small"
                @click="$router.push('/employees/detail/' + row.id)"
                >查看</el-button
              >
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small" @click="showAssigen(row)"
                >角色</el-button
              >
              <el-button
                type="text"
                size="small"
                @click="deleteEmployee(row.id)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row
          type="flex"
          justify="center"
          align="middle"
          style="height: 60px"
        >
          <el-pagination
            @current-change="currentChange"
            :total="total"
            :page-size="pages.size"
            layout="prev, pager, next"
          />
        </el-row>
      </el-card>
      <el-dialog title="二维码" :visible.sync="ercodeDialog">
        <el-row type="flex" justify="center">
          <canvas id="canvas" />
        </el-row>
      </el-dialog>
    </div>
    <!-- 添加员工组件 -->
    <AddEmployees :visible.sync="showVisible"></AddEmployees>
    <!-- 角色分配 -->
    <AssignRole
      :employeesId="currentEmployeesId"
      :visible.sync="showAssigenRole"
    ></AssignRole>
  </div>
</template>

<script>
import { getEmployeesInfo, delEmployee } from '@/api'
import employees from '@/constant/employees.js'
import AddEmployees from './components/add-employees.vue'
import AssignRole from './components/assign-role.vue'
import permissionPoint from '@/constant/permission'
const { exportExcelMapPath, hireType } = employees
import QRcode from 'qrcode'
// import '@/directives'

export default {
  components: {
    AddEmployees,
    AssignRole,
  },
  data() {
    return {
      employees: [],
      total: 0,
      pages: {
        page: 1,
        size: 5,
      },
      showVisible: false,
      ercodeDialog: false,
      showAssigenRole: false,
      currentEmployeesId: '',
      point: permissionPoint,
    }
  },

  created() {
    this.getEmployees()
  },

  methods: {
    // 获取数据
    async getEmployees() {
      const { rows, total } = await getEmployeesInfo(this.pages)
      this.employees = rows
      this.total = total
    },
    // 当前页
    currentChange(val) {
      this.pages.page = val
      this.getEmployees()
    },
    // 判断聘用形式
    formatFormOfEmployment(row, colum, cellValue, index) {
      const finditem = employees.hireType.find((item) => item.id === cellValue)
      return finditem ? finditem.value : '未知'
    },
    // 删除员工
    async deleteEmployee(id) {
      try {
        await this.$confirm('您确定删除该员工吗')
        await delEmployee(id)
        this.getEmployees()
        this.$message.success('删除员工成功')
      } catch (error) {
        console.log(error)
      }
    },
    importModules() {
      this.$router.push('import')
    },
    // 导出
    async educe() {
      const { export_json_to_excel } = await import('@/vendor/Export2Excel')
      const { rows } = await getEmployeesInfo({
        page: 1,
        size: this.total,
      })
      // 表头
      const header = Object.keys(exportExcelMapPath)
      // 表格数据
      const data = rows.map((item) => {
        return header.map((h) => {
          if (h == '聘用形式') {
            const findItem = hireType.find((hire) => {
              return hire.id === item[exportExcelMapPath[h]]
            })
            return findItem ? findItem.value : '未知'
          } else {
            return item[exportExcelMapPath[h]]
          }
        })
      })
      export_json_to_excel({
        header, //表头 必填
        data, //具体数据 必填
        filename: '员工列表', //非必填
        autoWidth: true, //非必填
        bookType: 'xlsx', //非必填
        multiHeader: [['手机号', '其他信息', '', '', '', '', '部门']],
        merges: ['A1:A2', 'B1:F1', 'G2:G2'],
      })
    },
    // 二维码
    showErCodeDialog(staffPhoto) {
      if (!staffPhoto) return this.$message.error('该用户还未设置头像')
      this.ercodeDialog = true
      this.$nextTick(() => {
        const canvas = document.getElementById('canvas')
        QRcode.toCanvas(canvas, staffPhoto)
      })
    },
    // 分配角色
    showAssigen(row) {
      // console.log(row)
      this.currentEmployeesId = row.id
      this.showAssigenRole = true
    },
    isHas(point) {
      return this.$store.state.permission.points.includes(point)
    },
  },
}
</script>

<style scoped lang="less"></style>
