import { NestHttpTool } from '..';

export const searchUsersApi = (body: {
  pageNo: number;
  pageSize: number;
  queryString?: string;
}) => {
  return NestHttpTool.send({
    method: 'POST',
    url: '/user/query',
    data: body,
  });
};

export const getUserByIdApi = (query: { id: string }) => {
  return NestHttpTool.send({
    method: 'GET',
    url: '/user/get',
    params: query,
  });
};

export const addUserApi = (body: {
  id: string;
  stuNo: string;
  email: string;
  name: string;
  password: string;
  sex: number;
  role: string;
  status: string;
}) => {
  return NestHttpTool.send({
    method: 'POST',
    url: '/user/add',
    data: body,
  });
};

export const editUserApi = (body: {
  id: string;
  stuNo: string;
  email: string;
  name: string;
  password: string;
  sex: number;
  role: string;
  status: string;
}) => {
  return NestHttpTool.send({
    method: 'POST',
    url: '/user/update',
    data: body,
  });
};

export const delUserApi = (query: { id: string }) => {
  return NestHttpTool.send({
    method: 'GET',
    url: '/user/delete',
    params: query,
  });
};
