<template>
  <el-menu
    :class="menueStyle"
    background-color="#303133"
    text-color="#999"
    :router="true"
    :collapse="isCollapse"
    :default-active="this.$route.path"
  >
    <submenue :data="data" />
  </el-menu>
</template>
<script>
import submenue from "./submenue";
import { mapState } from "vuex";
export default {
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      menueStyle: {
        "menue-style": true
      },
      currentPath: ""
    };
  },
  computed: mapState(["isCollapse"]),
  components: {
    submenue
  }
  // watch: {
  //   $route(newv, old) {
  //     console.log(newv, "---", old);
  //     this.currentPath = newv.path;
  //   }
  // }
};
</script>
<style lang="scss" scoped>
.menue-style {
  height: 100vh;
  // position: fixed;
}
</style>