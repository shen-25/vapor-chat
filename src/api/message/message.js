import { request } from "@/utils/request";

const MessageApi = {
  getP2PMessage: "/v1/message/get/p2pMessage",
  getGroupMessage: "/v1/group/get/groupMessage",
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
 * 获取单聊消息
 * @returns
 */
export function getP2PMessageApi(param) {
  return request.get(MessageApi.getP2PMessage, { params: param });
}

/**
 * 获取群聊消息
 * @returns
 */
export function getGroupMessageApi(param) {
  return request.get(MessageApi.getGroupMessage, { params: param });
}
