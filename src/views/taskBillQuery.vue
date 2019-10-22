<template>
  <div class="page">
    <el-dialog
      title="查询页面"
      :visible.sync="dialogTableVisible"
      width="100%"
      top="0"
      class="moduledDialog"
      @close="closeDialog"
      style="margin:0; height:100%"
    ></el-dialog>
    <div class="allPickingArea">
      <el-container>
        <el-header>
          <div class="pageTitle">任务清单</div>
        </el-header>
        <el-main>
          <el-container>
            <el-header>
              <el-form :inline="true" class="demo-form-inline pageForm">
                <el-form-item label="日期">
                  <el-date-picker
                    v-model="FDate"
                    type="date"
                    size="small"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd"
                    format="yyyy-MM-dd"
                  ></el-date-picker>
                </el-form-item>
              </el-form>
            </el-header>
            <el-main class="tableStyle">
              <el-table
                :data="taskBillData"
                height="100%"
                stripe
                border
                @row-dblclick="rowDblClick"
              >
                <el-table-column
                  v-for="(item,key) in taskBillColumn"
                  align="center"
                  :prop="item.prop"
                  :label="item.label"
                  :key="key"
                >
                  <template v-if="item.children">
                    <el-table-column
                      v-for="(items,key) in item.children"
                      :label="items.label"
                      :min-width="items.minWidth"
                      :prop="items.prop"
                      :key="key"
                    ></el-table-column>
                  </template>
                </el-table-column>
              </el-table>
            </el-main>
            <el-footer>
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-sizes="pagesizeDate"
                :page-size="pagesize"
                layout="total, sizes, prev, pager, next"
                :total="pageTotal"
                style="text-align: right"
              ></el-pagination>
            </el-footer>
          </el-container>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  data() {
    return {
      macNumber: "",
      taskNumber: "",
      FDate: dayjs().format("YYYY-MM-DD"),
      currentPage: 1,
      pagesize: 10,
      pagesizeDate: [10, 20, 50, 100],
      pageTotal: 0,
      taskBillData: [
        {
          FMacNumber: "1",
          FStaffNumber: "2",
          FTaskNumber: "3",
          FTaskQty: "4",
          FCusName: "5",
          FPartCode: "6",
          FPartName: "7",
          FBatchNumber: "8",
          FReportQty: "9",
          FPlanStartDate: "10",
          FPlanEndDate: "11",
          FWarnDate: "12",
          FNote: "13"
        }
      ],
      taskBillColumn: [
        { label: "机台号码", prop: "FMacNumber" },
        { label: "员工工号", prop: "FStaffNumber" },
        { label: "任务单号", prop: "FTaskNumber" },
        { label: "任务数量", prop: "FTaskQty" },
        { label: "客户名称", prop: "FCusName" },
        { label: "零件代码", prop: "FPartCode" },
        { label: "零件名称", prop: "FPartName" },
        { label: "生产批号", prop: "FBatchNumber" },
        { label: "汇报数量", prop: "FReportQty" },
        { label: "计划开工日", prop: "FPlanStartDate" },
        { label: "计划完工日", prop: "FPlanEndDate" },
        { label: "预警日期", prop: "FWarnDate" },
        { label: "摘要", prop: "FNote" }
      ],
      dialogTableVisible: false
    };
  },
  methods: {
    rowDblClick: function(row, column, cell, event) {
      this.dialogTableVisible = true;
    },
    closeDialog: function() {},
    handleSizeChange: function() {},
    handleCurrentChange: function() {}
  },
  mounted: function() {}
};
</script>