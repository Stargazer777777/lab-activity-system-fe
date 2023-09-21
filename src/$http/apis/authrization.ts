import { JavaHttpTool } from '..';

export const loginWithPwdApi = (body: {
  email?: string;
  studentNumber?: string;
  password: string;
  captchaId: string;
  inputCaptcha: string;
}) => {
  return JavaHttpTool.send({
    method: 'POST',
    url: '/userInformation/login/emailOrStuNoWithPassword',
    data: body,
  });
};
export const getPictualCodeApi = () => {
  return JavaHttpTool.send({
    method: 'GET',
    url: '/user/captcha/captchaImage',
  });
};
