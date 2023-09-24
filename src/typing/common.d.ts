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

export interface Registration {
  id: string;
  userId: string;
  stuNo: string;
  username: string;
  sex: 0 | 1;
  activityId: string;
  isCheckIn: boolean;
}
