<template>
  <div class="add-group-container">
    <div class="header">
      <div class="left" @click="cancel">取消</div>
      <div class="middle">分享至</div>
      <div class="right"></div>
    </div>
    <div class="content">
      <van-checkbox-group v-model="checkedShareRef">
        <van-cell-group inset>
          <van-cell
            v-for="(item, index) in friendList"
            clickable
            :key="item"
            @click="toggle(index)"
            class="cell"
          >
            <template #title>
              <div class="cell-left">
                <img class="avatar-img" :src="item.avatar" alt="" />
                <span class="name">{{ item.remark }}</span>
              </div>
            </template>
            <template #right-icon>
              <van-checkbox
                :name="item"
                :ref="(el) => (checkboxRefs[index] = el)"
                @click.stop
              ></van-checkbox>
            </template>
          </van-cell>
        </van-cell-group>
      </van-checkbox-group>
    </div>
    <div class="footer">
      <div class="create" @click="onShareBtn">
        <div class="note">发送</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onBeforeUpdate, inject } from "vue";
import { getAllFriendshipApi } from "@/api/friendship/friendship";
import { useUserStore } from "@/store/user";
import { APP_ID } from "@/config/setting";
import { useRouter } from "vue-router";
import { MESSAGE_TYPE } from "@/views/message/chat/use-chat";
export default {
  props: {
    workDetail: {
      type: Object,
    },
  },
  components: {},
  emits: ["cancel", "confirm"],
  setup(props, { emit }) {
    const userStore = useUserStore();

    const checkedShareRef = ref([]);
    const checkboxRefs = ref([]);
    const friendList = ref([]);

    const router = useRouter();

    const toggle = (index) => {
      checkboxRefs.value[index].toggle();
    };

    onBeforeUpdate(() => {
      checkboxRefs.value = [];
    });

    async function getAllFriendship() {
      const friendParam = {
        fromId: userStore.getUserId(),
        appId: APP_ID,
      };
      try {
        const { code, msg, data } = await getAllFriendshipApi(friendParam);
        if (code !== 0) {
          return;
        }
        // 赋值
        friendList.value = data;
      } catch (e) {
      } finally {
      }
    }
    const imSdk = inject("$imSdk");

    async function onSendSharePostMessage(toId) {
      console.log(props.workDetail);
      const postWork = {
        postId: props.workDetail.postId,
        title: props.workDetail.title,
        coverUrl: props.workDetail.coverUrl,
        type: props.workDetail.type,
        userId: props.workDetail.userId,
        nickname: props.workDetail.nickname,
        avatar: props.workDetail.avatar,
      };
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
    function onShareBtn() {
      checkedShareRef.value.forEach((e) => {
        onSendSharePostMessage(e.toId);
      });
      emit("confirm");
    }
    function cancel() {
      emit("cancel");
    }

    getAllFriendship();
    return {
      toggle,
      checkedShareRef,
      checkboxRefs,
      friendList,
      onShareBtn,
      cancel,
    };
  },
};
</script>

<style lang="scss" scoped>
.add-group-container {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #fff;
  font-size: 16rem;
  z-index: 200;
  .cell-left {
    display: flex;
    align-items: center;
    .avatar-img {
      height: 40rem;
      width: 40rem;
      border-radius: 10rem;
    }
    .name {
      padding-left: 20rem;
      text-align: center;
      font-size: 16rem;
    }
  }
  .van-cell {
    border-bottom: 1px #ccc solid;
  }

  .header {
    height: 48rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 16rem 4rem 16rem;
    .left {
      font-size: 16rem;
    }
    .middle {
      font-size: 17rem;
    }
  }
  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    .create {
      height: 38rem;
      line-height: 38rem;
      margin: 8rem 28rem 12rem 28rem;
      background: red;
      border-radius: 10rem;
      text-align: center;
      .note {
        font-size: 16rem;
        color: #fff;
      }
    }
  }
}
</style>
