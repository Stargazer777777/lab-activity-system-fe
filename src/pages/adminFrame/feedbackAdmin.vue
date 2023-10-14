<template>
  <div>
    <!-- 页面头部 -->
    <PageHeader title="反馈管理" />

    <!-- 反馈筛选表单 -->
    <el-form
      :model="filterFormData"
      ref="filterFormRef"
      label-width="80px"
      :inline="true"
      size="default"
      @submit.prevent
    >
      <el-form-item label="反馈内容">
        <!-- 反馈内容输入框 -->
        <el-input
          v-model="filterFormData.keyword"
          placeholder="根据反馈内容筛选"
          clearable
          @change="getTableData"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <!-- 删除已选择按钮 -->
        <el-popconfirm
          title="确定要删除吗？"
          confirmButtonText="确定"
          cancelButtonText="取消"
          confirmButtonType="primary"
          cancelButtonType="text"
          @confirm="del(selections)"
        >
          <template #reference>
            <el-button
              type="danger"
              size="default"
              :disabled="!selections.length"
              >删除已选择的</el-button
            ></template
          >
        </el-popconfirm>
      </el-form-item>
    </el-form>

    <!-- 反馈列表 -->
    <el-table
      :data="tableData"
      border
      stripe
      @selection-change="tableSelectHandler"
    >
      <!-- 选择列 -->
      <el-table-column type="selection" width="50" />
      <!-- 序号列 -->
      <el-table-column type="index" width="50" />
      <!-- 内容列 -->
      <el-table-column label="内容" prop="content" min-width="200" />
      <!-- 操作列 -->
      <el-table-column label="操作" fixed="right" width="100" align="center">
        <template #default="{ row }: { row: Feedback }">
          <el-button-group size="small">
            <!-- 删除按钮 -->
            <el-popconfirm
              title="确定要删除吗？"
              confirmButtonText="确定"
              cancelButtonText="取消"
              confirmButtonType="primary"
              cancelButtonType="text"
              @confirm="del([row])"
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
      <!-- 分页器 -->
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
import { Feedback, PageInfo } from '@/typing/common';
import { Delete } from '@element-plus/icons-vue';
import PageHeader from '@/components/common/pageHeader.vue';
import { useRoute } from 'vue-router';
import {
  searchFeedbacksApi,
  delFeedbacksApi,
} from '@/$http/apis/feedbackAdmin.api';
import { ElMessage } from 'element-plus';

const route = useRoute();
const activityId: string | undefined = route.query['activity-id'] as string;

const pageInfo = ref<PageInfo>({
  currentPage: 1,
  pageSize: 10,
  total: 100,
});

interface FilterFormData {
  keyword: string;
}

const filterFormData = ref<FilterFormData>({ keyword: '' });

const tableData = ref<Feedback[]>([]);

// 获取表格数据
const getTableData = async () => {
  const res = await searchFeedbacksApi({
    activityId,
    page: pageInfo.value.currentPage,
    pageSize: pageInfo.value.pageSize,
    keyword: filterFormData.value.keyword,
  });
  tableData.value = res.data.records;
  pageInfo.value.total = res.data.total;
};
getTableData();

const selections = ref<Feedback[]>([]);

// 表格选择事件处理函数
const tableSelectHandler = (rows: Feedback[]) => {
  selections.value = rows;
};

// 删除反馈
const del = async (feedbacks: Feedback[]) => {
  await delFeedbacksApi({ ids: feedbacks.map((item) => item.id) });
  ElMessage.success('删除成功');
  getTableData();
};
</script>

<style lang="scss" scoped></style>
