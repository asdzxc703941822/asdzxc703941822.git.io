<template>
  <tableLayout>
    <el-dialog
      v-if="dialogVisible"
      title="请假单"
      :visible.sync="dialogVisible"
      :center="true"
      class="dialogHeight"
      :before-close="dialogClosed"
      :fullscreen="true"
    >
      <noteForLeave :fInterID="fInterID" />
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
        <el-table-column prop="FBillDate" label="制单日期"></el-table-column>
        <el-table-column prop="Ffuzeren" label="点名负责人"></el-table-column>
        <el-table-column prop="FChecker" label="人事审批人"></el-table-column>
        <el-table-column prop="FEmpName" label="请假人员"></el-table-column>
        <el-table-column prop="FBeginDate" label="请假开始时间"></el-table-column>
        <el-table-column prop="FEndDate" label="请假结束时间"></el-table-column>
        <el-table-column prop="FLeaveType" label="请假类型"></el-table-column>
        <el-table-column prop="FLeaveHours" label="请假小时"></el-table-column>
        <el-table-column prop="FLeaveReason" label="请假原因"></el-table-column>
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
import { LeaveQuery, LeaveDelete } from "~api/query";
import noteForLeave from "./leave";
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
      queryRequest: LeaveQuery,
      deleteRequest: LeaveDelete
    };
  },
  components: {
    noteForLeave
  }
};
</script>