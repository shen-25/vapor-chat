import { defineStore } from "pinia";
import { getConversationApi } from "@/api/conversation/index";
import { useUserStore } from "./user";
import { APP_ID } from "@/config/setting";
export const useConversationStore = defineStore({
  id: "conversation",
  state: () => {
    return {
      // 会话信息
      conversationList: [],
    };
  },
  actions: {
    /** 重置状态 */
    resetState() {
      this.conversationList = [];
    },
    /**
     * 获取并设置会话
     */
    async setConversationList() {
      const userStore = useUserStore();

      const param = { appId: APP_ID, fromId: userStore.getUserId() };
      const { code, msg, data } = await getConversationApi(param);
      if (code !== 0) {
        this.conversationList = [];
        return;
      }
      // 设置
      this.conversationList = data;
    },
    /**
     * 更新
     */
    updateConversation(
      conversationId,
      appId,
      noReadCount,
      messageBody,
      messageTime
    ) {
      let taskItem = this.conversationList.find(
        (item) => item.id == conversationId && item.appId == appId
      );
      if (taskItem) {
        taskItem.noReadCount += noReadCount;
        taskItem.messageTime = messageTime;
        taskItem.messageContent = messageBody.content;
        taskItem.messageType = messageBody.type;
      }
    },
    resetNoReadCount(conversationId, appId) {
      let taskItem = this.conversationList.find(
        (item) => item.id == conversationId && item.appId == appId
      );
      if (taskItem) {
        taskItem.noReadCount = 0;
      }
    },
  },
  getters: {
    /**
     * 获取会话的用户名称
     * @param {} state
     */
    getConversationUserName(state) {
      return (conversationId, appId) => {
        let item = state.conversationList.find(
          (item) => item.id == conversationId && item.appId == appId
        );
        if (item) {
          return item.name;
        }
      };
    },
    getTotalNoReadCount(state) {
      return (conversationId, appId) => {
        let count = 0;
        for (let i = 0; i < state.conversationList.length; i++) {
          const item = state.conversationList[i];
          if (item.id == conversationId && item.appId == appId) {
            continue;
          } else {
            count += item.noReadCount;
          }
        }
        return count;
      };
    },
  },
});
