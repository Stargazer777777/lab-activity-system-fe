export interface Activity {
  id: string;
  title: string;
  description: string;
  locationName: string;
  locationLong: number;
  locationLat: number;
  limitRegistration: number;
  likeNumber: number;
  startTime: number;
  endTime: number;
  createTime: number;
  updateTime: number;
}

export interface PageInfo {
  currentPage: number;
  pageSize: number;
  total: number;
}

export interface LoginEntry {
  emailOrstuNo: string;
  email?: string;
  stuNo?: string;
  password: string;
  inputCaptcha: string;
  captchaId?: string;
}

export interface AddNoticifaction {
  userIds: string[];
  title: string;
  detail: string;
  sendTime: number;
  activityId: string;
}
