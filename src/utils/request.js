import axios from "axios";
import { API_BASE_URL } from "@/config/setting";

const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
};
/**
 * axios配置
 */
const defaultConfig = {
  baseURL: API_BASE_URL,
  // 请求超时时间
  timeout: 10000,
};
class BaseRequest {
  static axiosInstance = axios.create(defaultConfig);
  // 构造方法
  constructor() {
    this.interceptorsRequestConfig();
    this.interceptorsResponseConfig();
  }

  /**
   * 显示错误信息
   * @param status http响应码, 非接口放回的{code:xxx}
   * @param {*} data 可以为空, 接口返回的数据
   */
  showErrorMsg(status, data) {
    // TODO
  }
  /**
   * 请求拦截器配置
   */
  interceptorsRequestConfig() {
    BaseRequest.axiosInstance.interceptors.request.use(
      async (config) => {
        const requestConfig = config;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  /**
   * 响应拦截器配置
   */
  interceptorsResponseConfig() {
    BaseRequest.axiosInstance.interceptors.response.use(
      // 处理成功直接返回
      (response) => {
        return response;
      },
      // 处理失败 超出 2xx 范围的状态码都会触发该函数。
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  /**
   * 通用请求方法
   * @param {*} method 请求方式, get, post, put, delete
   * @param {*} url 请求url
   * @param {*} param 请求参数，
   *     {params: {}, data: {}}
   *    `params` 是与请求一起发送的 URL 参数
   *    `data` 是作为请求体被发送的数据,仅适用 'PUT', 'POST', 'DELETE 和 'PATCH' 请求方法
   * @param headers 请求头
   */
  request(method, url, param, headers) {
    const config = { method, url, ...param, headers };
    return new Promise((resolve, reject) => {
      BaseRequest.axiosInstance
        .request(config)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          // 如果error类型不是Error, 在then里面处理
          if (!(error instanceof Error)) {
            resolve(error);
          } else {
            // 不处理错误
          }
        });
    });
  }

  /**
   * GET请求
   * @param url 请求url
   * @param param 请求参数 {params: {}}
   * @param headers 请求头
   * @returns
   */
  get(url, param, headers = DEFAULT_HEADERS) {
    return this.request("GET", url, param, headers);
  }

  /**
   * POST请求
   * @param url 请求url
   * @param param 请求参数 {params: {}, data: {}}
   * @param headers 请求头
   * @returns
   */
  post(url, param, headers = DEFAULT_HEADERS) {
    return this.request("POST", url, param, headers);
  }

  /**
   * PUT请求
   * @param url 请求url
   * @param param 请求参数 {params: {}, data: {}}
   * @param headers 请求头
   * @returns
   */
  put(url, param, headers = DEFAULT_HEADERS) {
    return this.request("PUT", url, param, headers);
  }

  /**
   * DELETE请求
   * @param url 请求url
   * @param param 请求参数 {data: {}}
   * @param headers 请求头
   * @returns
   */
  delete(url, param, headers = DEFAULT_HEADERS) {
    return this.request("DELETE", url, param, headers);
  }
}

export const request = new BaseRequest();
