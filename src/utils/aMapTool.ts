// 高德地图工具类
export class AMapTool {
  // 初始化地图服务
  static initAMapService() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any)._AMapSecurityConfig = {
      serviceHost: import.meta.env.AMapServiceHost,
    };
  }
}
