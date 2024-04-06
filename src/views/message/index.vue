<template>
  <div>
    <div class="header">
      <div class="left"></div>
      <div class="text">消息</div>
      <div class="popover">
        <van-popover
          v-model:show="showPopover"
          :actions="actions"
          @select="onAddSelect"
          placement="bottom-end"
        >
          <template #reference>
            <i class="icon-add"></i>
          </template>
        </van-popover>
      </div>
    </div>
    <div class="message-container">
      <Scroll class="message-content">
        <div>
          <div class="notice-wrapper">
            <div
              class="notice"
              v-for="(item, index) in conversationList"
              :key="index"
              @click="onChat(item.toId, item.type)"
            >
              <div class="avatar">
                <img :src="item.avatar" alt="" class="head-image" />
              </div>
              <div class="content">
                <div class="left">
                  <div class="name">
                    <span>{{ item.name }}</span>
                  </div>
                  <div class="detail">
                    <div class="title">
                      协议修订通知协议修订通知协议修订通知协议修订通知协议修订通知
                    </div>
                  </div>
                </div>
                <div class="right">
                  <div class="time">03-19</div>
                  <div class="icon">3</div>
                </div>
              </div>
            </div>
          </div>
          <div class="white-space">暂时没有更多了</div>
        </div>
      </Scroll>
    </div>
    <Footer />
    <router-view />
  </div>
</template>

<script>
import Footer from "@/components/footer/Footer.vue";
import BaseHeader from "@/components/base/back/BaseHeader.vue";
import Scroll from "@/components/base/scroll/Scroll";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/user";
import { APP_ID, ConversationTypeEnum } from "@/config/setting";
import { getConversationApi } from "@/api/conversation/index";
export default {
  components: {
    Footer,
    BaseHeader,
    Scroll,
  },
  setup() {
    const userStore = useUserStore();
    const router = useRouter();

    const conversationList = ref([]);

    function onChat(toId, type) {
      if (type == ConversationTypeEnum.p2p)
        router.push({ path: `/message/${toId}` });
      if (type == ConversationTypeEnum.group) {
        router.push({ path: `/group/list/${toId}` });
      }
    }
    async function getConversation() {
      const param = {
        appId: APP_ID,
        fromId: userStore.getUserId(),
      };
      try {
        const { code, msg, data } = await getConversationApi(param);
        if (code !== 0) {
          return;
        }
        conversationList.value = data;
      } catch (e) {
      } finally {
      }
    }

    const showPopover = ref(false);

    // 通过 actions 属性来定义菜单选项
    const actions = [
      { text: "发起群聊", icon: "chat-o" },
      { text: "加好友/群", icon: "add-o" },
    ];
    function onAddSelect(action) {
      if (action.text == "发起群聊") {
        router.push("/group/add");
      } else {
        router.push("/friend/find");
      }
    }
    getConversation();

    return { conversationList, onChat, actions, onAddSelect, showPopover };
  },
};
</script>

<style lang="scss" scoped>
.header {
  height: 48rem;
  border-bottom: 0.4px solid #e7e4e4;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0rem 20rem;
  .popover {
    .icon-add {
      font-size: 24rem;
    }
  }
  .text {
    font-size: 16rem;
  }
  .left {
  }
}
.message-container {
  position: fixed;
  background: #fff;
  width: 100%;
  top: 48rem;
  bottom: 45rem;
  z-index: 10;
  .message-content {
    height: 100%;
    overflow: hidden;
    .friend-wrapper {
      margin-top: 10rem;
      white-space: nowrap;
      display: flex;
      font-size: 14rem;
      .friend-container {
        display: inline-block;
        font-size: 14rem;
        .friend-item {
          display: inline-block;
          text-align: center;
          padding: 0 10rem;
          .friend-avatar {
            width: 64rem;
            height: 64rem;
            border-radius: 50%;
          }
        }
      }
    }
    .notice-wrapper {
      display: flex;
      flex-direction: column;
      margin-top: 14rem;
      .notice {
        display: flex;
        align-items: center;
        height: 60rem;
        padding-left: 10rem;
        align-items: center;
        margin-bottom: 10rem;
        &.top {
          background: #353a4f;
        }
        &:active {
          background: rgb(211, 203, 203);
        }
        .avatar {
          padding-right: 8rem;
          .head-image {
            width: 50rem;
            height: 50rem;
            border-radius: 50%;
          }
        }
        .content {
          flex: 1;
          display: flex;
          justify-content: space-between;
          .left {
            display: flex;
            flex-direction: column;
            .name {
              color: #000;
              font-size: 16rem;
              display: flex;
              align-items: flex-start;
              .tag {
                margin-left: 5rem;
                font-size: 10rem;
                background: rgba(148, 148, 154, 0.4);
                color: #595963;
                padding: 2rem 5rem;
                border-radius: 2rem;
              }
            }
            .detail {
              font-size: 13rem;
              padding-top: 10rem;
              display: flex;
              align-items: center;
              color: rgba(51, 51, 51, 0.6);
              .title {
                width: 60vw;
                @include no-wrap();
              }
            }
          }
          .right {
            display: flex;
            flex-direction: column;
            align-items: center;
            height: 40rem;
            margin-right: 8rem;
            .time {
              font-size: 13rem;
              padding-bottom: 6rem;
            }
            .icon {
              height: 22rem;
              width: 22rem;
              line-height: 22rem;
              border-radius: 50%;
              background: red;
              font-size: 14rem;
              text-align: center;
            }
          }
        }
      }
    }

    .white-space {
      font-size: 12rem;
      color: #ccc;
      text-align: center;
      height: 16rem;
      padding: 8rem 0rem 40rem 0rem;
    }
  }
}
</style>
