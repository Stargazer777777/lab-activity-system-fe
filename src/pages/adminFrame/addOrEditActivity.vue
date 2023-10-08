<template>
  <div v-loading="submitLoading">
    <el-row :gutter="20">
      <el-col :span="12" :offset="0">
        <el-form
          :model="formData"
          ref="formRef"
          :rules="activityRule"
          label-width="120px"
          :inline="false"
          size="default"
        >
          <el-form-item label="活动名称" prop="title">
            <el-input v-model="formData.title"></el-input>
          </el-form-item>
          <el-form-item label="活动地点名称" prop="locationName">
            <el-input v-model="formData.locationName"></el-input>
          </el-form-item>
          <el-alert
            style="margin: 10px 0"
            title="经纬度在地图上选点"
            type="info"
          />
          <el-form-item label="活动所在经度" prop="locationLong">
            <el-input-number
              v-model="formData.locationLong"
              :step="1e-15"
              :controls="true"
            >
            </el-input-number>
          </el-form-item>
          <el-form-item label="活动所在纬度" prop="locationLat">
            <el-input-number
              v-model="formData.locationLat"
              :step="1e-15"
              :controls="true"
            >
            </el-input-number>
          </el-form-item>
          <el-form-item label="活动人数限制" prop="limitRegistration">
            <el-input-number
              v-model="formData.limitRegistration"
              :step="1"
              :min="1"
              :controls="true"
            >
            </el-input-number>
          </el-form-item>
          <el-form-item label="活动时间" prop="startTime">
            <el-date-picker
              v-model="dateRange"
              type="datetimerange"
              range-separator="到"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
            />
          </el-form-item>
          <el-form-item>
            <div
              style="width: 100%; display: flex; flex-direction: row-reverse"
            >
              <el-button-group>
                <el-button type="primary" size="default" @click="submit"
                  >提交</el-button
                >
                <el-button type="primary" size="default">清空</el-button>
              </el-button-group>
            </div>
          </el-form-item>
        </el-form>
        <ActivityMap ref="mapRef" @on-select-position="handleSelectPosition" />
      </el-col>
      <el-col :span="12" :offset="0">
        <ActivityEditor v-model="formData.description"
      /></el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { activityRule } from '@/rules/activityRule';
import { Activity } from '@/typing/common';
import ActivityMap from '@/components/adminFrame/activityAdmin/addActivityMap.vue';
import ActivityEditor from '@/components/adminFrame/activityAdmin/activityEditor.vue';
import { computed } from 'vue';
import { ElMessage, FormInstance } from 'element-plus';
import {
  addActivityApi,
  getActivityByIdApi,
  editActivityApi,
} from '@/$http/apis/activityAdmin.api';
import { useRoute } from 'vue-router';

const route = useRoute();
const activityId: string | undefined = route.query['activity-id'] as string;
const mapRef = ref<InstanceType<typeof ActivityMap>>();

const dateRange = ref<[Date, Date]>([new Date(), new Date()]);
watch(
  () => dateRange.value,
  (newVal) => {
    formData.value.startTime = newVal[0];
    formData.value.endTime = newVal[1];
  }
);

const formRef = ref<FormInstance>();
const formData = ref<Partial<Activity>>({});

const getActivityById = async (activityId: string) => {
  const res = await getActivityByIdApi({ id: activityId });
  res.data.locationLong = parseFloat(res.data.locationLong);
  res.data.locationLat = parseFloat(res.data.locationLat);
  formData.value = res.data;
  mapRef.value?.initCircle(res.data.locationLong, res.data.locationLat);
};
if (activityId) {
  getActivityById(activityId);
}

const mode = computed(() => {
  if (formData.value.id) return 'edit';
  return 'add';
});

const handleSelectPosition = (position: { long: number; lat: number }) => {
  formData.value.locationLong = position.long;
  formData.value.locationLat = position.lat;
};

const submitLoading = ref(false);
const submit = async () => {
  submitLoading.value = true;
  try {
    await formRef.value?.validate();
    if (mode.value === 'add') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await addActivityApi(formData.value as any);
      ElMessage.success('添加成功');
    }
    if (mode.value === 'edit') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await editActivityApi(formData.value as any);
      ElMessage.success('修改成功');
    }
  } finally {
    submitLoading.value = false;
  }
};
</script>

<style lang="scss" scoped></style>
