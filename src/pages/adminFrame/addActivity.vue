<template>
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
        <el-form-item label="活动时间">
          <el-date-picker
            v-model="dateRange"
            type="datetimerange"
            range-separator="到"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            :disabled-date="(date:Date)=>date.getTime()<=new Date().getTime()"
          />
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="12" :offset="0">
      <ActivityMap @on-select-position="handleSelectPosition"
    /></el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { activityRule } from '@/rules/activityRule';
import { Activity } from '@/typing/common';
import ActivityMap from '@/components/adminFrame/activityAdmin/addActivityMap.vue';

const dateRange = ref<[Date, Date]>([new Date(), new Date()]);
watch(
  () => dateRange.value,
  (newVal) => {
    formData.value.startTime = newVal[0].getTime();
    formData.value.endTime = newVal[1].getTime();
  }
);
const formData = ref<Partial<Activity>>({});

const handleSelectPosition = (position: { long: number; lat: number }) => {
  formData.value.locationLong = position.long;
  formData.value.locationLat = position.lat;
};
</script>

<style lang="scss" scoped></style>
