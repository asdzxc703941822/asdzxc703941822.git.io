<template>
  <el-dialog
    title="职员档案"
    :visible.sync="visible"
    width="100%"
    @close="$emit('update:show', false)"
    :show="show"
    center
    class="dialogHeight page"
  >
    <el-container>
      <el-header style="height:auto;">
        <el-form :inline="true" :model="empForm" class="demo-form-inline pageForm">
          <el-form-item label="职员代码">
            <el-input v-model="empForm.FNumber" size="small" placeholder></el-input>
          </el-form-item>
          <el-form-item label="至">
            <el-input v-model="empForm.FNumber1" size="small" placeholder></el-input>
          </el-form-item>
          <el-form-item label="职员名称">
            <el-input v-model="empForm.FName" size="small" placeholder></el-input>
          </el-form-item>
          <el-form-item label="显示停职人员">
            <el-checkbox v-model="empForm.FDisabled" size="small">备选项</el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="Query" size="small">查询</el-button>
          </el-form-item>
        </el-form>
      </el-header>
      <el-container>
        <el-aside :width="isCollapse?'64px':'220px'">
          <el-radio-group v-model="isCollapse">
            <el-radio-button :label="false" :class="isCollapse ? 'activeShow' : 'activeNoShow' ">展开</el-radio-button>
            <el-radio-button :label="true" :class="isCollapse ? 'activeNoShow' : 'activeShow' ">收起</el-radio-button>
          </el-radio-group>
          <el-menu default-active="1" class="el-menu-vertical-demo" :collapse="isCollapse">
            <fragment v-for="(item, key) in empMenu" :key="key">
              <el-menu-item
                v-if="item.children.length === 0"
                :index="item.FNumber"
                @click="handleRoute(item.FItemID)"
              >
                <i class="el-icon-document"></i>
                <span slot="title">{{item.FNumberName}}</span>
              </el-menu-item>

              <el-submenu v-if="item.children.length > 0" :index="item.FNumber">
                <template slot="title">
                  <i class="el-icon-folder-opened"></i>
                  <span>{{item.FNumberName}}</span>
                </template>
                <fragment v-for="(items,key) in item.children" :key="key">
                  <el-menu-item :index="items.FNumber" @click="handleRoute(items.FItemID)">
                    <i class="el-icon-document"></i>
                    <span slot="title">{{items.FNumberName}}</span>
                  </el-menu-item>
                </fragment>
              </el-submenu>
            </fragment>
          </el-menu>
        </el-aside>
        <el-container :class="[isCollapse?'dialog-container-collapes':'dialog-container']">
          <el-main>
            <el-table :data="empTableData" height="100%" stripe border @row-dblclick="rowDblClick">
              <el-table-column
                v-for="(item,key) in empTableColumn"
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
      </el-container>
    </el-container>
  </el-dialog>
</template>
 
<script>
import request from "~api/axios";
export default {
  data() {
    return {
      visible: this.show,
      empForm: {
        FNumber: "",
        FNumber1: "",
        FName: "",
        FDisabled: "false"
      },

      isCollapse: false,
      empMenu: [],
      currentPage: 1,
      pagesize: 20,
      pagesizeDate: [20, 50, 100, 500],
      pageTotal: 0,
      empTableData: [],
      empTableColumn: [
        { label: "合同期限", prop: "FContractPeriod" },
        { label: "FDeptID", prop: "FDeptID" },
        { label: "部门名称", prop: "FDeptName" },
        { label: "职员代码", prop: "FNumber" },
        { label: "籍贯", prop: "FOriginPlace" },
        { label: "职员姓名", prop: "FName" },
        { label: "工号", prop: "FJobNumber" },
        { label: "职位", prop: "FPosition" },
        { label: "职员地址", prop: "FAddress" },
        { label: "身份证号", prop: "FID" },
        { label: "电话", prop: "FPhone" },
        { label: "手机号", prop: "FMobilePhone" },
        { label: "性别", prop: "FGender" },

        { label: "职称", prop: "FJobTitle" },
        { label: "助记码", prop: "FPYCode" },
        { label: "学历", prop: "FDegree" },
        { label: "毕业学校", prop: "FSchool" },
        { label: "邮箱", prop: "FEmail" },
        { label: "专业", prop: "FMajor" },
        { label: "入职日期", prop: "FHireDate" },
        { label: "婚姻", prop: "FMarriage" },
        { label: "生日", prop: "FBirthday" },
        { label: "户籍", prop: "FHousehold" },
        { label: "居住证有效期", prop: "FResidence" },
        { label: "是否停用", prop: "FDisabled" },
        { label: "FBarCode", prop: "FBarCode" },

        { label: "FLeaveDate", prop: "FLeaveDate" },
        { label: "FLeavingReason", prop: "FLeavingReason" },
        { label: "FIndustrialInjuryDate", prop: "FIndustrialInjuryDate" },
        { label: "FIsSettled", prop: "FIsSettled" },
        { label: "FItemID", prop: "FItemID" },
        { label: "FSafetyHelmetDate", prop: "FSafetyHelmetDate" },
        { label: "FProvidentFundDate", prop: "FProvidentFundDate" },
        { label: "备注", prop: "FNote" },
        { label: "FParentID", prop: "FParentID" },
        { label: "FParentNO", prop: "FParentNO" },
        { label: "FShoesDate", prop: "FShoesDate" },
        { label: "FSocialInsuranceDate", prop: "FSocialInsuranceDate" },
        { label: "FWorkServiceDate", prop: "FWorkServiceDate" }
      ]
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    show() {
      this.visible = this.show;
      if (this.visible === true) {
        this.getMenu();
      }
    }
  },
  methods: {
    rowDblClick: function(row, column, cell, event) {
      this.$emit("listenToParentEvent", row);
      this.visible = false;
    },
    Query: function() {
      this.handleRoute();
    },
    handleSizeChange: function(pagesize) {
      this.pagesize = pagesize;
      this.handleRoute();
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      this.handleRoute();
    },
    handleRoute: function(value) {
      let params = {};
      let _this = this;
      if (value) {
        params = {
          pageSize: _this.pagesize,
          pageNumber: _this.currentPage,
          conditions: [
            {
              Name: "FParentID",
              Type: "=",
              Value: value
            }
          ]
        };
      } else {
        let paramsArray = [];
        let allParams = [
          { name: "FNumber", type: ">=", value: _this.empForm.FNumber },
          { name: "FNumber", type: "<=", value: _this.empForm.FNumber1 },
          {
            name: "FName",
            type: "like",
            value: "%" + _this.empForm.FName + "%"
          },
          {
            name: "FDisabled",
            type: "like",
            value: "%" + _this.empForm.FDisabled + "%"
          }
        ];
        for (let i = 0; i < allParams.length; i++) {
          if (
            allParams[i].value !== "" &&
            allParams[i].value !== "%%" &&
            allParams[i].name !== "FDisabled"
          ) {
            paramsArray.push(allParams[i]);
          } else if (
            allParams[i].name === "FDisabled" &&
            allParams[i].value === "%true%"
          ) {
            paramsArray.push(allParams[i]);
          }
        }
        params = {
          pageSize: _this.pagesize,
          pageNumber: _this.currentPage,
          conditions: paramsArray
        };
      }
      request.post("Emp/GetPageList", params).then(res => {
        _this.empTableData = res.rows;
        _this.pageTotal = res.total;
      });
    },
    getMenu: function() {
      request.get("ItemClass/GetTreeList?FItemClassID=3").then(res => {
        this.empMenu = res;
      });
    }
  },
  mounted: function() {
    // this.getMenu();
  }
};
</script>
<style lang="scss" scoped>
.dialog-container {
  margin-left: 220px;
}
.dialog-container-collapes {
  margin-left: 64px;
}
.page .el-aside {
  height: calc(100% - 214px);
}
.page .el-aside .el-menu {
  width: inherit;
}
.activeShow {
  display: block;
}
.activeNoShow {
  display: none;
}
</style>
