<template>
  <div
    class="common-layout"
    style="
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
      background-image: url('https://pic.90sheji.com/design/00/00/10/50/5fb124ae37eb4.jpg%21/fwfh/1920x0/clip/0x1275a0a0/quality/90/unsharp/true/compress/true/watermark/url/LzkwX3dhdGVyX3Y2LnBuZw==/repeat/true');
    "
  >
    <div class="psdLogin">
      <el-form
        ref="ruleForm"
        :model="loginValidateForm"
        :rules="rules"
        label-width="120px"
        class="loginForm"
      >
        <el-form-item prop="emailOrstuNo" label="邮箱号/学号">
          <el-input
            v-model="loginValidateForm.emailOrstuNo"
            placeholder=""
            clearable
          />
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input
            v-model="loginValidateForm.password"
            type="password"
            placeholder=""
            show-password
          />
        </el-form-item>
        <el-form-item prop="inputCaptcha" label="图形验证码">
          <el-input
            v-model="loginValidateForm.inputCaptcha"
            placeholder=""
            clearable
          >
            <template #append
              ><img
                :src="url.captchaImage"
                style="height: 100%; width: 100px"
                alt="请稍后"
                title="点击刷新"
                @click="getcaptchaImage()"
            /></template>
          </el-input>
        </el-form-item>

        <el-form-item style="margin-left: 10%">
          <el-button type="primary" @click="submitForm(ruleForm)"
            >登录</el-button
          >
          <el-button @click="resetForm(ruleForm)">重置</el-button>
        </el-form-item>
      </el-form>
      <span style="margin-left: 30%"
        >还没有账号？<ins @click="transferToRegister">点击去注册</ins></span
      >
      <br />
      <br />
      <span style="margin-left: 30%"
        ><ins text @click="dialogFormVisible = true">邮箱验证码登录</ins></span
      >
    </div>
  </div>
  <el-dialog v-model="dialogFormVisible" title="邮箱验证码登录">
    <el-form :model="emailCodeLoginForm">
      <el-form-item label="邮箱号" :label-width="formLabelWidth">
        <el-input v-model="emailCodeLoginForm.email" autocomplete="off"
          ><template #append>
            <button @click="getEmailCodeForLogin()">
              获取邮箱验证码
            </button></template
          ></el-input
        >
      </el-form-item>
      <el-form-item label="邮箱验证码" :label-width="formLabelWidth">
        <el-input v-model="emailCodeLoginForm.emailCode" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="submitEmailCodeLoginForm()">
          登录
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { onMounted } from 'vue';
import {
  getPictualCodeApi,
  loginWithPwdApi,
  getEmailCodeByEmailApi,
  loginWithEmailCode,
} from '@/$http/apis/authrization';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { AuthToolI, AuthToolImpl } from '@/utils/authTool';

// 获取router必须放在顶层
const router = useRouter();

const ruleForm = ref<FormInstance>();
// 密码方式登录所需数据类型
interface LoginEntry {
  emailOrstuNo: string;
  email?: string;
  stuNo?: string;
  password: string;
  inputCaptcha: string;
  captchaId?: string;
}
const loginValidateForm = reactive<LoginEntry>({
  emailOrstuNo: '',
  email: '',
  stuNo: '',
  password: '',
  inputCaptcha: '',
  captchaId: '',
});

// --------密码登录方式校验参数开始
const validateEmailOrstuNo = (
  rule: unknown,
  value: string,
  callback: (err?: Error) => void
) => {
  if (value === '') {
    callback(new Error('不能为空'));
  } else {
    // 检验格式
    const r1 = /[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(.[a-zA-Z0-9_-]+)+/;
    const r2 = /^[0-9]{10}$/;
    if (r1.test(value)) {
      // 满足邮箱格式
      loginValidateForm.email = loginValidateForm.emailOrstuNo;
    } else if (r2.test(value)) {
      // 满足学号格式
      loginValidateForm.stuNo = loginValidateForm.emailOrstuNo;
    } else {
      callback(new Error('邮箱或者学号格式不正确'));
    }

    callback();
  }
};

const validatePassword = (
  rule: unknown,
  value: string,
  callback: (eer?: Error) => void
) => {
  if (value === '') {
    callback(new Error('密码不能为空'));
  } else {
    callback();
  }
};

const validateInputCaptcha = (
  rule: unknown,
  value: string,
  callback: (err?: Error) => void
) => {
  if (value === '') {
    callback(new Error('图形验证码不能为空'));
  } else {
    callback();
  }
};

const rules = reactive<FormRules<typeof loginValidateForm>>({
  emailOrstuNo: [{ validator: validateEmailOrstuNo, trigger: 'blur' }],
  password: [{ validator: validatePassword, trigger: 'blur' }],
  inputCaptcha: [{ validator: validateInputCaptcha, trigger: 'blur' }],
});
// --------密码方式登录方式校验参数结束

//--------密码方式登录方式提交表单数据开始
const submitForm = async (formEl: FormInstance | undefined) => {
  // 表单格式验证
  if (!formEl) return;
  await formEl.validate();
  // 复制验证码
  loginValidateForm.captchaId = url.value.captchaId;
  // 发送登录请求
  const data = await loginWithPwdApi(loginValidateForm);
  if (data.success === true) {
    // 提示信息
    warnMessageDetail.type = 'success';
    //根据不同身份跳转不同页面
    if (data.data.user.role === '普通用户') {
      router.push('/home');
    } else {
      router.push('/admin');
    }
    console.log('登录成功');
    // 设置好当前用户的本地缓存
    const authTool: AuthToolI = new AuthToolImpl();
    authTool.setAuthrization(data.data.Authorization);
  } else {
    warnMessageDetail.type = 'error';
    console.log('登录失败');
    // 同时刷新验证码
    getcaptchaImage();
  }
  warnMessageDetail.message = data.msg;
  ElMessage(warnMessageDetail);
};
//--------密码方式登录方式提交表单数据结束

//--------消息提示开始
interface warnMessage {
  message: string;
  type: string;
}
const warnMessageDetail = reactive<warnMessage>({
  message: '',
  type: '',
});
//--------消息提示结束

//重置表单数据
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

//--------获取图形验证码开始
async function getcaptchaImage() {
  const res = await getPictualCodeApi();
  url.value.captchaImage = res.data.captchaImage;
  url.value.captchaId = res.data.captchaId;
  console.log('请求验证码');
}

onMounted(() => {
  getcaptchaImage();
});

//图形验证码
const url = ref({
  captchaId: '',
  captchaImage: '',
});
//--------获取图形验证码结束

//路由到注册界面
function transferToRegister(): void {
  router.push('/userRegister');
}

// --------邮箱验证码登录开始
const dialogFormVisible = ref(false);
const formLabelWidth = '140px';
const emailCodeLoginForm = reactive({
  email: '',
  emailCode: '',
});
const getEmailCodeForLogin = async () => {
  console.log('发送开始');
  const res = await getEmailCodeByEmailApi({
    email: emailCodeLoginForm.email,
    action: 'ForLogin',
  });
  console.log('发送结束');
  if (res.success === true) {
    console.log('获取邮箱验证成功');
    warnMessageDetail.type = 'success';
  } else {
    console.log('获取邮箱验证失败');
    warnMessageDetail.type = 'error';
  }
  warnMessageDetail.message = res.msg;
  ElMessage(warnMessageDetail);
};
//提交数据
const submitEmailCodeLoginForm = async () => {
  // 数据校验
  const r1 = /[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(.[a-zA-Z0-9_-]+)+/;
  const r2 = /^[0-9]{6}$/;
  if (emailCodeLoginForm.email === '' || emailCodeLoginForm.emailCode === '') {
    warnMessageDetail.type = 'error';
    warnMessageDetail.message = '邮箱号和验证码都不能为空';
    ElMessage(warnMessageDetail);
    return;
  } else if (!r1.test(emailCodeLoginForm.email)) {
    warnMessageDetail.type = 'error';
    warnMessageDetail.message = '邮箱号格式错误';
    ElMessage(warnMessageDetail);
    return;
  } else if (!r2.test(emailCodeLoginForm.emailCode)) {
    warnMessageDetail.type = 'error';
    warnMessageDetail.message = '验证码错误';
    ElMessage(warnMessageDetail);
    return;
  }
  // 发送登录请求
  const data = await loginWithEmailCode(emailCodeLoginForm);
  if (data.success === true) {
    // 提示信息
    warnMessageDetail.type = 'success';
    //根据不同身份跳转不同页面
    if (data.data.user.role === '普通用户') {
      router.push('/home');
    } else {
      router.push('/admin');
    }
    console.log('登录成功');
    // 设置好当前用户的本地缓存
    const authTool: AuthToolI = new AuthToolImpl();
    authTool.setAuthrization(data.data.Authorization);
  } else {
    warnMessageDetail.type = 'error';
    console.log('登录失败');
  }
  warnMessageDetail.message = data.msg;
  ElMessage(warnMessageDetail);
};
// --------邮箱验证码登录结束
</script>
<style scoped>
.psdLogin {
  background-color: skyblue;
  height: 400px;
  width: 500px;
  border-radius: 6px;
}
.loginForm {
  margin-top: 20%;
  margin-left: auto;
}
.el-button--text {
  margin-right: 15px;
}
.el-select {
  width: 300px;
}
.el-input {
  width: 300px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
