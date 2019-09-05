<template>
  <div>
    <template v-for=" item in data">
      <el-submenu v-if="item.children&&item.children.length>0" :index="item.title" :key="item.path">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>{{item.title}}</span>
        </template>
        <submenue :data="item.children" />
      </el-submenu>
      <el-menu-item v-else :index="item.path" :key="item.path">
        <template slot="title">
          <i class="el-icon-s-grid"></i>
          <span>{{item.title}}</span>
        </template>
      </el-menu-item>
    </template>
  </div>
</template>
<script>
export default {
  name: "submenue",
  props: {
    data: {
      type: Array
    }
  }
};
</script>
