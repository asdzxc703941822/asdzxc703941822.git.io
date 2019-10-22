<template>
  <el-container style="height:100%">
    <slot></slot>
    <el-header v-if="$slots.btn">
      <slot name="btn"></slot>
    </el-header>
    <el-main>
      <el-container style="height:100%">
        <el-aside v-if="$slots.asider">
          <slot name="asider"></slot>
        </el-aside>
        <el-container>
          <el-header style="height:auto">
            <slot name="header"></slot>
          </el-header>
          <el-main>
            <slot name="center"></slot>
          </el-main>
          <el-footer v-if="$slots.footer">
            <slot name="footer"></slot>
          </el-footer>
        </el-container>
      </el-container>
    </el-main>
  </el-container>
</template>
<script>
export default {};
</script>