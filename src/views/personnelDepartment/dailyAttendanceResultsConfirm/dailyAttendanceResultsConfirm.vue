<template>
  <tableLayout>
    <btn
      slot="btn"
      :btnTexts="btnTexts"
      @btnAdd="btnAdd"
      @btnSave="btnSave"
      @btnAudit="btnAudit"
      @btnUnAudit="btnUnAudit"
      @btnRollColl="btnRollColl"
    />
    <LYform slot="header" :formOptions="formOptions" :formData.sync="formData" ref="LYform"></LYform>
    <template slot="center">
      <el-table :data="tableData" style="width: 100%" :border="true" height="100%">
        <el-table-column prop="FEmpName" label="所属人员"></el-table-column>
        <el-table-column prop="FZKRecord" label="打卡记录"></el-table-column>
        <el-table-column prop="FDMRecord" label="点名记录"></el-table-column>
        <el-table-column prop="FLate" label="迟到">
          <template slot-scope="scope">
            <el-input v-model="scope.row.FLate" :readonly="isdisabled"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="FEarly" label="早退">
          <template slot-scope="scope">
            <LYform
              class="table-form-style"
              :formOptions="FEarlyTableForm"
              :formData.sync="scope.row"
              ref="LYform"
            ></LYform>
            <!-- <el-input v-model="scope.row.FEarly" :readonly="isdisabled"></el-input> -->
          </template>
        </el-table-column>
        <el-table-column prop="FWorkHours" label="正班">
          <template slot-scope="scope">
            <el-input v-model="scope.row.FWorkHours" :readonly="isdisabled"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="FOverHours_Weekend" label="周末">
          <template slot-scope="scope">
            <el-input v-model="scope.row.FOverHours_Weekend" :readonly="isdisabled"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="FOverHours_Workday" label="加班">
          <template slot-scope="scope">
            <el-input v-model="scope.row.FOverHours_Workday" :readonly="isdisabled"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="FLeaveType" label="请假类型">
          <template slot-scope="scope">
            <el-input v-model="scope.row.FLeaveType" :readonly="isdisabled"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="FLeavehours" label="请假小时">
          <template slot-scope="scope">
            <el-input v-model="scope.row.FLeavehours" :readonly="isdisabled"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="FNote" label="备注">
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
import {
  dailySureAdd,
  dailySureUpdate,
  dailySureGet,
  dailySureAudit,
  dailySureUnAudit,
  RollColl
} from "~api/add";
export default {
  data() {
    return {
      addRquest: dailySureAdd,
      updateRquest: dailySureUpdate,
      getRquest: dailySureGet,
      auditRquest: dailySureAudit,
      unAuditRquest: dailySureUnAudit,
      formOptions: [
        { label: "当前日期", type: "datetime", field: "FBillDate" },
        { label: "点名负责人", type: "text", field: "Ffuzeren" },
        { label: "单号", type: "text", field: "FBillNo" },
        { label: "人事审批人", type: "text", field: "FChecker" }
      ],
      FEarlyTableForm: [
        {
          type: "text",
          field: "FEarly",
          rule: [
            { required: true, message: "请输入早退时间", trigger: "change" }
          ]
        }
      ],
      btnTexts: ["新增", "编辑", "保存", "审核", "反审", "获取所属人员"]
    };
  },
  mixins: [billAddMixin],
  methods: {
    btnRollColl() {
      if (
        this.commitDate.hasOwnProperty("Ffuzeren") &&
        this.commitDate.Ffuzeren
      ) {
        console.log(this.commitDate.Ffuzeren);
        RollColl({
          conditions: [
            { name: "Ffuzeren", type: "=", value: this.commitDate.Ffuzeren }
          ]
        }).then(res => {
          console.log(res);
          if (res.rows.length == 0) {
            this.$message({ message: "无所属人员", type: "warning" });
            return;
          }
          let data = res.rows.map(el => {
            return { FEmpID: el.FItemID, FEmpName: el.FName, FInPlace: true };
          });
          this.tableData = data;
        });
      } else {
        this.$message({ message: "请先输入负责人", type: "warning" });
      }
    }
  }
};
</script>
