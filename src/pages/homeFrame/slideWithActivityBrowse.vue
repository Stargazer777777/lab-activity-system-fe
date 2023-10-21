<template>
  <div class="block">
    <div class="carousel-wrapper">
      <h2 class="title">轮播图</h2>
      <el-carousel height="200px" class="carousel">
        <el-carousel-item v-for="(item, index) in tableDate" :key="index">
          <a :href="item.targetUrl" target="_blank"
            ><img :src="item.imgUrl" alt="图片" class="carousel-image"
          /></a>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<style>
.block {
  display: flex;
  justify-content: center; /* 居中对齐 */
}

.carousel-demo {
  margin: 20px;
}

.title {
  font-size: 24px;
  text-align: center;
}

.carousel-wrapper {
  margin-top: 20px;
  width: 600px;
  height: 200px;
}

.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
<script lang="ts" setup>
import { searchSlidesApi } from '@/$http/apis/slideAdmin.api';
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
import { Slide } from '@/typing/common';

const route = useRoute();
const tableDate = ref<Slide[]>([]);

// 获取轮播图列表数据
const getTableData = async () => {
  const res = await searchSlidesApi();
  tableDate.value = res.data;
};

onMounted(() => {
  getTableData();
});
</script>
