import { request } from "@/utils/request";

const LikeApi = {
  addLike: "/interact/like/add",
  deleteLike: "/interact/like/delete",
};

/**
 * 喜欢
 */
export function addLikeApi(data) {
  return request.post(LikeApi.addLike, {
    data,
  });
}

/**
 * 取消喜欢
 */
export function deleteLikeApi(data) {
  return request.delete(LikeApi.deleteLike, {
    data,
  });
}
