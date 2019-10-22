<template>
  <div class="page">
    <service-dialog :show.sync="show" :syncdata="asyncData"></service-dialog>
    <div class="allPickingArea">
      <el-container>
        <el-header>
          <div class="pageTitle">任务清单</div>
        </el-header>
        <el-main>
          <el-container>
            <el-header style="height:auto;">
              <el-form :inline="true" :model="taskForm" class="demo-form-inline pageForm">
                <el-form-item label="日期">
                  <el-date-picker
                    v-model="taskForm.FDate"
                    type="date"
                    size="small"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd"
                    format="yyyy-MM-dd"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item label="机台号码">
                  <el-input v-model="taskForm.FMacID" size="small" placeholder></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="taskQuery" size="small">查询</el-button>
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
import request from "~api/axios";
import dayjs from "dayjs";
import serviceDialog from "./taskListQueryDialog";
// import axios from "axios";

export default {
  components: {
    serviceDialog
  },
  data() {
    return {
      show: false,
      asyncData: {},
      taskForm: {
        FMacID: "",
        // taskNumber: "",
        FDate: dayjs().format("YYYY-MM-DD")
      },

      currentPage: 1,
      pagesize: 20,
      pagesizeDate: [20, 50, 100, 500],
      pageTotal: 0,
      taskBillData: [],
      taskBillColumn: [
        { label: "机台号码", prop: "FMacNo" },
        { label: "任务单号", prop: "FBillNo" },
        { label: "任务数量", prop: "FICMOQty" },
        { label: "客户名称", prop: "FCustName" },
        { label: "零件代码", prop: "FNumber" },
        { label: "零件名称", prop: "FName" },
        { label: "工序名称", prop: "FGongXuName" },
        { label: "生产批号", prop: "FBatchNO" },
        { label: "汇报数量", prop: "FGXCommitQty" },
        { label: "预警日期", prop: "FWarnDate" },
        { label: "摘要", prop: "FNote" }
      ]
    };
  },
  methods: {
    rowDblClick: function(row, column, cell, event) {
      this.show = true;
      this.asyncData = row;
    },
    handleSizeChange: function(pagesize) {
      this.pagesize = pagesize;
      this.getData();
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      this.getData();
    },
    getData: function() {
      let _this = this;
      let task = _this.taskForm;
      console.log(_this.taskForm);
      let taskArray = [];
      for (let key in task) {
        if (task[key] !== "" && task[key] !== null) {
          let taskObject = { Name: key, Type: "=", Value: task[key] };
          taskArray.push(taskObject);
        }
      }
      request
        .post("ICMO/GetPageList", {
          pageSize: _this.pagesize,
          pageNumber: _this.currentPage,
          conditions: taskArray
        })
        .then(res => {
          if (res.rows.length > 0) {
            let FData = res.rows;
            for (let i = 0; i < FData.length; i++) {
              if (
                isNaN(FData[i].FWarnDate) &&
                !isNaN(Date.parse(FData[i].FWarnDate))
              ) {
                FData[i].FWarnDate = dayjs(res.rows[i].FWarnDate).format(
                  "YYYY-MM-DD"
                );
              }
            }
            _this.taskBillData = FData;
            _this.pageTotal = res.total;
          }
        });
    },
    taskQuery: function() {
      this.getData();
    }
  },
  mounted: function() {}
};
</script>