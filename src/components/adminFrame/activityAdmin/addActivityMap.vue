<template>
  <AMapVue ref="mapRef" />
</template>

<script lang="ts" setup>
import AMapVue from '@/components/common/aMap.vue';
import AMap from 'AMap';
import { ElMessage } from 'element-plus';
import { onUnmounted } from 'vue';
import { onMounted } from 'vue';
import { ref } from 'vue';

const emits = defineEmits(['on-select-position']);

const mapRef = ref<InstanceType<typeof AMapVue>>();

let mapInstance: AMap.Map | undefined = undefined;

let circle: AMap.Circle | undefined = undefined;

const handleClickMap = (e: AMap.MapsEvent<'click', AMap.Map>) => {
  emits('on-select-position', {
    long: e.lnglat.getLng(),
    lat: e.lnglat.getLat(),
  });

  addCircle(e.target, e.lnglat);
};

// 添加圆形在地图上
const addCircle = (map: AMap.Map, position: AMap.LngLat) => {
  // 如果该圆形存在,则删除该圆形
  if (circle) {
    map.remove(circle);
  }
  circle = new AMap.Circle({
    center: position, // 圆心位置
    radius: 20, // 圆半径
    fillColor: '#ff000099', // 圆形填充颜色
    strokeColor: '#fff', // 描边颜色
    strokeWeight: 2, // 描边宽度
  });
  // 给圆本身添加点击事件
  circle.on('click', (e: AMap.MapsEvent<'click', AMap.Map>) => {
    addCircle(map, e.lnglat);
  });
  map.add(circle);
};

const addGeolocationPlugin = (map: AMap.Map) => {
  map.plugin('AMap.Geolocation', function () {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const geolocation = new (AMap as any).Geolocation({
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
    geolocation.getCurrentPosition();
    AMap.event.addListener(geolocation, 'complete', (data) => {
      // console.log(data);
      throw data;
    }); //返回定位信息
    AMap.event.addListener(geolocation, 'error', (err) => {
      ElMessage.error('定位时出错');
      throw err;
    }); //返回定位出错信息
  });
};

onMounted(() => {
  if (mapRef.value?.map) {
    mapInstance = mapRef.value.map;
    mapInstance.on('click', handleClickMap);
    addGeolocationPlugin(mapInstance);
  }
});
onUnmounted(() => {
  if (mapInstance) {
    mapInstance.off('click', handleClickMap);
  }
});
</script>

<style lang="scss" scoped></style>
