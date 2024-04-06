import { request } from "@/utils/request";

const FanApi = {
  addFan: "/interact/fan/add",
  deleteFan: "/interact/fan/delete",
  getUerStatistics: "/interact/fan/get/user/statistics",
  getIsFan: "/interact/fan/get/isFan",
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
/** */
export function getIsFanApi(param) {
  return request.get(FanApi.getIsFan, { params: param });
}
/**
 * 获取用户统计数字
 */
export function getUerStatisticsApi(param) {
  return request.get(FanApi.getUerStatistics, { params: param });
}
