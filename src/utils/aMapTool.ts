export class AMapTool {
  static initAMapService() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any)._AMapSecurityConfig = {
      serviceHost: import.meta.env.AMapServiceHost,
    };
    // this.addPublicPlugins();
  }
}
