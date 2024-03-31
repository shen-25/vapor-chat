<template>
  <!-- 播放的视频容器 -->
  <div class="videoPlayer">
    <Player class="video" :videoUrl="videoUrl" ref="playerRef" />
  </div>
</template>
<script>
import Player from "@/components/player/Player.vue";
import { getWorkPostDetailApi } from "@/api/work/publish-work";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/user";
export default {
  name: "VideoWork",
  components: {
    Player,
  },
  setup() {
    const router = useRouter();
    const userStore = useUserStore();

    const playerRef = ref(null);

    const workDetail = ref(null);
    const userData = ref(null);
    const workVideo = ref({});
    const videoUrl = ref("");

    async function getWorkPostDetail(postId) {
      const { msg, data, code } = await getWorkPostDetailApi({ postId });
      if (code == 0) {
        workDetail.value = data;
        workVideo.value = data.workVideo;
        videoUrl.value = workVideo.value.videoUrl;
        userData.value = {
          userId: data.userId,
          avatar: data.avatar,
          nickname: data.nickname,
        };
      }
    }
    getWorkPostDetail(router.currentRoute.value.params.id);
    return { workVideo, workDetail, userData, videoUrl, playerRef };
  },
};
</script>
<style lang="scss" scoped>
.videoPlayer {
  width: 100%;
  display: block;
  position: absolute;
  top: 0;
  bottom: 46rem;
  .video {
    display: flex;
    width: 100%;
    height: 100%;
  }
}
</style>
