<template>
  <div>
    <el-dialog
      @close="onClose"
      :title="dialogTitile"
      :visible="visible"
      width="50%"
    >
      <el-form
        ref="form"
        label-width="100px"
        :model="formData"
        :rules="formRules"
      >
        <el-form-item label="部门名称" prop="name">
          <el-input
            v-model="formData.name"
            placeholder="输入部门名称"
          ></el-input> </el-form-item
        ><el-form-item label="部门编码" prop="code">
          <el-input
            v-model="formData.code"
            placeholder="输入部门编码"
          ></el-input> </el-form-item
        ><el-form-item label="部门负责人" prop="manager">
          <el-select
            v-model="formData.manager"
            style="width: 100%"
            placeholder="输入部门负责人"
          >
            <el-option
              v-for="item in employees"
              :key="item.id"
              :label="item.username"
              :value="item.username"
            ></el-option>
          </el-select> </el-form-item
        ><el-form-item label="部门介绍" prop="introduce">
          <el-input
            v-model="formData.introduce"
            type="textarea"
            placeholder="输入部门介绍"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onClose">取 消</el-button>
        <el-button @click="onSave" type="primary">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getDeptsApi,
  getEmployeesApi,
  addEmployeesApi,
  queryEmployeesApi,
  editEmployeesApi,
} from '@/api'
export default {
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    currentNode: {
      type: Object,
      required: true,
    },
  },
  data() {
    const checkDeptName = async (rule, value, callback) => {
      let isRepeat
      if (this.formData.id) {
        // 编辑状态
        const { depts } = await getDeptsApi()
        isRepeat = depts //过滤兄弟id且抛除自己
          .filter(
            (item) =>
              item.pid === this.formData.pid && item.id !== this.formData.id,
          )
          .some((item) => item.name === value) //找到名字和要编辑的是否重复
      } else {
        if (!this.currentNode.children) return callback()
        isRepeat = this.currentNode.children.some((item) => item.name === value)
      }
      isRepeat ? callback(new Error('已有该部门')) : callback()
    }
    const checkDeptCode = async (rule, value, callback) => {
      let isRepeat
      if (this.formData.id) {
        const { depts } = await getDeptsApi()
        isRepeat = depts
          .filter((item) => item.id !== this.formData.id)
          .some((item) => item.code === value)
      } else {
        const { depts } = await getDeptsApi()
        isRepeat = depts.some((item) => item.code === value)
      }
      isRepeat ? callback(new Error('编码重复')) : callback()
    }
    return {
      formData: {
        name: '',
        code: '',
        manager: '',
        introduce: '',
      },
      formRules: {
        name: [
          { required: true, message: '请输入部门名称', trigger: 'blur' },
          {
            validator: checkDeptName,
            trigger: 'blur',
          },
        ],
        code: [
          { required: true, message: '请输入部门编码', trigger: 'blur' },
          {
            validator: checkDeptCode,
            trigger: 'blur',
          },
        ],
        manager: [
          { required: true, message: '请输入部门负责人', trigger: 'change' },
        ],
        introduce: [
          { required: true, message: '请输入部门介绍', trigger: 'blur' },
        ],
      },
      employees: [],
    }
  },

  mounted() {},

  created() {
    this.getEmployeesList()
  },

  methods: {
    // 获取简单列表
    async getEmployeesList() {
      const res = await getEmployeesApi()
      // console.log(res)
      this.employees = res
    },
    onClose() {
      this.$emit('update:visible', false)
      this.$refs.form.resetFields()
    },
    // 点击确定
    async onSave() {
      await this.$refs.form.validate()
      try {
        if (this.formData.id) {
          await editEmployeesApi(this.formData)
          this.$message.success('编辑部门成功')
          this.onClose()
          this.$emit('addsuc')
        } else {
          this.formData.pid = this.currentNode.id
          console.log(this.formData)
          await addEmployeesApi(this.formData)
          this.$message.success('新增部门成功')
          this.onClose()
          this.$emit('addsuc')
        }
      } catch (error) {
        this.$message.error('操作失败')
      }
    },
    async getDeptById(id) {
      console.log(id)
      this.formData = await queryEmployeesApi(id)
      // this.formData = {
      //   name: '',
      //   code: '',
      //   manager: '',
      //   introduce: '',
      // }
    },
  },

  components: {},

  computed: {
    dialogTitile() {
      return this.formData.id ? '编辑部门' : '添加部门'
    },
  },
}
</script>

<style scoped></style>
