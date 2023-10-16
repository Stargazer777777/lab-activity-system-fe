import { JavaHttpTool } from '..';

export const getUsermsgApi = () => {
  return JavaHttpTool.send({
    method: 'GET',
    url: '/activity/user',
  });
};

export const editUsermsgApi = (body: {
  email: string;
  stuNo: string;
  password: string;
  name: string;
  sex: number;
  avatarUrl: string;
}) => {
  return JavaHttpTool.send({
    method: 'PUT',
    url: '/activity/user',
    data: body,
  });
};
