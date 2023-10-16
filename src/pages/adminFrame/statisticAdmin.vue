<template>
  <div>
    <!-- 页面头部 -->
    <PageHeader title="活动统计" />
    <!-- 页面主体 -->
    <div style="background-color: #f0f2f5">
      <el-space direction="vertical">
        <el-space wrap>
          <!-- 卡片————活动实时情况 -->
          <el-card
            class="box-card"
            style="width: 980px; height: 600px; margin: 20px"
          >
            <template #header>
              <div class="card-header">
                <span>活动实时情况</span>
              </div>
            </template>
            <div class="text item">
              <div>
                <span style="display: inline-block; margin-left: 30px">
                  <el-text class="mx-1" type="primary" size="large">
                    总报名人次
                  </el-text>
                  <br />
                  <br />
                  {{ activityStatisticData?.totalCount + ' 人次' }}
                </span>
                <span style="display: inline-block; margin-left: 30px">
                  <el-text class="mx-1" type="primary" size="large">
                    活动参与率
                  </el-text>
                  <br />
                  <br />
                  {{ activityStatisticData?.checkRate + ' %' }}
                </span>
                <span style="display: inline-block; margin-left: 20px">
                  <el-text class="mx-1" type="primary" size="large">
                    平均反馈评分
                  </el-text>
                  <br />
                  <br />
                  {{ activityStatisticData?.averageMark + ' 分' }}
                </span>
                <span style="display: inline-block; margin-left: 30px">
                  <el-text class="mx-1" type="primary" size="large">
                    活动起止时间
                  </el-text>
                  <br />
                  <br />
                  {{ activityStatisticData?.activityTime + ' ' }}
                </span>
              </div>
              <div
                style="
                  background-color: #999999;
                  width: 900px;
                  height: 350px;
                  margin: 20px;
                "
              >
                <AMapVue
                  ref="mapRef"
                  :long="activityStatisticData?.locationLong"
                  :lat="activityStatisticData?.locationLat"
                  style="height: 360px"
                />
                <!-- <CheckInMap
                  :location="activityLocation"
                  style="height: 360px"
                /> -->
              </div>
              <div
                ref="mainCharRef"
                style="width: 900px; height: 60px; margin-top: 10px"
              ></div>
            </div>
          </el-card>
          <el-space direction="vertical">
            <!-- 卡片————活动结果预测 -->
            <el-card
              class="box-card"
              style="
                width: 410px;
                height: 335px;
                margin: 20px;
                margin-bottom: 15px;
              "
            >
              <template #header>
                <div class="card-header">
                  <span>活动结果预测</span>
                </div>
              </template>
              <div class="text item">
                <div
                  id="main2"
                  ref="mainCharRef2"
                  style="
                    width: 390px;
                    height: 260px;
                    margin: 0px;
                    margin-bottom: 0px;
                  "
                ></div>
              </div>
            </el-card>
            <!-- 卡片————用户反馈评论 -->
            <el-card
              class="box-card"
              style="
                width: 410px;
                height: 235px;
                margin: 20px;
                margin-top: 15px;
              "
            >
              <template #header>
                <div class="card-header">
                  <span>用户反馈评论</span>
                </div>
              </template>
              <div class="text item">
                <div id="container"></div>
              </div>
            </el-card>
          </el-space>
        </el-space>
        <el-space wrap>
          <!-- 卡片————已报名用户表 -->
          <el-card class="box-card" style="width: 695px; margin: 20px">
            <template #header>
              <div class="card-header">
                <span>已报名用户列表</span>
                <el-button
                  style="float: right"
                  type="primary"
                  class="button"
                  @click="downExcel1('报名签到表')"
                  text
                >
                  点击打印报名签到表<el-icon class="el-icon--right"
                    ><Upload
                  /></el-icon>
                </el-button>
              </div>
            </template>
            <div class="text item">
              <el-table
                id="excel1"
                :data="registerUser"
                style="width: 100%"
                height="250"
              >
                <el-table-column fixed type="index" width="50" />
                <el-table-column prop="stuNo" label="学号" width="150" />
                <el-table-column prop="name" label="姓名" width="120" />
                <el-table-column prop="sex" label="性别" width="120" />
                <el-table-column prop="email" label="邮箱" width="320" />
                <el-table-column prop="time" label="报名时间" width="600" />
              </el-table>
            </div>
          </el-card>
          <!-- 卡片————已参与用户表 -->
          <el-card class="box-card" style="width: 695px; margin: 20px">
            <template #header>
              <div class="card-header">
                <span>已参与用户列表</span>
                <el-button
                  style="float: right"
                  type="primary"
                  class="button"
                  @click="downExcel2('活动参与证明')"
                  text
                >
                  点击打印活动参与证明<el-icon class="el-icon--right"
                    ><Upload
                  /></el-icon>
                </el-button>
              </div>
            </template>
            <div class="text item">
              <el-table
                id="excel2"
                :data="checkedUser"
                style="width: 100%"
                height="250"
              >
                <el-table-column fixed type="index" width="50" />
                <el-table-column prop="stuNo" label="学号" width="150" />
                <el-table-column prop="name" label="姓名" width="120" />
                <el-table-column prop="sex" label="性别" width="120" />
                <el-table-column prop="email" label="邮箱" width="320" />
                <el-table-column prop="time" label="签到时间" width="600" />
              </el-table>
            </div>
          </el-card>
        </el-space>
      </el-space>
    </div>
  </div>
</template>

<script lang="ts" setup>
import AMapVue from '@/components/common/aMap.vue';
import { getStatisticDataApi } from '@/$http/apis/statisticAdmin.api';
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { Upload } from '@element-plus/icons-vue';
import easyDanmaku from 'easy-danmaku-js';
import FileSaver from 'file-saver';
import XLSX from 'xlsx';
import * as echarts from 'echarts/core';
import {
  TitleComponent,
  TitleComponentOption,
  ToolboxComponent,
  ToolboxComponentOption,
  TooltipComponent,
  TooltipComponentOption,
  GridComponent,
  GridComponentOption,
  LegendComponent,
  LegendComponentOption,
} from 'echarts/components';
import { BarChart, BarSeriesOption } from 'echarts/charts';
import { LineChart, LineSeriesOption } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  LineChart,
  BarChart,
  CanvasRenderer,
  UniversalTransition,
]);

type EChartsOption = echarts.ComposeOption<
  | TitleComponentOption
  | ToolboxComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | LegendComponentOption
  | BarSeriesOption
  | LineSeriesOption
>;

interface activityStatistic {
  activityTittle: string;
  activityState: number;
  stateTime: Date;
  activityTime: string;
  totalCount: string;
  checkRate: string;
  averageMark: string;
  activityDescription: string;
  locationLong: number;
  locationLat: number;
  markCount: number[][];
  activityFeedback: string[];
}

interface activityUser {
  stuNo: string;
  name: string;
  sex: string;
  email: string;
  time: string;
}

const route = useRoute();
const activityId: string = route.query['activity-id'] as string;
const activityStatisticData = ref<activityStatistic>();
const registerUser = ref<activityUser[]>([]);
const checkedUser = ref<activityUser[]>([]);

const mainCharRef = ref<HTMLDivElement>();
const mainCharRef2 = ref<HTMLDivElement>();

const getStatisticData = async () => {
  const res = await getStatisticDataApi({
    activityId,
  });
  activityStatisticData.value = res.data.activityStatistic;
  registerUser.value = res.data.registerUser;
  checkedUser.value = res.data.checkedUser;

  changTable(activityStatisticData.value);
  changDanmaku(activityStatisticData.value);
};
getStatisticData();

const changTable = (activityStatisticData?: activityStatistic) => {
  var myChart = echarts.init(mainCharRef.value);
  var option;
  option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        // Use axis to trigger tooltip
        type: 'line', // 'shadow' as default; can also be 'line' or 'shadow'
      },
    },
    color: ['#EE6666', '#FAC858', '#5470C6', '#91CC75'],
    legend: {},
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'value',
      show: false,
    },
    yAxis: {
      type: 'category',
      data: ['反馈评分'],
    },
    series: [
      {
        name: '低于40分',
        type: 'bar',
        stack: 'total',
        label: {
          show: true,
        },
        emphasis: { focus: 'series' },
        data: activityStatisticData?.markCount[0],
      },
      {
        name: '40~70分',
        type: 'bar',
        stack: 'total',
        label: {
          show: true,
        },
        emphasis: {
          focus: 'series',
        },
        data: activityStatisticData?.markCount[1],
      },
      {
        name: '70~85分',
        type: 'bar',
        stack: 'total',
        label: {
          show: true,
        },
        emphasis: {
          focus: 'series',
        },
        data: activityStatisticData?.markCount[2],
      },
      {
        name: '85~100分',
        type: 'bar',
        stack: 'total',
        label: {
          show: true,
        },
        emphasis: {
          focus: 'series',
        },
        data: activityStatisticData?.markCount[3],
      },
    ],
  };
  option && myChart.setOption(option);
};

const changDanmaku = (activityStatisticData?: activityStatistic) => {
  const Danmaku = new easyDanmaku({
    el: '#container', //弹幕挂载节点
    colourful: true, //彩色弹幕
    line: 5, //弹幕行数
    wrapperStyle: 'danmaku-wrapper', //默认弹幕样式
    speed: 5, //弹幕播放速度
    runtime: 3, //播放一次的时常
    loop: true, //开启循环播放
    hover: true, //鼠标移入悬停
    onComplete: () => {
      //播放结束
      console.log('end');
    },
    onHover: (dom) => {
      console.log(dom);
    },
  });
  const data = activityStatisticData?.activityFeedback;
  Danmaku.batchSend(data);
};

const downExcel1 = (filename?: string) => {
  let et = XLSX.utils.table_to_book(document.getElementById('excel1'));
  let etout = XLSX.write(et, {
    bookType: 'xlsx',
    bookSST: true,
    type: 'array',
  });
  try {
    FileSaver.saveAs(
      new Blob([etout], {
        type: 'application/octet-stream',
      }),
      filename + `.xlsx`
    ); //导出的文件名
  } catch (e) {
    console.log(e, etout);
  }
  return etout;
};

const downExcel2 = (filename?: string) => {
  let et = XLSX.utils.table_to_book(document.getElementById('excel2'));
  let etout = XLSX.write(et, {
    bookType: 'xlsx',
    bookSST: true,
    type: 'array',
  });
  try {
    FileSaver.saveAs(
      new Blob([etout], {
        type: 'application/octet-stream',
      }),
      filename + `.xlsx`
    );
  } catch (e) {
    console.log(e, etout);
  }
  return etout;
};

onMounted(() => {
  // var chartDom = document.getElementById('main2')!;
  var myChart = echarts.init(mainCharRef2.value);
  var option: EChartsOption;

  option = {
    title: {
      text: '近\n一\n周\n活\n动\n趋\n势',
      left: 'left',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985',
        },
      },
    },
    legend: {
      right: '10',
      //   bottom: 20,
      width: 300,
      data: [
        '\n',
        '\n',
        '\n',
        '报名人数',
        '参与人数',
        '参与率',
        '好评率',
        '反馈评分',
      ],
      formatter: ['{a|{name}}'].join('\n'),
      textStyle: {
        rich: {
          a: {
            width: 55,
            fontSize: 12,
            lineHeight: 12,
          },
        },
      },
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
    ],
    yAxis: [
      {
        show: false,
      },
    ],
    series: [
      {
        name: '报名人数',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series',
        },

        data: [220, 182, 191, 234, 290, 330, 310],
      },
      {
        name: '参与人数',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series',
        },
        data: [0, 13, 121, 134, 134, 210, 230],
      },
      {
        name: '参与率',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series',
        },
        data: [0, 22, 69, 84, 90, 98, 100],
      },
      {
        name: '好评率',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series',
        },
        data: [72, 82, 89, 84, 90, 89, 91],
      },
      {
        name: '反馈评分',
        type: 'line',
        stack: 'Total',
        label: {
          show: true,
          position: 'top',
        },
        areaStyle: {},
        emphasis: {
          focus: 'series',
        },
        data: [80, 92, 90, 84, 90, 89, 100],
      },
    ],
  };

  option && myChart.setOption(option);
});

const activityLocation = computed(() => {
  if (activityStatisticData.value) {
    return {
      long: activityStatisticData.value.locationLong,
      lat: activityStatisticData.value.locationLat,
    };
  }
  return undefined;
});
</script>

<style lang="scss" scoped>
#container {
  width: 380px;
  height: 200px;
  margin: 0 auto;
}
.danmaku-wrapper {
  border-radius: 8px;
}
</style>
