<template>
  <div>
    <el-form
      :model="filterFormData"
      ref="filterFormRef"
      label-width="60px"
      :inline="true"
      size="default"
    >
      <el-form-item>
        <el-button
          type="primary"
          :icon="Plus"
          size="default"
          @click="toAddActivity"
          >添加活动</el-button
        >
      </el-form-item>
      <el-form-item label="标题" prop="keyword">
        <el-input
          v-model="filterFormData.keyword"
          placeholder="筛选活动"
          clearable
          @change="getTableData"
        ></el-input>
      </el-form-item>
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

    <el-table :data="tableData" border stripe>
      <el-table-column type="index" width="50" />
      <el-table-column label="标题" prop="title" min-width="100" />
      <el-table-column label="地点" prop="locationName" min-width="100" />
      <el-table-column label="经度" prop="locationLong" min-width="100" />
      <el-table-column label="纬度" prop="locationLat" min-width="100" />
      <el-table-column
        label="限制报名人数"
        prop="limitRegistration"
        min-width="110"
      />
      <el-table-column label="点赞数" prop="likeNumber" min-width="70" />
      <el-table-column label="开始时间" prop="startTime" min-width="160">
        <template #default="{ row }: { row: Activity }">
          {{ formatDate(row.startTime) }}
        </template>
      </el-table-column>
      <el-table-column label="结束时间" prop="endTime" min-width="160">
        <template #default="{ row }: { row: Activity }">
          {{ formatDate(row.endTime) }}
        </template>
      </el-table-column>
      <!-- <el-table-column label="创建时间" prop="createTime" min-width="160">
        <template #default="{ row }: { row: Activity }">
          {{ formatDate(row.createTime) }}
        </template>
      </el-table-column>
      <el-table-column label="更新时间" prop="updateTime" min-width="160">
        <template #default="{ row }: { row: Activity }">
          {{ formatDate(row.updateTime) }}
        </template>
      </el-table-column> -->
      <el-table-column label="操作" fixed="right" width="280" align="center">
        <template #default="{ row }: { row: Activity }">
          <el-button-group size="small">
            <el-button type="primary" :icon="Link" @click="toDetail(row)"
              >详情</el-button
            >
            <el-button
              type="primary"
              :icon="PieChart"
              @click="toStatistics(row)"
              >统计</el-button
            >
            <el-button type="primary" :icon="Notification" @click="notify(row)"
              >通知</el-button
            >
            <el-button type="primary" :icon="Edit" @click="toEditActivity(row)"
              >编辑</el-button
            >
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

            <el-button type="primary" :icon="PieChart" @click="toFeedback(row)"
              >查看反馈</el-button
            >
            <el-button
              type="primary"
              :icon="User"
              @click="toRegistrationAdmin(row)"
              >报名管理</el-button
            >
          </el-button-group>
        </template>
      </el-table-column>
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

const pageInfo = ref<PageInfo>({
  currentPage: 1,
  pageSize: 10,
  total: 100,
});

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

interface FilterFormData {
  keyword: string;
  status: ActivityStatus;
}

const filterFormData = ref<FilterFormData>({
  keyword: '',
  status: ActivityStatus.all,
});

const formatDate = (date: Date) => {
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
};

const tableData = ref<Activity[]>([]);

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

const toAddActivity = () => {
  router.push('/admin/add-edit-activity');
};

const toDetail = (activity: Activity) => {
  console.log('to detail', activity);
};
const toStatistics = (activity: Activity) => {
  console.log('to statistics', activity);
};

const toFeedback = (activity: Activity) => {
  router.push({
    path: '/admin/feedback',
    query: { 'activity-id': activity.id },
  });
};

const toRegistrationAdmin = (activity: Activity) => {
  router.push({
    path: '/admin/registration',
    query: { 'activity-id': activity.id },
  });
};

const notificationStore = useNotificationStore();

const notify = (activity: Activity) => {
  notificationStore.open([], true, activity.id);
};
const toEditActivity = (activity: Activity) => {
  router.push({
    path: '/admin/add-edit-activity',
    query: { 'activity-id': activity.id },
  });
};
const del = async (activity: Activity) => {
  await delActivityApi({ id: activity.id });
  ElMessage.success('删除成功');
  getTableData();
};
</script>

<style lang="scss" scoped></style>
