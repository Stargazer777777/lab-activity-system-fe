<template>
  <div class="container">
    <CheckInMap
      ref="mapRef"
      class="map part part1"
      :location="activityLocation"
    />
    <div class="part part2">
      <el-descriptions title="活动信息" :column="1" size="large" border>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon>
                <Star />
              </el-icon>
              活动名称
            </div>
          </template>
          {{ activityInfo?.title }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon>
                <Location />
              </el-icon>
              活动地点
            </div>
          </template>
          {{ activityInfo?.locationName }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon>
                <Calendar />
              </el-icon>
              开始时间
            </div>
          </template>
          {{ formatDate(activityInfo?.startTime) }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon>
                <Calendar />
              </el-icon>
              结束时间
            </div>
          </template>
          {{ formatDate(activityInfo?.endTime) }}
        </el-descriptions-item>
      </el-descriptions>
      <el-button
        class="btn"
        type="primary"
        size="default"
        @click="checkIn"
        v-loading="checkInLoading"
        :disabled="checkInLoading"
        >点击签到</el-button
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import CheckInMap from '@/components/checkIn/checkInMap.vue';
import { Activity } from '@/typing/common';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { getActivityByIdApi } from '@/$http/apis/activityAdmin.api';
import { Star, Location, Calendar } from '@element-plus/icons-vue';
import dayjs from 'dayjs';
import { computed } from 'vue';
import { checkInApi } from '@/$http/apis/checkIn.api';
import { ElMessage } from 'element-plus';
import router from '@/router';

const route = useRoute();
const activityId: string | undefined =
  (route.query['activity-id'] as string) ||
  '36733723-a76c-49bf-903c-20124f594b53';

const activityInfo = ref<Activity>();

const mapRef = ref<InstanceType<typeof CheckInMap>>();

const activityLocation = computed(() => {
  if (activityInfo.value) {
    return {
      long: activityInfo.value.locationLong,
      lat: activityInfo.value.locationLat,
    };
  }
  return undefined;
});

const getActivityInfo = async () => {
  const res = await getActivityByIdApi({ id: activityId });
  activityInfo.value = res.data;
};
getActivityInfo();

const formatDate = (date: Date | undefined) => {
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
};

const checkInLoading = ref(false);

const checkIn = async () => {
  checkInLoading.value = true;
  if (!mapRef.value) {
    return;
  }
  try {
    const currentLocation = await mapRef.value.getLocation();

    await checkInApi({
      activityId: activityId,
      locationLong: currentLocation.lng,
      locationLat: currentLocation.lat,
    });
    ElMessage.success('签到成功');
    setTimeout(() => {
      router.back();
    }, 500);
  } finally {
    checkInLoading.value = false;
  }
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: row;
  height: 100vh;
  min-height: 500px;
  .part {
    width: 50%;
    height: 100%;
  }
  .part2 {
    padding: 20px;
    text-align: center;
    .btn {
      margin-top: 10%;
      width: 50%;
      height: 20%;
      font-size: 30px;
      font-weight: 600;
    }
  }
}
@media screen and (max-width: 900px) {
  .container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    min-height: 500px;
    .part {
      width: 100%;
      height: 50%;
    }
  }
}
</style>
