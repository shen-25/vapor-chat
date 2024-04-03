import { request } from "@/utils/request";

const FanApi = {
  addFan: "/interact/fan/add",
  deleteFan: "/interact/fan/delete",
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
