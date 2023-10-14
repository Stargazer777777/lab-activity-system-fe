<template>
  <div class="registerClass">
    <div class="main">
      <el-form
        ref="ruleForm"
        label-width="120px"
        :model="registerFormData"
        :rules="rules"
        @submit.prevent
      >
        <el-form-item style="margin-top: 10px" prop="email" label="邮箱号"
          ><el-input v-model="registerFormData.email" placeholder="" clearable>
            <template #append>
              <button @click="getEmailCodeForRegister()">
                获取邮箱验证码
              </button></template
            >
          </el-input></el-form-item
        >
        <el-form-item prop="emailCode" label="邮箱验证码"
          ><el-input
            v-model="registerFormData.emailCode"
            placeholder=""
            clearable
        /></el-form-item>
        <el-form-item prop="stuNo" label="学号"
          ><el-input v-model="registerFormData.stuNo" placeholder="" clearable
        /></el-form-item>
        <el-form-item prop="name" label="姓名"
          ><el-input v-model="registerFormData.name" placeholder="" clearable
        /></el-form-item>
        <el-form-item prop="sex" label="性别"
          ><el-radio-group v-model="registerFormData.sex">
            <el-radio-button label="1" size="large">男</el-radio-button>
            <el-radio-button label="0" size="large">女</el-radio-button>
          </el-radio-group></el-form-item
        >
        <el-form-item prop="password" label="密码">
          <el-input
            v-model="registerFormData.password"
            type="password"
            placeholder=""
            show-password
          />
        </el-form-item>
        <el-form-item style="margin-left: 10%">
          <el-button type="primary" @click="submitForm(ruleForm)"
            >注册</el-button
          >
          <el-button @click="resetForm(ruleForm)">重置</el-button>
        </el-form-item>
      </el-form>
      <span style="margin-left: 30%"
        >已有账号？<ins @click="transferToLogin">点击去登录</ins></span
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import {
  getEmailCodeByEmailApi,
  registerWithEmailAndStuNo,
} from '@/$http/apis/authrization';
import { ElMessage } from 'element-plus';
import type { FormInstance, FormRules, MessageOptions } from 'element-plus';
import { useRouter } from 'vue-router';
// router必须放在顶层
const router = useRouter();
function transferToLogin(): void {
  router.push('/userLogin');
}

const ruleForm = ref<FormInstance>();
// --------校验参数开始
const validateEmail = (
  rule: unknown,
  value: string,
  callback: (err?: Error) => void
) => {
  if (value === '') {
    callback(new Error('邮箱号不能为空'));
  } else {
    // 检验格式
    const r1 = /[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(.[a-zA-Z0-9_-]+)+/;
    if (!r1.test(value)) {
      callback(new Error('邮箱或者学号格式不正确'));
    }

    callback();
  }
};
const validateEmailCode = (
  rule: unknown,
  value: string,
  callback: (err?: Error) => void
) => {
  if (value === '') {
    callback(new Error('邮箱验证码不能为空'));
  } else {
    callback();
  }
};
const validateStuNo = (
  rule: unknown,
  value: string,
  callback: (err?: Error) => void
) => {
  if (value === '') {
    callback(new Error('学号不能为空'));
  } else {
    // 检验格式
    const r1 = /^[0-9]{10}$/;
    if (!r1.test(value)) {
      callback(new Error('请输入10位数字学号'));
    }
    callback();
  }
};
const validateName = (
  rule: unknown,
  value: string,
  callback: (err?: Error) => void
) => {
  if (value === '') {
    callback(new Error('姓名不能为空'));
  } else {
    callback();
  }
};
const validatePassword = (
  rule: unknown,
  value: string,
  callback: (err?: Error) => void
) => {
  if (value === '') {
    callback(new Error('密码不能为空'));
  } else {
    callback();
  }
};
const rules = reactive<FormRules<typeof registerFormData>>({
  email: [{ validator: validateEmail, trigger: 'blur' }],
  emailCode: [{ validator: validateEmailCode, trigger: 'blur' }],
  stuNo: [{ validator: validateStuNo, trigger: 'blur' }],
  name: [{ validator: validateName, trigger: 'blur' }],
  password: [{ validator: validatePassword, trigger: 'blur' }],
});
// --------校验参数结束

interface Register {
  name: string;
  stuNo: string;
  email: string;
  password: string;
  sex: string;
  emailCode: string;
}
const registerFormData = reactive<Register>({
  name: '',
  stuNo: '',
  email: '',
  password: '',
  sex: '1',
  emailCode: '',
});

// --------邮箱验和学号注册开始
const getEmailCodeForRegister = async () => {
  const res = await getEmailCodeByEmailApi({
    email: registerFormData.email,
    action: 'ForRegister',
  });
  if (res.success === true) {
    // 发送邮箱验证码成功
    warnMessageDetail.value.type = 'success';
    warnMessageDetail.value.message = res.msg;
    ElMessage(warnMessageDetail.value);
  }
};
//--------消息提示开始
const warnMessageDetail = ref<MessageOptions>({});
//--------消息提示结束
//重置表单数据
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
//提交数据
const submitForm = async (formEl: FormInstance | undefined) => {
  // 表单格式验证
  if (!formEl) return;
  await formEl.validate();
  // 发送登录请求
  const data = await registerWithEmailAndStuNo(registerFormData);
  if (data.success === true) {
    // 注册成功
    warnMessageDetail.value.type = 'success';
    warnMessageDetail.value.message = data.msg;
    ElMessage(warnMessageDetail.value);
  }
};
// --------邮箱验和学号注册结束
</script>
<style scoped>
.registerClass {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-image: url('https://pic.90sheji.com/design/00/00/10/50/5fb124ae37eb4.jpg%21/fwfh/1920x0/clip/0x1275a0a0/quality/90/unsharp/true/compress/true/watermark/url/LzkwX3dhdGVyX3Y2LnBuZw==/repeat/true');
}
.main {
  background-color: skyblue;
  height: 400px;
  width: 500px;
  border-radius: 6px;
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
