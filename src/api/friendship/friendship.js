import { request } from "@/utils/request";

const FriendshipApi = {
  getAllFriendship: "/v1/friendship/getAll",
  getAllFriendshipPinyin: "/v1/friendship/getAll/pinyin",
};
/**
 * 获取所有好友的关系
 */
export function getAllFriendshipApi(param) {
  return request.get(FriendshipApi.getAllFriendship, {
    params: param,
  });
}
/**
 * 获取所有好友的关系包括首字母拼音
 */
export function getAllFriendshipNamePinyinApi(param) {
  return request.get(FriendshipApi.getAllFriendshipPinyin, {
    params: param,
  });
}
