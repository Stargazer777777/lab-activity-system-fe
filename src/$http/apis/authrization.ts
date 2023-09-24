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
export const getEmailCodeByEmailApi = (body: {
  email: string;
  action: string;
}) => {
  return JavaHttpTool.send({
    method: 'POST',
    url: '/sendMail',
    data: body,
  });
};
export const registerWithEmailAndStuNo = (body: {
  name: string;
  stuNo: string;
  email: string;
  password: string;
  sex: string;
  emailCode: string;
}) => {
  return JavaHttpTool.send({
    method: 'POST',
    url: '/userInformation/register',
    data: body,
  });
};
export const loginWithEmailCode = (body: {
  email: string;
  emailCode: string;
}) => {
  return JavaHttpTool.send({
    method: 'POST',
    url: '/userInformation/login/emailWithEmailCodeLogin',
    data: body,
  });
};
