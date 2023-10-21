import { NestHttpTool } from '..';

export const searchSlidesApi = () => {
  return NestHttpTool.send({
    method: 'POST',
    url: '/slide/query',
  });
};

export const getSlideByIdApi = (query: { id: string }) => {
  return NestHttpTool.send({
    method: 'GET',
    url: '/slide/get',
    params: query,
  });
};

export const addSlideApi = (body: {
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
    url: '/slide/add',
    data: body,
  });
};

export const editSlideApi = (body: {
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
    url: '/slide/update',
    data: body,
  });
};

export const delSlideApi = (query: { id: string }) => {
  return NestHttpTool.send({
    method: 'GET',
    url: '/slide/delete',
    params: query,
  });
};
