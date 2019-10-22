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
        <el-table-column prop="FInPlace" label="到职确认">
          <template slot-scope="scope">
            <el-select v-model="scope.row.FInPlace" placeholder="请选择" :disabled="isdisabled">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
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
  RollCollAdd,
  RollCollUpdate,
  RollCollGet,
  RollCollAudit,
  RollCollUnAudit,
  RollColl
} from "~api/add";
export default {
  data() {
    return {
      addRquest: RollCollAdd,
      updateRquest: RollCollUpdate,
      getRquest: RollCollGet,
      auditRquest: RollCollAudit,
      unAuditRquest: RollCollUnAudit,
      formOptions: [
        { label: "当前日期", type: "datetime", field: "FBillDate" },
        {
          label: "点名类型",
          type: "select",
          field: "FType",
          dataSouce: [
            { value: "上班", label: "上班" },
            { value: "中途", label: "中途" },
            { value: "下班", label: "下班" }
          ],
          rule: [
            { required: true, message: "请选择点名类型", trigger: "change" }
          ]
        },
        { label: "点名负责人", type: "text", field: "Ffuzeren" },
        { label: "单号", type: "text", field: "FBillNo" }
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
          if(res.rows.length==0){
             this.$message({ message: "无所属人员", type: "warning" });
             return
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
