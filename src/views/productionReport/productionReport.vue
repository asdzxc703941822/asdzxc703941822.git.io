<template>
  <div class="page">
    <div class="allPickingArea">
      <el-container>
        <el-header>
          <div class="pageTitle">产量汇报</div>
        </el-header>
        <el-main>
          <el-container>
            <el-header style="height:auto;">
              <el-form :inline="true" :model="proForm" class="demo-form-inline pageForm">
                <el-form-item label="日期">
                  <el-date-picker
                    v-model="proForm.FDate"
                    type="date"
                    size="small"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd"
                    format="yyyy-MM-dd"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item label="汇报人">
                  <el-input v-model="proForm.FName" size="small" placeholder></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="taskQuery" size="small">查询</el-button>
                </el-form-item>
              </el-form>
            </el-header>
            <el-main class="tableStyle">
              <el-table :data="proReportData" height="100%" stripe border>
                <el-table-column
                  v-for="(item,key) in proReportColumn"
                  align="center"
                  :prop="item.prop"
                  :label="item.label"
                  :key="key"
                ></el-table-column>
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
export default {
  data() {
    return {
      proForm: {
        FDate: dayjs().format("YYYY-MM-DD"),
        FName: ""
      },

      proReportData: [],
      proReportColumn: [
        { label: "部门", prop: "FDeptName" },
        { label: "完工日期", prop: "FDate" },
        { label: "生产批号", prop: "FBatchNO" },
        { label: "职员", prop: "FEmpName" },
        { label: "物料编码", prop: "FNumber" },
        { label: "工序号", prop: "FGongXuNO" },
        { label: "准备时长(分钟)", prop: "FReadyTime" },
        { label: "完工时长(分钟)", prop: "FWorkTime" },
        { label: "数量", prop: "FQty" },
        { label: "名称", prop: "FName" },
        { label: "规格", prop: "FModel" },
        { label: "工序名称", prop: "FGongXuName" },
        { label: "备注", prop: "FNote" }
      ],
      currentPage: 1,
      pagesize: 20,
      pagesizeDate: [20, 50, 100, 500],
      pageTotal: 0
    };
  },
  methods: {
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

      let task = _this.proForm;
      let taskArray = [];
      for (let key in task) {
        if (task[key] !== "" && task[key] !== null) {
          let taskObject = { Name: key, Type: "=", Value: task[key] };
          taskArray.push(taskObject);
        }
      }
      request
        .post("ICMODaily/GetPageList", {
          pageSize: _this.pagesize,
          pageNumber: _this.currentPage,
          conditions: taskArray
        })
        .then(res => {
          if (res.rows.length > 0) {
            let FData = res.rows;
            for (let i = 0; i < FData.length; i++) {
              if (isNaN(FData[i].FDate) && !isNaN(Date.parse(FData[i].FDate))) {
                FData[i].FDate = dayjs(res.rows[i].FDate).format("YYYY-MM-DD");
              }
            }
            _this.proReportData = FData;
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