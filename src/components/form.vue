<template>
  <el-form :inline="true" :model="formData" :rules="rules" ref="form">
    <el-form-item
      v-for="item in formOptions"
      :key="item.label"
      :label="item.label"
      :prop="item.field"
    >
      <el-input
        v-if="item.type=='text'"
        v-model="formData[item.field]"
        placeholder="请输入内容"
        :readonly="IsQuery?false:isdisabled"
      ></el-input>
      <el-input v-if="item.type=='btnText'" v-model="formData[item.field]" :readonly="true">
        <el-button
          slot="append"
          icon="el-icon-arrow-right"
          size="mini"
          @click="item.fn"
          :disabled="isdisabled"
        ></el-button>
      </el-input>
      <el-select
        v-else-if="item.type=='select'"
        v-model="formData[item.field]"
        :disabled="IsQuery?false:isdisabled"
      >
        <el-option v-for="el in item.dataSouce" :key="el.label" :label="el.label" :value="el.value"></el-option>
      </el-select>
      <el-time-picker
        v-else-if="item.type=='time'"
        v-model="formData[item.field]"
        :readonly="IsQuery?false:isdisabled"
      ></el-time-picker>
      <el-date-picker
        v-else-if="item.type=='date'"
        v-model="formData[item.field]"
        :readonly="IsQuery?false:isdisabled"
        format="yyyy 年 MM 月 dd 日"
        value-format="yyyy-MM-dd"
      ></el-date-picker>
      <el-date-picker
        v-else-if="item.type=='datetime'"
        type="datetime"
        v-model="formData[item.field]"
        :readonly="IsQuery?false:isdisabled"
        value-format="yyyy-MM-dd HH:mm:ss"
      ></el-date-picker>
    </el-form-item>
    <el-form-item v-if="IsQuery">
      <el-button @click="query" :autofocus="true" @keyup.enter="query">查询</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import _ from "loadsh";
export default {
  data() {
    return { isdisabled: false };
  },
  computed: {
    billStatus() {
      return this.$store.state.billStatus;
    },
    rules() {
      let data = {};
      this.formOptions.forEach(el => {
        data[el.field] = el.rule;
      });
      return data;
    }
  },
  watch: {
    billStatus(newValue) {
      newValue === process.env.VUE_APP_ADD ||
      newValue === process.env.VUE_APP_EDIT
        ? (this.isdisabled = false)
        : (this.isdisabled = true);
    },
    formData: {
      handler(newValue) {
        this.$emit("update:formData", newValue);
      },
      deep: true
    }
  },

  mounted() {
    this.billStatus === process.env.VUE_APP_ADD ||
    this.billStatus === process.env.VUE_APP_EDIT
      ? (this.isdisabled = false)
      : (this.isdisabled = true); //watch在mounted后执行，初始加载组件的watch不知道为什么不能触发update，所以先在mounted中执行一次
  },
  // updated() {
  //   console.log("更新");
  // },
  props: {
    //表单配置
    formOptions: {
      type: Array,
      required: true
    },
    IsQuery: {
      type: Boolean,
      default: false
    },
    formData: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    query() {
      this.$emit("uodate:loading", true);
      this._query();
    },
    _query: _.debounce(
      function() {
        this.$emit("query");
      },
      1000,
      false
    )
  }
};
</script>