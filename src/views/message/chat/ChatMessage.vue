<template>
  <div
    class="chat-message-container"
    :class="!isMe ? 'left' : 'right'"
    :style="message.type === MESSAGE_TYPE.TIME && 'margin-bottom: 0;'"
  >
    <div class="time" v-if="message.type === MESSAGE_TYPE.TIME">
      {{ message.time }}
    </div>
    <template v-else>
      <img
        v-if="!isMe"
        src="../../../assets/images/icon/avatar/3.png"
        alt=""
        class="avatar"
      />
      <div class="chat-wrapper">
        <div class="chat-text" v-if="message.type === MESSAGE_TYPE.TEXT">
          {{ message.data }}
        </div>
      </div>
      <img
        v-if="isMe"
        src="../../../assets/images/icon/avatar/2.png"
        alt=""
        class="avatar"
      />
    </template>
  </div>
</template>
<script>
let CALL_STATE = {
  REJECT: 0,
  RESOLVE: 1,
  NONE: 2,
};

let RED_PACKET_MODE = {
  SINGLE: 1,
  MULTIPLE: 2,
};
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
export default {
  name: "ChatMessage",
  props: {
    message: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      MESSAGE_TYPE,
      CALL_STATE,
      RED_PACKET_MODE,
    };
  },
  computed: {
    isMe() {
      return Math.random() * 10 > 5;
    },
  },
  created() {},
  methods: {},
};
</script>

<style scoped lang="scss">
.chat-message-container {
  padding: 0 10rem;
  margin-bottom: 20rem;
  display: flex;
  $chat-bg-right-color: rgb(41, 140, 255);
  $chat-bg-left-color: rgba(231, 231, 236, 0.4);
  font-size: 15rem;
  line-height: 21rem;
  &.right {
    justify-content: flex-end;
    word-break: break-all;
    .avatar {
      margin-left: 10rem;
      height: 36rem;
      border-radius: 50%;
    }

    .audio-icon {
      margin-left: 50rem;
    }

    .chat-text,
    .call,
    .audio {
      background-color: $chat-bg-right-color;
      color: #fff;
    }
  }

  &.left {
    justify-content: flex-start;

    .avatar {
      margin-right: 10rem;
      height: 36rem;
      border-radius: 50%;
    }

    .audio-icon {
      margin-right: 50rem;
    }

    .chat-text,
    .call,
    .audio {
      background: $chat-bg-left-color;
      color: rgba(13, 14, 20, 0.75);
    }
  }
  .time {
    width: 100%;
    text-align: center;
    height: 40rem;
    line-height: 40rem;
    font-size: 12rem;
  }
  .chat-wrapper {
    .chat-text {
      max-width: 60vw;
      padding: 10rem;
      display: flex;
      align-items: center;
      font-size: 14rem;
      border-radius: 10rem;
    }

    .loves {
      margin-top: 10rem;

      img {
        width: 16rem;
        height: 16rem;
        border-radius: 50%;
        margin-right: 5rem;
      }
    }
  }
}
</style>
