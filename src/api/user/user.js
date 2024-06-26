import { request } from "@/utils/request";

const UserApi = {
  login: "/user/login",
  register: "/user/register",
  getUserInfo: "/user/getUserInfo",
  editUserInfo: "/user/edit/info",
  getByNameOrMobile: "/user/getByNameOrMobile",
  editUserEduction: "/user/edit/eduction",
  sendEmailCode: "/user/send/email",
  forgetPassword: "/user/forget/password",
};

/**
 * 用户登录
 * @param {*} param 登录参数
 */
export function loginApi(param) {
  return request.post(UserApi.login, {
    data: param,
  });
}
/**
 * 用户注册
 * @param {*} param 注册参数
 */
export function registerApi(param) {
  return request.post(UserApi.register, {
    data: param,
  });
}
/**
 * 忘记密码
 */
export function forgetPasswordApi(param) {
  return request.put(UserApi.forgetPassword, {
    data: param,
  });
}
/**
 * 获取用户详细信息
 * @param {*} param 注册参数
 */
export function getUserInfoApi(param) {
  return request.get(UserApi.getUserInfo, {
    params: param,
  });
}

export function editUserInfoApi(param) {
  return request.post(UserApi.editUserInfo, {
    data: param,
  });
}
export function editUserEductionApi(param) {
  return request.post(UserApi.editUserEduction, {
    data: param,
  });
}

/**
 * 寻找朋友
 */
export function getByNameOrMobileApi(param) {
  return request.get(UserApi.getByNameOrMobile, {
    params: param,
  });
}

/**
 * 获取邮箱验证码
 * @param {*} param 注册参数
 */
export function sendEmailCodeApi(param) {
  return request.post(UserApi.sendEmailCode, {
    data: param,
  });
}
