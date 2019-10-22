<template>
  <tableLayout>
    <EmpRecord :show.sync="show " @listenToParentEvent="getEmpInOf" />
    <btn
      slot="btn"
      :btnTexts="btnTexts"
      @btnSave="btnSave"
      @btnAudit="btnAudit"
      @btnUnAudit="btnUnAudit"
      @btnAdd="btnAdd"
      @btnAddRow="btnAddRow"
      @btnDeleteRow="btnDeleteRow"
    />
    <LYform slot="header" :formOptions="formOptions" :formData.sync="formData" ref="LYform"></LYform>
    <template slot="center">
      <el-table
        :data="tableData"
        style="width: 100%"
        :border="true"
        height="100%"
        highlight-current-row
        @current-change="currentChange"
      >
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="FEmpName" label="请假人员">
          <template slot-scope="scope">
            <LYform
              class="table-form-style"
              :formOptions="empTableForm"
              :formData.sync="scope.row"
              ref="LYform"
            ></LYform>
            <!-- <el-input v-model="scope.row.FEmpName" :readonly="isdisabled">
              <el-button
                slot="append"
                icon="el-icon-arrow-right"
                size="mini"
                @click="show=true"
                :disabled="isdisabled"
              ></el-button>
            </el-input>-->
          </template>
        </el-table-column>
        <el-table-column prop="FBeginDate" label="请假开始时间" width="245">
          <template slot-scope="scope">
            <el-date-picker v-model="scope.row.FBeginDate" type="datetime" :readonly="isdisabled"></el-date-picker>
          </template>
        </el-table-column>
        <el-table-column prop="FEndDate" label="请假结束时间" width="245">
          <template slot-scope="scope">
            <el-date-picker v-model="scope.row.FEndDate" type="datetime" :readonly="isdisabled"></el-date-picker>
          </template>
        </el-table-column>
        <el-table-column prop="FLeaveType" label="请假类型">
          <template slot-scope="scope">
            <el-select v-model="scope.row.FLeaveType" placeholder="请选择" :disabled="isdisabled">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="FLeaveHours" label="请假小时">
          <template slot-scope="scope">
            <el-input v-model="scope.row.FLeavehours" :readonly="isdisabled"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="FLeaveReason" label="请假原因">
          <template slot-scope="scope">
            <el-input v-model="scope.row.FLeaveReason" :readonly="isdisabled"></el-input>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </tableLayout>
</template>

<script>
import { billAddMixin } from "~mixins";
import EmpRecord from "~views/baseData/empFiles";
import {
  LeaveAdd,
  LeaveUpdate,
  LeaveGet,
  LeaveAudit,
  LeaveUnAudit,
  getLeaveType
} from "~api/add";
export default {
  mixins: [billAddMixin],
  data() {
    return {
      show: false,
      addRquest: LeaveAdd,
      updateRquest: LeaveUpdate,
      getRquest: LeaveGet,
      auditRquest: LeaveAudit,
      unAuditRquest: LeaveUnAudit,
      btnTexts: ["新增", "编辑", "保存", "审核", "反审", "增行", "删行"],
      formOptions: [
        { label: "制单日期", type: "datetime", field: "FBillDate" },
        { label: "点名负责人", type: "text", field: "Ffuzeren" },
        { label: "单号", type: "text", field: "FBillNo" },
        { label: "人事审批人", type: "text", field: "FChecker" }
      ],
      empTableForm: [
        {
          type: "btnText",
          field: "FEmpName",
          fn: this.openDialog,
          rule: [{ required: true, message: "请选择职员", trigger: "change" }]
        }
      ],
      options: [
        { value: "事假", label: "事假" },
        { value: "病假", label: "病假" },
        { value: "迟到", label: "迟到" }
      ]
    };
  },
  methods: {
    openDialog() {
      this.show = true;
    },
    getEmpInOf(row) {
      // console.log(row);
      let currentIndex = this.tableData.indexOf(this.currentRow);
      // this.tableData[currentIndex].FEmpName = row.FName;
      this.$set(this.tableData[currentIndex], "FEmpName", row.FName);
      this.$set(this.tableData[currentIndex], "FEmpID", row.FItemID);
    }
  },
  mounted() {
    let conditions = {
      conditions: [{ name: "FTypeID", type: "=", value: 101 }],
      pageNumber: 1,
      pageSize: 10000
    };
    getLeaveType(conditions).then(res => {
      console.log(res);
      this.options = res.rows.map(el => {
        return { value: el.FName, label: el.FName };
      });
    });
  },
  components: {
    EmpRecord
  }
};
</script>
