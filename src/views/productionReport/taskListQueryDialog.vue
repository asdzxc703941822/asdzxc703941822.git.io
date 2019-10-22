<template>
  <div>
    <empfiles-dialog :show.sync="empShow" @listenToParentEvent="showDataFromChild"></empfiles-dialog>
    <el-dialog
      title="计加工产量汇报"
      :visible.sync="visible"
      width="100%"
      :fullscreen="true"
      @close="$emit('update:show', false)"
      :show="show"
      center
      class="dialogHeight"
    >
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
            <el-form-item label="计时" style="float:right;">
              <el-input v-model="FTime" size="small" placeholder></el-input>
            </el-form-item>
          </el-form>
        </el-header>
        <el-main>
          <div class="taskListTable" :model="tableData">
            <table border="1" width="100%" cellspacing="0">
              <tr>
                <td>机台号码</td>
                <td>{{tableData.FMacNo}}</td>
                <td>员工</td>
                <td>
                  <div
                    style="width:calc(100% - 20px); float:left;height:100%;display: flex;justify-content: center;align-items: center;"
                  >{{tableData.FEmpName}}</div>
                  <el-button
                    @click="empClick"
                    type="info"
                    plain
                    icon="el-icon-arrow-right"
                    style="float: right;
                    padding: 0;
                    height: 100%;
                    width:20px;
                    box-sizing: border-box;
                    border-radius: 0;
                    border: 0;
                    border-left: 1px solid #DCDFE6;"
                  ></el-button>
                </td>
                <td>任务单号</td>
                <td>{{tableData.FBillNo}}</td>
                <td>任务数量</td>
                <td>{{tableData.FICMOQty}}</td>
              </tr>
              <tr>
                <td>客户名称</td>
                <td colspan="3">{{tableData.FCustName}}</td>
                <td>零件代码</td>
                <td>{{tableData.FNumber}}</td>
                <td>零件名称</td>
                <td>{{tableData.FName}}</td>
              </tr>
              <tr>
                <td>生产批号</td>
                <td>{{tableData.FBatchNO}}</td>
                <td>汇报数量</td>
                <td>
                  <el-input v-model="tableData.FGXCommitQty" placeholder></el-input>
                </td>
                <td>计划开工日</td>
                <td>{{tableData.FPlanBegDate}}</td>
                <td>计划完工日</td>
                <td>{{tableData.FPlanEndDate}}</td>
              </tr>
              <tr>
                <td>预警日期</td>
                <td>{{tableData.FWarnDate}}</td>
                <td>摘要</td>
                <td colspan="5">{{tableData.FNote}}</td>
              </tr>
              <tr>
                <td>准备时间</td>
                <td>{{tableData.FBegReadTime}}</td>
                <td>准备时长(分钟)</td>
                <td>{{tableData.FReadyTime}}</td>
                <td>开工时间</td>
                <td>{{tableData.FBegWorkTime}}</td>
                <td>完工时长(分钟)</td>
                <td>{{tableData.FWorkTime}}</td>
              </tr>
            </table>
          </div>
          <div class="taskListImg">
            <el-image :src="imgSrc" :preview-src-list="srcList"></el-image>
          </div>
        </el-main>
        <el-footer>
          <div class="dialog-footer" style="display:flex;justify-content:space-between">
            <el-button type="warning" @click="start">准备</el-button>
            <el-button type="primary" @click="reset">开工</el-button>
            <el-button type="success" @click="stop">完工</el-button>
          </div>
        </el-footer>
      </el-container>
      <!-- <div class="dialog-footer" style="display:flex;justify-content:space-between">
        <el-button type="warning" @click="start">准备</el-button>
        <el-button type="primary" @click="reset">开工</el-button>
        <el-button type="success" @click="stop">完工</el-button>
      </div>-->
    </el-dialog>
  </div>
</template>
 
<script>
import empfilesDialog from "../baseData/empFiles";
import dayjs from "dayjs";
import { selectOrderMappers, handleData } from "@/assets/js/ICTableInfo.js";
import request from "~api/axios";
import { parse } from "path";
export default {
  components: {
    empfilesDialog
  },
  data() {
    return {
      empShow: false,
      visible: this.show,
      FDate: dayjs().format("YYYY-MM-DD"),
      FTime: "",
      tableData: {
        // FMacID: "",
        // FJobNumber: "",
        // FBillNo: "",
        // FICMOQty: "",
        // FCustName: "",
        // FNumber: "",
        // FName: "",
        // FBatchNo: "",
        // FReportQty: "",
        // FPlanBegDate: "",
        // FPlanEndDate: "",
        // FWarnDate: "",
        // FNote: "",
        // FBegReadTime: "",
        // FReadyTime: "",
        // FBegWorkTime: "",
        // FWorkTime: "",
        // FEndWorkTime: ""
      },
      tableDataMappers: {},
      imgSrc: "",
      srcList: [],
      h: 0, //定义时，分，秒，毫秒并初始化为0；
      m: 0,
      ms: 0,
      s: 0,
      time: 0,
      finterID: "",
      startNode: "",
      resetNode: ""
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    syncdata: {
      type: Object,
      required: true
    }
  },
  watch: {
    show() {
      this.visible = this.show;
      if (this.visible === false && this.time) {
        clearInterval(this.time);
      }
    },
    syncdata() {
      this.tableData = this.syncdata;

      let url = "ICMO/GetICMOImage?fInterID=";
      debugger;
      let dataString = url + this.tableData.FInterID;
      this.imgSrc = dataString;
      this.srcList.splice(0, this.srcList.length);
      this.srcList.push(this.imgSrc);
    }
  },
  methods: {
    showDataFromChild(data) {
      console.log(data);
      this.tableData.FEmpName = data.FName;
      this.tableData.FEmpNO = data.FNumber;
      this.tableData.FDeptName = data.FDeptName;
    },
    timer() {
      this.ms = this.ms + 1000;
      if (this.ms >= 1000) {
        this.ms = 0;
        this.s = this.s + 1;
      }
      if (this.s >= 60) {
        this.s = 0;
        this.m = this.m + 1;
      }
      if (this.m >= 60) {
        this.m = 0;
        this.h = this.h + 1;
      }
      this.FTime =
        this.toDub(this.h) +
        ":" +
        this.toDub(this.m) +
        ":" +
        this.toDub(this.s) +
        "";
    },

    start() {
      //开始  准备
      if (this.startNode !== "1") {
        if (this.time) {
          clearInterval(this.time);
        }
        this.time = setInterval(this.timer, 1000);
        console.log(this.tableData);
        this.tableDataMappers = handleData(
          selectOrderMappers().get("机加工产量汇报"),
          this.tableData
        );
        request.post("ICMODaily/Add", this.tableDataMappers).then(res => {
          if (res !== false) {
            this.finterID = res.FInterID;
            this.startNode = "1";
            this.$set(
              this.tableData,
              "FBegReadTime",
              dayjs().format("HH:mm:ss")
            );
          }

          // this.tableData.FBegReadTime = dayjs().format("HH:mm:ss");
        });
      } else {
        this.$message({
          message: "已准备，请勿重复准备",
          type: "warning"
        });
      }
    },
    reset() {
      //重置  开工
      if (this.resetNode !== "1" && this.startNode === "1") {
        let startWorkUrl = "ICMODaily/StartWork?finterID=";
        let dataString = startWorkUrl + this.finterID;
        let getkUrl = "ICMODaily/Get?finterID=";
        let getString = getkUrl + this.finterID;

        request.post(dataString).then(res => {
          if (res !== false) {
            this.resetNode = "1";
            // this.tableData.FReadyTime = this.FTime;
            // this.tableData.FBegWorkTime = dayjs().format("HH:mm:ss");
            this.h = 0;
            this.m = 0;
            this.ms = 0;
            this.s = 0;
            this.FTime = "00:00:00";
            if (this.time) {
              clearInterval(this.time);
            }
            this.time = setInterval(this.timer, 1000);
          }
        });

        request.get(getString).then(res => {
          this.tableData.FDate = this.FDate;
          let getObject = Object.assign(this.tableData, res);
          this.tableData = getObject;
        });
      } else {
        this.$message({
          message: "请先准备或已开工，请勿重复开工",
          type: "warning"
        });
      }
    },
    stop() {
      //暂停  完工
      if (this.resetNode === "1") {
        // let url =
        //   "http://192.168.1.99:53559/api/ICMODaily/FinishWork?finterID=";
        // let dataString = url + this.finterID;
        request
          .post("ICMODaily/FinishWork", {
            FInterID: this.finterID,
            FQty: this.tableData.FGXCommitQty
          })
          .then(res => {
            this.$set(this.tableData, "FWorkTime", this.FTime);
            this.$set(
              this.tableData,
              "FEndWorkTime",
              dayjs().format("HH:mm:ss")
            );
            clearInterval(this.time);
            this.$parent.getData();
            this.visible = false;
          });
      } else {
        this.$message({
          message: "尚未开工，请按操作流程执行",
          type: "warning"
        });
      }
    },
    toDub(n) {
      //补0操作
      if (n < 10) {
        return "0" + n;
      } else {
        return "" + n;
      }
    },
    empClick() {
      this.empShow = true;
    }
  },
  mounted: function() {}
};
</script>
<style>
.taskListTable {
  height: 40%;
}
.taskListTable table {
  height: 100%;
}
.taskListTable td {
  width: 12.5%;
  text-align: center;
}
.taskListTable .el-input__inner {
  height: auto;
  line-height: 1;
  border-radius: 0;
  border: none;
}
.taskListImg {
  /* margin-top: 10px; */
  width: 100%;
  height: 60%;
}
.taskListImg .el-image {
  width: auto !important;
  height: 100% !important;
  display: block;
}
.taskListImg .el-image img {
  height: inherit;
  width: auto;
}
.taskListImg .el-image-viewer__canvas img {
  width: auto !important;
  height: 100% !important;
}
</style>
</style>
