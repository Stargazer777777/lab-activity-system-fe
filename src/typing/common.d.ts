export interface Activity {
  id: string;
  title: string;
  description: string;
  locationName: string;
  locationLong: string;
  locationLat: string;
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
