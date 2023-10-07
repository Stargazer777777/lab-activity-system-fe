import { FormRules } from 'element-plus';

export const activityRule: FormRules = {
  title: [
    {
      required: true,
      message: '请填写活动标题',
    },
  ],
  locationName: [
    {
      required: true,
      message: '活动地点必填',
    },
  ],
  locationLong: [
    {
      required: true,
      message: '活动经度必填',
    },
    {
      type: 'number',
      message: '经度必须是数字',
    },
  ],
  locationLat: [
    {
      required: true,
      message: '活动纬度必填',
    },
    {
      type: 'number',
      message: '纬度必须是数字',
    },
  ],
  limitRegistration: [
    {
      required: false,
    },
    {
      type: 'integer',
      message: '活动人数限制必须是整数',
    },
  ],
  startTime: [{ required: true, message: '开始时间必填' }],
  endTime: [{ required: true, message: '结束时间必填' }],
};
