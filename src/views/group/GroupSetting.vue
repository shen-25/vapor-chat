<template>
  <div class="group-setting-container">
    <div class="header">
      <div class="left" @click="goBack">
        <i class="icon-back"></i>
      </div>
      <div class="middle">群聊设置</div>
      <div class="right">
        <i class="icon-shengluehao"></i>
      </div>
    </div>
    <Scroll
      class="setting-content"
      :probe-type="3"
      @scroll="onScroll"
      ref="scrollRef"
    >
      <div>
        <div class="basic" @click="onBasicBtn">
          <div class="icon">
            <img :src="groupInfo.photo" />
          </div>
          <div class="text">
            <h2 class="name">{{ groupInfo.name }}</h2>
            <p class="introduce">
              {{ getGroupIntroduce(groupInfo.introduction) }}
            </p>
          </div>
          <div class="right">
            <i class="icon-right-back"></i>
          </div>
        </div>
        <div class="block">
          <div class="item">
            <div class="content">
              <div class="icon">
                <i class="icon-add"></i>
              </div>
              <div class="text">邀请朋友</div>
            </div>
          </div>

          <div class="item">
            <div class="content">
              <div class="icon">
                <i class="icon-share"></i>
              </div>
              <div class="text">分享群聊</div>
            </div>
          </div>
          <div class="item">
            <div class="content">
              <div class="icon">
                <i class="icon-shengluehao"></i>
              </div>
              <div class="text">设置群昵称</div>
            </div>
          </div>
        </div>
        <div class="management">
          <van-cell
            title="群公告"
            is-link
            class="cell"
            @click="onGroupNoticeBtn"
          />
          <van-cell
            title="群管理"
            is-link
            class="cell"
            @click="onShowManagerBtn"
          />
        </div>
        <div class="navigation">
          <Indicator
            :tabTexts="tabTexts"
            v-model:currentTabIndex="currentTabIndex"
          >
          </Indicator>
          <Preview v-if="currentTabIndex === 2"></Preview>
          <GroupMember
            v-if="currentTabIndex == 0"
            :data="groupMemberList"
          ></GroupMember>
        </div></div
    ></Scroll>
    <Indicator
      :class="tabCls"
      v-if="showFixedIndicator"
      :tabTexts="tabTexts"
      v-model:currentTabIndex="currentTabIndex"
    >
    </Indicator>
    <EditGroup
      v-if="showEditBasicGroup"
      :data="groupInfo"
      @toggle="editGroupToggle"
    ></EditGroup>
    <EditGroupNotice
      v-if="showEditNoticeGroup"
      :data="groupInfo"
      @toggle="editGroupNoticeToggle"
    ></EditGroupNotice>
  </div>
</template>

<script>
import Scroll from "@/components/base/scroll/Scroll.vue";
import Indicator from "@/components/slide/Indicator";
import Preview from "@/components/preview/index.vue";
import { getGroupInfoApi } from "@/api/group/group";
import { ref, computed, watch } from "vue";
import { useRouter } from "vue-router";
import { APP_ID } from "@/config/setting";
import { useUserStore } from "@/store/user";
import GroupMember from "./components/GroupMember.vue";
import EditGroup from "./components/EditGroup.vue";
import EditGroupNotice from "./components/EditGroupNotice.vue";

export default {
  name: "groupSetting",

  components: {
    Scroll,
    Indicator,
    Preview,
    GroupMember,
    EditGroup,
    EditGroupNotice,
  },
  setup() {
    const router = useRouter();
    const userStore = useUserStore();

    const scrollRef = ref(null);
    const scrollY = ref(0);

    const showFixedIndicator = ref(false);
    const currentTabIndex = ref(0);

    const shareList = ref([]);
    const groupMemberList = ref([]);
    const pictureList = ref([]);

    const showEditBasicGroup = ref(false);

    const showEditNoticeGroup = ref(false);

    const groupInfo = ref({});

    const tabTexts = [
      {
        name: "群成员",
      },
      {
        name: "聊天相册",
      },

      {
        name: "分享内容",
      },
    ];
    watch(currentTabIndex, () => {});

    const tabCls = computed(() => {
      return showFixedIndicator.value ? "tabCls" : "";
    });

    async function getGroupInfo() {
      const param = {
        appId: APP_ID,
        userId: userStore.getUserId(),
        groupId: router.currentRoute.value.params.id,
      };
      const { msg, data, code } = await getGroupInfoApi(param);
      if (code == 0) {
        groupInfo.value = data;
        groupMemberList.value = data.memberList;
      }
    }

    function onScroll(pos) {
      scrollY.value = -pos.y;
      if (scrollY.value >= 334) {
        showFixedIndicator.value = true;
      } else {
        showFixedIndicator.value = false;
      }
    }
    function onBasicBtn() {
      showEditBasicGroup.value = true;
    }
    function goBack() {
      router.back();
    }

    function getGroupIntroduce(introduce) {
      if (introduce == "" || introduce == undefined || introduce == null) {
        return "群主很懒，还没有群介绍哦~";
      } else {
        return introduce;
      }
    }
    function editGroupToggle(isUpdated, updated) {
      if (isUpdated) {
        groupInfo.value.photo = updated.photo;
        groupInfo.value.name = updated.name;
        groupInfo.value.introduction = updated.introduction;
        showEditBasicGroup.value = false;
      } else {
        showEditBasicGroup.value = !showEditBasicGroup.value;
      }
    }

    function onGroupNoticeBtn() {
      showEditNoticeGroup.value = true;
    }
    function editGroupNoticeToggle(updateNotice) {
      if (updateNotice) {
        // 走重新获取逻辑
        showEditNoticeGroup.value = false;
        groupInfo.value.notice = updateNotice;
      } else {
        showEditNoticeGroup.value = !showEditNoticeGroup.value;
      }
    }
    function onShowManagerBtn() {
      router.push(`/group/manager/${groupInfo.value.groupId}`);
    }

    getGroupInfo();
    return {
      goBack,
      tabTexts,
      currentTabIndex,
      scrollRef,
      onScroll,
      tabCls,
      showFixedIndicator,
      currentTabIndex,
      tabTexts,
      groupInfo,
      groupMemberList,
      onBasicBtn,
      showEditBasicGroup,
      getGroupIntroduce,
      editGroupToggle,
      editGroupNoticeToggle,
      showEditNoticeGroup,
      onGroupNoticeBtn,
      onShowManagerBtn,
    };
  },
};
</script>

<style lang="scss" scoped>
.tabCls {
  position: fixed;
  top: 50rem;
  left: 0;
  width: 100%;
  background: #fff;
  z-index: 900;
}
.group-setting-container {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  z-index: 600;
  .setting-content {
    height: 100%;
    background: #f2f2f4;
    overflow: hidden;
  }
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
      .icon-shengluehao {
        font-size: 26rem;
      }
    }
  }
  .basic {
    height: 58rem;
    background: #fff;
    border-radius: 10rem;
    display: flex;
    align-items: center;
    margin: 0rem 12rem 10rem 12rem;

    img {
      padding-left: 10rem;
      width: 40rem;
      height: 40rem;
      border-radius: 8rem;
    }
    .text {
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex: 1;
      line-height: 20px;
      overflow: hidden;
      padding-left: 18rem;
      .name {
        font-size: 16rem;
      }
      .introduce {
        font-size: 13rem;
        color: #ccc;
      }
    }
    .right {
      padding: 10rem;
      .icon-right-back {
        font-size: 26rem;
      }
    }
  }
  .block {
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 64rem;
    margin: 18rem 12rem;
    .item {
      height: 100%;
      width: 22.6%;
      border-radius: 8rem;
      background: #fff;
      .content {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        padding-bottom: 6rem;
        .icon {
          .icon-shengluehao {
            font-size: 20rem;
          }
          .icon-share {
            font-size: 21rem;
          }
          .icon-add {
            font-size: 21rem;
          }
        }
        .text {
          font-size: 13rem;
        }
      }
    }
  }
  .management {
    display: flex;
    flex-direction: column;
    height: 100rem;
    margin: 8rem 12rem;
    background: #fff;
    border-radius: 10rem;
    .cell {
      height: 50rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
  .navigation {
    min-height: 100vh;
    background: #fff;
  }
}
</style>
