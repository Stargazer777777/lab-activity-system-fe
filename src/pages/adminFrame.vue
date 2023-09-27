<template>
  <div>
    <el-affix :offset="0"><AdminMenu /></el-affix>
    <div class="container">
      <RouterView />
    </div>
    <commonNotification />
  </div>
  <div><button @click="openTest">www</button></div>
</template>

<script lang="ts" setup>
import AdminMenu from '@/components/adminFrame/adminMenu.vue';
import CommonNotification from '@/components/common/commonNotification.vue';
import { useNotificationStore } from '@/stores/modules/notificationStore';
const openTest = () => {
  const notificationStore = useNotificationStore();
  notificationStore.openNotificationWithActivity('-1', ['1', '2', '3', '4']);
};
</script>

<style lang="scss" scoped>
.container {
  padding: 10px;
  min-width: 1280px;
  min-height: calc(100vh - 60px);
}
</style>
