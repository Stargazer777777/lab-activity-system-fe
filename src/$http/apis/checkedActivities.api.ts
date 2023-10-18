import { JavaHttpTool } from '..';
export const checkedActivitiesApi = () => {
  return JavaHttpTool.send({
    method: 'GET',
    url: '/activity/activity/signed',
  });
};

export const docommentApi = (
  body: { content: string; mark: number },
  query: { a_id: string }
) => {
  return JavaHttpTool.send({
    method: 'POST',
    url: '/activity/comment',
    params: query,
    data: body,
  });
};

// export const likecountApi = (query: { like_number: string; id: string }) => {
//   return JavaHttpTool.send({
//     method: 'PUT',
//     url: '/activity/activity/like',
//     params: query,
//   });
// };
