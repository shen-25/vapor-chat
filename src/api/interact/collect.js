import { request } from "@/utils/request";

const CollectApi = {
  addCollect: "/interact/collect/add",
  deleteCollect: "/interact/collect/delete",
};

/**
 * 收藏
 */
export function addCollectApi(data) {
  return request.post(CollectApi.addCollect, {
    data,
  });
}

/**
 * 取消收藏
 */
export function deleteCollectApi(data) {
  return request.delete(CollectApi.deleteCollect, {
    data,
  });
}
