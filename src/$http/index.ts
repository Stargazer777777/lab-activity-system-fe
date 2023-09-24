import axios, { AxiosError } from 'axios';
import type { AxiosRequestConfig } from 'axios';
import { ElMessage } from 'element-plus';

export interface BkResponse {
  data: object;
  msg: string;
  success: boolean;
}

export interface BkErrorResponse extends BkResponse {
  detail: string;
}

export interface HttpOption {
  noAlert?: true;
}

export class BkError extends Error {
  constructor(bkErrorResponse: BkErrorResponse) {
    super();
    super.stack = 'BkError';
    super.message = bkErrorResponse.msg;
    super.cause = bkErrorResponse.detail;
  }
}

export class JavaHttpTool {
  private static httpInstance = axios.create();

  static setBaseUrl(baseUrl: string) {
    JavaHttpTool.httpInstance.defaults.baseURL = baseUrl;
  }

  static setAuthorization(Authorization: string) {
    JavaHttpTool.httpInstance.defaults.headers.common['Authorization'] =
      Authorization;
  }

  static removeAuthorization() {
    JavaHttpTool.httpInstance.defaults.headers.delete['Authorization'];
  }

  private static errHandler(err: AxiosError, httpOption?: HttpOption) {
    const statusCode = err.status;

    let errMsg = '未知错误';

    let bkError: BkError | undefined;

    if (err.response?.data) {
      const errResponse = err.response.data as BkErrorResponse;
      bkError = new BkError(errResponse);
      errMsg = errResponse.msg;
    }

    switch (statusCode) {
      default:
        break;
    }

    if (!httpOption?.noAlert) {
      ElMessage.error(errMsg);
    }
    throw bkError;
  }

  static async send(
    config: AxiosRequestConfig,
    httpOption?: HttpOption
  ): Promise<BkResponse> {
    try {
      const axiosResponse = await JavaHttpTool.httpInstance<BkResponse>(config);
      return axiosResponse.data as BkResponse;
    } catch (err) {
      if (err instanceof AxiosError) {
        throw JavaHttpTool.errHandler(err, httpOption);
      } else {
        throw err;
      }
    }
  }
}

JavaHttpTool.setBaseUrl(import.meta.env['JAVA_HTTP_BASE']);
