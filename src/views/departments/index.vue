<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card" v-loading="loading">
        <!-- 用了一个行列布局 -->
        <TreeTools
          @add="showAddDept"
          @edit="showEditDept"
          :isRoot="true"
          :treeNode="company"
        ></TreeTools>
        <!-- 树形 -->
        <el-tree :data="departs" :props="defaultProps" default-expand-all>
          <template v-slot="{ data }">
            <TreeTools
              @add="showAddDept"
              @remove="loadDepts"
              @edit="showEditDept"
              :treeNode="data"
            ></TreeTools>
          </template>
        </el-tree>
      </el-card>
    </div>
    <!-- 添加部门弹出层 -->
    <AddDept
      ref="addDept"
      @addsuc="loadDepts"
      :visible.sync="dialogVisible"
      :currentNode="currentNode"
    ></AddDept>
  </div>
</template>

<script>
import TreeTools from './components/tree-tools.vue'
import AddDept from './components/add-dept.vue'
import { getDeptsApi } from '@/api'
import { totree } from '@/utils'
export default {
  data() {
    return {
      departs: [
        { name: '总裁办', children: [{ name: '董事会' }] },
        { name: '行政部' },
        { name: '人事部' },
      ],
      defaultProps: {
        label: 'name',
      },
      company: { name: '传智教育', manager: '负责人' },
      data: { name: '总裁办', manager: '张三' },
      dialogVisible: false,
      currentNode: {},
      loading:false
    }
  },
  components: {
    TreeTools,
    AddDept,
  },

  created() {
    this.loadDepts()
  },

  methods: {
    async loadDepts() {
      this.loading= true
      const res = await getDeptsApi()
      // console.log(res)
      this.departs = totree(res.depts, '')
      this.loading= false
    },
    // 添加弹出层
    showAddDept(val) {
      this.dialogVisible = true
      this.currentNode = val
    },
    // 编辑弹出层
    showEditDept(val) {
      this.dialogVisible = true
      this.$refs.addDept.getDeptById(val.id)
    },
  },
}
</script>

<style scoped>
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
</style>
