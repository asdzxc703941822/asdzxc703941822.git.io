<template>
  <tableLayout>
    <EmpRecord :show.sync="show" @listenToParentEvent="getEmpInOf" />
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
        <el-table-column prop="FEmpName" label="补卡人员">
          <template slot-scope="scope">
            <el-input v-model="scope.row.FEmpName" :readonly="isdisabled">
              <el-button
                slot="append"
                icon="el-icon-arrow-right"
                size="mini"
                @click="show=true"
                :disabled="isdisabled"
              ></el-button>
            </el-input>
          </template>
        </el-table-column>
        <el-table-column prop="FDateTime" label="补卡时间" width="245">
          <template slot-scope="scope">
            <el-date-picker v-model="scope.row.FDateTime" type="datetime" :readonly="isdisabled"></el-date-picker>
          </template>
        </el-table-column>
        <el-table-column prop="FReason" label="补卡原因">
          <template slot-scope="scope">
            <el-select v-model="scope.row.FReason" placeholder="请选择" :disabled="isdisabled">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="FNote" label="主管备注">
          <template slot-scope="scope">
            <el-input v-model="scope.row.FNote" :readonly="isdisabled"></el-input>
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
  repairAdd,
  repairUpdate,
  repairGet,
  repairAudit,
  repairUnAudit
} from "~api/add";
export default {
  mixins: [billAddMixin],
  data() {
    return {
      show: false,
      addRquest: repairAdd,
      updateRquest: repairUpdate,
      getRquest: repairGet,
      auditRquest: repairAudit,
      unAuditRquest: repairUnAudit,
      btnTexts: ["新增", "编辑", "保存", "审核", "反审", "增行", "删行"],
      formOptions: [
        { label: "制单日期", type: "datetime", field: "FBillDate" },
        { label: "点名负责人", type: "text", field: "Ffuzeren" },
        { label: "单号", type: "text", field: "FBillNo" },
        { label: "人事审批人", type: "text", field: "FChecker" }
      ],
      options: [
        { value: "事假", label: "事假" },
        { value: "病假", label: "病假" },
        { value: "迟到", label: "迟到" }
      ]
    };
  },
  methods: {
    getEmpInOf(row) {
      // console.log(row);
      let currentIndex = this.tableData.indexOf(this.currentRow);
      // this.tableData[currentIndex].FEmpName = row.FName;
      this.$set(this.tableData[currentIndex], "FEmpName", row.FName);
      this.$set(this.tableData[currentIndex], "FEmpID", row.FItemID);
    }
  },
  components: {
    EmpRecord
  }
};
</script>
