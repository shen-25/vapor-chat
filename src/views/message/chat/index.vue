<template>
  <div class="chat-container">
    <div class="header">
      <div class="left">
        <Back @click="back()" />
        <div class="badge"></div>
        <div class="name"></div>
      </div>
      <div class="right">
        <i class="icon-shengluehao"></i>
      </div>
    </div>
    <div class="main">
      <Scroll class="chat-content" :bounce="true">
        <div>
          <ChatMessage
            v-for="(item, index) in messageList"
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
        <div
          class="text"
          @click="onSendMessage(MESSAGE_TYPE.TEXT)"
          v-if="isTextInput"
        >
          发送
        </div>
        <FileUploader @completeOneFile="getUploadFile" class="file-uploader">
          <template v-slot:center>
            <i class="icon-add" v-if="!isTextInput" @click="clickSendOther"></i>
          </template>
        </FileUploader>
      </div>
      <van-share-sheet
        v-model:show="showSendOther"
        :options="sendOtherOptions"
        @select="onSendOtherSelect"
      />
    </div>
  </div>
</template>

<script>
import BaseHeader from "@/components/base/back/BaseHeader.vue";
import Back from "@/components/base/back/Back.vue";
import Scroll from "@/components/base/scroll/Scroll";
import { useRouter } from "vue-router";
import ChatMessage from "./ChatMessage.vue";
import { ref, inject, onMounted, computed, watch } from "vue";
import WebToolkit from "@/im/utils/web-tool-kit";
import { MESSAGE_TYPE } from "./use-chat.js";
import { getP2PMessageApi } from "@/api/message/message";
import { useUserStore } from "@/store/user";
import { APP_ID } from "@/config/setting";
import FileUploader from "@/components/file-uploader";

export default {
  name: "chat",

  components: {
    BaseHeader,
    Back,
    ChatMessage,
    FileUploader,
    Scroll,
  },
  setup(props, { emit }) {
    const router = useRouter();

    const userStore = useUserStore();

    const imSdk = inject("$imSdk");

    const messageText = ref("");
    const imageUrl = ref("");

    const messageList = ref([]);

    const isTextInput = ref(false);

    watch(messageText, (newText) => {
      console.log(newText);
      if (newText && newText != "") {
        isTextInput.value = true;
      } else {
        isTextInput.value = false;
      }
    });

    imSdk.listeners.onP2PMessage = async (pack) => {
      await onListenMessage(JSON.parse(pack));
    };

    async function getP2PMessageData() {
      const param = {
        appId: APP_ID,
        fromId: userStore.getUserId(),
        toId: router.currentRoute.value.params.id,
      };
      const { msg, code, data } = await getP2PMessageApi(param);
      if (code === 0) {
        data.forEach((element) => {
          if (element.type == MESSAGE_TYPE.SharePost) {
            let temp = element;
            temp.data = JSON.parse(element.data);
            messageList.value.push(temp);
          } else {
            messageList.value.push(element);
          }
        });
      }
    }

    async function onSendMessage(msgType) {
      // 发送文本消息
      if (msgType === MESSAGE_TYPE.TEXT) {
        if (messageText.value == "" || messageText.value == undefined) {
          return;
        }
        const friendId = router.currentRoute.value.params.id;
        const msg = {
          type: MESSAGE_TYPE.TEXT,
          data: messageText.value,
          time: new Date(),
          user: {
            userId: userStore.getUserId(),
            avatar: userStore.getAvatar(),
          },
        };
        messageList.value.push(msg);
        // 构造数据格式
        imSdk.sendP2PMessage(
          imSdk.createP2PTextMessage(
            friendId,
            messageText.value,
            userStore.getAvatar()
          )
        );
        messageText.value = "";
      }
      // 发送帖子分享
      if (msgType == MESSAGE_TYPE.SharePost) {
        const toId = router.currentRoute.value.params.id;
        const postWork = {
          postId: "1775150487142928384",
          title: "美丽的大自然",
          coverUrl:
            "http://zengshen.org:9000/easy-cloud-disk/2024-04-02/dcdbc14abc984998b5ac4c6a2f6658ef.jpg",
          type: 0,
          userId: "1",
          nickname: "你好吗",
          avatar:
            "http://zengshen.org:9000/easy-cloud-disk/2024-03-28/a2f8bf500eb1400a9e1d8f4e08988dc5.ico",
        };
        const msg = {
          type: MESSAGE_TYPE.SharePost,
          data: postWork,
          time: new Date(),
          user: {
            userId: userStore.getUserId(),
            avatar: userStore.getAvatar(),
          },
        };
        messageList.value.push(msg);
        // 构造数据格式
        imSdk.sendP2PMessage(
          imSdk.createSharePostMessage(
            userStore.getAvatar(),
            toId,
            MESSAGE_TYPE.SharePost,
            postWork
          )
        );
      }
      // 发送图片分享
      if (msgType == MESSAGE_TYPE.Image) {
        if (!imageUrl.value) {
          return;
        }
        const toId = router.currentRoute.value.params.id;
        const msg = {
          type: MESSAGE_TYPE.Image,
          data: imageUrl.value,
          time: new Date(),
          user: {
            userId: userStore.getUserId(),
            avatar: userStore.getAvatar(),
          },
        };
        messageList.value.push(msg);
        // 构造数据格式
        imSdk.sendP2PMessage(
          imSdk.createImageMessage(
            userStore.getAvatar(),
            toId,
            MESSAGE_TYPE.Image,
            imageUrl.value
          )
        );
        imageUrl.value = "";
      }
    }

    async function onListenMessage(msgPack) {
      console.log("单聊监听接收聊天信息", msgPack);
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
          },
        };
        messageList.value.push(msg);
      } // 发送帖子分享
      if (messageBody.type == MESSAGE_TYPE.SharePost) {
        console.log(typeof messageBody.content);
        const msg = {
          type: MESSAGE_TYPE.SharePost,
          data: messageBody.content,
          createTime: data.messageTime,
          user: {
            userId: data.fromId,
            avatar: data.avatar,
          },
        };
        messageList.value.push(msg);
      }
      // 发送图片分享
      if (messageBody.type == MESSAGE_TYPE.Image) {
        const msg = {
          type: MESSAGE_TYPE.Image,
          data: messageBody.content,
          createTime: data.messageTime,
          user: {
            userId: data.fromId,
            avatar: data.avatar,
          },
        };
        messageList.value.push(msg);
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
      } else if (index == messageList.value.length - 1) {
        return "pad-bottom-20rem";
      } else {
        return "";
      }
    }

    const showSendOther = ref(false);
    const sendOtherOptions = [{ name: "相册", icon: "poster" }];

    const onSendOtherSelect = () => {
      showSendOther.value = false;
    };
    function clickSendOther() {
      // showSendOther.value = true;
    }
    function getUploadFile(fileUrl) {
      imageUrl.value = fileUrl;
      onSendMessage(MESSAGE_TYPE.Image);
    }

    getP2PMessageData();
    return {
      MESSAGE_TYPE,
      back,
      messageList,
      messageText,
      onSendMessage,
      getChatCls,
      isTextInput,
      sendOtherOptions,
      showSendOther,
      onSendOtherSelect,
      clickSendOther,
      getUploadFile,
    };
  },
};
</script>
<style lang="scss" scoped>
.file-uploader {
  width: 40rem;
}
.chat-container {
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #fff;
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
      max-width: 60%;
      overflow: hidden;
      display: flex;
      align-items: center;
      .badge {
        margin: 0rem 10rem 0rem 10rem;
        font-size: 12rem;
        display: block;
        padding: 3rem 3rem;
        border-radius: 50%;
        color: #575757;
        background: #eee8e9;
      }
      .name {
        font-size: 14rem;
      }
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
      display: flex;
      align-items: center;
      .text {
        width: 90rem;

        height: 30rem;
        line-height: 30rem;
        width: 60rem;
        text-align: center;
        color: #fff;
        background: #95ec69;
        font-size: 16rem;
        border-radius: 6rem;
      }
      .icon-add {
        width: 50rem;
        font-size: 30rem;
      }
    }
  }
}
</style>
