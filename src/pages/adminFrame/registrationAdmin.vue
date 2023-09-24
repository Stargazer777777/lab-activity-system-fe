<template>
  <div>
    <el-form
      :model="filterFormData"
      ref="filterFormRef"
      label-width="60px"
      :inline="true"
      size="default"
    >
      <el-form-item label="用户名" prop="title">
        <el-input
          v-model="filterFormData.username"
          placeholder="根据用户名筛选"
        ></el-input>
      </el-form-item>
      <el-form-item label="签到状态" label-width="80"
        ><el-radio-group v-model="filterFormData.isCheckIn">
          <el-radio :label="undefined">所有</el-radio>
          <el-radio :label="true">已签到</el-radio>
          <el-radio :label="false">未签到</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" border stripe>
      <el-table-column type="selection" width="50" />
      <el-table-column type="index" width="50" />
      <el-table-column label="id" prop="id" width="50" />
      <el-table-column label="用户名" prop="username" min-width="100" />
      <el-table-column label="学号" prop="stuNo" min-width="100" />
      <el-table-column label="性别" prop="sex" min-width="100">
        <template #default="{ row }: { row: Registration }">
          {{ row.sex === 0 ? '女' : '男' }}
        </template>
      </el-table-column>
      <el-table-column label="是否签到" prop="isCheckIn" min-width="100">
        <template #default="{ row }: { row: Registration }">
          {{ row.isCheckIn ? '已签到' : '未签到' }}
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="200" align="center">
        <template #default="{ row }: { row: Registration }">
          <el-button-group size="small">
            <el-button type="primary" :icon="Notification" @click="notify(row)"
              >通知</el-button
            >
            <el-button type="danger" :icon="Delete" @click="kickout(row)"
              >踢出</el-button
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
import { Registration, PageInfo } from '@/typing/common';
import { Delete, Notification } from '@element-plus/icons-vue';

const testData: Registration[] = [
  {
    id: '1',
    userId: 'user1',
    stuNo: '001',
    username: 'John Doe',
    sex: 0,
    activityId: 'activity1',
    isCheckIn: true,
  },
  {
    id: '2',
    userId: 'user2',
    stuNo: '002',
    username: 'Jane Smith',
    sex: 1,
    activityId: 'activity2',
    isCheckIn: false,
  },
  {
    id: '3',
    userId: 'user3',
    stuNo: '003',
    username: 'Mike Johnson',
    sex: 0,
    activityId: 'activity1',
    isCheckIn: true,
  },
  {
    id: '4',
    userId: 'user4',
    stuNo: '004',
    username: 'Emily Brown',
    sex: 1,
    activityId: 'activity3',
    isCheckIn: true,
  },
  {
    id: '5',
    userId: 'user5',
    stuNo: '005',
    username: 'David Wilson',
    sex: 0,
    activityId: 'activity2',
    isCheckIn: false,
  },
  {
    id: '6',
    userId: 'user6',
    stuNo: '006',
    username: 'Sarah Davis',
    sex: 1,
    activityId: 'activity1',
    isCheckIn: true,
  },
  {
    id: '7',
    userId: 'user7',
    stuNo: '007',
    username: 'Michael Johnson',
    sex: 0,
    activityId: 'activity3',
    isCheckIn: true,
  },
  {
    id: '8',
    userId: 'user8',
    stuNo: '008',
    username: 'Emma Wilson',
    sex: 1,
    activityId: 'activity2',
    isCheckIn: false,
  },
  {
    id: '9',
    userId: 'user9',
    stuNo: '009',
    username: 'Daniel Brown',
    sex: 0,
    activityId: 'activity1',
    isCheckIn: true,
  },
  {
    id: '10',
    userId: 'user10',
    stuNo: '010',
    username: 'Olivia Davis',
    sex: 1,
    activityId: 'activity3',
    isCheckIn: true,
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

const tableData = ref<Registration[]>(testData);

const filterFormData = ref<Partial<Registration>>({});

const notify = (registration: Registration) => {
  console.log('to notify', registration);
};
const kickout = (registration: Registration) => {
  console.log('del', registration);
};
</script>

<style lang="scss" scoped></style>
