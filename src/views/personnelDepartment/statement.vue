<template>
  <tableLayout>
    <div slot="header" class="time-style">{{time}}</div>
    <template slot="center">
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column prop="date" label="部门" width="180"></el-table-column>
        <el-table-column prop="name" label="应出勤人数" width="180"></el-table-column>
        <el-table-column prop="address" label="实出勤人数"></el-table-column>
        <el-table-column prop="address" label="旷工"></el-table-column>
        <el-table-column prop="address" label="请假"></el-table-column>
        <el-table-column prop="address" label="备注"></el-table-column>
      </el-table>
    </template>
  </tableLayout>
</template>

<script>
import tableLayout from "@/layout/tableLayout";
import dayjs from "dayjs";
export default {
  data() {
    return {
      time: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      tableData: []
    };
  },
  components: {
    tableLayout
  }
};
</script>
<style lang="scss" scoped>
.time-style {
  text-align: center;
  font-size: 20px;
}
</style>