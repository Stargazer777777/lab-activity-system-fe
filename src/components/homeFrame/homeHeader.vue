<template>
  <el-row>
    <el-col class="logo" :span="1" :offset="0"
      ><a href="/"
        ><el-image :src="logoPng" fit="fill" style="height: 55px"></el-image></a
    ></el-col>
    <el-col :span="21" :offset="0"></el-col>
    <el-col :span="2" :offset="0">
      <el-button type="primary" size="default" v-if="isLogin"
        >个人中心</el-button
      >
      <el-button type="primary" size="default" @click="toLogin" v-else
        >登录</el-button
      >
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import logoPng from '@/assets/logo.png';
import router from '@/router';
import { AuthTool } from '@/utils/authTool';
import { ref } from 'vue';
const isLogin = ref(AuthTool.authFromLocal());

const toLogin = () => {
  router.push('/userLogin');
};
</script>

<style lang="scss" scoped>
.el-row {
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
