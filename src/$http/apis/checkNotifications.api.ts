import { JavaHttpTool } from '..';
export const getNotificationsApi = () => {
  return JavaHttpTool.send({
    method: 'GET',
    url: '/activity/notification/all',
  });
};

export const searchNotificationsApi = (query: { title: string }) => {
  return JavaHttpTool.send({
    method: 'GET',
    url: '/activity/notification/title',
    params: query,
  });
};

export const deleteNotificationsApi = (query: { id: string }) => {
  return JavaHttpTool.send({
    method: 'DELETE',
    url: '/activity/notification',
    params: query,
  });
};
