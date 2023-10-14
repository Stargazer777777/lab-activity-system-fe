export interface User {
  id: string;
  stuNo: string;
  email: string;
  name: string;
  password: string;
  sex: 1 | 0;
  avatarUrl: string;
  role: string;
  status: string;
}
export interface Activity {
  id: string;
  title: string;
  description: string;
  locationName: string;
  locationLong: number;
  locationLat: number;
  limitRegistration: number;
  likeNumber: number;
  startTime: Date;
  endTime: Date;
  createTime: Date;
  updateTime: Date;
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
export interface Registration {
  id: string;
  isCheckin: 1 | 0;
  user: User;
}

export interface Feedback {
  id: string;
  content: string;
  userId: string;
  activityId: string;
}
