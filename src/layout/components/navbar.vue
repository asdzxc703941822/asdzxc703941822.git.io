<template>
  <div class="nav-wrap">
    <div style="display:flex">
      <span class="icon-wrap" @click="handlerCollapse">
        <i :class="[isCollapse?'el-icon-s-unfold':'el-icon-s-fold']"></i>
      </span>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for=" item in $route.matched " :key="item.path">{{item.name}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="right-wrap">
      <el-dropdown trigger="click" class="dropdown" @command="handleCommand">
        <span class="el-dropdown-link">
          欢迎，{{user}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="退出">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-avatar :src="img" class="avatar"></el-avatar>
    </div>
  </div>
</template>
<script>
// import { mapState } from "vuex";
import img from "../../assets/icon-注册头像.png";
export default {
  data() {
    return {
      isCollapse: false,
      img,
      user: localStorage.getItem("account")
    };
  },
  // computed: mapState(["menuData"]),
  // watch: {
  //   $route(to, from) {
  //     console.log(to);
  //     console.log(from);
  //   }
  // },
  methods: {
    handlerCollapse() {
      this.$store.commit("isCollapse", !this.isCollapse);
      this.isCollapse = !this.isCollapse;
    },
    handleCommand(command) {
      if (command === "退出") this.lognOut();
    },
    lognOut() {
      localStorage.removeItem("account");
      localStorage.removeItem("access_token");
      this.$store.commit("menuData", []);
      this.$router.push("/");
    }
  }
};
</script>
<style lang="scss">
.nav-wrap {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
  .icon-wrap {
    padding: 0 15px 0 15px;
    font-size: 24px;
    line-height: 60px;
    cursor: pointer;
    &:hover {
      background: rgba(0, 0, 0, 0.15);
    }
  }
  .el-breadcrumb {
    line-height: 60px;
  }
  .right-wrap {
    line-height: 60px;
    margin-right: 20px;
    .dropdown {
      vertical-align: top;
    }
    .avatar {
      vertical-align: -30%;
      margin-left: 10px;
    }
  }
}
</style>