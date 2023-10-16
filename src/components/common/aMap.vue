<template>
  <div class="amap" ref="amapRef"></div>
</template>

<script lang="ts" setup>
import AMap from 'AMap';
import { shallowRef } from 'vue';
import { onMounted } from 'vue';
import { ref } from 'vue';

interface Props {
  long?: number;
  lat?: number;
}

const props = defineProps<Props>();

const amapRef = ref<HTMLDivElement>();

const map = shallowRef<AMap.Map>();

onMounted(() => {
  map.value = new AMap.Map(amapRef.value as HTMLDivElement, {
    zoom: 18, //设置地图显示的缩放级别
    center: [props.long || 116.397428, props.lat || 39.90923], //设置地图中心点坐标
    // layers: [new AMap.TileLayer.Flexible()], //设置图层,可设置成包含一个或多个图层的数组
    // mapStyle: 'amap://styles/whitesmoke', //设置地图的显示样式
    viewMode: '2D', //设置地图模式
    lang: 'zh_cn', //设置地图语言类型
  });
});

defineExpose({
  map,
});
</script>

<style lang="scss" scoped>
.amap {
  height: 50vh;
}
</style>
