<template>
  <div class="page">
    <div class="allPickingArea">
      <el-container>
        <el-header>
          <div class="pageTitle">机加工任务进度看板</div>
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
                <el-form-item label="机器编号">
                  <el-input v-model="macNumber" size="small" placeholder></el-input>
                </el-form-item>
                <el-form-item label="任务单号">
                  <el-input v-model="taskNumber" size="small" placeholder></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="rankQuery" size="small">查询</el-button>
                </el-form-item>
              </el-form>
            </el-header>
            <el-main class="tableStyle">
              <el-table :data="machinRateData" height="100%" stripe border>
                <el-table-column
                  v-for="(item,key) in machinRateColumn"
                  align="center"
                  :prop="item.prop"
                  :label="item.label"
                  :min-width="item.minWidth"
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
      machinRateData: [],
      machinRateColumn: [
        { label: "设备编号", prop: "FEquNumber", minWidth: "10%" },
        { label: "任务单号", prop: "FTaskNumber", minWidth: "10%" },
        { label: "零件编号", prop: "FPartNumber", minWidth: "10%" },
        { label: "零件名称", prop: "FPartName", minWidth: "20%" },
        { label: "零件数量", prop: "FPartQuantity", minWidth: "10%" },
        { label: "预计工时", prop: "FEstimateHour", minWidth: "10%" },
        { label: "完工数量", prop: "FFinsishedNumber", minWidth: "10%" },
        { label: "未完工数量", prop: "FNotFinsishedNumber", minWidth: "10%" },
        { label: "实际完工时长", prop: "FActualComTime", minWidth: "10%" },
        { label: "稼动率", prop: "FCroMobility", minWidth: "10%" }
      ]
    };
  },
  methods: {
    handleSizeChange: function() {},
    handleCurrentChange: function() {},
    rankQuery: function() {}
  },
  mounted: function() {}
};
</script>