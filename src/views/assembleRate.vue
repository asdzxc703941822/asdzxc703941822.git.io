<template>
  <div class="page">
    <div class="allPickingArea">
      <el-container>
        <el-header>
          <div class="pageTitle">装配进度看板看板-装配</div>
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
              </el-form>
            </el-header>
            <el-main class="tableStyle">
              <el-table
                :data="assembleRateData"
                height="100%"
                :span-method="objectSpanMethod"
                :cell-style="cellStyle"
                stripe
                border
              >
                <el-table-column
                  v-for="(item,key) in assembleRateColumn"
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
      spanArr: [],
      pos: null,
      assembleRateData: [
        // {
        //   FMacNumber: "aaa",
        //   FName: "a",
        //   FDeliveryDate: "1",
        //   FOrderNumber: "2",
        //   FDrive: "1",
        //   FPanel: "2",
        //   FElectrical: "3",
        //   FProtect: "333",
        //   FFinalAssembly: "",
        //   FSampleCup: "",
        //   FDismantleMac: "",
        //   FPack: "",
        //   FCusAcceptance: ""
        // },
        // {
        //   FMacNumber: "aaa",
        //   FName: "a",
        //   FDeliveryDate: "1",
        //   FOrderNumber: "2",
        //   FDrive: "1",
        //   FPanel: "2",
        //   FElectrical: "3",
        //   FProtect: "333",
        //   FFinalAssembly: "",
        //   FSampleCup: "",
        //   FDismantleMac: "",
        //   FPack: "",
        //   FCusAcceptance: ""
        // },
        // {
        //   FMacNumber: "aaa",
        //   FName: "a",
        //   FDeliveryDate: "1",
        //   FOrderNumber: "2",
        //   FDrive: "1",
        //   FPanel: "2",
        //   FElectrical: "3",
        //   FProtect: "333",
        //   FFinalAssembly: "",
        //   FSampleCup: "",
        //   FDismantleMac: "",
        //   FPack: "",
        //   FCusAcceptance: ""
        // },
        // {
        //   FMacNumber: "aaa",
        //   FName: "a",
        //   FDeliveryDate: "1",
        //   FOrderNumber: "2",
        //   FDrive: "1",
        //   FPanel: "2",
        //   FElectrical: "3",
        //   FProtect: "333",
        //   FFinalAssembly: "",
        //   FSampleCup: "",
        //   FDismantleMac: "",
        //   FPack: "",
        //   FCusAcceptance: ""
        // },
        // {
        //   FMacNumber: "aaa",
        //   FName: "a",
        //   FDeliveryDate: "1",
        //   FOrderNumber: "2",
        //   FDrive: "1",
        //   FPanel: "2",
        //   FElectrical: "3",
        //   FProtect: "333",
        //   FFinalAssembly: "",
        //   FSampleCup: "",
        //   FDismantleMac: "",
        //   FPack: "",
        //   FCusAcceptance: ""
        // },
        // {
        //   FMacNumber: "aaa",
        //   FName: "a",
        //   FDeliveryDate: "1",
        //   FOrderNumber: "2",
        //   FDrive: "1",
        //   FPanel: "2",
        //   FElectrical: "3",
        //   FProtect: "333",
        //   FFinalAssembly: "",
        //   FSampleCup: "",
        //   FDismantleMac: "",
        //   FPack: "",
        //   FCusAcceptance: ""
        // },
        // {
        //   FMacNumber: "aaa",
        //   FName: "a",
        //   FDeliveryDate: "1",
        //   FOrderNumber: "2",
        //   FDrive: "1",
        //   FPanel: "2",
        //   FElectrical: "3",
        //   FProtect: "333",
        //   FFinalAssembly: "",
        //   FSampleCup: "",
        //   FDismantleMac: "",
        //   FPack: "",
        //   FCusAcceptance: ""
        // },
        // {
        //   FMacNumber: "aaa",
        //   FName: "a",
        //   FDeliveryDate: "1",
        //   FOrderNumber: "2",
        //   FDrive: "",
        //   FPanel: "2",
        //   FElectrical: "3",
        //   FProtect: "333",
        //   FFinalAssembly: "",
        //   FSampleCup: "",
        //   FDismantleMac: "",
        //   FPack: "",
        //   FCusAcceptance: ""
        // }
      ],
      assembleRateColumn: [
        { label: "机器编号", prop: "FMacNumber", minWidth: "10%" },
        { label: "名称", prop: "FName", minWidth: "30%" },
        { label: "交货期", prop: "FDeliveryDate", minWidth: "10%" },
        { label: "订单号", prop: "FOrderNumber", minWidth: "10%" },
        {
          label: "装配",
          prop: "FAssemble",
          children: [
            { label: "传动", prop: "FDrive", minWidth: "10%" },
            { label: "面板", prop: "FPanel", minWidth: "10%" },
            { label: "电气", prop: "FElectrical", minWidth: "10%" },
            { label: "防护罩", prop: "FProtect", minWidth: "10%" }
          ]
        },
        {
          label: "调试",
          prop: "FDebugg",
          children: [
            { label: "总装", prop: "FFinalAssembly", minWidth: "10%" },
            { label: "出样杯", prop: "FSampleCup", minWidth: "10%" },
            { label: "拆机", prop: "FDismantleMac", minWidth: "10%" },
            { label: "打包", prop: "FPack", minWidth: "10%" },
            { label: "客户验收", prop: "FCusAcceptance", minWidth: "10%" }
          ]
        }
      ]
    };
  },
  methods: {
    handleSizeChange: function() {},
    handleCurrentChange: function() {},
    getSpanArr(data) {
      this.spanArr.splice(0, this.spanArr.length);
      for (let i = 0; i < data.length; i++) {
        if (i === 0) {
          this.spanArr.push(1);
          this.pos = 0;
        } else {
          // 判断当前元素与上一个元素是否相同
          if (
            data[i].FMacNumber !== undefined &&
            data[i].FMacNumber === data[i - 1].FMacNumber
          ) {
            this.spanArr[this.pos] += 1;
            this.spanArr.push(0);
          } else {
            this.spanArr.push(1);
            this.pos = i;
          }
        }
      }
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (
        column.property === "FMacNumber" ||
        column.property === "FName" ||
        column.property === "FDeliveryDate" ||
        column.property === "FOrderNumber"
      ) {
        if (this.spanArr[rowIndex]) {
          return {
            rowspan: this.spanArr[rowIndex],
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
    },
    cellStyle({ row, column, rowIndex, columnIndex }) {
      if (
        rowIndex % 2 === 0 &&
        this.assembleRateData[rowIndex + 1][column.property] !== ""
      ) {
        const cellValue = row[column.property];
        const nextCellValue = this.assembleRateData[rowIndex + 1][
          column.property
        ];
        return `background:${
          cellValue >= nextCellValue ? "#67C23A" : "#EEEE00"
        }`; // #67C23A 绿色 #EEEE00 黄色
      }
      if (
        rowIndex % 2 === 0 &&
        row[column.property] !== "" &&
        this.assembleRateData[rowIndex + 1][column.property] === "" &&
        columnIndex > 3 &&
        row[column.property] <= dayjs().format("YYYY-MM-DD")
      ) {
        return "background: #F56C6C";
      }
    }
  },
  mounted: function() {
    let _this = this;
    _this.getSpanArr(_this.assembleRateData);
  }
};
</script>