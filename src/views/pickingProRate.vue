<template>
  <div class="page">
    <div class="pickingArea">
      <el-container>
        <el-header>
          <div class="pageTitle">领料进度看板-装配</div>
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
                <el-form-item label>
                  <el-input v-model="param" size="small" placeholder="模糊查询"></el-input>
                </el-form-item>
              </el-form>
            </el-header>
            <el-main class="tableStyle">
              <el-table :data="pickRateData" height="100%" stripe border>
                <el-table-column
                  v-for="(item,key) in pickRateColumn"
                  :prop="item.prop"
                  :label="item.label"
                  :key="key"
                  min-width="10%"
                  align="center"
                ></el-table-column>
                <el-table-column label="进度" align="center" min-width="10%">
                  <template slot-scope="scope">
                    <el-progress :percentage="scope.row.FProportion" :show-text="true"></el-progress>
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
    <div class="pickingArea">
      <el-container>
        <el-header>
          <div class="pageTitle">欠料表</div>
        </el-header>
        <el-main class="tableStyle" style="padding-top:10px;">
          <el-table :data="shortageData" height="100%" stripe border>
            <el-table-column
              v-for="(item,key) in shortageColumn"
              :prop="item.prop"
              :label="item.label"
              :key="key"
              :min-width="item.minWidth"
              align="center"
            ></el-table-column>
          </el-table>
        </el-main>
        <el-footer>
          <el-pagination
            @size-change="shortageHandleSizeChange"
            @current-change="shortageHandleCurrentChange"
            :current-page.sync="shortageCurrentPage"
            :page-sizes="shortagePagesizeDate"
            :page-size="shortagePagesize"
            layout="total, sizes, prev, pager, next"
            :total="shortagePageTotal"
            style="text-align: right"
          ></el-pagination>
        </el-footer>
      </el-container>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import request from "~api/axios";
export default {
  data() {
    return {
      param: "",
      FDate: dayjs().format("YYYY-MM-DD"),
      currentPage: 1,
      pagesize: 10,
      pagesizeDate: [10, 20, 50, 100],
      pageTotal: 0,
      pickRateData: [],
      pickRateColumn: [
        { prop: "FPickingApplyForm", label: "领料申请单" },
        { prop: "FPickingApplicant", label: "领料申请人" },
        { prop: "FPlanPickingDate", label: "计划领料日期" },
        { prop: "FPickingProcedure", label: "领料工序" },
        { prop: "FPickingLine", label: "领料行数" },
        { prop: "FAlready", label: "已领行数" }
      ],
      shortageCurrentPage: 1,
      shortagePagesize: 10,
      shortagePagesizeDate: [10, 20, 50, 100],
      shortagePageTotal: 0,
      shortageData: [],
      shortageColumn: [
        { label: "物料代码", prop: "FMaterialCode", minWidth: "10%" },
        { label: "物料名称", prop: "FMaterialName", minWidth: "20%" },
        { label: "欠料数量", prop: "FShortageQuantity", minWidth: "10%" },
        { label: "未到货数量", prop: "FUnarrivedQuantity", minWidth: "10%" },
        { label: "待入库数量", prop: "FPendingStorageNumber", minWidth: "10%" },
        { label: "已入库数量", prop: "FWarehousingNumber", minWidth: "10%" },
        { label: "备注", prop: "FNote", minWidth: "10%" }
      ]
    };
  },
  methods: {
    getData: function() {
      // request({
      //   url: "/newDiscoverapi.aspx",
      //   method: "post",
      //   params: {
      //     action: "shortageList",
      //     FDate: this.FDate,
      //     FParam: this.param,
      //     pagesize: this.pagesize,
      //     currentPage: this.currentPage
      //   }
      // })
      //   .then(res => {})
      //   .catch(function(err) {
      //     console.log(err);
      //   });
    },
    handleSizeChange: function() {},
    handleCurrentChange: function() {},
    shortageHandleSizeChange: function() {},
    shortageHandleCurrentChange: function() {}
  },
  mounted: function() {
    this.getData();
  }
};
</script>