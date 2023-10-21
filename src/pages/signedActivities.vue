<template>
  <div class="common-layout">
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
              <el-col
                :span="1"
                style="margin-top: 30px"
                @click="toNotification()"
                ><el-icon><Bell /></el-icon>
                <div class="grid-content ep-bg-purple"
              /></el-col>
              <el-col :span="3">
                <div style="" class="demo-collapse">
                  <!-- <div class="demo-collapse"> -->
                  <el-collapse
                    v-model="activeName"
                    accordion
                    class="demo-collapse"
                  >
                    <el-collapse-item name="1">
                      <template #title>
                        <el-avatar
                          :src="avatar"
                          style="height: 40px; width: 40px"
                          alt="头像"
                        />
                      </template>
                      <div>
                        <button class="down" @click="toactivity()">
                          我的活动
                        </button>
                      </div>
                      <div @click="logout">
                        <button class="down">退出登录</button>
                      </div>
                    </el-collapse-item>
                  </el-collapse>
                  <!-- </div> -->
                </div>
                <div class="grid-content ep-bg-purple" />
              </el-col>
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
            <el-button style="padding: 13px" @click="gotocheckedActivities"
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
            <el-button
              style="
                padding: 13px;
                background-color: rgb(236, 245, 255);
                color: rgb(64, 182, 255);
              "
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
                @click="gosignin(item.id)"
                >点击签到</el-button
              ><el-button
                type="info"
                round
                class="mainbutton2"
                @click="canclesign(item.id)"
                >取消报名</el-button
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
import {
  signedActivitiesApi,
  canclesignApi,
} from '@/$http/apis/signedActivities.api';
import { useRouter } from 'vue-router';
import logo from '@/assets/logo.png';
import { AuthTool } from '@/utils/authTool';
const logout = () => {
  AuthTool.removeAutorization();
  router.push({ path: 'userLogin' });
};
const avatar = ref('');
const uname = ref();
const stuNo = ref();
const activities = ref([]);
const getsignedActivities = async () => {
  const res = await signedActivitiesApi();
  activities.value = res.data;
  // console.log(activities.value[0].title);
  if (activities.value == null) {
    alert('你还没有报名的活动哦！快去报名精彩的活动吧');
  }
};

const getUsermsg = async () => {
  const user1 = await getUsermsgApi();
  console.log(user1.data.avatarUrl);
  avatar.value = user1.data.avatarUrl;
  uname.value = user1.data.name;
  stuNo.value = user1.data.stuNo;
};
onMounted(() => {
  getUsermsg();
  getsignedActivities();
});
const router = useRouter();
const gohome = () => {
  router.push({ path: '/home' });
};
const toNotification = () => {
  router.push({ path: '/checkNotifications' });
};
const gotocheckedActivities = () => {
  router.push({ path: '/checkedActivities' });
};
const toself = () => {
  router.push({ path: '/userCheckmsg' });
};
const gosignin = (activityId) => {
  router.push({ path: '/check-in', query: { 'activity-id': activityId } });
};
const canclesign = async (a_id) => {
  const res = await canclesignApi({ a_id: a_id });
  console.log(res);
  if (res.success != false) {
    getsignedActivities();
    alert('取消报名成功');
    // console.log(res.success);
  } else {
    getsignedActivities();
    alert('取消报名活动失败，可能活动已经开始或者签到过了~');
  }
  // console.log(a_id);
};
const toactivity = () => {
  router.push({ path: '/signedActivities' });
};
</script>

<style scoped>
@import url('//unpkg.com/element-ui@2.15.6/lib/theme-chalk/index.css');

* {
  margin: 0;
  padding: 0;
}
.down {
  text-align: center;
  height: 40px;
  line-height: 30px;
  margin: 1px;
  /* background-color: lightgray; */
  border: 0px;
  padding: 6px;
  z-index: 9999;
}
.demo-collapse {
  height: 40px;
  width: 68px;
  background-color: lightgray;
  margin-top: 16px;
}
.mainbutton2 {
  position: relative;
  top: 17px;
  left: 380px;
}
.mainbutton1 {
  position: relative;
  top: 17px;
  left: 385px;
}
ul li {
  display: block;
  height: 140px;
  width: 600px;
  /* background-color: lightblue; */
  background-color: rgb(213, 227, 231);
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
