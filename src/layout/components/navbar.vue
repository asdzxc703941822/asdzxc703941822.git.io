<template>
  <div class="nav-wrap">
    <div class="icon-wrap">
      <i class="el-icon-s-fold"></i>
    </div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/layout/rep1'}">活动管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/layout/rep2'}">活动列表</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/layout/rep2/rep3'}">活动详情</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<style lang="scss">
.nav-wrap {
  display: flex;
  width: 100%;
  height: 100%;
  .icon-wrap {
    padding: 0 15px 0 15px;
    font-size: 24px;
  }
}
</style>