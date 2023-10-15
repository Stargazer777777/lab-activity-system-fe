import { JavaHttpTool } from '..';

export const getStatisticDataApi = (query: { activityId: string }) => {
  return JavaHttpTool.send({
    method: 'GET',
    url: '/statistic',
    params: query,
  });
};
