<template>
  <AMapVue ref="mapRef" />
</template>

<script lang="ts" setup>
import AMapVue from '@/components/common/aMap.vue';
import AMap from 'AMap';
import { ElMessage } from 'element-plus';
import { watch } from 'vue';
import { onMounted } from 'vue';
import { ref } from 'vue';

interface Props {
  location?: {
    long: number;
    lat: number;
  };
}
const props = defineProps<Props>();

const mapRef = ref<InstanceType<typeof AMapVue>>();

let mapInstance: AMap.Map | undefined = undefined;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let geolocation: any = undefined;

// 添加圆形在地图上
let circle: AMap.Circle | undefined = undefined;
const addCircle = (map: AMap.Map, position: AMap.LngLat) => {
  // 如果该圆形存在,则删除该圆形
  if (circle) {
    map.remove(circle);
  }
  circle = new AMap.Circle({
    center: position, // 圆心位置
    radius: import.meta.env.locationRadius, // 圆半径
    fillColor: '#ff000099', // 圆形填充颜色
    strokeColor: '#fff', // 描边颜色
    strokeWeight: 2, // 描边宽度
  });
  map.add(circle);
};

watch(
  () => props.location,
  (newVal) => {
    if (newVal && mapInstance) {
      addCircle(mapInstance, new AMap.LngLat(newVal?.long, newVal?.lat));
    }
  },
  {
    deep: true,
  }
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const addGeolocationPlugin = (map: AMap.Map): Promise<any> => {
  return new Promise((resolve) => {
    map.plugin('AMap.Geolocation', function () {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      geolocation = new (AMap as any).Geolocation({
        enableHighAccuracy: true, //是否使用高精度定位，默认:true
        timeout: 10000, //超过10秒后停止定位，默认：无穷大
        maximumAge: 0, //定位结果缓存0毫秒，默认：0
        convert: true, //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
        showButton: true, //显示定位按钮，默认：true
        buttonPosition: 'LT', //定位按钮停靠位置，默认：'LB'，左下角
        buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        showMarker: true, //定位成功后在定位到的位置显示点标记，默认：true
        showCircle: false, //定位成功后用圆圈表示定位精度范围，默认：true
        panToLocation: true, //定位成功后将定位到的位置作为地图中心点，默认：true
        zoomToAccuracy: true, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
      });
      map.addControl(geolocation);
      resolve(geolocation);
      geolocation.getCurrentPosition();
      // AMap.event.addListener(geolocation, 'complete', (data) => {}); //返回定位信息
      AMap.event.addListener(geolocation, 'error', (err) => {
        ElMessage.error('定位时出错');
        throw err;
      }); //返回定位出错信息
    });
  });
};

const getLocation = (): Promise<{ lng: number; lat: number }> => {
  AMap.event.removeListener(geolocation);
  return new Promise((resolve, reject) => {
    geolocation.getCurrentPosition();
    AMap.event.addListener(geolocation, 'complete', (data) => {
      resolve(data.position);
    }); //返回定位信息
    AMap.event.addListener(geolocation, 'error', (err) => {
      ElMessage.error('定位时出错');
      reject(err);
      throw err;
    }); //返回定位出错信息
  });
};

onMounted(async () => {
  if (mapRef.value?.map) {
    mapInstance = mapRef.value.map;
    geolocation = await addGeolocationPlugin(mapInstance);
  }
});

defineExpose({ getLocation });
</script>

<style lang="scss" scoped></style>
