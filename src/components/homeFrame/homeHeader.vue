<template>
  <el-row class="container">
    <el-col class="logo" :span="1" :offset="0">LOGO</el-col>
    <el-col :span="12" :offset="0"></el-col>
  </el-row>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
  height: 60px;
  border-bottom: 1px solid #ddd;
  .logo {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
