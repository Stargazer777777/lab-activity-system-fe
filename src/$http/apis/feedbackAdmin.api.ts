import { NestHttpTool } from '..';

export const searchFeedbacksApi = (query: {
  activityId: string;
  page: number;
  pageSize: number;
  keyword?: string;
}) => {
  return NestHttpTool.send({
    method: 'GET',
    url: '/feedback',
    params: query,
  });
};

export const delFeedbacksApi = (body: { ids: string[] }) => {
  return NestHttpTool.send({
    method: 'DELETE',
    url: '/feedback',
    data: body,
  });
};
