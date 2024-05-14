<template>
  <div class="share-container">
    <div class="share" @click="onShare"><i class="icon-video-share"></i></div>
    <van-share-sheet
      v-model:show="showShare"
      title="立即分享给好友"
      :options="options"
      @select="onSelect"
      @cancel="onCancel"
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
        { name: "分享", icon: "link" },
        { name: "微信", icon: "wechat" },
        { name: "微博", icon: "weibo" },
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
      this.$emit("onShare");
    },
    onCancel() {
      this.$emit("onCancel");
    },
    onSelect(option) {
      if (option.name == "私信好友") {
        this.showShareList = true;
      }
      this.showShare = false;
    },
    cancel() {
      this.showShareList = false;
      this.$emit("onFinish");
    },
    confirm() {
      this.showShareList = false;
      this.$emit("onFinish");
    },
  },
};
</script>
<style lang="scss" scoped>
.share-container {
  z-index: 400;
  color: #000;
  .share {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
    transform: translate3d(0px, 0px, 0px);
    opacity: 1;
    width: 46rem;
    height: 52rem;
    .icon-video-share {
      color: #fff;
      font-size: 30rem;
    }
    span {
      padding-top: 2rem;
      font-size: 18rem;
    }
  }
}
</style>
