<template>
  <el-container>
    <el-aside width="220px">
      <vuescroll>
        <sidebar :data="menuData" />
      </vuescroll>
    </el-aside>
    <el-container class="main-container">
      <el-header>
        <navbar />
      </el-header>
      <el-main>
        <transition name="el-fade-in">
          <router-view></router-view>
        </transition>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import "element-ui/lib/theme-chalk/base.css";
import sidebar from "./components/sidebar";
import navbar from "./components/navbar";
import { mapState } from "vuex";
import vuescroll from "vuescroll/dist/vuescroll-native";
export default {
  data() {
    return {};
  },
  computed: mapState(["menuData"]),
  components: {
    sidebar,
    navbar,
    vuescroll
  },
  mounted() {
    console.log(this.$route);
    // this.$nextTick(() => {
    //   console.log(this.$store.state.routerArray);
    // });
  }
};
</script>
<style lang="scss">
.el-aside {
  position: fixed;
}
.main-container {
  margin-left: 220px;
  .el-header {
    padding: 0;
  }
  .el-main{
    padding: 0
  }
}
</style>
