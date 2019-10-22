<template>
  <tableLayout>
    <el-dialog
      class="dialogHeight"
      v-if="dialogVisible"
      title="点名单"
      :visible.sync="dialogVisible"
      :center="true"
      :before-close="dialogClosed"
      :fullscreen="true"
    >
      <TheRollCall ref="billAdd" :fInterID="fInterID" />
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
      @update:formData="formData=$event "
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
        <el-table-column prop="FBillDate" label="点名日期"></el-table-column>
        <el-table-column prop="FType" label="点名类型"></el-table-column>
        <el-table-column prop="Ffuzeren" label="点名负责人"></el-table-column>
        <el-table-column prop="FEmpName" label="所属人员"></el-table-column>
        <el-table-column prop="FZKRecord" label="打卡记录"></el-table-column>
        <el-table-column prop="FInPlace" label="到职确认">
          <template slot-scope="scope">
            <el-select v-model="scope.row.FInPlace" :disabled="true">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
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
import { RollCollQuery, RollCollDelete } from "~api/query";
import TheRollCall from "./theRollCall";
export default {
  mixins: [billQueryMixin],
  data() {
    return {
      formOptions: [
        { label: "单号", type: "text", field: "FBillNo", operator: "=" },
        {
          label: "点名日期",
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
      queryRequest: RollCollQuery,
      deleteRequest: RollCollDelete
    };
  },
  components: {
    TheRollCall
  }
};
</script>