import { request } from "@/utils/request";

const WorkPostAPi = {
  publish: "/work/workPost/publish",
  discovery: "/work/workPost/discovery",
  getPostDetail: "/work/workPost/getDetail",
  myPost: "/work/workPost/get/me",
};

/**
 * 用户登录
 * @param {*} data 登录参数
 */
export function workPublishApi(data) {
  return request.post(WorkPostAPi.publish, {
    data: data,
  });
}
/**
 * 获取用户的workList
 * @param {*} data 登录参数
 */
export function getWorkListApi(param) {
  return request.get(WorkPostAPi.discovery, {
    params: param,
  });
}

export function getWorkPostDetailApi(param) {
  return request.get(WorkPostAPi.getPostDetail, {
    params: param,
  });
}

/**
 * 获取指定用户的workList
 * @param {*} data 登录参数
 */
export function getMyWorkListApi(param) {
  return request.get(WorkPostAPi.myPost, {
    params: param,
  });
}
