<template>
  <el-container style="height:100%;">
    <el-backtop></el-backtop>
    <el-aside :width="isCollapse?'64px':'220px'">
      <vuescroll>
        <sidebar :data="menuData" />
      </vuescroll>
    </el-aside>
    <el-container :class="[isCollapse?'main-container-collapes':'main-container']">
      <el-header>
        <navbar />
      </el-header>
      <el-main class="main-style">
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
  computed: mapState(["menuData", "isCollapse"]),
  components: {
    sidebar,
    navbar,
    vuescroll
  },
  mounted() {
    // console.log(this.$route);
    // this.$nextTick(() => {
    //   console.log(this.$store.state.routerArray);
    // });
  }
};
</script>
<style lang="scss" scoped>
/deep/ .el-aside {
  position: fixed;
  height: 100%;
}
.main-container {
  margin-left: 220px;
}
.main-container-collapes {
  margin-left: 64px;
}
</style>
