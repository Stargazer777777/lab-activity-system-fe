import { ActivityStatus } from '@/stores/modules/publicStore';
import { NestHttpTool } from '..';

export const searchActivitiesApi = (query: {
  page: number;
  pageSize: number;
  keyword?: string;
  status?: ActivityStatus;
}) => {
  return NestHttpTool.send({
    method: 'GET',
    url: '/activity-admin/search',
    params: query,
  });
};

export const getActivityByIdApi = (query: { id: string }) => {
  return NestHttpTool.send({
    method: 'GET',
    url: '/activity-admin/get-by-id',
    params: query,
  });
};

export const addActivityApi = (body: {
  title: string;
  description: string;
  locationName: string;
  locationLong: number;
  locationLat: number;
  limitRegistration?: number;
  startTime: Date;
  endTime: Date;
}) => {
  return NestHttpTool.send({
    method: 'POST',
    url: '/activity-admin/add',
    data: body,
  });
};

export const editActivityApi = (body: {
  id: string;
  title?: string;
  description?: string;
  locationName?: string;
  locationLong?: number;
  locationLat?: number;
  limitRegistration?: number;
  startTime?: Date;
  endTime?: Date;
}) => {
  return NestHttpTool.send({
    method: 'PUT',
    url: '/activity-admin/edit',
    data: body,
  });
};
