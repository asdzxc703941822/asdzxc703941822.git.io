import tableLayout from "~layout/tableLayout";
import btn from "~@/button";
import LYform from "~@/form";

import dayjs from "dayjs";

export const billAddMixin = {
  data() {
    return {
      isdisabled: false, //控制新增页面网格中的表单禁用状态
      btnTexts: ["新增", "编辑", "保存", "审核", "反审"],
      tableData: [],
      currentRow: {},
      deletRowStack: [],
      formData: { FBillDate: dayjs().format("YYYY-MM-DD HH:mm:ss"), Ffuzeren: localStorage.getItem("account") }
    };
  },
  props: ["fInterID"],
  components: {
    tableLayout,
    btn,
    LYform
  },
  methods: {
    getBillData(fInterID) {
      this.getRquest(fInterID).then(res => {
        // this.$store.commit("formData", res);
        this.formData = res;
        this.tableData = res.Entries;
        this.$store.commit("billStatus", res.FStatus ? process.env.VUE_APP_CHECKED : process.env.VUE_APP_BROWSE);
      });
    },
    btnAdd() {
      // this.$store.commit("formData", {});
      this.formData = { FBillDate: dayjs().format("YYYY-MM-DD HH:mm:ss"), Ffuzeren: localStorage.getItem("account") };
      this.tableData = [];
      this.$store.commit("billStatus", process.env.VUE_APP_ADD);
    },
    btnSave() {
      //表单验证方法
      this.$refs.LYform.$refs.form.validate().then(res => {
        if (res) {
          if (this.billStatus === process.env.VUE_APP_ADD) {
            // console.log(this.commitDate);
            this.addRquest(this.commitDate).then(res => {
              if (res === false) return;
              this.getRquest(res).then(res => {
                // this.$store.commit("formData", res);
                this.formData = res;
                this.tableData = res.Entries;
                this.$store.commit("billStatus", process.env.VUE_APP_BROWSE);
                this.$message({ type: "success", message: "保存成功" });
              });
            });
          } else if (this.billStatus === process.env.VUE_APP_EDIT) {
            this.commitDate.Entries.forEach(el => {
              if (!el.EntryState) el.EntryState = 2;
            });
            if (this.deletRowStack.length > 0) {
              this.commitDate.Entries = this.commitDate.Entries.concat(this.deletRowStack);
            }
            this.updateRquest(this.commitDate).then(res => {
              if (res === false) return;
              this.getRquest({ fInterID: this.commitDate.FInterID }).then(res => {
                // this.$store.commit("formData", res);
                this.formData = res;
                this.tableData = res.Entries;
                this.$store.commit("billStatus", process.env.VUE_APP_BROWSE);
                this.$message({ type: "success", message: "保存成功" });
              });
            });
          }
        }
      });
    },
    btnAudit() {
      this.auditRquest({ fInterID: this.commitDate.FInterID }).then(res => {
        if (res) {
          this.$store.commit("billStatus", process.env.VUE_APP_CHECKED);
          this.$message({ type: "success", message: "审核成功" });
        }
      });
    },
    btnUnAudit() {
      this.unAuditRquest({ fInterID: this.commitDate.FInterID }).then(res => {
        if (res) {
          this.$store.commit("billStatus", process.env.VUE_APP_BROWSE);
          this.$message({ type: "success", message: "反审核成功" });
        }
      });
    },
    btnAddRow() {
      this.billStatus === process.env.VUE_APP_EDIT ? this.tableData.push({ EntryState: 1 }) : this.tableData.push({});
    },
    btnDeleteRow() {
      if (Object.keys(this.currentRow).length > 0) {
        let currentRowIndex = this.tableData.indexOf(this.currentRow);
        this.currentRow.EntryState = 3;
        this.deletRowStack.push(this.currentRow);
        this.tableData.splice(currentRowIndex, 1);
      } else {
        this.$message({
          type: "warning",
          message: "请选择一条数据"
        });
      }
    },
    currentChange(currentRow) {
      // console.log(currentRow);
      this.currentRow = currentRow;
      console.log(this.currentRow);
    }
  },
  created() {
    this.$store.commit("billStatus", this.fInterID ? this.getBillData({ fInterID: this.fInterID }) : process.env.VUE_APP_ADD);
    console.log(dayjs().format("YYYY-MM-DD HH:mm:ss"));
  },
  computed: {
    billStatus() {
      return this.$store.state.billStatus;
    },
    commitDate: {
      get() {
        let formData = Object.assign({}, this.formData);
        let tableData = [...this.tableData];
        formData.Entries = tableData;
        return formData;
      },
      set() {}
    }
  },
  mounted() {
    this.billStatus === process.env.VUE_APP_ADD || this.billStatus === process.env.VUE_APP_EDIT
      ? (this.isdisabled = false)
      : (this.isdisabled = true); //watch在mounted后执行，初始加载组件的watch不知道为什么不能触发update，所以先在mounted中执行一次
  },
  watch: {
    billStatus(newValue) {
      newValue === process.env.VUE_APP_ADD || newValue === process.env.VUE_APP_EDIT
        ? (this.isdisabled = false)
        : (this.isdisabled = true);
    },
    // fInterID(newValue, old) {
    //   console.log(old, newValue);
    //   this.$store.commit("billStatus", newValue ? this.getBillData({ fInterID: newValue }) : process.env.VUE_APP_ADD);
    // },
    commitDate() {
      console.log(this.commitDate);
    }
    // tableData(val) {
    //   console.log(val);
    //   this.$store.commit("tableData", val);
    // }
  },
  beforeDestroy() {
    // console.log("销毁");
  },
  destroyed() {
    // this.$store.commit("tableData", []); //销毁组件前重置表格数据
    // console.log("销毁le");
  }
};
export const billQueryMixin = {
  data() {
    return {
      btnTexts: ["新增", "编辑", "删除"],
      tableData: [],
      total: 0,
      pageSize: 20,
      currentPage: 1,
      dialogVisible: false,
      fInterID: "",
      formData: {},
      loading: false
    };
  },
  methods: {
    query() {
      this.queryRequest({
        pageSize: this.pageSize,
        pageNumber: this.currentPage,
        conditions: this.conditions
      }).then(res => {
        this.total = res.total;
        this.tableData = res.rows;
        this.loading = false;
      });
    },
    refresh() {
      this.query(this.formData);
      this.fInterID = "";
    },
    btnDelete() {
      if (!this.fInterID) {
        this.$message({ message: "请选择一条数据", type: "warning" });
      } else {
        this.deleteRequest({ fInterID: this.fInterID }).then(res => {
          if (res) this.$message({ message: "删除成功", type: "success" });
          this.refresh();
        });
      }
    },
    btnEdit() {
      this.fInterID ? (this.dialogVisible = true) : this.$message({ message: "请选择一条数据", type: "warning" });
    },
    btnAdd() {
      this.fInterID = "";
      this.dialogVisible = true;
    },
    handleCurrentChange(value) {
      this.currentPage = value;

      this.query(this.formData);
    },
    handleSizeChange(value) {
      this.pageSize = value;

      this.query(this.formData);
    },
    rowDblclick() {
      this.dialogVisible = true;
    },
    rowClick(row) {
      if (row) this.fInterID = row.FInterID;
    },
    dialogClosed(done) {
      this.refresh();
      done();
    }
  },
  components: {
    tableLayout,
    btn,
    LYform
  },
  computed: {
    conditions() {
      let data = Object.entries(this.formData).filter(el => el[1]);
      return data.map(el => {
        let operator;
        this.formOptions.forEach(element => {
          if (element.field == el[0]) {
            operator = element.operator;
          }
        });
        return { Name: el[0], type: operator, Value: el[1] };
      });
    }
  }
};
