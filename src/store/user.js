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
      return () => state.userInfo.userId;
    },
  },
  actions: {
    async setUserInfo(userInfo) {
      this.userInfo = userInfo;
    },
  },
});
