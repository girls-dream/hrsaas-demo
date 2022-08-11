<template>
  <el-row style="width: 100%" type="flex">
    <el-col>
      <span>{{ treeNode.name }}</span>
    </el-col>
    <el-col :span="4">
      <el-row type="flex" justify="end">
        <!-- 两个内容 -->
        <el-col>{{ treeNode.manager }}</el-col>
        <el-col>
          <!-- 下拉菜单 element -->
          <el-dropdown>
            <span> 操作<i class="el-icon-arrow-down" /> </span>
            <!-- 下拉菜单 -->
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="$emit('add',treeNode)">添加子部门</el-dropdown-item>
              <template v-if="!isRoot">
                <el-dropdown-item @click.native="$emit('edit',treeNode)">编辑子部门</el-dropdown-item>
                <el-dropdown-item @click.native="del"
                  >删除子部门</el-dropdown-item
                >
              </template>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { delDeptsApi } from '@/api'

export default {
  name: 'treeTools',
  data() {
    return {}
  },
  props: {
    treeNode: {
      type: Object,
      required: true,
    },
    isRoot: {
      type: Boolean,
      default: false,
    },
    
  },

  mounted() {},

  created() {},

  methods: {
    async del() {
      try {
        await this.$confirm('此操作将永久删除该部门, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
        await delDeptsApi(this.treeNode.id);
        this.$emit('remove')
      } catch (error) {}
    },
  },
  components: {},

  computed: {},
}
</script>

<style scoped></style>
