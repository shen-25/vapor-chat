import { request } from "@/utils/request";

const GroupApi = {
  addGroup: "/v1/group/add",
  getJoinGroup: "/v1/group/get/joined",
};

/**
 * 创建群聊
 */
export function addGroupApi(data) {
  return request.post(GroupApi.addGroup, {
    data,
  });
}
/**
 * 获取加入的群聊
 */
export function getJoinGroupApi(param) {
  return request.get(GroupApi.getJoinGroup, { params: param });
}
