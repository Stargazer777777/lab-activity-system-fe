<template>
  <el-menu mode="horizontal" :default-active="defaultActive" router>
    <el-col class="logo" :span="1" :offset="0">
      <a href="/"
        ><el-image :src="logoPng" fit="fill" style="height: 55px"></el-image
      ></a>
    </el-col>
    <el-menu-item index="/admin" key="/admin">主页</el-menu-item>
    <el-menu-item index="/admin/activity" key="/admin/activity"
      >活动管理</el-menu-item
    >
    <el-menu-item index="/admin/user" key="/admin/user">用户管理</el-menu-item>
    <el-menu-item index="/admin/slide" key="/admin/slide"
      >轮播图管理</el-menu-item
    >
  </el-menu>
</template>

<script lang="ts" setup>
import router from '@/router';
import { ref } from 'vue';
import logoPng from '@/assets/logo.png';

const defaultActive = ref<string>(router.currentRoute.value.path);
</script>

<style lang="scss" scoped>
.logo {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
