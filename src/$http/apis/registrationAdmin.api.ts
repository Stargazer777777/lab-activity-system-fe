import { NestHttpTool } from '..';

export const searchRegistrationsApi = (query: {
  activityId: string;
  page: number;
  pageSize: number;
  keyword?: string;
  checkStatus?: 1 | 0;
}) => {
  return NestHttpTool.send({
    method: 'GET',
    url: 'registration',
    params: query,
  });
};

export const delRegistraionsApi = (body: { ids: string[] }) => {
  return NestHttpTool.send({
    method: 'DELETE',
    url: 'registration',
    data: body,
  });
};
