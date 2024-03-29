<template>
  <div
    class="chat-message-container"
    :class="!isMe ? 'left' : 'right'"
    :style="message.type === MESSAGE_TYPE.TIME && 'margin-bottom: 0;'"
  >
    <div class="time" v-if="message.type === MESSAGE_TYPE.TIME">
      {{ message.messageTime }}
    </div>
    <template v-else>
      <img v-if="!isMe" :src="message.user.avatar" alt="" class="avatar" />
      <div class="chat-wrapper">
        <div class="chat-text" v-if="message.type === MESSAGE_TYPE.TEXT">
          {{ message.data }}
        </div>
      </div>
      <img v-if="isMe" :src="message.user.avatar" alt="" class="avatar" />
    </template>
  </div>
</template>
<script>
import { MESSAGE_TYPE, CALL_STATE } from "./use-chat.js";
import { useUserStore } from "@/store/user";
import { mapStores } from "pinia";

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
    };
  },
  computed: {
    isMe() {
      return this.userStore.getUserId() === this.message.user.userId;
    },
    ...mapStores(useUserStore),
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
      height: 38rem;
      width: 38rem;
      border-radius: 10rem;
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
      height: 38rem;
      width: 38rem;
      border-radius: 10rem;
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
