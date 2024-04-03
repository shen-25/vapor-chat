<template>
  <div class="video-work-container">
    <div class="videoPlayer">
      <Player
        class="video"
        videoUrl="http://localhost/%E9%98%B4%E6%99%B4%E8%A1%A5%E4%B8%81.mp4"
        ref="playerRef"
      />
    </div>
    <div class="footer">
      <div class="author">@聪明的大小</div>
      <div class="title">
        ds记录卡撒旦杰拉算法的撒发射点发撒打发撒旦sfdfadsafdsafds德是否的撒离开撒地方
      </div>
    </div>
    <div class="toolbar">
      <div class="item">
        <div class="avatar">
          <img
            src="http://localhost:3000/src/assets/img/icon/avatar/13.png"
            alt=""
          />
        </div>
      </div>
      <div class="item">
        <div class="like">
          <i class="icon-share"></i>
        </div>
      </div>
      <div class="item"><div class="comment"></div></div>
      <div class="item"><div class="share"></div></div>
      <div class="item"><div class="music"></div></div>
    </div>
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

    const content = " ADSL";

    async function getWorkPostDetail(postId) {
      // const { msg, data, code } = await getWorkPostDetailApi({ postId });
      // if (code == 0) {
      //   workDetail.value = data;
      //   workVideo.value = data.workVideo;
      //   videoUrl.value = workVideo.value.videoUrl;
      //   userData.value = {
      //     userId: data.userId,
      //     avatar: data.avatar,
      //     nickname: data.nickname,
      //   };
      // }
    }
    getWorkPostDetail(router.currentRoute.value.params.id);
    return { workVideo, workDetail, userData, videoUrl, playerRef, content };
  },
};
</script>
<style lang="scss" scoped>
.video-work-container {
  position: fixed;
  width: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 800;
  background: #000;

  .videoPlayer {
    width: 100%;
    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    .video {
      display: flex;
      width: 100%;
      height: 100%;
    }
  }
  .footer {
    position: fixed;
    bottom: 0rem;
    padding: 16rem 40rem 16rem 16rem;
    height: auto;
    pointer-events: none;
    flex-direction: column;
    display: flex;
    width: 100%;
    z-index: 10000;
    .author {
      max-width: 75%;
      height: 20rem;
      font-size: 18rem;
      color: #fff;
      padding-bottom: 4rem;
    }
    .title {
      line-height: 18rem;
      font-size: 15rem;
      color: #fff;
      max-width: 75%;
      margin-right: 12px;
    }
  }
  .toolbar {
    position: fixed;
    bottom: 68rem;
    right: 0rem;
    color: #fff;
    height: 50vh;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    padding-right: 12rem;
    .item {
      width: 46rem;
      height: 50rem;
      background: #000;
      margin: 10rem 8rem 10rem 0rem;
      .avatar {
        img {
          width: 45rem;
          height: 45rem;
          border-radius: 50%;
        }
      }
      .like {
        .icon-share {
          font-size: 40rem;
        }
      }
    }
  }
}
</style>
