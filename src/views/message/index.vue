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
          <Scroll :scrollX="true" :scrollY="false" class="friend-wrapper"
            ><div class="friend-container">
              <div
                class="friend-item"
                v-for="(item, index) in friendshipList"
                :key="index"
                @click="onChat(item.toId)"
              >
                <div class="avatar" :class="index % 2 === 0 ? 'on-line' : ''">
                  <img :src="item.avatar" alt="" class="friend-avatar" />
                </div>
                <span>{{ item.remark }}</span>
              </div>
            </div></Scroll
          >
          <div class="notice-wrapper">
            <div class="notice">
              <div class="avatar">
                <img
                  src="../../assets/images/icon/msg-icon1.png"
                  class="head-image"
                />
              </div>
              <div class="content">
                <div class="left">
                  <div class="name">
                    <span>新朋友</span>
                  </div>
                  <div class="detail">xxx 关注了你</div>
                </div>
                <div class="right"><i class="icon-right-back"></i></div>
              </div>
            </div>
            <div class="notice">
              <div class="avatar">
                <img
                  src="../../assets/images/icon/msg-icon4.png"
                  alt=""
                  class="head-image"
                />
              </div>
              <div class="content">
                <div class="left">
                  <div class="name">
                    <span>系统通知</span>
                    <span class="tag">官方</span>
                  </div>
                  <div class="detail">
                    <div class="title">
                      协议修订通知协议修订通知协议修订通知协议修订通知协议修订通知
                    </div>
                    <div class="point"></div>
                    08-31
                  </div>
                </div>
                <div class="right">
                  <div class="not-read"></div>
                </div>
              </div>
            </div>
            <div class="white-space">暂时没有更多了</div>
          </div>
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
import { getAllFriendshipApi } from "@/api/friendship.js";
import { useUserStore } from "@/store/user";
import { APP_ID } from "@/config/setting";
export default {
  components: {
    Footer,
    BaseHeader,
    Scroll,
  },
  setup() {
    const userStore = useUserStore();

    const friendshipList = ref([]);
    const router = useRouter();

    function onChat(friendId) {
      router.push({ path: `/message/${friendId}` });
    }
    async function getAllFriendShip() {
      const friendParam = {
        fromId: userStore.getUserId(),
        appId: APP_ID,
      };
      try {
        const { code, msg, data } = await getAllFriendshipApi(friendParam);
        if (code !== 0) {
          return;
        }
        // 修改页码和数据总条数、表格赋值
        friendshipList.value = data;
      } catch (e) {
      } finally {
      }
    }
    getAllFriendShip();

    const showPopover = ref(false);

    // 通过 actions 属性来定义菜单选项
    const actions = [
      { text: "发起群聊", icon: "chat-o" },
      { text: "添加朋友", icon: "add-o" },
    ];
    function onAddSelect(action) {
      if (action.text == "发起群聊") {
        router.push("/group/add");
      } else {
      }
    }

    return { friendshipList, onChat, actions, onAddSelect, showPopover };
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
      margin-top: 10rem;
      .notice {
        display: flex;
        align-items: center;
        &.top {
          background: #353a4f;
        }
        &:active {
          background: rgb(211, 203, 203);
        }
        .avatar {
          position: relative;
          .head-image {
            margin-left: 20rem;
            margin-right: 15rem;
            width: 45rem;
            height: 45rem;
            border-radius: 50%;
          }
        }
        .content {
          flex: 1;
          display: flex;
          justify-content: space-between;
          padding: 14rem 0 14rem 0;
          .left {
            .name {
              font-size: 14rem;
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
              font-size: 12rem;
              margin-top: 4rem;
              display: flex;
              align-items: center;

              .title {
                width: 194rem;
                @include no-wrap();
              }
              .point {
                display: inline-block;
                margin-left: 8rem;
                margin-right: 8rem;
                border-radius: 50%;
                width: 1.5px;
                height: 1.5px;
              }
            }
          }
          .right {
            margin-right: 20rem;
            display: flex;
            align-items: center;
            .icon-right-back {
              font-size: 20rem;
            }
            .not-read {
              margin-right: 10rem;
              width: 7rem;
              height: 7rem;
              border-radius: 50%;
              background: red;
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
