<template>
  <div>
    <el-affix :offset="0"><AdminMenu /></el-affix>
    <div class="container">
      <RouterView />
    </div>
  </div>
</template>

<script lang="ts" setup>
import AdminMenu from '@/components/adminFrame/adminMenu.vue';
</script>

<style lang="scss" scoped></style>
