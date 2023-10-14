<template>
  <div class="commentwindow" v-show="commentref">
    <el-button
      circle
      @click="closecommentwindow()"
      style="
        /* display: none; */
        /* background-color: red; */
        position: absolute;
        top: 2px;
        right: 0px;
        padding: 5px;
      "
      >×</el-button
    >
    <span>⭐评价⭐</span> <br />
    <span style="font-weight: bold"
      >该活动评分：
      <!-- <button style="background-color: lightgray; font-weight: bold">-</button>
      5.0
      <button style="background-color: lightgray; font-weight: bold">
        +
      </button> -->
      <el-button
        circle
        style="
          font-weight: bolder;
          line-height: 6px;
          font-size: 20px;
          background-color: lightgray;
        "
        @click="
          if (scored > 0) {
            scored--;
          }
        "
        >-
      </el-button>
      {{ scored }}
      <el-button
        circle
        style="
          font-weight: bolder;
          background-color: lightgray;
          line-height: 6px;
          font-size: 20px;
        "
        @click="
          if (scored < 10) {
            scored++;
          }
        "
        >+</el-button
      >
    </span>
    <br />
    <!-- <el-button
      :style="{
        width: '120px',
        height: '120px',
        marginTop: '40px',
        backgroundColor: 'rgb(100, 100, 300)',
        fontSize: '30px',
        color: color,
      }"
      @click="like"
      type="warning"
      :icon="Star"
      circle
    /> -->
    <br />
    <el-input v-model="input" placeholder="写下你的评价吧~" />
    <br />
    <!-- 点个赞！🥳 <br />
    已点赞人数：{{ goodcommentcount }} <br /> -->
    <el-button type="info" round @click="closecommentwindow(), docomment()"
      >提交评价！🤩</el-button
    >
  </div>
  <div class="common-layout" v-show="commonlayout">
    <el-container>
      <!-- <el-header class="myheader">
          
        </el-header> -->
      <el-header class="myheader1">
        <el-row :gutter="20">
          <el-col :span="2"
            ><img @click="gohome" class="logo" :src="logo" alt="" />
            <div class="grid-content ep-bg-purple"
          /></el-col>
          <el-col :span="2"
            ><el-avatar
              :src="avatar"
              style="height: 90px; width: 90px"
              alt="头像" />
            <div class="grid-content ep-bg-purple"
          /></el-col>
          <el-col
            :span="8"
            style="padding-left: 0; line-height: 20px; padding-top: 15px"
          >
            <el-text tag="b">{{ uname }} </el-text> <br />
            <el-text tag="sub" size="small">学号： {{ stuNo }}</el-text>

            <div class="grid-content ep-bg-purple"
          /></el-col>
          <el-col :span="12"
            ><el-row :gutter="20">
              <el-col :span="20">
                <el-button
                  style="float: right; margin-top: 20px"
                  @click="toself"
                  type="info"
                  round
                  ><el-icon><Setting /></el-icon>个人设置</el-button
                >
                <div class="grid-content ep-bg-purple"
              /></el-col>
              <el-col :span="1" style="margin-top: 30px"
                ><el-icon><Bell /></el-icon>
                <div class="grid-content ep-bg-purple"
              /></el-col>
              <el-col :span="3">
                <div style="margin-top: 16px">
                  <el-avatar
                    :src="avatar"
                    style="height: 40px; width: 40px"
                    alt="头像"
                  />
                </div>
                <div class="grid-content ep-bg-purple"
              /></el-col>
            </el-row>
            <div class="grid-content ep-bg-purple"
          /></el-col>
        </el-row>
      </el-header>

      <hr class="hr1" />
      <el-container class="mybody">
        <el-aside width="200px" class="aside">
          <div
            style="
              /* background-color: lightgray; */
              height: 40px;
              width: 120px;
              margin: 6px;
              text-align: center;
              line-height: 40px;
            "
          >
            <el-button
              style="
                padding: 13px;
                background-color: rgb(236, 245, 255);
                color: rgb(64, 182, 255);
              "
              ><el-icon><Select /></el-icon> 已参与活动</el-button
            >
          </div>
          <div
            style="
              /* background-color: lightblue; */
              height: 40px;
              width: 120px;
              margin: 6px;
              text-align: center;
              line-height: 40px;
            "
          >
            <el-button style="padding: 13px" @click="gotosignedActivities()"
              ><el-icon><Edit /></el-icon> 已报名活动</el-button
            >
          </div>
        </el-aside>
        <el-main>
          <ul>
            <li v-for="item in activities" :key="item.id">
              <p>{{ item.title }}</p>
              <el-button
                type="info"
                round
                class="mainbutton1"
                @click="comment(), getActivityId(item.id)"
                >评价</el-button
              >
            </li>
          </ul>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup name="signedActivities">
import { onMounted, ref } from 'vue';
import { Select, Edit, Bell, Setting } from '@element-plus/icons-vue';
import { getUsermsgApi } from '@/$http/apis/userCheckmsg.api';
// import { signedActivitiesApi } from '@/$http/apis/signedActivities.api';
import {
  checkedActivitiesApi,
  docommentApi,
} from '@/$http/apis/checkedActivities.api';

import { useRouter } from 'vue-router';
import logo from '@/assets/logo.png';
const avatar = ref('');
const commentref = ref(false);
const commonlayout = ref(true);
const uname = ref();
const input = ref('');
const stuNo = ref();
// const closebutton = ref(false);
const activities = ref([]);
const scored = ref(5);
// const color = ref('white');
const getcheckedActivities = async () => {
  const res = await checkedActivitiesApi();
  activities.value = res.data;
  // console.log(activities.value[0].title);
};
const comment = () => {
  commentref.value = true;
  commonlayout.value = false;
};

const getActivityId = (activityId) => {
  // console.log(activityId);
  return activityId;
};
const closecommentwindow = () => {
  commentref.value = false;
  commonlayout.value = true;
};
const getUsermsg = async () => {
  const user1 = await getUsermsgApi();
  //   console.log(user1);
  avatar.value = user1.data.avatarUrl;
  uname.value = user1.data.name;
  stuNo.value = user1.data.stuNo;
};
// const like = () => {
//   if (color.value == 'white') {
//     color.value = 'red';
//   } else {
//     color.value = 'white';
//   }
// };

onMounted(() => {
  getUsermsg();
  getcheckedActivities();
});
const docomment = async () => {
  const activityId = getActivityId();
  console.log(activityId);
  const res = await docommentApi(
    { id: activityId },
    { content: input, mark: scored }
  );
  if (res) {
    alert('提交评价成功！感谢您的评价~😆');
  }
};

const router = useRouter();
const gohome = () => {
  router.push({ path: '/home' });
};
const gotosignedActivities = () => {
  router.push({ path: '/signedActivities' });
};

const toself = () => {
  router.push({ path: '/userCheckmsg' });
};
// const goodcommentcount = ref(0);
</script>

<style scoped>
@import url('//unpkg.com/element-ui@2.15.6/lib/theme-chalk/index.css');

* {
  margin: 0;
  padding: 0;
}
.mainbutton1 {
  position: relative;
  top: 17px;
  left: 500px;
}

.commentwindow {
  height: 430px;
  width: 520px;
  background-color: lightgray;
  text-align: center;
  position: absolute;
  line-height: 70px;
  margin: 70px 500px;
  /* display: none; */
}
ul li {
  display: block;
  height: 140px;
  width: 600px;
  background-color: lightblue;
  margin: 5px;
}
p {
  font-size: 20px;
  font-weight: bold;
  padding-top: 60px;
  padding-left: 178px;
}
.aside {
  margin-top: 15px;
}
/* .myheader {
    background-color: rgb(152, 170, 187);
  } */
.myheader1 {
  background-color: rgba(236, 237, 218, 0.736);
  margin-bottom: 40px;
}
.mybody {
  margin: 0 auto;
}
.logo {
  width: 58px;
  height: 58px;
  margin-left: 20px;
}
.hr1 {
  width: 685px;
  margin-left: 460px;
}

.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
