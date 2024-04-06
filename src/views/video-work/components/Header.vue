<template>
  <div class="header">
    <div class="left" @click="goBack">
      <i class="icon-back"></i>
    </div>
    <div class="right" @click="onShare">
      <i class="icon-share"></i>
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
import ShareList from "@/views/explore-work/components/ShareList.vue";
export default {
  name: "ExploreBack",
  props: {
    videoWorkVO: {
      type: Object,
    },
  },
  components: { ShareList },
  mounted() {
    console.log(this.videoWorkVO);
    this.workDetail = {
      postId: this.videoWorkVO.postId,
      title: this.videoWorkVO.title,
      coverUrl: this.videoWorkVO.coverUrl,
      type: this.videoWorkVO.type,
      userId: this.videoWorkVO?.author?.userId,
      nickname: this.videoWorkVO?.author?.nickname,
      avatar: this.videoWorkVO?.author?.avatar,
    };
  },
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
      workDetail: {},
    };
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
    goBack() {
      this.$router.back();
    },
  },
};
</script>
<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  height: 48rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 300;
  .left {
    padding: 10rem;
    .icon-back {
      opacity: 1;
      font-size: 30rem;
      color: #fff;
    }
  }
  .right {
    padding: 10rem 18rem 10rem 10rem;
    .icon-share {
      opacity: 1;
      font-size: 26rem;
      color: #fff;
    }
  }
}
</style>
