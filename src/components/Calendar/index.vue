<template>
  <div>
    <!-- 头部 -->
    <el-row type="flex" justify="end">
      <el-col :span="5">
        <el-select v-model="currentYear">
          <el-option
            v-for="item in yearList"
            :key="item"
            :label="item"
            :value="item"
            >{{ item }}</el-option
          >
        </el-select>
      </el-col>
      <el-col :span="3">
        <el-select @change="updateCalendar" v-model="currentMonth">
          <el-option
            v-for="item in 12"
            :key="item"
            :label="item"
            :value="item"
            >{{ item }}</el-option
          >
        </el-select>
      </el-col>
    </el-row>
    <!-- 日期 -->
    <el-calendar v-model="currentDate">
      <template v-slot:dateCell="{ date }" class="content">
        <div class="date-content">
          {{ date.getDate() }}
          <span v-if="isWeek(date)" class="rest">休</span>
        </div>
      </template>
    </el-calendar>
  </div>
</template>

<script>
export default {
  name: 'Calendar',
  props: {
    startDate: {
      type: Date,
      default: () => new Date(),
    },
  },
  data() {
    return {
      currentMonth: '', // 当前月份
      currentYear: '', // 当前年份
      currentDate: null,
      yearList: [],
    }
  },
  created() {
    this.initCaldndar()
  },
  methods: {
    initCaldndar() {
      const date = new Date()
      this.currentYear = date.getFullYear()
      this.currentMonth = date.getMonth() + 1
      this.yearList = Array(11)
        .fill(this.currentYear - 5)
        .map((item, i) => {
          item + i
        })
    },
    isWeek(date) {
      return date.getDay() === 6 || date.getDay() === 0
    },
    updateCalendar() {
      this.currentDate = this.currentYear + '-' + this.currentMonth
    },
  },
}
</script>
<style scoped lang="scss">
::v-deep .el-calendar {
  .el-calendar__header {
    display: none;
  }
  .el-calendar-table td {
    border: none !important;
  }
  .el-calendar-day {
    line-height: 85px;
    text-align: center;
    .rest {
      color: red;
    }
  }
}
</style>
