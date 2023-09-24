export interface AuthToolI {
  /**
   * 授权，应该将token绑定在JavaHttpTool的默认请求头上，并将token保存在localstorage
   * @param token
   * @returns
   */
  setAuthrization: (token: string) => void;
  /**
   * 从本地授权：应该从localstorage中拿到token，然后调用setAuthrization
   * @returns
   */
  authFromLocal: () => boolean;
  /**
   * 将token从默认请求头中移除，并删除localstorage中的token
   * @returns
   */
  removeAutorization: () => void;
}
import { JavaHttpTool } from '@/$http/index';
export class AuthToolImpl implements AuthToolI {
  setAuthrization(token: string) {
    localStorage.setItem('Authorization', token);
    JavaHttpTool.setAuthorization(token);
  }
  authFromLocal() {
    const token = localStorage.getItem('Authorization');
    if (token == null || token === '') {
      return false;
    }
    this.setAuthrization(token);
    return true;
  }
  removeAutorization() {
    JavaHttpTool.removeAuthorization();
    localStorage.clear();
  }
}
