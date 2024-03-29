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
      if (localStorage.getItem("userId")) {
        return () => localStorage.getItem("userId");
      }
      return () => state.userInfo.userId;
    },
    getAvatar(state) {
      if (localStorage.getItem("avatar")) {
        return () => localStorage.getItem("avatar");
      }
      return () => state.userInfo.avatarUrl;
    },
  },
  actions: {
    async setUserInfo(userInfo) {
      this.userInfo = userInfo;
    },
  },
});
