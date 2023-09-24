<template>
  <div class="title">hello world</div>
  =======
  <div>
    <HomeHeader />
    <div class="container">
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import HomeHeader from '@/components/homeFrame/homeHeader.vue';
</script>

<style scoped lang="scss">
.container {
  padding: 10px;
  min-width: 1280px;
  min-height: calc(100vh - 60px);
}
</style>
