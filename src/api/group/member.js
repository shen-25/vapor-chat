import { request } from "@/utils/request";

const GroupMemberApi = {
  deleteGroupMember: "v1/group/member/delete/batch",
  updateGroupMember: "/v1/group/member/update",
};

/**
 * 删除群成员
 */
export function deleteGroupMemberApi(data) {
  return request.delete(GroupMemberApi.deleteGroupMember, {
    data,
  });
}
/**
 * 更新群组成员信息
 */
export function updateGroupMemberApi(data) {
  return request.put(GroupMemberApi.updateGroupMember, {
    data,
  });
}
