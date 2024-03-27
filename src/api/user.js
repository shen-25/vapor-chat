import { request } from "@/utils/request";

const UserApi = {
  login: "/user/login",
  getCaptcha: "/user/getCaptcha",
  getUserMenu: "/user/menu",
  getUserDetail: "/user/detail",
  getUserList: "/user/list",
  addUser: "/user/add",
  updateUser: "/user/update",
  deleteUser: "/user/delete",
  deleteBatchUser: "/user/delete/batch",
  logout: "/user/logout",
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
 * 获取验证码
 * @returns
 */
export function getCaptchaApi() {
  return request.get(UserApi.getCaptcha);
}

/**
 * 获取用户菜单
 */
export function getUserMenuApi() {
  return request.get(UserApi.getUserMenu);
}

/**
 * 获取用户详情
 */
export function getUserDetailApi() {
  return request.get(UserApi.getUserDetail);
}

/**
 * 分页查询用户列表
 */
export function getUserListApi(param) {
  return request.get(UserApi.getUserList, {
    params: param,
  });
}

/**
 * 添加用户
 * @param {*} data
 * @returns
 */
export function addUserApi(data) {
  return request.post(UserApi.addUser, {
    data,
  });
}

/**
 * 更新用户请求
 * @param {*} data
 * @returns
 */
export function updateUserApi(data) {
  return request.put(UserApi.updateUser, {
    data,
  });
}

/**
 * 删除用户
 * @param {*} data
 * @returns
 */
export function deleteUserByIdApi(userId) {
  return request.delete(UserApi.deleteUser, {
    data: { userId },
  });
}

/**
 * 批量删除用户
 * @param {*} data
 * @returns
 */
export function deleteBatchUserByIdApi(data) {
  return request.delete(UserApi.deleteBatchUser, {
    data: {
      userIdList: data,
    },
  });
}

/**
 * 退出登录
 * @returns
 */
export function logoutApi() {
  return request.post(UserApi.logout);
}
