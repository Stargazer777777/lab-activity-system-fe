<template>
  <div
    class="common-layout"
    style="
      display: flex;
      align-items: center;
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
            placeholder="Please input emailOrstuNo"
            clearable
          />
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input
            v-model="loginValidateForm.password"
            type="password"
            placeholder="Please input password"
            show-password
          />
        </el-form-item>
        <el-form-item prop="inputCaptcha" label="图形验证码">
          <el-input
            v-model="loginValidateForm.inputCaptcha"
            placeholder="Please input inputCaptcha"
            clearable
          >
            <template #append
              ><img
                :src="url.captchaImage"
                style="height: 100%; width: 100px"
                alt="请稍后"
                title="图形验证码"
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
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { onMounted } from 'vue';
import { getPictualCodeApi, loginWithPwdApi } from '@/$http/apis/authrization';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';

// 必须放在顶层
const router = useRouter();
const ruleForm = ref<FormInstance>();
interface loginEntry {
  emailOrstuNo: string;
  email?: string;
  stuNo?: string;
  password: string;
  inputCaptcha: string;
  captchaId?: string;
}
const loginValidateForm = reactive<loginEntry>({
  emailOrstuNo: '',
  email: '',
  stuNo: '',
  password: '',
  inputCaptcha: '',
  captchaId: '',
});

// --------校验参数开始
const validateEmailOrstuNo = (
  rule: unknown,
  value: string,
  callback: (err?: Error) => void
) => {
  if (value === '') {
    callback(new Error('Please input emailOrstuNo'));
  } else {
    // 检验格式
    const r1 = /[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(.[a-zA-Z0-9_-]+)+/;
    const r2 = /[0-9]{10}/;
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
    callback(new Error('Please input password'));
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
    callback(new Error('Please input inputCaptcha'));
  } else {
    callback();
  }
};

const rules = reactive<FormRules<typeof loginValidateForm>>({
  emailOrstuNo: [{ validator: validateEmailOrstuNo, trigger: 'blur' }],
  password: [{ validator: validatePassword, trigger: 'blur' }],
  inputCaptcha: [{ validator: validateInputCaptcha, trigger: 'blur' }],
});
// --------校验参数结束

//提交表单数据
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
  } else {
    warnMessageDetail.type = 'success';
    console.log('登录失败');
  }
  warnMessageDetail.message = data.msg;
  ElMessage(warnMessageDetail);
};
//消息提示
interface warnMessage {
  message: string;
  type: string;
}
const warnMessageDetail = reactive<warnMessage>({
  message: '',
  type: '',
});

//重置表单数据
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

//获取图形验证码
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

//transfer to register
function transferToRegister(): void {
  router.push('/userRegister');
}
</script>
<style scoped>
.psdLogin {
  background-color: skyblue;
  height: 400px;
  width: 500px;
  margin: 0 auto;
  border-radius: 6px;
}
.loginForm {
  margin-top: 20%;
  margin-left: auto;
}
</style>
