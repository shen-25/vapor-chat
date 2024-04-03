<template>
  <div class="group-manger-container">
    <div class="header">
      <div class="left" @click="goBack">
        <i class="icon-back"></i>
      </div>
      <div class="middle">群管理</div>
      <div class="right">
        <i class="icon-share"></i>
      </div>
    </div>
    <div class="content">
      <div class="item" @click="onGroupApplyBtn">
        <div class="left">进群审批</div>
        <div class="right">
          <van-switch v-model="applyJoinType" @click.stop />
        </div>
      </div>
      <div class="item" @click="onMuteGroupBtn">
        <div class="left">群内禁言</div>
        <div class="right"><i class="icon-right-back"></i></div>
      </div>
      <div class="item" @click="onSetMangerBtn">
        <div class="left">设置管理员</div>
        <div class="right"><i class="icon-right-back"></i></div>
      </div>
      <div class="item" @click="onRemoveGroupMemberBtn">
        <div class="left">移除群成员</div>
        <div class="right"><i class="icon-right-back"></i></div>
      </div>
      <div class="item" @click="onTransferBtn">
        <div class="left">群主管理权转让</div>
        <div class="right"><i class="icon-right-back"></i></div>
      </div>
      <div class="item delete-group" @click="onDeleteGroupBtn">
        <div class="left">解散群聊</div>
        <div class="right">
          <van-switch active-color="#ee0a24" inactive-color="#ee0a24" />
        </div>
      </div>
    </div>
    <div class="">
      <GroupMemberList
        v-if="showGroupMemberList"
        :data="groupMemberList"
        :type="groupMangerType"
        @close="onGroupMemberListClose"
        :groupId="groupId"
      />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import {
  deleteGroupGroupApi,
  updateBasicGroupApi,
  getGroupInfoApi,
} from "@/api/group/group";
import { APP_ID } from "@/config/setting";
import { showConfirmDialog } from "vant";
import { useUserStore } from "@/store/user";
import WebToolkit from "@/im/utils/web-tool-kit";
import { getClientType } from "@/utils/client-type";
import { cloneDeep } from "lodash-es";
import GroupMemberList from "./components/GroupMemberList";
import { useRouter } from "vue-router";

export default {
  name: "GroupManger",
  components: { GroupMemberList },
  setup(props, { emit }) {
    const router = useRouter();
    const showGroupMemberList = ref(false);
    const groupMemberList = ref([]);

    const groupId = ref(router.currentRoute.value.params.id);
    const removeMemberList = ref([]);
    const userStore = useUserStore();
    const managerList = ref([]);
    const groupMangerType = ref(1);
    const applyJoinType = ref(false);
    const muteFlag = ref(false);

    async function getGroupInfo() {
      const param = {
        appId: APP_ID,
        userId: userStore.getUserId(),
        groupId: groupId.value,
      };
      const { msg, data, code } = await getGroupInfoApi(param);
      if (code == 0) {
        groupMemberList.value = data.memberList;
        applyJoinType.value = data.applyJoinType == 1 ? true : false;
        muteFlag.value = data.muteFlag;
      }
    }

    async function deleteGroup() {
      const imei = WebToolkit.getDeviceInfo().system;
      const param = {
        appId: APP_ID,
        groupId: groupId.value,
        operator: userStore.getUserId(),
        clientType: getClientType(imei),
        imei,
      };
      const { code, msg, data } = await deleteGroupGroupApi(param);
      if (code == 0) {
        router.push("/message");
      }
    }
    async function updateGroupApply() {
      const imei = WebToolkit.getDeviceInfo().system;
      const param = {
        appId: APP_ID,
        userId: userStore.getUserId(),
        imei,
        clientType: getClientType(imei),
        groupId: groupId.value,
        applyJoinType: !applyJoinType.value ? 1 : 0,
      };
      const { msg, data, code } = await updateBasicGroupApi(param);
      if (code == 0) {
        applyJoinType.value = !applyJoinType.value;
      }
    }
    function onDeleteGroupBtn() {
      showConfirmDialog({
        title: "确认解散该群聊",
        message: "所有群成员将退出群聊,无法收发消息",
      })
        .then(async () => {
          // on confirm
          await deleteGroup();
        })
        .catch(() => {
          // on cancel
        });
    }
    function onGroupApplyBtn() {
      updateGroupApply();
    }

    function goBack() {
      router.back();
    }
    /**
     * 禁言
     */
    function onMuteGroupBtn() {
      groupMangerType.value = 1;
      showGroupMemberList.value = true;
    }
    /**
     * 设置管理员
     */
    function onSetMangerBtn() {
      groupMangerType.value = 2;

      showGroupMemberList.value = true;
    }
    /**
     * 移除群成员
     */
    function onRemoveGroupMemberBtn() {
      groupMangerType.value = 3;
      showGroupMemberList.value = true;
    }
    /**
     * 转移群主
     */
    function onTransferBtn() {
      groupMangerType.value = 4;
      showGroupMemberList.value = true;
    }
    function onGroupMemberListClose(val) {
      if (val) {
        getGroupInfo();
      }
      showGroupMemberList.value = false;
    }

    getGroupInfo();
    return {
      groupId,
      applyJoinType,
      muteFlag,
      managerList,
      removeMemberList,
      onDeleteGroupBtn,
      onGroupApplyBtn,
      goBack,
      onRemoveGroupMemberBtn,
      showGroupMemberList,
      groupMemberList,
      onMuteGroupBtn,
      groupMangerType,
      onTransferBtn,
      onSetMangerBtn,
      onGroupMemberListClose,
    };
  },
};
</script>
<style lang="scss" scoped>
.group-manger-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 600;
  background: #f2f2f4;
  .header {
    height: 50rem;
    padding: 0 16rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ebebec;
    background-color: #fff;
    font-size: 14rem;
    .left {
      display: flex;
      .icon-back {
        font-size: 22rem;
      }
    }
    .middle {
      color: #000;
      font-size: 16rem;
    }
    .right {
      .icon-share {
        font-size: 22rem;
      }
    }
  }
  .content {
    margin: 10rem 10rem;
    .item {
      height: 54rem;
      background: #fff;
      // border-radius: 10rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px #f3ecec solid;
      .left {
        padding: 10rem;
        font-size: 16rem;
      }
      .right {
        padding: 10rem;
        .icon-right-back {
          font-size: 26rem;
        }
      }
    }
    .delete-group {
      color: red;
    }
  }
}
</style>
