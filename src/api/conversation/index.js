import { request } from "@/utils/request";

const ConversationApi = {
  addConversation: "/v1/conversation/add",
  getConversation: "/v1/conversation/get",
  updateConversation: "/v1/conversation/update",
};

/**
 * 创建群聊
 */
export function addConversationApi(data) {
  return request.post(ConversationApi.addConversation, {
    data,
  });
}
/**
 * 获取加入的群聊
 */
export function getConversationApi(param) {
  return request.get(ConversationApi.getConversation, { params: param });
}

/**
 * 创建群聊
 */
export function updateConversationApi(data) {
  return request.post(ConversationApi.updateConversation, {
    data,
  });
}
