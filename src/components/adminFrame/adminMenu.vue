<template>
  <el-menu mode="horizontal" :default-active="defaultActive" router>
    <el-col class="logo" :span="1" :offset="0">LOGO</el-col>
    <el-menu-item index="/admin" key="/admin">主页</el-menu-item>
    <el-menu-item index="/admin/activity" key="/admin/activity"
      >活动管理</el-menu-item
    >
  </el-menu>
</template>

<script lang="ts" setup>
import router from '@/router';
import { ref } from 'vue';

const defaultActive = ref<string>(router.currentRoute.value.path);
</script>

<style lang="scss" scoped>
.logo {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
