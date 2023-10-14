<template>
  <div class="container">
    <!-- CheckInMap组件，用于展示活动地点的地图 -->
    <CheckInMap
      ref="mapRef"
      class="map part part1"
      :location="activityLocation"
    />
    <div class="part part2">
      <!-- 活动信息展示 -->
      <el-descriptions title="活动信息" :column="1" size="large" border>
        <!-- 活动名称 -->
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
        <!-- 活动地点 -->
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
        <!-- 开始时间 -->
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
        <!-- 结束时间 -->
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
      <!-- 点击签到按钮 -->
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

// 获取当前路由
const route = useRoute();
// 获取活动id
const activityId: string | undefined =
  (route.query['activity-id'] as string) ||
  '36733723-a76c-49bf-903c-20124f594b53';

// 活动信息
const activityInfo = ref<Activity>();

// 地图组件引用
const mapRef = ref<InstanceType<typeof CheckInMap>>();

// 计算属性，根据活动信息获取活动地点的经纬度
const activityLocation = computed(() => {
  if (activityInfo.value) {
    return {
      long: activityInfo.value.locationLong,
      lat: activityInfo.value.locationLat,
    };
  }
  return undefined;
});

// 获取活动信息
const getActivityInfo = async () => {
  const res = await getActivityByIdApi({ id: activityId });
  activityInfo.value = res.data;
};
getActivityInfo();

// 格式化日期
const formatDate = (date: Date | undefined) => {
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
};

// 签到loading状态
const checkInLoading = ref(false);

// 签到函数
const checkIn = async () => {
  checkInLoading.value = true;
  if (!mapRef.value) {
    return;
  }
  try {
    // 获取当前位置
    const currentLocation = await mapRef.value.getLocation();

    // 发起签到请求
    await checkInApi({
      activityId: activityId,
      locationLong: currentLocation.lng,
      locationLat: currentLocation.lat,
    });
    // 签到成功提示
    ElMessage.success('签到成功');
    // 500ms后返回上一页
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
