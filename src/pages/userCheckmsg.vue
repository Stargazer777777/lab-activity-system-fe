<template>
  <div class="common-layout" ref="mainref">
    <el-container>
      <el-header class="myheader">
        <el-row :gutter="20">
          <el-col :span="20"
            ><img @click="gohome" class="logooo" :src="logo" />
            <div class="grid-content ep-bg-purple"
          /></el-col>
          <el-col :span="1" style="margin-top: 30px"
            ><el-icon><Bell /></el-icon>
            <div class="grid-content ep-bg-purple"
          /></el-col>
          <el-col :span="3">
            <div style="margin-top: 16px">
              <el-avatar
                src="{{avatar}}"
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
              src="{{avatar}}"
              style="height: 80px; width: 80px"
              alt="头像"
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
    @click="(editview = !editview), editchangeback()"
  >
    <!-- 如何解决取消修改框刷新问题，如何上传头像,跳转通知页面-->
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
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getUsermsgApi, editUsermsgApi } from '@/$http/apis/userCheckmsg.api';
import logo from '@/assets/logo.png';
const uname = ref('');
const email = ref('');
const stuNo = ref('');
const pwd = ref('');
const gender = ref('');
const avatar = ref('');

const uname1 = ref();
const email1 = ref();
const stuNO1 = ref();
const pwd1 = ref();
const gender1 = ref();

const getUsermsg = async () => {
  const user1 = await getUsermsgApi();
  console.log(user1);
  email.value = user1.data.email;
  stuNo.value = user1.data.stuNo;
  pwd.value = user1.data.password;
  uname.value = user1.data.name;
  gender.value = user1.data.sex;
  avatar.value = user1.data.avatarUrl;

  uname1.value = user1.data.name;
  email1.value = user1.data.email;
  stuNO1.value = user1.data.stuNo;
  pwd1.value = user1.data.password;
  gender1.value = user1.data.sex;
};
//更新用户信息
const editpush = async () => {
  const flag = await editUsermsgApi({
    email: String(email1.value),
    stuNo: String(stuNO1.value),
    password: String(pwd1.value),
    name: String(uname1.value),
    sex: Number(gender1.value),
  });
  if (flag) {
    getUsermsg();
    alert('修改信息成功！🥳');
  }
};

onMounted(() => {
  getUsermsg();
});
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
