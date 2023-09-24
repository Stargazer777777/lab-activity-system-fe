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
      <el-form-item label="标题" prop="title">
        <el-input
          v-model="filterFormData.title"
          placeholder="筛选活动"
        ></el-input>
      </el-form-item>
      <el-form-item label="活动状态" label-width="80">
        <el-select v-model="filterFormData.status" filterable>
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
      <el-table-column label="id" prop="id" width="50" />
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
      <el-table-column label="操作" fixed="right" width="250" align="center">
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
            <el-button
              type="primary"
              :icon="User"
              @click="toRegistrationAdmin(row)"
              >报名管理</el-button
            >
            <el-button type="primary" :icon="Notification" @click="notify(row)"
              >通知</el-button
            >
            <el-button type="primary" :icon="Edit" @click="edit(row)"
              >编辑</el-button
            >
            <el-button type="danger" :icon="Delete" @click="del(row)"
              >删除</el-button
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
          @size-change="pageSizeChange"
          @current-change="currentPageChange"
        />
      </template>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { Activity, PageInfo } from '@/typing/common';
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

const testData: Activity[] = [
  {
    id: '1',
    title: 'Activity 1',
    description: 'Description for Activity 1',
    locationName: 'Location 1',
    locationLong: '123.456',
    locationLat: '78.910',
    limitRegistration: 50,
    likeNumber: 20,
    startTime: 1631368800000, // September 12, 2021 12:00:00 AM UTC
    endTime: 1631383200000, // September 12, 2021 4:00:00 AM UTC
    createTime: 1631347200000, // September 11, 2021 8:00:00 PM UTC
    updateTime: 1631350800000, // September 11, 2021 9:00:00 PM UTC
  },
  {
    id: '2',
    title: 'Activity 2',
    description: 'Description for Activity 2',
    locationName: 'Location 2',
    locationLong: '98.765',
    locationLat: '43.210',
    limitRegistration: 100,
    likeNumber: 50,
    startTime: 1631455200000, // September 12, 2021 10:00:00 PM UTC
    endTime: 1631476800000, // September 13, 2021 4:00:00 AM UTC
    createTime: 1631430000000, // September 12, 2021 3:00:00 PM UTC
    updateTime: 1631433600000, // September 12, 2021 4:00:00 PM UTC
  },
  {
    id: '3',
    title: 'Activity 3',
    description: 'Description for Activity 3',
    locationName: 'Location 3',
    locationLong: '135.791',
    locationLat: '24.680',
    limitRegistration: 30,
    likeNumber: 10,
    startTime: 1631558400000, // September 13, 2021 12:00:00 AM UTC
    endTime: 1631572800000, // September 13, 2021 4:00:00 AM UTC
    createTime: 1631536800000, // September 12, 2021 8:00:00 PM UTC
    updateTime: 1631540400000, // September 12, 2021 9:00:00 PM UTC
  },
  {
    id: '4',
    title: 'Activity 4',
    description: 'Description for Activity 4',
    locationName: 'Location 4',
    locationLong: '76.543',
    locationLat: '32.109',
    limitRegistration: 20,
    likeNumber: 5,
    startTime: 1631644800000, // September 14, 2021 12:00:00 AM UTC
    endTime: 1631659200000, // September 14, 2021 4:00:00 AM UTC
    createTime: 1631623200000, // September 13, 2021 8:00:00 PM UTC
    updateTime: 1631626800000, // September 13, 2021 9:00:00 PM UTC
  },
  {
    id: '5',
    title: 'Activity 5',
    description: 'Description for Activity 5',
    locationName: 'Location 5',
    locationLong: '98.765',
    locationLat: '43.210',
    limitRegistration: 50,
    likeNumber: 30,
    startTime: 1631731200000, // September 15, 2021 12:00:00 AM UTC
    endTime: 1631745600000, // September 15, 2021 4:00:00 AM UTC
    createTime: 1631704800000, // September 14, 2021 8:00:00 PM UTC
    updateTime: 1631708400000, // September 14, 2021 9:00:00 PM UTC
  },
  {
    id: '6',
    title: 'Activity 6',
    description: 'Description for Activity 6',
    locationName: 'Location 6',
    locationLong: '123.456',
    locationLat: '78.910',
    limitRegistration: 40,
    likeNumber: 15,
    startTime: 1631817600000, // September 16, 2021 12:00:00 AM UTC
    endTime: 1631832000000, // September 16, 2021 4:00:00 AM UTC
    createTime: 1631791200000, // September 15, 2021 8:00:00 PM UTC
    updateTime: 1631794800000, // September 15, 2021 9:00:00 PM UTC
  },
  {
    id: '7',
    title: 'Activity 7',
    description: 'Description for Activity 7',
    locationName: 'Location 7',
    locationLong: '135.791',
    locationLat: '24.680',
    limitRegistration: 60,
    likeNumber: 25,
    startTime: 1631904000000, // September 17, 2021 12:00:00 AM UTC
    endTime: 1631918400000, // September 17, 2021 4:00:00 AM UTC
    createTime: 1631877600000, // September 16, 2021 8:00:00 PM UTC
    updateTime: 1631881200000, // September 16, 2021 9:00:00 PM UTC
  },
  {
    id: '8',
    title: 'Activity 8',
    description: 'Description for Activity 8',
    locationName: 'Location 8',
    locationLong: '76.543',
    locationLat: '32.109',
    limitRegistration: 25,
    likeNumber: 8,
    startTime: 1631990400000, // September 18, 2021 12:00:00 AM UTC
    endTime: 1632004800000, // September 18, 2021 4:00:00 AM UTC
    createTime: 1631964000000, // September 17, 2021 8:00:00 PM UTC
    updateTime: 1631967600000, // September 17, 2021 9:00:00 PM UTC
  },
  {
    id: '9',
    title: 'Activity 9',
    description: 'Description for Activity 9',
    locationName: 'Location 9',
    locationLong: '98.765',
    locationLat: '43.210',
    limitRegistration: 35,
    likeNumber: 12,
    startTime: 1632076800000, // September 19, 2021 12:00:00 AM UTC
    endTime: 1632091200000, // September 19, 2021 4:00:00 AM UTC
    createTime: 1632040800000, // September 18, 2021 8:00:00 PM UTC
    updateTime: 1632044400000, // September 18, 2021 9:00:00 PM UTC
  },
  {
    id: '10',
    title: 'Activity 10',
    description: 'Description for Activity 10',
    locationName: 'Location 10',
    locationLong: '123.456',
    locationLat: '78.910',
    limitRegistration: 45,
    likeNumber: 18,
    startTime: 1632163200000, // September 20, 2021 12:00:00 AM UTC
    endTime: 1632177600000, // September 20, 2021 4:00:00 AM UTC
    createTime: 1632136800000, // September 19, 2021 8:00:00 PM UTC
    updateTime: 1632140400000, // September 19, 2021 9:00:00 PM UTC
  },
];

const pageInfo = ref<PageInfo>({
  currentPage: 1,
  pageSize: 10,
  total: 100,
});

const currentPageChange = () => {
  console.log('pageChange');
};

const pageSizeChange = () => {
  console.log('pageSize change');
};

const tableData = ref<Activity[]>(testData);

enum ActivityStatus {
  'all',
  'notStart',
  'inProgress',
  'end',
}

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
  title: string;
  status: ActivityStatus;
}

const filterFormData = ref<FilterFormData>({
  title: '',
  status: ActivityStatus.all,
});

const formatDate = (timestamp: number) => {
  return dayjs(timestamp).format('YYYY-MM-DD HH:mm:ss');
};

const toAddActivity = () => {
  router.push('/admin/add-activity');
};

const toDetail = (activity: Activity) => {
  console.log('to detail', activity);
};
const toStatistics = (activity: Activity) => {
  console.log('to statistics', activity);
};
const toRegistrationAdmin = (activity: Activity) => {
  console.log('to toRegistrationAdmin', activity);
};
const notify = (activity: Activity) => {
  console.log('to notify', activity);
};
const edit = (activity: Activity) => {
  console.log('edit', activity);
};
const del = (activity: Activity) => {
  console.log('del', activity);
};
</script>

<style lang="scss" scoped></style>
