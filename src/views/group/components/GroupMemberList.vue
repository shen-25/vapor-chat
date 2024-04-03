<template>
  <div class="group-member-list">
    <div class="header">
      <div class="left" @click="goBack">
        <i class="icon-back"></i>
      </div>
      <div class="middle">{{ getTitle() }}</div>
      <div class="right" @click="onFinishBtn">
        <div class="finish-btn" v-if="type != 4">完成</div>
      </div>
    </div>
    <van-checkbox-group v-model="checkedGroupMember">
      <van-cell-group inset>
        <van-cell
          v-for="(item, index) in groupMemberList"
          clickable
          :key="item"
          @click="toggle(item, index)"
          class="cell"
        >
          <template #title>
            <div class="cell-left">
              <img class="avatar-img" :src="item.avatar" alt="" />
              <span class="name">{{ item.nickname }}</span>
            </div>
          </template>
          <template #right-icon v-if="type != 4">
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
</template>

<script>
import { useUserStore } from "@/store/user";
import { APP_ID } from "@/config/setting";
import { ref, onBeforeUpdate } from "vue";
import { cloneDeep } from "lodash-es";
import { showConfirmDialog } from "vant";
import { transferGroupApi } from "@/api/group/group";
import WebToolkit from "@/im/utils/web-tool-kit";
import { getClientType } from "@/utils/client-type";
import { deleteGroupMemberApi, updateGroupMemberApi } from "@/api/group/member";
export default {
  props: {
    type: {
      type: Number,
      default: 1,
    },
    data: {
      type: Array,
      default: [],
    },
    groupId: {
      type: String,
    },
  },
  emits: ["close"],
  setup(props, { emit }) {
    const userStore = useUserStore();
    const checkedGroupMember = ref([]);
    const checkboxRefs = ref([]);
    const groupMemberList = ref([]);

    props.data.forEach((e) => {
      const userId = userStore.getUserId();
      if (userId != e.memberId) {
        groupMemberList.value.push(cloneDeep(e));
      }
    });
    async function toggle(member, index) {
      if (props.type == 4) {
        // 代表的是选择新群主
        await transferGroupDialog(member);
        return;
      }
      checkboxRefs.value[index].toggle();
    }

    onBeforeUpdate(() => {
      checkboxRefs.value = [];
    });
    function getTitle() {
      if (props.type == 1) {
        return "群内禁言";
      } else if (props.type == 2) {
        return "添加管理员";
      } else if (props.type == 3) {
        return "移除群成员";
      } else if (props.type == 4) {
        return "选择新群主";
      }
    }
    async function transferGroupDialog(member) {
      showConfirmDialog({
        message: `确定选择${member.nickname}为新群主,你将自动放弃群主身份`,
      })
        .then(async () => {
          // on confirm
          await transferGroup(member);
        })
        .catch(() => {
          // on cancel
        });
    }
    async function transferGroup(member) {
      const imei = WebToolkit.getDeviceInfo().system;
      const param = {
        groupId: props.groupId,
        appId: APP_ID,
        operator: userStore.getUserId(),
        ownerId: member.memberId,
        clientType: getClientType(imei),
        imei,
      };
      const { msg, code, data } = transferGroupApi(param);
      if (code == 0) {
        emit("close", true);
      }
    }
    async function deleteGroupMember() {
      const memberIdList = [];
      checkedGroupMember.value.forEach((e) => {
        memberIdList.push(e.memberId);
      });
      const imei = WebToolkit.getDeviceInfo().system;
      const param = {
        groupId: props.groupId,
        appId: APP_ID,
        operator: userStore.getUserId(),
        clientType: getClientType(imei),
        imei,
        memberIdList,
      };
      const { msg, code, data } = await deleteGroupMemberApi(param);
      if (code == 0) {
        emit("close", true);
        checkedGroupMember.value = [];
        checkboxRefs.value = [];
      }
    }
    async function updateGroupMemberToManager() {
      const memberIdList = [];
      checkedGroupMember.value.forEach((e) => {
        memberIdList.push(e.memberId);
      });
      console.log(memberIdList);
      const imei = WebToolkit.getDeviceInfo().system;
      const clientType = getClientType(imei);
      for (let i = 0; i < memberIdList.length; i++) {
        // 设置为管理员
        const param = {
          groupId: props.groupId,
          appId: APP_ID,
          operator: userStore.getUserId(),
          clientType,
          imei,
          memberId: memberIdList[i],
          role: 1,
        };
        const { msg, code, data } = await updateGroupMemberApi(param);
      }
      checkedGroupMember.value = [];
      checkboxRefs.value = [];
      emit("close", true);
    }

    function onFinishBtn() {
      if (props.type == 3) {
        deleteGroupMember();
      } else if (props.type == 2) {
        updateGroupMemberToManager();
      }
    }
    function goBack() {
      emit("close", false);
    }
    return {
      checkedGroupMember,
      checkboxRefs,
      groupMemberList,
      toggle,
      getTitle,
      goBack,
      onFinishBtn,
    };
  },
};
</script>

<style lang="scss" scoped>
.group-member-list {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 20000;
  background: #fff;
  .header {
    height: 50rem;
    padding: 0 10rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ebebec;
    background-color: #fff;
    .left {
      padding: 10rem 10rem;
      display: flex;
      .icon-back {
        font-size: 24rem;
      }
    }
    .middle {
      font-size: 16rem;
    }
    .right {
      padding: 10rem 10rem;
      display: flex;
      .finish-btn {
        width: 61rem;
        height: 32rem;
        line-height: 32rem;
        text-align: center;
        background-color: red;
        border-radius: 10rem;
        color: #fff;
        font-size: 16rem;
      }
    }
  }
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
}
</style>
