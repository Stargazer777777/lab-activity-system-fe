<template>
  <div>
    <!-- 轮播图筛选表单 -->
    <el-form
      :model="filterFormData"
      ref="filterFormRef"
      label-width="60px"
      :inline="true"
      size="default"
    >
      <!-- 添加轮播图按钮 -->
      <el-form-item>
        <el-button
          type="primary"
          :icon="Plus"
          size="default"
          @click="toAddSlide"
          >添加轮播图</el-button
        >
      </el-form-item>
    </el-form>

    <!-- 轮播图列表 -->
    <el-table :data="tableData" border stripe>
      <!-- 序号列 -->
      <el-table-column type="index" width="50" />
      <!-- 轮播图地址 -->
      <el-table-column label="轮播图地址" prop="imgUrl" min-width="100" />
      <!-- 轮播图次序 -->
      <el-table-column label="轮播图次序" prop="slideIndex" min-width="100" />
      <!-- 轮播图跳转地址 -->
      <el-table-column
        label="轮播图跳转地址"
        prop="targetUrl"
        min-width="100"
      />
      <el-table-column label="操作" width="200">
        <template #default="{ row }">
          <el-button type="primary" size="mini" @click="toEditSlide(row)"
            >修改</el-button
          >
          <el-button type="danger" size="mini" @click="deleteSlide(row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { PageInfo, Slide } from '@/typing/common';
import { ActivityStatus } from '@/stores/modules/publicStore';
import dayjs from 'dayjs';
import {
  Edit,
  Link,
  Delete,
  PieChart,
  Notification,
  Plus,
} from '@element-plus/icons-vue';
import router from '@/router/index';
import { ElMessageBox, ElMessage } from 'element-plus';
import { delSlideApi, searchSlidesApi } from '@/$http/apis/slideAdmin.api';

import { useNotificationStore } from '@/stores/modules/notificationStore';

// 轮播图列表数据
const tableData = ref<Slide[]>([]);

// 获取轮播图列表数据
const getTableData = async () => {
  const res = await searchSlidesApi();
  tableData.value = res.data;
};

onMounted(() => {
  getTableData();
});

// 跳转到添加轮播图页面
const toAddSlide = () => {
  router.push('/admin/add-edit-slide');
};

// 跳转到编辑活动页面
const toEditSlide = (slide: Slide) => {
  router.push({
    path: '/admin/add-edit-slide',
    query: { 'slide-id': slide.id },
  });
};
const deleteSlide = async (id) => {
  ElMessageBox.confirm('确定要删除吗?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      await delSlideApi({ id });
      ElMessage.success('删除成功');
      getTableData();
    })
    .catch(() => {
      // 轮播图点击了取消按钮，不执行删除操作
      ElMessage.info('已取消删除');
    });
};
</script>

<style lang="scss" scoped></style>
