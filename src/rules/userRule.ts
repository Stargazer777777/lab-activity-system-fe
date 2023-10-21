import { FormRules } from 'element-plus';

// 用户相关的表单校验规则
export const userRule: FormRules = {
  stuNo: [
    {
      required: true,
      message: '请填写用户学号',
    },
  ],
  email: [
    {
      required: true,
      message: '用户邮箱必须填',
    },
  ],
  name: [
    {
      required: true,
      message: '用户名称必填',
    },
  ],
  password: [
    {
      required: true,
      message: '密码必填',
    },
  ],
  sex: [
    {
      required: true,
    },
  ],
  role: [{ required: true, message: '权限有用户和管理员' }],
  status: [{ required: true, message: '状态必须填' }],
};
