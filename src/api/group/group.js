import { request } from "@/utils/request";

const GroupApi = {
  addGroup: "/v1/group/add",
  getJoinGroup: "/v1/group/get/joined",
  getGroupInfo: "/v1/group/get/info",
  updateGroup: "/v1/group/update",
  deleteGroup: "/v1/group/delete",

  transferGroup: "/v1/group/transfer",
  searchGroup: "/v1/group/search",
  joinGroupReq: "/join/group/req",
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

/**
 * 获取群聊基本信息
 */
export function getGroupInfoApi(param) {
  return request.get(GroupApi.getGroupInfo, { params: param });
}

/**
 * 更新群聊
 */
export function updateBasicGroupApi(data) {
  return request.post(GroupApi.updateGroup, {
    data,
  });
}
/**
 * 解散群聊
 */
export function deleteGroupGroupApi(data) {
  return request.post(GroupApi.deleteGroup, {
    data,
  });
}
/**
 * 转移群主
 */
export function transferGroupApi(data) {
  return request.post(GroupApi.transferGroup, {
    data,
  });
}
/**
 * 搜索群聊
 */
export function searchGroupApi(param) {
  return request.get(GroupApi.searchGroup, { params: param });
}
/**
 * 申请加入群聊
 */
export function joinGroupReqApi(data) {
  return request.post(GroupApi.joinGroupReq, data);
}
