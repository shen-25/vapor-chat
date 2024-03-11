<template>
  <div class="message-container">
    <BaseHeader class="base-header-bottom">
      <template v-slot:center>
        <span class="f16">消息</span>
      </template>
      <template v-slot:right>
        <span class="f14" @click="createChatDialog = true">创建群聊</span>
      </template>
    </BaseHeader>
    <Scroll class="message-content">
      <div>
        <Scroll :scrollX="true" :scrollY="false" class="friend-wrapper"
          ><div class="friend-container">
            <div
              class="friend-item"
              v-for="(item, index) in friends"
              :key="index"
            >
              <div class="avatar" :class="index % 2 === 0 ? 'on-line' : ''">
                <img
                  src="../../assets/images/icon/avatar/0.png"
                  alt=""
                  class="friend-avatar"
                />
              </div>
              <span>完美世界</span>
            </div>
            <div class="friend-item">
              <div class="avatar">
                <img
                  src="../../assets/images/icon/message/setting.png"
                  alt=""
                  class="friend-avatar"
                />
              </div>
              <span>状态设置</span>
            </div>
          </div></Scroll
        >
      </div>
    </Scroll>
  </div>
  <Footer />
</template>

<script>
import Footer from "@/components/footer/Footer.vue";
import BaseHeader from "@/components/base/BaseHeader.vue";
import Scroll from "@/components/base/scroll/Scroll";
import { ref } from "vue";
export default {
  components: {
    Footer,
    BaseHeader,
    Scroll,
  },
  setup() {
    const friends = ref([0, 1, 2, 3, 4, 4, 5, 6, 3, 34, 4]);
    return { friends };
  },
};
</script>

<style lang="scss" scoped>
.message-container {
  position: fixed;
  background: #fff;
  width: 100%;
  top: 50rem;
  bottom: 45rem;
  z-index: 10;
  .base-header-bottom {
    border-bottom: 0.4px solid #e7e4e4;
  }
  .message-content {
    height: 100%;
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
  }
}
</style>
