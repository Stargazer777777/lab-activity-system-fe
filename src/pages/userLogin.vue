<template>
  <div class="common-layout">
    <el-container>
      <el-main class="main">
        <el-form
          ref="ruleForm"
          :model="loginValidateForm"
          :rules="rules"
          label-width="120px"
          class="loginForm"
        >
          <el-form-item prop="emailOrStudentNumber" label="邮箱号/账号">
            <el-input
              v-model="loginValidateForm.emailOrStudentNumber"
              placeholder="Please input emailOrStudentNumber"
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
          <el-form-item prop="pitctureCode" label="图像验证码">
            <el-input
              v-model="loginValidateForm.pitctureCode"
              placeholder="Please input pitctureCode"
              clearable
            />
          </el-form-item>
          <img :src="base64Url" style="margin-left: 70%; width: 100px" />
          <el-form-item>
            <el-button type="primary" @click="submitForm(ruleForm)"
              >Submit</el-button
            >
            <el-button @click="resetForm(ruleForm)">Reset</el-button>
          </el-form-item>
        </el-form>
      </el-main>
      <el-footer> foo </el-footer>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { computed } from 'vue';
import { onMounted } from 'vue';

const ruleForm = ref<FormInstance>();
interface loginEntry {
  emailOrStudentNumber: string;
  email?: string;
  studentNumber?: string;
  password: string;
  pitctureCode: string;
  captchaId?: string;
}
const loginValidateForm = reactive<loginEntry>({
  emailOrStudentNumber: '',
  email: '',
  studentNumber: '',
  password: '',
  pitctureCode: '',
  captchaId: '',
});

// --------校验参数开始
const validateEmailOrStudentNumber = (
  rule: unknown,
  value: string,
  callback: (err?: Error) => void
) => {
  if (value === '') {
    callback(new Error('Please input emailOrStudentNumber'));
  } else {
    const r1 = /[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(.[a-zA-Z0-9_-]+)+/;
    const r2 = /[0-9]{10}/;
    if (!r1.test(value) && !r2.test(value)) {
      callback(new Error('不正确'));
    }
    callback();
  }
};

const validatePassword = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input password'));
  } else {
    callback();
  }
};

const validatePitctureCode = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input pitctureCode'));
  } else {
    callback();
  }
};

const rules = reactive<FormRules<typeof loginValidateForm>>({
  emailOrStudentNumber: [
    { validator: validateEmailOrStudentNumber, trigger: 'blur' },
  ],
  password: [{ validator: validatePassword, trigger: 'blur' }],
  pitctureCode: [{ validator: validatePitctureCode, trigger: 'blur' }],
});
// --------校验参数结束

//提交表单数据
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!');
    } else {
      console.log('error submit!');
      return false;
    }
  });
};

//重置表单数据
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

//获取图形验证码
async function getcaptchaImage() {
  console.log('请求验证码');
}

onMounted(() => {
  getcaptchaImage();
});

//图形验证码
const url = ref({
  captchaId: '',
  captchaImage:
    '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',
});
const base64Url = computed(() => {
  return 'data:image/png;base64,' + url.value.captchaImage;
});
</script>
<style scoped>
.el-container.is-vertical {
  margin-top: 100px;
}
.main {
  background-color: pink;
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
