<template>
  <div>
    <!-- 活动筛选表单 -->
    <el-form
      :model="filterFormData"
      ref="filterFormRef"
      label-width="60px"
      :inline="true"
      size="default"
    >
      <!-- 添加活动按钮 -->
      <el-form-item>
        <el-button
          type="primary"
          :icon="Plus"
          size="default"
          @click="toAddActivity"
          >添加活动</el-button
        >
      </el-form-item>
      <!-- 活动标题筛选输入框 -->
      <el-form-item label="标题" prop="keyword">
        <el-input
          v-model="filterFormData.keyword"
          placeholder="筛选活动"
          clearable
          @change="getTableData"
        ></el-input>
      </el-form-item>
      <!-- 活动状态筛选下拉框 -->
      <el-form-item label="活动状态" label-width="80">
        <el-select
          v-model="filterFormData.status"
          filterable
          @change="getTableData"
        >
          <el-option
            v-for="item in activityStatusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>

    <!-- 活动列表 -->
    <el-table :data="tableData" border stripe>
      <!-- 序号列 -->
      <el-table-column type="index" width="50" />
      <!-- 活动标题列 -->
      <el-table-column label="标题" prop="title" min-width="100" />
      <!-- 活动地点列 -->
      <el-table-column label="地点" prop="locationName" min-width="100" />
      <!-- 活动经度列 -->
      <el-table-column label="经度" prop="locationLong" min-width="100" />
      <!-- 活动纬度列 -->
      <el-table-column label="纬度" prop="locationLat" min-width="100" />
      <!-- 限制报名人数列 -->
      <el-table-column
        label="限制报名人数"
        prop="limitRegistration"
        min-width="110"
      />
      <!-- 点赞数列 -->
      <el-table-column label="点赞数" prop="likeNumber" min-width="70" />
      <!-- 开始时间列 -->
      <el-table-column label="开始时间" prop="startTime" min-width="160">
        <template #default="{ row }: { row: Activity }">
          {{ formatDate(row.startTime) }}
        </template>
      </el-table-column>
      <!-- 结束时间列 -->
      <el-table-column label="结束时间" prop="endTime" min-width="160">
        <template #default="{ row }: { row: Activity }">
          {{ formatDate(row.endTime) }}
        </template>
      </el-table-column>
      <!-- 操作列 -->
      <el-table-column label="操作" fixed="right" width="280" align="center">
        <template #default="{ row }: { row: Activity }">
          <!-- 详情按钮 -->
          <el-button-group size="small">
            <el-button type="primary" :icon="Link" @click="toDetail(row)"
              >详情</el-button
            >
            <!-- 统计按钮 -->
            <el-button
              type="primary"
              :icon="PieChart"
              @click="toStatistics(row)"
              >统计</el-button
            >
            <!-- 通知按钮 -->
            <el-button type="primary" :icon="Notification" @click="notify(row)"
              >通知</el-button
            >
            <!-- 编辑按钮 -->
            <el-button type="primary" :icon="Edit" @click="toEditActivity(row)"
              >编辑</el-button
            >
            <!-- 删除按钮 -->
            <el-popconfirm
              title="确定要删除吗？"
              confirmButtonText="确定"
              cancelButtonText="取消"
              confirmButtonType="primary"
              cancelButtonType="text"
              @confirm="del(row)"
            >
              <template #reference
                ><el-button type="danger" :icon="Delete"
                  >删除</el-button
                ></template
              >
            </el-popconfirm>

            <!-- 查看反馈按钮 -->
            <el-button type="primary" :icon="PieChart" @click="toFeedback(row)"
              >查看反馈</el-button
            >
            <!-- 报名管理按钮 -->
            <el-button
              type="primary"
              :icon="User"
              @click="toRegistrationAdmin(row)"
              >报名管理</el-button
            >
          </el-button-group>
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
import { ref } from 'vue';
import { Activity, PageInfo } from '@/typing/common';
import { ActivityStatus } from '@/stores/modules/publicStore';
import dayjs from 'dayjs';
import {
  Edit,
  Link,
  Delete,
  PieChart,
  User,
  Notification,
  Plus,
} from '@element-plus/icons-vue';
import router from '@/router/index';
import {
  delActivityApi,
  searchActivitiesApi,
} from '@/$http/apis/activityAdmin.api';
import { ElMessage } from 'element-plus';
import { useNotificationStore } from '@/stores/modules/notificationStore';

// 分页信息
const pageInfo = ref<PageInfo>({
  currentPage: 1,
  pageSize: 10,
  total: 100,
});

// 活动状态选项
const activityStatusOptions: Array<{ label: string; value: ActivityStatus }> = [
  {
    label: '所有',
    value: ActivityStatus.all,
  },
  {
    label: '未开始',
    value: ActivityStatus.notStart,
  },
  {
    label: '已经开始',
    value: ActivityStatus.inProgress,
  },
  {
    label: '已经结束',
    value: ActivityStatus.end,
  },
];

// 筛选表单数据
interface FilterFormData {
  keyword: string;
  status: ActivityStatus;
}
const filterFormData = ref<FilterFormData>({
  keyword: '',
  status: ActivityStatus.all,
});

// 格式化日期
const formatDate = (date: Date) => {
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
};

// 活动列表数据
const tableData = ref<Activity[]>([]);

// 获取活动列表数据
const getTableData = async () => {
  const res = await searchActivitiesApi({
    page: pageInfo.value.currentPage,
    pageSize: pageInfo.value.pageSize,
    keyword: filterFormData.value.keyword,
    status: filterFormData.value.status,
  });
  tableData.value = res.data.records;
  pageInfo.value.total = res.data.total;
};
getTableData();

// 跳转到添加活动页面
const toAddActivity = () => {
  router.push('/admin/add-edit-activity');
};

// 跳转到活动详情页面
const toDetail = (activity: Activity) => {
  console.log('to detail', activity);
};

// 跳转到活动统计页面
const toStatistics = (activity: Activity) => {
  console.log('to statistics', activity);
};

// 跳转到活动反馈页面
const toFeedback = (activity: Activity) => {
  router.push({
    path: '/admin/feedback',
    query: { 'activity-id': activity.id },
  });
};

// 跳转到活动报名管理页面
const toRegistrationAdmin = (activity: Activity) => {
  router.push({
    path: '/admin/registration',
    query: { 'activity-id': activity.id },
  });
};

// 通知相关的逻辑
const notificationStore = useNotificationStore();
const notify = (activity: Activity) => {
  notificationStore.open([], true, activity.id);
};

// 跳转到编辑活动页面
const toEditActivity = (activity: Activity) => {
  router.push({
    path: '/admin/add-edit-activity',
    query: { 'activity-id': activity.id },
  });
};

// 删除活动
const del = async (activity: Activity) => {
  await delActivityApi({ id: activity.id });
  ElMessage.success('删除成功');
  getTableData();
};
</script>

<style lang="scss" scoped></style>
