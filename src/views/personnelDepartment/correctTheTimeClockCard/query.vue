<template>
  <tableLayout>
    <el-dialog
      v-if="dialogVisible"
      title="补卡单"
      :visible.sync="dialogVisible"
      :center="true"
      class="dialogHeight"
      :before-close="dialogClosed"
      :fullscreen="true"
    >
      <correctTheTimeClockCard :fInterID="fInterID" />
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
        <el-table-column prop="FBillDate" label="制单日期"></el-table-column>
        <el-table-column prop="Ffuzeren" label="点名负责人"></el-table-column>
        <el-table-column prop="FChecker" label="人事审批人"></el-table-column>
        <el-table-column prop="FEmpName" label="补卡人员"></el-table-column>
        <el-table-column prop="FDateTime" label="补卡时间"></el-table-column>
        <el-table-column prop="FReason" label="补卡原因"></el-table-column>
        <el-table-column prop="FNote" label="主管备注"></el-table-column>
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
import { repairQuery, repairDelete } from "~api/query";
import correctTheTimeClockCard from "./correctTheTimeClockCard";
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
        {
          label: "点名负责人",
          type: "text",
          field: "Ffuzeren",
          operator: "="
        }
      ],
      queryRequest: repairQuery,
      deleteRequest: repairDelete
    };
  },
  components: {
    correctTheTimeClockCard
  }
};
</script>