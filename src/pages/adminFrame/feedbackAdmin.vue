<template>
  <div>
    <PageHeader title="反馈管理" sub-title="活动xxx" />
    <el-form
      :model="filterFormData"
      ref="filterFormRef"
      label-width="80px"
      :inline="true"
      size="default"
    >
      <el-form-item label="通知内容">
        <el-input
          v-model="filterFormData.content"
          placeholder="根据通知内容筛选"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="danger" size="default" :disabled="true"
          >删除已选择的</el-button
        >
      </el-form-item>
    </el-form>

    <el-table :data="tableData" border stripe>
      <el-table-column type="selection" width="50" />
      <el-table-column type="index" width="50" />
      <el-table-column label="内容" prop="content" min-width="200" />
      <el-table-column label="操作" fixed="right" width="100" align="center">
        <template #default="{ row }: { row: Feedback }">
          <el-button-group size="small">
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
import { Feedback, PageInfo } from '@/typing/common';
import { Delete } from '@element-plus/icons-vue';
import PageHeader from '@/components/common/pageHeader.vue';

const testData: Feedback[] = [
  {
    id: '1',
    content: 'This is feedback 1',
    userId: 'user1',
    activityId: 'activity1',
  },
  {
    id: '2',
    content: 'This is feedback 2',
    userId: 'user2',
    activityId: 'activity1',
  },
  {
    id: '3',
    content: 'This is feedback 3',
    userId: 'user1',
    activityId: 'activity2',
  },
  {
    id: '4',
    content: 'This is feedback 4',
    userId: 'user2',
    activityId: 'activity2',
  },
  {
    id: '5',
    content: 'This is feedback 5',
    userId: 'user1',
    activityId: 'activity3',
  },
  {
    id: '6',
    content: 'This is feedback 6',
    userId: 'user2',
    activityId: 'activity3',
  },
  {
    id: '7',
    content: 'This is feedback 7',
    userId: 'user1',
    activityId: 'activity4',
  },
  {
    id: '8',
    content: 'This is feedback 8',
    userId: 'user2',
    activityId: 'activity4',
  },
  {
    id: '9',
    content: 'This is feedback 9',
    userId: 'user1',
    activityId: 'activity5',
  },
  {
    id: '10',
    content: 'This is feedback 10',
    userId: 'user2',
    activityId: 'activity5',
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

const tableData = ref<Feedback[]>(testData);

const filterFormData = ref<Partial<Feedback>>({});

const del = (registration: Feedback) => {
  console.log('del', registration);
};
</script>

<style lang="scss" scoped></style>
