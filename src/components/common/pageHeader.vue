<template>
  <el-page-header class="page-header" @back="router.back">
    <template #content>
      <div class="content">
        <span class="title"> {{ props.title }} </span>
        <span class="sub-title">
          {{ props.subTitle }}
        </span>
      </div>
    </template>
  </el-page-header>
</template>

<script lang="ts" setup>
import router from '@/router';

interface Props {
  title: string;
  subTitle?: string;
}

const props = defineProps<Props>();
</script>

<style lang="scss" scoped>
.page-header {
  padding-bottom: 10px;
  margin: 5px 0;
  border-bottom: 1px solid #ccc;
  .content {
    .title {
      font-weight: 600;
      font-size: 25px;
    }
    .sub-title {
      margin-left: 20px;
      color: #606266;
      font-size: 16px;
    }
  }
}
</style>
