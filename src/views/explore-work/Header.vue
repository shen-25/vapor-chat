<template>
  <div class="explore-header-container">
    <div class="left">
      <div class="back" @click="onBack">
        <i class="icon-back"></i>
      </div>
      <div class="author">
        <div class="avatar">
          <img :src="headerData.avatar" alt="" />
        </div>
        <div class="name">{{ headerData.nickname }}</div>
      </div>
    </div>
    <div class="right">
      <div class="follow" @click="onFanBtn">
        <div class="text" :class="isFan ? ' text-fan' : ''" v-if="!isMe">
          关注
        </div>
      </div>
      <div class="share" @click="onShare">
        <i class="icon-share"></i>
      </div>
    </div>
    <van-share-sheet
      v-model:show="showShare"
      title="立即分享给好友"
      :options="options"
      @select="onSelect"
    />
    <ShareList
      @cancel="cancel"
      @confirm="confirm"
      v-if="showShareList"
      :workDetail="workDetail"
    />
  </div>
</template>
<script>
import ShareList from "./components/ShareList.vue";
import { addFanApi, deleteFanApi, getIsFanApi } from "@/api/interact/fan";
import WebToolkit from "@/im/utils/web-tool-kit";
import { getClientType } from "@/utils/client-type";
import { APP_ID } from "@/config/setting";
import { mapStores } from "pinia";
import { useUserStore } from "@/store/user";

export default {
  name: "ExploreBack",
  props: {
    headerData: {
      type: Object,
    },
    workDetail: {
      type: Object,
    },
  },
  components: { ShareList },
  data() {
    return {
      options: [
        { name: "私信好友", icon: "wechat" },
        { name: "微博", icon: "weibo" },
        { name: "复制链接", icon: "link" },
        { name: "分享海报", icon: "poster" },
        { name: "二维码", icon: "qrcode" },
      ],
      showShare: false,
      showShareList: false,
      isFan: false,
    };
  },
  mounted() {
    this.getIsFan();
  },
  computed: {
    ...mapStores(useUserStore),
  },
  methods: {
    onBack() {
      this.$router.back();
    },
    onShare() {
      this.showShare = true;
    },
    onSelect(option) {
      if (option.name == "私信好友") {
        this.showShareList = true;
      }
      this.showShare = false;
    },
    cancel() {
      this.showShareList = false;
    },
    confirm() {
      this.showShareList = false;
    },
    onFanBtn() {
      const toId = this.headerData.userId;
      const userId = this.userStore.getUserId();
      if (this.isFan) {
        this.deleteFan(userId, toId);
      } else {
        this.addFan(userId, toId);
      }
      this.isFan = !this.isFan;
    },
    addFan(fromId, toId) {
      const imei = WebToolkit.getDeviceInfo().system;
      const param = {
        fromId,
        toId,
        appId: APP_ID,
        imei,
        clientType: getClientType(imei),
      };
      const { code, msg, data } = addFanApi(param);
      if (code == 0) {
      }
    }, // 删除粉丝
    deleteFan(fromId, toId) {
      const imei = WebToolkit.getDeviceInfo().system;
      const param = {
        fromId,
        toId,
        appId: APP_ID,
        imei,
        clientType: getClientType(imei),
      };
      const { code, msg, data } = deleteFanApi(param);
      if (code == 0) {
      }
    },
    async getIsFan() {
      const param = {
        toId: this.headerData.userId,
        userId: this.userStore.getUserId(),
      };
      const { code, msg, data } = await getIsFanApi(param);
      if (code == 0) {
        this.isFan = data.isFan;
      }
    },
    isMe() {
      return this.headerData.userId == this.userStore.getUserId();
    },
  },
};
</script>
<style lang="scss" scoped>
.explore-header-container {
  height: 60rem;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 4rem 12rem;
  .left {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 100%;
    width: 50%;
    .back {
      .icon-back {
        font-size: 25rem;
      }
    }
    .author {
      margin-left: 10rem;
      display: flex;
      flex-direction: row;
      align-items: center;
      img {
        height: 40rem;
        width: 40rem;
        border-radius: 50%;
      }
      .name {
        padding-left: 10rem;
        width: 70rem;
        font-size: 16rem;
      }
    }
  }
  .right {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    height: 100%;
    width: 50%;
    .follow {
      line-height: 26rem;
      font-size: 16rem;
      .text {
        text-align: center;
        height: 25rem;
        width: 74rem;
        border-radius: 20rem;
        border: 1px solid rgb(220, 86, 86);
        color: rgb(237, 98, 98);
      }
      .text-fan {
        border: 1px solid rgb(98, 96, 96) !important;
        color: rgb(52, 50, 50) !important;
      }
    }
    .share {
      margin: 0rem 6rem 0rem 14rem;
      .icon-share {
        font-size: 25rem;
      }
    }
  }
}
</style>
