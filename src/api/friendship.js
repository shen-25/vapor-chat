import { request } from "@/utils/request";

const FriendshipApi = {
  getAllFriendship: "/v1/friendship/getAll",
};
/**
 * 获取所有好友的关系
 */
export function getAllFriendshipApi(param) {
  return request.get(FriendshipApi.getAllFriendship, {
    params: param,
  });
}
