<template>
  <div>
    <!-- 用户筛选表单 -->
    <el-form
      :model="filterFormData"
      ref="filterFormRef"
      label-width="60px"
      :inline="true"
      size="default"
    >
      <!-- 添加用户按钮 -->
      <el-form-item>
        <el-button type="primary" :icon="Plus" size="default" @click="toAddUser"
          >添加用户</el-button
        >
      </el-form-item>
      <!-- 用户筛选输入框 -->
      <el-row type="flex" justify="flex-start">
        <el-col span="18">
          <el-form-item label="名字" prop="queryString">
            <el-input
              v-model="filterFormData.queryString"
              placeholder="筛选用户"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col span="6">
          <el-button type="primary" @click="getTableData">搜索</el-button>
        </el-col>
      </el-row>
    </el-form>

    <!-- 用户列表 -->
    <el-table :data="tableData" border stripe>
      <!-- 序号列 -->
      <el-table-column type="index" width="50" />
      <!-- 学号列 -->
      <el-table-column label="学号" prop="stuNo" min-width="100" />
      <!-- 邮箱列 -->
      <el-table-column label="邮箱" prop="email" min-width="100" />
      <!-- 名称列 -->
      <el-table-column label="名称" prop="name" min-width="100" />
      <!-- 密码列 -->
      <el-table-column label="密码" prop="password" min-width="100" />
      <!-- 性别列 -->
      <el-table-column label="性别" prop="sex" min-width="100" />
      <!-- 权限列 -->
      <el-table-column label="权限" prop="role" min-width="100" />
      <!-- 状态列 -->
      <el-table-column label="状态" prop="status" min-width="100" />
      <el-table-column label="操作" width="200">
        <template #default="{ row }">
          <el-button type="primary" size="mini" @click="toEditUser(row)"
            >修改</el-button
          >
          <el-button type="danger" size="mini" @click="deleteUser(row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>

      <!-- 分页组件 -->
      <template #append>
        <el-pagination
          v-model:current-page="pageInfo.currentPage"
          v-model:page-size="pageInfo.pageSize"
          :page-sizes="[10, 20, 50, 100]"
          :small="false"
          :background="false"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageInfo.total"
          @size-change="getTableData"
          @current-change="getTableData"
        />
      </template>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { User, PageInfo } from '@/typing/common';
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
import { delUserApi, searchUsersApi } from '@/$http/apis/userAdmin.api';

import { useNotificationStore } from '@/stores/modules/notificationStore';

// 分页信息
const pageInfo = ref<PageInfo>({
  currentPage: 1,
  pageSize: 10,
  total: 100,
});

// 筛选表单数据
interface FilterFormData {
  queryString: string;
}
const filterFormData = ref<FilterFormData>(<FilterFormData>{
  queryString: '',
});

// 格式化日期
const formatDate = (date: Date) => {
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
};

// 用户列表数据
const tableData = ref<User[]>([]);

// 获取用户列表数据
const getTableData = async () => {
  const res = await searchUsersApi({
    pageNo: pageInfo.value.currentPage,
    pageSize: pageInfo.value.pageSize,
    queryString: filterFormData.value.queryString,
  });
  tableData.value = res.data.items;
  pageInfo.value.total = res.data.counts;
};

// eslint-disable-next-line no-undef
onMounted(() => {
  getTableData();
});

// 跳转到添加用户页面
const toAddUser = () => {
  router.push('/admin/add-edit-user');
};

// 跳转到编辑活动页面
const toEditUser = (user: User) => {
  router.push({
    path: '/admin/add-edit-user',
    query: { 'user-id': user.id },
  });
};
const deleteUser = async (id) => {
  ElMessageBox.confirm('确定要删除吗?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      await delUserApi({ id });
      ElMessage.success('删除成功');
      getTableData();
    })
    .catch(() => {
      // 用户点击了取消按钮，不执行删除操作
      ElMessage.info('已取消删除');
    });
};
</script>

<style lang="scss" scoped></style>
