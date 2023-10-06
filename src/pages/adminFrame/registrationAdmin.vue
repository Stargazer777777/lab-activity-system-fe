<template>
  <div>
    <PageHeader title="报名管理" />
    <el-form
      :model="filterFormData"
      ref="filterFormRef"
      label-width="60px"
      :inline="true"
      size="default"
      @submit.prevent
    >
      <el-form-item label="用户名">
        <el-input
          v-model="filterFormData.keyword"
          clearable
          placeholder="根据用户名筛选"
          @change="getTableData"
        ></el-input>
      </el-form-item>
      <el-form-item label="签到状态" label-width="80"
        ><el-radio-group
          v-model="filterFormData.checkStatus"
          @change="getTableData"
        >
          <el-radio :label="undefined">所有</el-radio>
          <el-radio :label="1">已签到</el-radio>
          <el-radio :label="0">未签到</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="签到状态" label-width="80"
        ><el-button-group>
          <el-button
            type="primary"
            size="default"
            :disabled="!selections.length"
            >通知已选择的</el-button
          >
          <el-popconfirm
            title="确定要踢出吗？"
            confirmButtonText="确定"
            cancelButtonText="取消"
            confirmButtonType="primary"
            cancelButtonType="text"
            @confirm="kickout(selections)"
          >
            <template #reference
              ><el-button type="danger" :disabled="!selections.length"
                >踢出已选择的</el-button
              ></template
            >
          </el-popconfirm>
        </el-button-group>
      </el-form-item>
    </el-form>

    <el-table
      :data="tableData"
      border
      stripe
      @selection-change="tableSelectHandler"
    >
      <el-table-column type="selection" width="50" />
      <el-table-column type="index" width="50" />
      <el-table-column label="用户名" prop="user.name" min-width="100" />
      <el-table-column label="学号" prop="user.stuNo" min-width="100" />
      <el-table-column label="性别" prop="user.sex" min-width="100">
        <template #default="{ row }: { row: Registration }">
          {{ row.user.sex === 0 ? '女' : '男' }}
        </template>
      </el-table-column>
      <el-table-column label="是否签到" prop="isCheckIn" min-width="100">
        <template #default="{ row }: { row: Registration }">
          {{ row.isCheckin ? '已签到' : '未签到' }}
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="200" align="center">
        <template #default="{ row }: { row: Registration }">
          <el-button-group size="small">
            <el-button type="primary" :icon="Notification" @click="notify(row)"
              >通知</el-button
            >
            <el-popconfirm
              title="确定要踢出吗？"
              confirmButtonText="确定"
              cancelButtonText="取消"
              confirmButtonType="primary"
              cancelButtonType="text"
              @confirm="kickout([row])"
            >
              <template #reference
                ><el-button type="danger" :icon="Delete"
                  >删除</el-button
                ></template
              >
            </el-popconfirm>
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
import { Registration, PageInfo } from '@/typing/common';
import { Delete, Notification } from '@element-plus/icons-vue';
import PageHeader from '@/components/common/pageHeader.vue';
import {
  searchRegistrationsApi,
  delRegistraionsApi,
} from '@/$http/apis/registrationAdmin.api';
import { useRoute } from 'vue-router';
import { ElMessage } from 'element-plus';

const route = useRoute();
const activityId: string | undefined = route.query['activity-id'] as string;

const pageInfo = ref<PageInfo>({
  currentPage: 1,
  pageSize: 10,
  total: 100,
});

interface FilterFormData {
  keyword?: string;
  checkStatus?: 1 | 0;
}

const filterFormData = ref<FilterFormData>({ keyword: '' });

const tableData = ref<Registration[]>([]);

const getTableData = async () => {
  const res = await searchRegistrationsApi({
    activityId: activityId,
    page: pageInfo.value.currentPage,
    pageSize: pageInfo.value.pageSize,
    keyword: filterFormData.value.keyword,
    checkStatus: filterFormData.value.checkStatus,
  });
  tableData.value = res.data.records;
  pageInfo.value.total = res.data.total;
};

getTableData();

const selections = ref<Registration[]>([]);

const tableSelectHandler = (rows: Registration[]) => {
  selections.value = rows;
};

const kickout = async (registrations: Registration[]) => {
  await delRegistraionsApi({ ids: registrations.map((item) => item.id) });
  ElMessage.success('删除成功');
  getTableData();
};

const notify = (registration: Registration) => {
  console.log('to notify', registration);
};
</script>

<style lang="scss" scoped></style>
