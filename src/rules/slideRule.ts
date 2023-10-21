import { FormRules } from 'element-plus';

// 用户相关的表单校验规则

export const slideRule: FormRules = {
  imgUrl: [
    {
      required: true,
      message: '请填写轮播图地址',
    },
  ],
  slideIndex: [
    {
      required: true,
      message: '请填轮播图次序',
    },
  ],
  targetUrl: [
    {
      required: true,
      message: '轮播图跳转地址必填',
    },
  ],
};
