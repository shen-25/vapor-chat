import axios from "axios";

const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
};

const API_BASE_URL = "http://zengshen.com:15672";
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
  }

  /**
   * 请求拦截器配置
   */
  interceptorsRequestConfig() {
    BaseRequest.axiosInstance.interceptors.request.use(
      async (config) => {
        return config;
      },
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
