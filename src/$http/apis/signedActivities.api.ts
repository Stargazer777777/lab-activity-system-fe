import { JavaHttpTool } from '..';
export const signedActivitiesApi = () => {
  return JavaHttpTool.send({
    method: 'GET',
    url: '/activity/activity/check',
  });
};

export const canclesignApi = (params: { a_id: string }) => {
  return JavaHttpTool.send({
    method: 'DELETE',
    url: '/activity/registration' + '/' + params.a_id,
    // params: query,
  });
};
