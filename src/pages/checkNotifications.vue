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
                      <div>
                        <button class="down" @click="quit()">退出登录</button>
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
      <el-row>
        <el-col :span="14" style="padding-left: 385px"
          ><el-icon><Comment /></el-icon> <el-text tag="b">我的通知</el-text>
          <div class="grid-content ep-bg-purple"
        /></el-col>
        <el-col :span="10"
          ><div class="mt-4">
            <el-input
              v-model="input"
              placeholder="请输入关键词搜索通知"
              class="input-with-select"
            >
              <template #prepend>
                <el-button :icon="Search" @click="searchNotification()" />
              </template>
            </el-input>
          </div>
          <div class="grid-content ep-bg-purple-light"
        /></el-col>
      </el-row>

      <hr class="hr1" />
      <el-container class="mybody">
        <el-aside width="200px" class="aside"> </el-aside>
        <el-main>
          <ul>
            <li v-for="item in notifications" :key="item.id">
              <p>{{ item.title }}</p>
              <!-- <br> -->
              <span style="padding-top: 20px; padding-left: 25px">{{
                item.detail
              }}</span>
              <!-- <el-button type="info" round class="mainbutton1">详情</el-button
              > -->
              <el-button
                type="info"
                round
                class="mainbutton2"
                @click="deleteNotification(item.id)"
                >删除</el-button
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
import { Bell, Setting, Comment, Search } from '@element-plus/icons-vue';
import { getUsermsgApi } from '@/$http/apis/userCheckmsg.api';
// import { signedActivitiesApi } from '@/$http/apis/signedActivities.api';
import {
  getNotificationsApi,
  searchNotificationsApi,
  deleteNotificationsApi,
} from '@/$http/apis/checkNotifications.api';
import { useRouter } from 'vue-router';
import logo from '@/assets/logo.png';
import { AuthTool } from '@/utils/authTool';
const quit = () => {
  AuthTool.removeAutorization();
  router.push({ path: 'userLogin' });
};
const avatar = ref('');
const uname = ref();
const stuNo = ref();
const input = ref('');
const notifications = ref([]);
const getAllNotifications = async () => {
  const res = await getNotificationsApi();
  notifications.value = res.data;
  if (notifications.value == null) {
    alert('你暂时没有待查看的通知🙌');
  }
};
const deleteNotification = async (id) => {
  // console.log(typeof Number(id));
  const res = await deleteNotificationsApi({ id: id });
  if (res.success == true) {
    alert('删除通知成功！');
    getAllNotifications();
  }
};
const getUsermsg = async () => {
  const user1 = await getUsermsgApi();
  console.log(user1.data.avatarUrl);
  avatar.value = user1.data.avatarUrl;
  uname.value = user1.data.name;
  stuNo.value = user1.data.stuNo;
};
const searchNotification = async () => {
  // console.log(input.value);
  const res = await searchNotificationsApi({ title: input.value });
  if (res.success == true) {
    notifications.value = res.data;
  } else {
    alert('你搜索的通知不存在！');
    input.value = '';
  }
};
onMounted(() => {
  getUsermsg();
  getAllNotifications();
});
const router = useRouter();
const gohome = () => {
  router.push({ path: '/home' });
};
const toNotification = () => {
  router.push({ path: '/checkNotifications' });
};
const toself = () => {
  router.push({ path: '/userCheckmsg' });
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
.mainbutton2 {
  position: absolute;
  top: 102px;
  left: 505px;
}
/* .mainbutton1 {
  position: absolute;
  top: 102px;
  left: 435px;
} */
ul li {
  display: block;
  height: 140px;
  width: 600px;
  background-color: rgb(213, 227, 231);
  margin: 5px;
}
p {
  font-size: 20px;
  font-weight: bold;
  padding-top: 20px;
  padding-left: 25px;
  margin-bottom: 6px;
}
.aside {
  margin-top: 15px;
}
.input-with-select .el-input-group__prepend {
  background-color: var(--el-fill-color-blank);
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
.myheader1 {
  background-color: rgba(236, 237, 218, 0.736);
  margin-bottom: 25px;
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
  width: 755px;
  margin-left: 380px;
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
