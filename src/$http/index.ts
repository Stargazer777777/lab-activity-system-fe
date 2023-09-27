import axios, { AxiosError } from 'axios';
import type { AxiosRequestConfig } from 'axios';
import { ElMessage } from 'element-plus';

export interface BkResponse {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
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
    super.name = 'BkError';
    super.message = bkErrorResponse.msg || 'Unknown error';
    super.cause = bkErrorResponse.detail;
  }
}

class HttpTool {
  protected httpInstance = axios.create();

  constructor(baseUrl?: string) {
    if (baseUrl) {
      this.setBaseUrl(baseUrl);
    }
  }

  setBaseUrl(baseUrl: string) {
    this.httpInstance.defaults.baseURL = baseUrl;
  }

  setAuthorization(Authorization: string) {
    this.httpInstance.defaults.headers.common['Authorization'] = Authorization;
  }

  removeAuthorization() {
    this.httpInstance.defaults.headers.delete['Authorization'];
  }

  protected errHandler(err: AxiosError, httpOption?: HttpOption) {
    const statusCode = err.status;

    let errMsg = '未知错误';

    let bkError: BkError | undefined;

    if (err.response?.data) {
      const errResponse = err.response.data as BkErrorResponse;
      bkError = new BkError(errResponse);
      errMsg = errResponse.msg || '未知错误';
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

  async send(
    config: AxiosRequestConfig,
    httpOption?: HttpOption
  ): Promise<BkResponse> {
    try {
      const axiosResponse = await this.httpInstance<BkResponse>(config);
      return axiosResponse.data as BkResponse;
    } catch (err) {
      if (err instanceof AxiosError) {
        throw this.errHandler(err, httpOption);
      } else {
        throw err;
      }
    }
  }
}

export const JavaHttpTool = new HttpTool(import.meta.env['JAVA_HTTP_BASE']);

export const NestHttpTool = new HttpTool(import.meta.env['NEST_HTTP_BASE']);
