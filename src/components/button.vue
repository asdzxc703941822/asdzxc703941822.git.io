<template>
  <el-button-group>
    <el-button
      v-for="item in btnData"
      :key="item.text"
      :icon="item.icon"
      size="small"
      @click="item.event"
      :disabled="isQuery?false:item.isdisable"
    >{{item.text}}</el-button>
  </el-button-group>
</template>
<script>
export default {
  data() {
    return {
      isdisable: [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false
      ],
      btnOptions: [
        {
          text: "新增",
          icon: "el-icon-document-add",
          event: this.btnAdd,
          isdisable: false
        },
        {
          text: "编辑",
          icon: "el-icon-edit",
          event: this.btnEdit,
          isdisable: false
        },
        {
          text: "保存",
          icon: "el-icon-s-order",
          event: this.btnSave,
          isdisable: false
        },
        {
          text: "审核",
          icon: "el-icon-document-checked",
          event: this.btnAudit,
          isdisable: false
        },
        {
          text: "反审",
          icon: "el-icon-document-delete",
          event: this.btnUnAudit,
          isdisable: false
        },
        {
          text: "删除",
          icon: "el-icon-delete",
          event: this.btnDelete,
          isdisable: false
        },
        {
          text: "获取所属人员",
          icon: "el-icon-thumb",
          event: this.btnRollColl,
          isdisable: false
        },
        {
          text: "增行",
          icon: "el-icon-folder-add",
          event: this.btnAddRow,
          isdisable: false
        },
        {
          text: "删行",
          icon: "el-icon-folder-delete",
          event: this.btnDeleteRow,
          isdisable: false
        }
      ]
    };
  },
  computed: {
    btnData() {
      return this.btnOptions.filter((el, index) => {
        return this.btnTexts.indexOf(el.text) > -1;
      });
    },
    billStatus: {
      get() {
        return this.$store.state.billStatus;
      },
      set(newValue) {
        this.btnStatusChange(newValue);
        console.log("按钮中的set");
        this.$store.commit("billStatus", newValue);
      }
    }
  },
  mounted() {
    this.btnStatusChange(this.billStatus);
  },
  watch: {
    billStatus(newValue) {
      this.btnStatusChange(newValue); //由于其他组件改变vuex中的billStatus 计算属性set不触发所以要监听
    }
  },
  props: {
    btnTexts: {
      type: Array,
      required: true
    },
    isQuery: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    //按下标控制对应按钮的禁用状态
    btnStatusChange(billStatus) {
      if (billStatus === process.env.VUE_APP_ADD) {
        this.$set(this.btnOptions[0], "isdisable", true);
        this.$set(this.btnOptions[1], "isdisable", true);
        this.$set(this.btnOptions[2], "isdisable", false);
        this.$set(this.btnOptions[3], "isdisable", true);
        this.$set(this.btnOptions[4], "isdisable", true);
        this.$set(this.btnOptions[6], "isdisable", false); //点名
        this.$set(this.btnOptions[7], "isdisable", false); //增行
        this.$set(this.btnOptions[8], "isdisable", false); //删行
      }
      if (billStatus === process.env.VUE_APP_BROWSE) {
        this.$set(this.btnOptions[0], "isdisable", false);
        this.$set(this.btnOptions[1], "isdisable", false);
        this.$set(this.btnOptions[2], "isdisable", true);
        this.$set(this.btnOptions[3], "isdisable", false);
        this.$set(this.btnOptions[4], "isdisable", true);
        this.$set(this.btnOptions[6], "isdisable", true); //点名
        this.$set(this.btnOptions[7], "isdisable", true); //增行
        this.$set(this.btnOptions[8], "isdisable", true); //删行
      }
      if (billStatus === process.env.VUE_APP_EDIT) {
        this.$set(this.btnOptions[0], "isdisable", false);
        this.$set(this.btnOptions[1], "isdisable", true);
        this.$set(this.btnOptions[2], "isdisable", false);
        this.$set(this.btnOptions[3], "isdisable", true);
        this.$set(this.btnOptions[4], "isdisable", true);
        this.$set(this.btnOptions[6], "isdisable", true); //点名
        this.$set(this.btnOptions[7], "isdisable", false); //增行
        this.$set(this.btnOptions[8], "isdisable", false); //删行
      }
      if (billStatus === process.env.VUE_APP_CHECKED) {
        this.$set(this.btnOptions[0], "isdisable", false);
        this.$set(this.btnOptions[1], "isdisable", true);
        this.$set(this.btnOptions[2], "isdisable", true);
        this.$set(this.btnOptions[3], "isdisable", true);
        this.$set(this.btnOptions[4], "isdisable", false);
        this.$set(this.btnOptions[6], "isdisable", true); //点名
        this.$set(this.btnOptions[7], "isdisable", true); //增行
        this.$set(this.btnOptions[8], "isdisable", true); //删行
      }
    },
    //如果父组件有传入的按钮事件优先使用传入的
    btnEventHandler(btnEvent) {
      if (Object.keys(this.$listeners).indexOf(btnEvent) > -1) {
        this.$emit(btnEvent);
        return true;
      } else {
        return false;
      }
    },
    btnAdd() {
      if (this.btnEventHandler("btnAdd")) return;
      // this.$store.commit("formData", {});
      // this.tableData = [];
      // this.$store.commit("tableData", []);
      this.billStatus = process.env.VUE_APP_ADD;
    },
    btnEdit() {
      if (this.btnEventHandler("btnEdit")) return;
      this.billStatus = process.env.VUE_APP_EDIT;
    },
    btnSave() {
      if (this.btnEventHandler("btnSave")) return;
      this.billStatus = process.env.VUE_APP_BROWSE;
    },
    btnAudit() {
      if (this.btnEventHandler("btnAudit")) return;
      this.billStatus = process.env.VUE_APP_CHECKED;
    },
    btnUnAudit() {
      if (this.btnEventHandler("btnUnAudit")) return;
      this.billStatus = process.env.VUE_APP_BROWSE;
    },
    btnDelete() {
      if (this.btnEventHandler("btnDelete")) return;
    },
    btnRollColl() {
      if (this.btnEventHandler("btnRollColl")) return;
    },
    btnAddRow() {
      if (this.btnEventHandler("btnAddRow")) return;
    },
    btnDeleteRow() {
      if (this.btnEventHandler("btnDeleteRow")) return;
    }
  },
  beforeDestroy() {
    console.log("测试");
  }
};
</script>
