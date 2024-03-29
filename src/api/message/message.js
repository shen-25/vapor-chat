import { request } from "@/utils/request";

const MessageApi = {
  getP2PMessage: "/v1/message/get/p2pMessage",
};

/**
 * 用户登录
 * @param {*} param 登录参数
 */
export function loginApi(param) {
  return request.post(UserApi.login, {
    data: param,
  });
}
/**
 * 获取验证码
 * @returns
 */
export function getP2PMessageApi(param) {
  return request.get(MessageApi.getP2PMessage, { params: param });
}
