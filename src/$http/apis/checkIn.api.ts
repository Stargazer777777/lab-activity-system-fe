import { NestHttpTool } from './../index';
export const checkInApi = (body: {
  activityId: string;
  locationLong: number;
  locationLat: number;
}) => {
  return NestHttpTool.send({
    method: 'POST',
    url: 'check-in',
    data: body,
  });
};
