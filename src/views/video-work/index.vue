<template>
  <div class="video-work-container">
    <div class="header">
      <div class="left" @click="goBack">
        <i class="icon-back"></i>
      </div>
    </div>

    <div class="slide-vertical-wrapper" ref="rootRef">
      <div class="slide-vertical-content">
        <div class="slide-page">
          <Player class="video" :videoUrl="videoVO.videoUrl" ref="playerRef" />
          <div class="footer">
            <div class="author">@{{ author.nickname }}</div>
            <div class="title">
              <span>{{ videoWorkVO.title }}</span>
            </div>
          </div>
          <div class="toolbar">
            <div class="item">
              <div class="avatar" @click="onAvatarBtn">
                <img :src="author.avatar" alt="" />
                <i
                  class="icon-video-add"
                  @click="onAddFanBtn"
                  v-if="!audience.isFan"
                ></i>
              </div>
            </div>
            <div class="item" @click="onLikeBtn">
              <div class="like">
                <i
                  class="icon-video-like"
                  :class="audience.isLike ? 'click-icon-red' : ''"
                ></i>
                <span>{{ statistics.likeCount }}</span>
              </div>
            </div>
            <div class="item" @click="onCommentBtn">
              <div class="comment">
                <i class="icon-video-comment"></i>
                <span>{{ statistics.commentCount }}</span>
              </div>
            </div>
            <div class="item" @click="onCollectBtn">
              <div class="collect">
                <i
                  class="icon-video-collect"
                  :class="audience.isCollect ? 'click-icon-red' : ''"
                ></i>
                <span>{{ statistics.collectCount }}</span>
              </div>
            </div>
            <div class="item" @click="onShareBtn">
              <div class="share">
                <i class="icon-video-share"></i>
                <span>{{ statistics.shareCount }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="slide-page">
          <div class="videoPlayer">
            <Player class="video" :videoUrl="tempUrl" />
          </div>
          <div class="footer">
            <div class="author">@{{ author.nickname }}</div>
            <div class="title">
              <span>{{ videoWorkVO.title }}</span>
            </div>
          </div>
          <div class="toolbar">
            <div class="item">
              <div class="avatar" @click="onAvatarBtn">
                <img :src="author.avatar" alt="" />
                <i
                  class="icon-video-add"
                  @click="onAddFanBtn"
                  v-if="!audience.isFan"
                ></i>
              </div>
            </div>
            <div class="item" @click="onLikeBtn">
              <div class="like">
                <i
                  class="icon-video-like"
                  :class="audience.isLike ? 'click-icon-red' : ''"
                ></i>
                <span>{{ statistics.likeCount }}</span>
              </div>
            </div>
            <div class="item" @click="onCommentBtn">
              <div class="comment">
                <i class="icon-video-comment"></i>
                <span>{{ statistics.commentCount }}</span>
              </div>
            </div>
            <div class="item" @click="onCollectBtn">
              <div class="collect">
                <i
                  class="icon-video-collect"
                  :class="audience.isCollect ? 'click-icon-red' : ''"
                ></i>
                <span>{{ statistics.collectCount }}</span>
              </div>
            </div>
            <div class="item" @click="onShareBtn">
              <div class="share">
                <i class="icon-video-share"></i>
                <span>{{ statistics.shareCount }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Player from "@/components/player/Player.vue";
import { getVideoWorkDetailApi } from "@/api/work/publish-work";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/user";
import { addCollectApi, deleteCollectApi } from "@/api/interact/collect";
import { addLikeApi, deleteLikeApi } from "@/api/interact/like";
import { addFanApi } from "@/api/interact/fan";
import WebToolkit from "@/im/utils/web-tool-kit";
import { getClientType } from "@/utils/client-type";
import { APP_ID } from "@/config/setting";
import useVideoSlider from "./use-video-slider";
export default {
  name: "VideoWork",
  components: {
    Player,
  },
  setup() {
    const router = useRouter();
    const userStore = useUserStore();

    const playerRef = ref(null);

    const videoWorkVO = ref({});

    const workStatus = ref({});

    const statistics = ref({});

    const videoVO = ref({});

    const author = ref({});

    const audience = ref({});
    const rootRef = ref(null);

    const { currentPageIndex } = useVideoSlider(rootRef);

    watch(currentPageIndex, (newIndex) => {
      console.log(newIndex);
    });

    async function getVideoWorkDetail() {
      const params = {
        postId: router.currentRoute.value.params.id,
        userId: userStore.getUserId(),
      };
      const { msg, data, code } = await getVideoWorkDetailApi(params);
      if (code == 0) {
        videoWorkVO.value = data;
        statistics.value = data.statistics;
        workStatus.value = data.workStatus;
        videoVO.value = data.videoVO;
        author.value = data.author;
        audience.value = data.audience;
      }
    }
    async function addCollect() {
      const param = {
        postId: videoWorkVO.value.postId,
        userId: userStore.getUserId(),
      };
      const { msg, data, code } = await addCollectApi(param);
      if (code == 0) {
        audience.value.isCollect = !audience.value.isCollect;
      }
    }
    async function addWorkLike() {
      const param = {
        postId: videoWorkVO.value.postId,
        userId: userStore.getUserId(),
      };
      const { msg, data, code } = await addLikeApi(param);
      if (code == 0) {
        audience.value.isLike = !audience.value.isLike;
      }
    }

    const tempUrl = ref(
      "http://zengshen.org:9000/easy-cloud-disk/2024-03-31/9f04e664eeca4dc88f5af3e04c82fa0a.mp4"
    );

    async function deleteCollect() {
      const param = {
        postId: videoWorkVO.value.postId,
        userId: userStore.getUserId(),
      };
      const { msg, data, code } = await deleteCollectApi(param);
      if (code == 0) {
        audience.value.isCollect = !audience.value.isCollect;
      }
    }
    async function deleteWorkLike() {
      const param = {
        postId: videoWorkVO.value.postId,
        userId: userStore.getUserId(),
      };
      const { msg, data, code } = await deleteLikeApi(param);
      if (code == 0) {
        audience.value.isLike = !audience.value.isLike;
      }
    }
    async function addFan() {
      const imei = WebToolkit.getDeviceInfo().system;
      const param = {
        fromId: userStore.getUserId(),
        toId: author.value.userId,
        appId: APP_ID,
        imei,
        clientType: getClientType(imei),
      };
      const { code, msg, data } = await addFanApi(param);
      if (code == 0) {
      }
    }
    async function onAddFanBtn() {
      if (!audience.isFan) {
        await addFan();
        audience.value.isFan = true;
      }
    }
    function onAvatarBtn() {}
    function onLikeBtn() {
      if (audience.value.isLike) {
        deleteWorkLike();
        statistics.value.likeCount--;
      } else {
        addWorkLike();
        statistics.value.likeCount++;
      }
    }

    function onCommentBtn() {}
    function onCollectBtn() {
      if (audience.value.isCollect) {
        deleteCollect();
        statistics.value.collectCount--;
      } else {
        addCollect();
        statistics.value.collectCount++;
      }
    }
    function onShareBtn() {}

    function goBack() {
      router.back();
    }
    getVideoWorkDetail();
    return {
      playerRef,
      goBack,
      onLikeBtn,
      onCommentBtn,
      onCollectBtn,
      onShareBtn,
      onAddFanBtn,
      onAvatarBtn,
      statistics,
      videoWorkVO,
      videoVO,
      audience,
      author,
      rootRef,
      tempUrl,
    };
  },
};
</script>
<style lang="scss" scoped>
.click-icon-red {
  color: rgb(227, 20, 20);
}

.video-work-container {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #000;
  .slide-vertical-wrapper {
    position: relative;
    height: 100%;
    font-size: 0;
    touch-action: pan-y;
    .slide-vertical-content {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      outline: none;
      width: 100%;
      overflow: hidden;
      .slide-page {
        width: 100%;
        height: 100%;
        position: relative;
        .footer {
          opacity: 1;
          position: absolute;
          bottom: 65rem;
          padding: 16rem 40rem 16rem 16rem;
          flex-direction: column;
          display: flex;
          width: 100%;
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
            color: rgba(255, 255, 255, 1);
            max-width: 75%;
            margin-right: 12px;
          }
        }
        .toolbar {
          position: absolute;
          right: 0rem;
          bottom: 60rem;
          color: #fff;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: center;
          padding-right: 8rem;
          height: auto;
          .item {
            margin: 10rem 8rem 10rem 0rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            overflow: hidden;
            .avatar {
              display: flex;
              flex-direction: column;
              align-items: center;
              img {
                width: 48rem;
                height: 48rem;
                border-radius: 50%;
              }
              .icon-video-add {
                background: #fff;
                border-radius: 90%;
                position: absolute;
                top: 50rem;
                font-size: 18rem;
                color: red;
              }
            }
            .like {
              display: flex;
              align-items: center;
              flex-direction: column;
              justify-content: space-between;
              transform: translate3d(0px, 0px, 0px);
              opacity: 1;
              width: 46rem;
              height: 52rem;
              .icon-video-like {
                font-size: 36rem;
              }
              span {
                padding-top: 2rem;

                font-size: 18rem;
              }
            }
            .comment {
              display: flex;
              align-items: center;
              flex-direction: column;
              justify-content: space-between;
              transform: translate3d(0px, 0px, 0px);
              opacity: 1;
              width: 46rem;
              height: 52rem;
              .icon-video-comment {
                font-size: 30rem;
              }
              span {
                padding-top: 2rem;

                font-size: 18rem;
              }
            }
            .collect {
              display: flex;
              align-items: center;
              flex-direction: column;
              justify-content: space-between;
              transform: translate3d(0px, 0px, 0px);
              opacity: 1;
              width: 46rem;
              height: 52rem;
              .icon-video-collect {
                font-size: 36rem;
              }
              span {
                padding-top: 2rem;
                font-size: 18rem;
              }
            }
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
                font-size: 34rem;
              }
              span {
                padding-top: 2rem;

                font-size: 18rem;
              }
            }
          }
        }
        .video {
          position: absolute;
        }
      }
    }
  }
  .header {
    position: fixed;
    top: 0;
    height: 48rem;
    width: 100%;
    display: flex;
    justify-content: flex-start;
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
  }
}
</style>
