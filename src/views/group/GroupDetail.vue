<template>
  <div class="group">
    <div class="header">
      <div class="left">
        <Back @click="back()" />
      </div>
      <div class="middle">群聊</div>
      <div class="right">
        <i class="icon-shengluehao"></i>
      </div>
    </div>
    <div class="main">
      <Scroll class="chat-content" :bounce="true">
        <div>
          <ChatMessage
            v-for="(item, index) in messageGroupList"
            :message="item"
            :key="item"
            :class="getChatCls(index)"
          ></ChatMessage>
        </div>
      </Scroll>
    </div>
    <div class="footer">
      <div class="search-input">
        <input class="input-inner" v-model="messageText" />
      </div>
      <div class="notice">
        <div class="text" @click="onSendGroupMessage(MESSAGE_TYPE.TEXT)">
          发送
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseHeader from "@/components/base/back/BaseHeader.vue";
import Back from "@/components/base/back/Back.vue";
import Scroll from "@/components/base/scroll/Scroll";
import { useRouter } from "vue-router";
import ChatMessage from "@/views/message/chat/ChatMessage.vue";
import { ref, inject, onMounted } from "vue";

import { MESSAGE_TYPE } from "@/views/message/chat/use-chat.js";
import { getGroupMessageApi } from "@/api/message/message";
import { useUserStore } from "@/store/user";
import { APP_ID } from "@/config/setting";
export default {
  name: "chat",

  components: {
    BaseHeader,
    Back,
    ChatMessage,
    Scroll,
  },
  setup(props, { emit }) {
    const router = useRouter();

    const userStore = useUserStore();

    const imSdk = inject("$imSdk");

    const messageText = ref("");

    const messageGroupList = ref([]);

    imSdk.listeners.onGroupMessage = async (pack) => {
      await onListenGroupMessage(JSON.parse(pack));
    };

    async function getGroupMessageData() {
      const param = {
        appId: APP_ID,
        fromId: userStore.getUserId(),
        groupId: router.currentRoute.value.params.id,
      };
      const { msg, code, data } = await getGroupMessageApi(param);
      if (code === 0) {
        messageGroupList.value = data;
      }
    }

    async function onSendGroupMessage(msgType) {
      if (messageText.value == "" || messageText.value == undefined) {
        return;
      }
      // 发送文本消息
      if (msgType === MESSAGE_TYPE.TEXT) {
        const groupId = router.currentRoute.value.params.id;
        const msg = {
          type: MESSAGE_TYPE.TEXT,
          data: messageText.value,
          time: new Date(),
          user: {
            userId: userStore.getUserId(),
            avatar: userStore.getAvatar(),
            remark: userStore.getRemark(),
          },
        };
        messageGroupList.value.push(msg);

        // 构造数据格式
        imSdk.sendGroupMessage(
          imSdk.createGroupTextMessage(
            groupId,
            messageText.value,
            userStore.getAvatar()
          )
        );
        messageText.value = "";
      }
    }

    async function onListenGroupMessage(msgPack) {
      console.log("群聊听接收聊天信息", msgPack);
      const data = msgPack.data;
      const messageBody = JSON.parse(data.messageBody);
      // 文本消息
      if (messageBody.type == MESSAGE_TYPE.TEXT) {
        const msg = {
          data: messageBody.content,
          type: MESSAGE_TYPE.TEXT,
          createTime: data.messageTime,
          user: {
            userId: data.fromId,
            avatar: data.avatar,
            remark: data.remark,
          },
        };
        messageGroupList.value.push(msg);
      }
    }

    function back() {
      if (window.history.length <= 1) {
        router.push("/");
      } else {
        router.back();
      }
    }
    function getChatCls(index) {
      if (index == 0) {
        return "pad-top-20rem";
      } else if (index == messageGroupList.value.length - 1) {
        return "pad-bottom-20rem";
      } else {
        return "";
      }
    }

    // 初始化setup调用
    getGroupMessageData();

    return {
      MESSAGE_TYPE,
      back,
      messageGroupList,
      messageText,
      onSendGroupMessage,
      getChatCls,
    };
  },
};
</script>

<style lang="scss" scoped>
.group {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  z-index: 600;

  .header {
    z-index: 200;
    height: 50rem;
    padding: 0 10rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ebebec;
    background-color: #fff;
    .left {
      overflow: hidden;
      display: flex;
      align-items: center;
    }
    .middle {
      font-size: 16rem;
    }
    .right {
      display: flex;
      .icon-shengluehao {
        font-size: 26rem;
      }
    }
  }
  .main {
    position: fixed;
    width: 100%;
    top: 51rem;
    bottom: 51rem;
    overflow: scroll;
    .chat-content {
      height: 100%;
      overflow: hidden;
    }
  }

  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
    height: 50rem;
    background: #e4e4e6;
    border-top: 1px solid #f8f5f5;
    .search-input {
      display: flex;
      align-items: center;
      box-sizing: border-box;
      width: 100%;
      padding: 0 6rem;
      height: 48rem;
      .input-inner {
        flex: 1;
        margin: 0 5rem;
        line-height: 38rem;
        border-radius: 8rem;
        background: #fff;
        font-size: 18rem;
        outline: 0;
      }
    }
    .notice {
      width: 90rem;
      display: flex;
      align-items: center;
      .text {
        height: 30rem;
        line-height: 30rem;
        width: 60rem;
        text-align: center;
        color: #fff;
        background: #95ec69;
        font-size: 16rem;
        border-radius: 6rem;
      }
    }
  }
}
</style>
