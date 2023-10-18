<template>
  <div v-if="upnew"></div>
  <div class="changeavatarwindow" v-if="change1">
    <el-button
      circle
      class="closeavatarchangewindow"
      @click="
        change1 = !change1;
        showmainwindow = !showmainwindow;
      "
      >×</el-button
    >
    <span style="font-weight: bold; font-size: 25px; line-height: 70px"
      >修改头像</span
    >

    <el-upload
      ref="upload"
      :auto-upload="false"
      @change="toavatar"
      :show-file-list="false"
    >
      <template #trigger>
        <div
          style="
            border: 1px dashed #000;
            height: 250px;
            width: 600px;
            background-color: whitesmoke;
            /* line-height: 60px; */
            margin-top: 100px;
          "
        >
          <span style="position: absolute; bottom: 110px; left: 230px"
            >+ <br />
            请上传你的新头像</span
          >
        </div>
      </template>
    </el-upload>
  </div>
  <div class="common-layout" ref="mainref" v-if="showmainwindow">
    <el-container>
      <el-header class="myheader">
        <el-row :gutter="20">
          <el-col :span="20"
            ><img @click="gohome" class="logooo" :src="logo" />
            <div class="grid-content ep-bg-purple"
          /></el-col>
          <el-col :span="1" style="margin-top: 30px" @click="toNotification()"
            ><el-icon><Bell /></el-icon>
            <div class="grid-content ep-bg-purple"
          /></el-col>
          <el-col :span="3">
            <div style="margin-top: 16px">
              <el-avatar
                :src="avatarUrl"
                style="height: 40px; width: 40px"
                alt="头像"
              />
            </div>
            <div class="grid-content ep-bg-purple"
          /></el-col>
        </el-row>
      </el-header>
      <el-container class="mybody">
        <el-aside width="200px" class="aside">
          <div>
            <el-avatar
              :src="avatarUrl"
              style="height: 80px; width: 80px"
              alt="头像"
              @click="showwindow()"
            />
          </div>
          <div>{{ uname }}</div>
          <div
            style="
              margin-top: 50px;
              text-align: center;
              height: 40px;
              line-height: 40px;
              background-color: rgb(191, 221, 232);
            "
          >
            个人信息
          </div>
        </el-aside>
        <el-main class="main">
          <el-row :gutter="20" class="row">
            <el-col :span="2"
              ><div class="grid-content ep-bg-purple" />
              <el-icon class="icon"><Message /></el-icon>
            </el-col>
            <el-col :span="16"
              ><div class="grid-content ep-bg-purple" />
              邮箱：{{ email }} 已绑定</el-col
            >
            <el-col :span="6"
              ><div class="grid-content ep-bg-purple" />
              <el-button
                type="info"
                @click="(editview = !editview), editchange()"
                >修改</el-button
              ></el-col
            >
          </el-row>
          <el-row :gutter="20" class="row">
            <el-col :span="2"
              ><div class="grid-content ep-bg-purple" />
              <el-icon class="icon"><Star /></el-icon>
            </el-col>
            <el-col :span="16"
              ><div class="grid-content ep-bg-purple" />
              学号：{{ stuNo }} 已绑定</el-col
            >
            <el-col :span="6"
              ><div class="grid-content ep-bg-purple" />
              <el-button
                type="info"
                @click="(editview = !editview), editchange()"
                >修改</el-button
              ></el-col
            >
          </el-row>
          <el-row :gutter="20" class="row">
            <el-col :span="2"
              ><div class="grid-content ep-bg-purple" />
              <el-icon class="icon"><Lock /></el-icon>
            </el-col>
            <el-col :span="16"
              ><div class="grid-content ep-bg-purple" />
              密码：{{ pwd }} 已设置</el-col
            >
            <el-col :span="6"
              ><div class="grid-content ep-bg-purple" />
              <el-button
                type="info"
                @click="(editview = !editview), editchange()"
                >修改</el-button
              ></el-col
            >
          </el-row>
          <el-row :gutter="20" class="row">
            <el-col :span="2"
              ><div class="grid-content ep-bg-purple" />
              <el-icon class="icon"><UserFilled /></el-icon>
            </el-col>
            <el-col :span="16"
              ><div class="grid-content ep-bg-purple" />
              姓名：{{ uname }} 已设置</el-col
            >
            <el-col :span="6"
              ><div class="grid-content ep-bg-purple" />
              <el-button
                type="info"
                @click="(editview = !editview), editchange()"
                >修改</el-button
              ></el-col
            >
          </el-row>
          <el-row :gutter="20" class="row">
            <el-col :span="2"
              ><div class="grid-content ep-bg-purple" />
              <el-icon class="icon"><Male /></el-icon>
            </el-col>
            <el-col :span="16"
              ><div class="grid-content ep-bg-purple" />
              性别：{{ gender }} 已设置</el-col
            >
            <el-col :span="6"
              ><div class="grid-content ep-bg-purple" />
              <el-button
                type="info"
                @click="(editview = !editview), editchange()"
                >修改</el-button
              ></el-col
            >
          </el-row>
        </el-main>
      </el-container>
    </el-container>
  </div>
  <div class="edit" v-if="editview">
    <form action="" method="post">
      <el-row class="editelrow">
        <el-col :span="2"
          ><div class="grid-content ep-bg-purple" />
          邮箱：
        </el-col>
        <el-col :span="22"
          ><el-input type="text" v-model="email1" />
          <div class="grid-content ep-bg-purple-light"
        /></el-col>
      </el-row>
      <el-row class="editelrow">
        <el-col :span="2"
          ><div class="grid-content ep-bg-purple" />
          学号：
        </el-col>
        <el-col :span="22"
          ><el-input type="text" v-model="stuNO1" />
          <div class="grid-content ep-bg-purple-light"
        /></el-col>
      </el-row>
      <el-row class="editelrow">
        <el-col :span="2"
          ><div class="grid-content ep-bg-purple" />
          密码：
        </el-col>
        <el-col :span="22"
          ><el-input type="text" v-model="pwd1" />
          <div class="grid-content ep-bg-purple-light"
        /></el-col>
      </el-row>
      <el-row class="editelrow">
        <el-col :span="2"
          ><div class="grid-content ep-bg-purple" />
          姓名：
        </el-col>
        <el-col :span="22"
          ><el-input type="text" v-model="uname1" />
          <div class="grid-content ep-bg-purple-light"
        /></el-col>
      </el-row>
      <el-row class="editelrow">
        <el-col :span="2"
          ><div class="grid-content ep-bg-purple" />
          性别：
        </el-col>
        <el-col :span="3"
          ><el-input type="text" v-model="gender1" />
          <div class="grid-content ep-bg-purple-light"
        /></el-col>
      </el-row>
    </form>
    <div style="text-align: center">
      <el-button
        type="round"
        @click="(editview = !editview), editchangeback(), getUsermsg()"
        round
        >取消修改</el-button
      >
      <el-button
        type="submit"
        @click="(editview = !editview), editchangeback(), editpush()"
        round
        >提交修改</el-button
      >
    </div>
  </div>
  <button
    class="editclose"
    v-if="editview"
    @click="(editview = !editview), editchangeback(), getUsermsg()"
  >
    ×
  </button>
</template>
<script setup name="useCheckmsg">
// import { UserFilled } from '@element-plus/icons-vue';
import { ref } from 'vue';
import {
  Message,
  Star,
  Male,
  UserFilled,
  Lock,
  Bell,
} from '@element-plus/icons-vue';
// import { created } from 'vue';
import { useRouter } from 'vue-router';
import { getUsermsgApi, editUsermsgApi } from '@/$http/apis/userCheckmsg.api';
import { uploadApi } from '@/$http/apis/file.api';
import logo from '@/assets/logo.png';
const uname = ref('');
const email = ref('');
const stuNo = ref('');
const pwd = ref('');
const gender = ref('');
const avatarUrl = ref();
const change1 = ref(false);
const uname1 = ref();
const email1 = ref();
const stuNO1 = ref();
const upnew = ref(false);
const showmainwindow = ref(true);
const pwd1 = ref();
const gender1 = ref();
const avatarUrl1 = ref();
//
const toavatar = async (elfile) => {
  const res = await uploadApi(elfile.raw);
  // console.log(res);
  if (res.success == true) {
    // alert('更换头像成功！');
    // getUsermsg();
    avatarUrl1.value = res.data;
    avatarUrl.value = res.data;
    // console.log(avatarUrl.value + '==>');
    // console.log(avatarUrl1.value);
    editpush();
    showwindow();
  }
};
//
const toNotification = () => {
  router.push({ path: '/checkNotifications' });
};
const showwindow = () => {
  change1.value = !change1.value;
  showmainwindow.value = !showmainwindow.value;
};
const getUsermsg = async () => {
  const user1 = await getUsermsgApi();
  // console.log(user1.data);
  email.value = user1.data.email;
  stuNo.value = user1.data.stuNo;
  pwd.value = user1.data.password;
  uname.value = user1.data.name;
  gender.value = user1.data.sex;
  // console.log(user1.data.avatarUrl);
  avatarUrl.value = user1.data.avatarUrl;

  uname1.value = uname.value;
  email1.value = email.value;
  stuNO1.value = stuNo.value;
  pwd1.value = pwd.value;
  gender1.value = gender.value;
  avatarUrl1.value = avatarUrl.value;
};
getUsermsg();

//更新用户信息
const editpush = async () => {
  const flag = await editUsermsgApi({
    email: String(email1.value),
    stuNo: String(stuNO1.value),
    password: String(pwd1.value),
    name: String(uname1.value),
    sex: Number(gender1.value),
    avatarUrl: String(avatarUrl1.value),
  });
  if (flag) {
    // console.log(avatarUrl1.value);
    getUsermsg();
    alert('修改信息成功！🥳');
    // console.log(avatarUrl.value);
  }
};

const editview = ref(false);
const mainref = ref();
// console.dir(axios);
const editchange = () => {
  mainref.value.style.display = 'none';
};
const editchangeback = () => {
  mainref.value.style.display = 'block';
};
const router = useRouter();
const gohome = () => {
  router.push({ path: '/home' });
};
</script>
<style scoped>
@import url('//unpkg.com/element-ui@2.15.6/lib/theme-chalk/index.css');

* {
  margin: 0;
  padding: 0;
}
.logooo {
  width: 66px;
  height: 66px;
  margin-left: 20px;
}

.changeavatarwindow {
  background-color: lightgray;
  width: 600px;
  height: 500px;
  /* position: absolute; */
  margin: 100px auto;
  text-align: center;
}
.closeavatarchangewindow {
  position: absolute;
  top: 1px;
  left: 565px;
  padding: 5px;
}
.edit {
  height: 500px;
  width: 700px;
  background-color: lightgray;
  position: absolute;
  top: 100px;
  left: 400px;
}
.editclose {
  position: absolute;
  top: 100px;
  left: 1105px;
}
.myheader {
  background-color: rgba(40, 39, 37, 0.215);
  height: 70px;
  width: 100%;
}
.editelrow {
  height: 70px;
  line-height: 70px;
  margin: 10px 0;
  padding: 5px 10px;
}
.mybody {
  margin: 0 auto;
}
.aside {
  background-color: rgb(241, 241, 241);
  text-align: center;
}
.main {
  background-color: rgb(240, 238, 223);
  width: 750px;
}
.demo-type {
  display: flex;
}
.demo-type > div {
  flex: 1;
  text-align: center;
}
.row {
  margin-bottom: 60px;
  line-height: 30px;
  /* height: 30px */
}
.demo-type > div:not(:last-child) {
  border-right: 1px solid var(--el-border-color);
}
.icon {
  margin-left: 20px;
}
</style>
