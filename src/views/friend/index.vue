<template>
  <div class="friend-container">
    <div class="header">
      <div class="text">通讯录</div>
      <div class="icon">
        <div class="search">
          <i class="icon-back"></i>
        </div>
        <div class="add">
          <i class="icon-location"></i>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="item">
        <img class="avatar" src="../../assets/images/群聊.jpg" />
        <span class="name">新的朋友</span>
      </div>
      <div class="item" @click="onGroupDiv">
        <img class="avatar" src="../../assets/images/群聊.jpg" />
        <span class="name">群聊</span>
      </div>
      <IndexList
        :data="friendListAndPinyin"
        :totalFriends="totalFriends"
        @select="selectFriend"
      />
    </div>
    <Footer />
    <router-view> </router-view>
  </div>
</template>

<script>
import { ref, onCreated } from "vue";
import Footer from "@/components/footer/Footer.vue";
import IndexList from "./index-list/index.vue";
import { getAllFriendshipNamePinyinApi } from "@/api/friendship";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/user";
import { APP_ID } from "@/config/setting";

export default {
  components: {
    Footer,
    IndexList,
  },
  setup() {
    const userStore = useUserStore();

    const router = useRouter();
    const friendListAndPinyin = ref([]);
    const totalFriends = ref(0);
    async function getAllFriendshipNamePinyin() {
      const friendParam = {
        fromId: userStore.getUserId(),
        appId: APP_ID,
      };
      try {
        const { code, msg, data } = await getAllFriendshipNamePinyinApi(
          friendParam
        );
        if (code !== 0) {
          return;
        }
        // 修改页码和数据总条数、表格赋值
        friendListAndPinyin.value = data.friends;
        totalFriends.value = data.total;
      } catch (e) {
      } finally {
      }
    }

    function onGroupDiv() {
      router.push("/group/list");
    }
    getAllFriendshipNamePinyin();

    return { friendListAndPinyin, totalFriends, onGroupDiv };
  },
};
</script>

<style lang="scss" scoped>
.friend-container {
  position: fixed;
  width: 100%;
  top: 0;
  bottom: 48rem;
  background: #fff;
  .header {
    position: relative;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 60rem;
    padding: 0rem 18rem;
    background: #fff;
    z-index: 4000;
    .text {
      display: flex;
      justify-content: flex-end;
      color: #000;
      font-weight: 540;
      font-size: 17rem;
    }
    .icon {
      width: 44%;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      font-size: 18rem;
      .icon-back {
        font-size: 24rem;
      }
      .icon-location {
        font-size: 24rem;
        margin-left: 18rem;
      }
    }
  }
  .content {
    position: fixed;
    width: 100%;
    top: 60rem;
    bottom: 48rem;
    background: #fff;
    .item {
      display: flex;
      align-items: center;
      padding: 8rem 0 8rem 30rem;
      border-bottom: 1px #ccc solid;
      .avatar {
        width: 40rem;
        height: 40rem;
        border-radius: 10rem;
      }
      .name {
        margin-left: 20rem;
        color: #000;
        font-size: 14rem;
      }
    }
  }
}
</style>
