<template>
  <tableLayout>
    <el-dialog
      v-if="dialogVisible"
      title="日考勤结果确认单"
      :visible.sync="dialogVisible"
      :center="true"
      class="dialogHeight"
      :before-close="dialogClosed"
      :fullscreen="true"
    >
      <dailyAttendanceResultsConfirm :fInterID="fInterID" />
    </el-dialog>
    <btn
      slot="btn"
      :btnTexts="btnTexts"
      :isQuery="true"
      @btnDelete="btnDelete"
      @btnEdit="btnEdit"
      @btnAdd="btnAdd"
    />
    <LYform
      slot="header"
      :formOptions="formOptions"
      :IsQuery="true"
      @query="query"
      @update:formData="formData=$event"
      @uodate:loading="loading=$event"
    ></LYform>
    <template slot="center">
      <el-table
        :data="tableData"
        style="width: 100%"
        :border="true"
        height="100%"
        highlight-current-row
        @row-dblclick="rowDblclick"
        @current-change="rowClick"
        v-loading="loading"
      >
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="FBillNo" label="单号"></el-table-column>
        <el-table-column prop="FDate" label="当前日期"></el-table-column>
        <el-table-column prop="FBillDate" label="确认时间"></el-table-column>
        <el-table-column prop="Ffuzeren" label="确认人"></el-table-column>
        <el-table-column prop="FEmpName" label="所属人员"></el-table-column>
        <el-table-column prop="FZKRecord" label="打卡记录"></el-table-column>
        <el-table-column prop="FDMRecord" label="点名记录"></el-table-column>
        <el-table-column prop="FWorkHours" label="正班"></el-table-column>
        <el-table-column prop="FOverHours_Weekend" label="周末加班"></el-table-column>
        <el-table-column prop="FOverHours_Workday" label="平时加班"></el-table-column>
        <el-table-column prop="FLeaveType" label="请假类型"></el-table-column>
        <el-table-column prop="FLeavehours" label="请假小时"></el-table-column>
        <el-table-column prop="FNote" label="备注"></el-table-column>
      </el-table>
    </template>
    <el-pagination
      slot="footer"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="1"
      :page-sizes="[20, 50, 200, 500]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </tableLayout>
</template>
<script>
import { billQueryMixin } from "~mixins";
import { dailySureQuery, dailySureDelete } from "~api/query";
import dailyAttendanceResultsConfirm from "./dailyAttendanceResultsConfirm";
export default {
  mixins: [billQueryMixin],
  data() {
    return {
      formOptions: [
        { label: "单号", type: "text", field: "FBillNo", operator: "=" },
        {
          label: "制单日期",
          type: "datetime",
          field: "FBillDate",
          operator: ">="
        },
        { label: "点名负责人", type: "text", field: "Ffuzeren", operator: "=" }
      ],
      options: [
        {
          value: true,
          label: "是"
        },
        {
          value: false,
          label: "否"
        }
      ],
      queryRequest: dailySureQuery,
      deleteRequest: dailySureDelete
    };
  },
  components: {
    dailyAttendanceResultsConfirm
  }
};
</script>