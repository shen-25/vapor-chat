import { request } from "@/utils/request";

const FanApi = {
  addFan: "/user/fan/add",
  deleteFan: "/user/fan/delete",
};

/**
 * 关注
 */
export function addFanApi(data) {
  return request.post(FanApi.addFan, {
    data,
  });
}

/**
 * 取消关注
 */
export function deleteFanApi(data) {
  return request.delete(FanApi.deleteFan, {
    data,
  });
}
