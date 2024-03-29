import { defineStore } from "pinia";

export const useUserStore = defineStore({
  id: "user",
  state: () => {
    return {
      // 用户信息
      userInfo: null,
    };
  },
  getters: {
    getUserId(state) {
      if (localStorage.getItem("userInfo")) {
        return () => JSON.parse(localStorage.getItem("userInfo")).userId;
      }
      return () => state.userInfo.userId;
    },
    getAvatar(state) {
      if (localStorage.getItem("userInfo")) {
        return () => JSON.parse(localStorage.getItem("userInfo")).avatar;
      }
      return () => state.userInfo.avatarUrl;
    },
    getRemark(state) {
      if (localStorage.getItem("nickname")) {
        return () => JSON.parse(localStorage.getItem("userInfo")).nickname;
      }
      return () => state.userInfo.nickname;
    },
  },
  actions: {
    async setUserInfo(userInfo) {
      this.userInfo = userInfo;
    },
  },
});
