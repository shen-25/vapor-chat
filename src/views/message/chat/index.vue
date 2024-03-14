<template>
  <div class="chat-container">
    <div class="chat-header">
      <div class="left">
        <Back @click="back()" />
        <div class="badge">12</div>
        <div class="name">zzzz</div>
      </div>
      <div class="right">
        <i class="icon-shengluehao"></i>
      </div>
    </div>
    <div class="chat-content-wrapper">
      <Scroll class="chat-content">
        <div>
          <ChatMessage
            v-for="item in messages"
            :message="item"
            :key="item"
          ></ChatMessage>
        </div>
      </Scroll>
    </div>
    <div class="footer">
      <div class="search-input">
        <input class="input-inner" :placeholder="placeholder" />
      </div>
      <div class="notice"><div class="text">发送</div></div>
    </div>
  </div>
</template>

<script>
import BaseHeader from "@/components/base/BaseHeader.vue";
import Back from "@/components/base/Back.vue";
import Scroll from "@/components/base/scroll/Scroll";
import { useRouter } from "vue-router";
import ChatMessage from "./ChatMessage.vue";
import { ref } from "vue";
export default {
  name: "chat",
  components: {
    BaseHeader,
    Back,
    ChatMessage,
    Scroll,
  },
  setup() {
    let MESSAGE_TYPE = {
      TEXT: 0,
      TIME: 1,
      VIDEO: 2,
      DOUYIN_VIDEO: 9,
      AUDIO: 3,
      IMAGE: 6,
      VIDEO_CALL: 4,
      AUDIO_CALL: 5,
      MEME: 7, //表情包
      RED_PACKET: 8, //红包
    };
    const router = useRouter();
    function back() {
      if (window.history.length <= 1) {
        router.push("/");
      } else {
        router.back();
      }
    }
    const messages = ref([
      {
        type: MESSAGE_TYPE.TIME,
        data: "",
        time: "2021-01-02 21:21",
        user: {
          id: "93864497380",
          avatar: "../../../assets/img/icon/head-image.jpg",
        },
      },
      {
        type: MESSAGE_TYPE.TEXT,
        data: "我也找不到了我也找不到了我也找不到了我也找不到了我也找不到了我也找不到了我也找不到了我也找不到了",
        time: "2021-01-02 21:21",
        user: {
          id: "93864497380",
          avatar: "../../../assets/img/icon/head-image.jpg",
        },
      },
      {
        type: MESSAGE_TYPE.TEXT,
        data: "我找不到了",
        time: "2021-01-02 21:21",
        user: {
          id: "1",
          avatar: "../../../assets/img/icon/head-image.jpg",
        },
      },
      {
        type: MESSAGE_TYPE.TEXT,
        data: "我也找不到了我也找不到了我也找不到了我也找不到了我也找不到了我也找不到了我也找不到了我也找不到了",
        time: "2021-01-02 21:21",
        user: {
          id: "93864497380",
          avatar: "../../../assets/img/icon/head-image.jpg",
        },
      },
      {
        type: MESSAGE_TYPE.TEXT,
        data: "我找不到了",
        time: "2021-01-02 21:21",
        user: {
          id: "1",
          avatar: "../../../assets/img/icon/head-image.jpg",
        },
      },
      {
        type: MESSAGE_TYPE.TEXT,
        data: "我也找不到了我也找不到了我也找不到了我也找不到了我也找不到了我也找不到了我也找不到了我也找不到了",
        time: "2021-01-02 21:21",
        user: {
          id: "93864497380",
          avatar: "../../../assets/img/icon/head-image.jpg",
        },
      },
      {
        type: MESSAGE_TYPE.TEXT,
        data: "我找不到了",
        time: "2021-01-02 21:21",
        user: {
          id: "1",
          avatar: "../../../assets/img/icon/head-image.jpg",
        },
      },
      {
        type: MESSAGE_TYPE.TEXT,
        data: "我也找不到了我也找不到了我也找不到了我也找不到了我也找不到了我也找不到了我也找不到了我也找不到了",
        time: "2021-01-02 21:21",
        user: {
          id: "93864497380",
          avatar: "../../../assets/img/icon/head-image.jpg",
        },
      },
      {
        type: MESSAGE_TYPE.TEXT,
        data: "我找不到了",
        time: "2021-01-02 21:21",
        user: {
          id: "1",
          avatar: "../../../assets/img/icon/head-image.jpg",
        },
      },
      {
        type: MESSAGE_TYPE.TEXT,
        data: "我也找不到了我也找不到了我也找不到了我也找不到了我也找不到了我也找不到了我也找不到了我也找不到了",
        time: "2021-01-02 21:21",
        user: {
          id: "93864497380",
          avatar: "../../../assets/img/icon/head-image.jpg",
        },
      },
      {
        type: MESSAGE_TYPE.TEXT,
        data: "我找不到了",
        time: "2021-01-02 21:21",
        user: {
          id: "1",
          avatar: "../../../assets/img/icon/head-image.jpg",
        },
      },
    ]);
    return {
      back,
      messages,
    };
  },
};
</script>
<style lang="scss" scoped>
.chat-container {
  background: #fff;
  .chat-header {
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
  .chat-content-wrapper {
    position: fixed;
    width: 100%;
    top: 51rem;
    bottom: 0;
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
