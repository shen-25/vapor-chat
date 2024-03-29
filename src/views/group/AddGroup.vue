<template>
  <div class="add-group-container">
    <div class="header">
      <div class="left">
        <i class="icon-back"></i>
      </div>
      <div class="middle">发起群聊</div>
      <div class="right"></div>
    </div>
    <div class="content">
      <van-checkbox-group v-model="checkedFriendRef">
        <van-cell-group inset>
          <van-cell
            v-for="(item, index) in friendListRef"
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
      <div class="create" @click="onAddGroupBtn">
        <div class="note">发起群聊</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onBeforeUpdate } from "vue";
import IndexList from "@/views/friend/index-list/index.vue";
import { getAllFriendshipApi } from "@/api/friendship";
import { useUserStore } from "@/store/user";
import { APP_ID } from "@/config/setting";
import { addGroupApi } from "@/api/group/group";
import { useRouter } from "vue-router";
export default {
  components: { IndexList },
  setup() {
    const userStore = useUserStore();

    const checkedFriendRef = ref([]);
    const checkboxRefs = ref([]);
    const friendListRef = ref([]);

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
        friendListRef.value = data;
      } catch (e) {
      } finally {
      }
    }

    function onAddGroupBtn() {
      const memberList = [];
      checkedFriendRef.value.forEach((e) => {
        const dto = {
          appId: APP_ID,
          memberId: e.toId,
          role: 0,
          joinType: "群主发起",
          nickname: e.nickname,
        };
        memberList.push(dto);
      });
      console.log(memberList);
      const req = {
        ownerId: userStore.getUserId(),
        // 公开群
        type: 2,
        muteFlag: 0,
        applyJoinType: 0,
        appId: APP_ID,
        memberList: memberList,
        ownerName: userStore.getUserId(),
      };
      addGroup(req);
    }
    async function addGroup(req) {
      const { msg, data, code } = await addGroupApi(req);
      if (code == 0) {
        router.push("/message");
        checkboxRefs.value = [];
        checkedFriendRef.value = [];
      }
    }

    getAllFriendship();
    return {
      toggle,
      checkedFriendRef,
      checkboxRefs,
      friendListRef,
      onAddGroupBtn,
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
  font-size: 20rem;
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
      font-size: 22rem;
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
