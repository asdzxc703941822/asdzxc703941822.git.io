<template>
  <el-menu :class="menueStyle" background-color="#303133" text-color="#999" :router="true">
    <submenue :data="data" />
  </el-menu>
</template>
<script>
import submenue from "./submenue";
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
      }
    };
  },
  components: {
    submenue
  }
};
</script>
<style lang="scss" scoped>
.menue-style {
  height: 100vh;
}
</style>