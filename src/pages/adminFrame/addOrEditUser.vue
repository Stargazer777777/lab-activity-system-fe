<template>
  <div v-loading="submitLoading">
    <!-- 加载动画 -->
    <el-row :gutter="20">
      <el-col :span="12" :offset="0">
        <el-form
          :model="formData"
          ref="formRef"
          :rules="userRule"
          label-width="200px"
          :inline="false"
          size="default"
        >
          <!-- 学号表单项 -->
          <el-form-item label="学号" prop="stuNo">
            <el-input v-model="formData.stuNo"></el-input>
          </el-form-item>
          <!-- 邮箱表单项 -->
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="formData.email"></el-input>
          </el-form-item>
          <!-- 名称表单项 -->
          <el-form-item label="名称" prop="name">
            <el-input v-model="formData.name"></el-input>
          </el-form-item>
          <!-- 密码表单项 -->
          <el-form-item label="密码" prop="password">
            <el-input v-model="formData.password"></el-input>
          </el-form-item>
          <!-- 性别表单项 -->
          <el-form-item label="性别" prop="sex">
            <el-select v-model="formData.sex" placeholder="请选择性别">
              <el-option label="男" value="1"></el-option>
              <el-option label="女" value="0"></el-option>
            </el-select>
          </el-form-item>
          <!-- 权限表单项 -->
          <el-form-item label="权限" prop="role">
            <el-select v-model="formData.role" placeholder="请选择权限">
              <el-option label="管理员" value="管理员"></el-option>
              <el-option label="普通用户" value="普通用户"></el-option>
            </el-select>
          </el-form-item>
          <!-- 状态表单项 -->
          <el-form-item label="状态" prop="status">
            <el-select v-model="formData.status" placeholder="请选择状态">
              <el-option label="禁用" value="禁用"></el-option>
              <el-option label="启用" value="启用"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <!-- 按钮组 -->
            <div
              style="width: 100%; display: flex; justify-content: flex-start"
            >
              <el-button
                type="primary"
                size="default"
                @click="submit"
                style="margin-right: 10px"
                >提交</el-button
              >
              <el-button
                type="primary"
                size="default"
                @click="handleClear"
                style="margin-right: 10px"
                >清空</el-button
              >
              <el-button type="primary" size="default" @click="exit"
                >退出</el-button
              >
            </div>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { userRule } from '@/rules/userRule';
import { Activity, User } from '@/typing/common';
import ActivityMap from '@/components/adminFrame/activityAdmin/addActivityMap.vue';
import ActivityEditor from '@/components/adminFrame/activityAdmin/activityEditor.vue';
import { computed } from 'vue';
import { ElMessage, FormInstance } from 'element-plus';
import {
  addUserApi,
  editUserApi,
  getUserByIdApi,
} from '@/$http/apis/userAdmin.api';
import { useRoute } from 'vue-router';
import { NULL } from 'sass';
import router from '@/router';

const route = useRoute();
const userId: string | undefined = route.query['user-id'] as string;
const mapRef = ref<InstanceType<typeof ActivityMap>>();

const dateRange = ref<[Date, Date]>([new Date(), new Date()]);

const formRef = ref<FormInstance>();
const formData = ref<Partial<User>>({});

const getUserById = async (userId: string) => {
  // 根据userId获取活动信息
  const res = await getUserByIdApi({ id: userId });
  formData.value = res.data;
};
if (userId) {
  getUserById(userId);
}

const mode = computed(() => {
  // 根据formData的id判断是编辑模式还是添加模式
  if (formData.value.id) return 'edit';
  return 'add';
});

const handleClear = () => {
  //清空逻辑的代码
  formData.value.stuNo = '';
  formData.value.email = '';
  formData.value.name = '';
  formData.value.password = '';
};

const exit = () => {
  //退出当前页面
  router.push('/admin/user');
};

const submitLoading = ref(false);
const submit = async () => {
  // 提交表单
  submitLoading.value = true;
  try {
    await formRef.value?.validate();
    if (mode.value === 'add') {
      // 添加活动
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await addUserApi(formData.value as any);
      ElMessage.success('添加成功');
    }
    if (mode.value === 'edit') {
      // 修改活动
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await editUserApi(formData.value as any);
      ElMessage.success('修改成功');
    }
  } finally {
    submitLoading.value = false;
  }
};
</script>

<style lang="scss" scoped></style>
