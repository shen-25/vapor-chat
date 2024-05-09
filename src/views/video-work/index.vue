<template>
  <div class="video-work-container">
    <Header v-show="showHeader"></Header>
    <div class="slide-vertical-wrapper" ref="rootRef">
      <div class="slide-vertical-content">
        <div class="slide-page">
          <Player class="video" :videoUrl="videoVO.videoUrl" ref="playerRef" />
          <div class="footer">
            <div class="author">@{{ author.nickname }}</div>
            <div class="title">
              <span>{{ videoWorkVO?.title }}</span>
            </div>
          </div>
          <div class="toolbar">
            <div class="item">
              <div class="avatar" @click="onAvatarBtn">
                <img :src="author.avatar" alt="" />
                <i
                  class="icon-video-add"
                  @click="onAddFanBtn"
                  v-if="showAddFanBtn()"
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
            <div class="item">
              <Share
                :videoWorkVO="videoWorkVO"
                v-if="videoWorkVO"
                @onShare="onShareBtn"
                @onFinish="onFinishBtn"
              ></Share>
            </div>
          </div>
        </div>
      </div>
    </div>
    <van-popup
      v-model:show="showComment"
      closeable
      position="bottom"
      :style="{ height: '66%' }"
      @closed="showClosedToast"
    >
      <div @click.stop class="comment-list">
        <Comment
          :commentList="commentList"
          @onComment="onComment"
          :authorUserId="authorUserId"
        ></Comment>
      </div>
      <div class="toolbar-input">
        <div class="content-edit">
          <p
            contenteditable
            class="content-input"
            :placeholder="placeholder"
            id="content-textarea"
          ></p>
          <div class="send" @click="onSendBtn">
            <div class="text">发送</div>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import Player from "@/components/player/Player.vue";
import { getVideoWorkDetailApi } from "@/api/work/publish-work";
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/user";
import { addCollectApi, deleteCollectApi } from "@/api/interact/collect";
import { addLikeApi, deleteLikeApi } from "@/api/interact/like";
import { addFanApi } from "@/api/interact/fan";
import WebToolkit from "@/im/utils/web-tool-kit";
import { getClientType } from "@/utils/client-type";
import { APP_ID } from "@/config/setting";
import useVideoSlider from "./use-video-slider";
import Comment from "@/views/explore-work/components/Comment.vue";
import { addCommentApi, getCommentListApi } from "@/api/comment/index";
import Share from "./components/Share.vue";
import Header from "./components/Header.vue";

export default {
  name: "VideoWork",
  components: {
    Player,
    Comment,
    Share,
    Header,
  },
  setup() {
    const router = useRouter();
    const userStore = useUserStore();

    const showHeader = ref(true);

    const playerRef = ref({});

    const videoWorkVO = ref(null);

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
    function isMe() {
      return author.value.userId == userStore.getUserId();
    }

    function showAddFanBtn() {
      if (isMe()) {
        return false;
      }
      if (audience.value.isFan) {
        return false;
      }
      return true;
    }
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
        authorUserId.value = data.author.userId;
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
      if (!audience.value.isFan) {
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

    function onCollectBtn() {
      if (audience.value.isCollect) {
        deleteCollect();
        statistics.value.collectCount--;
      } else {
        addCollect();
        statistics.value.collectCount++;
      }
    }
    function onShareBtn() {
      showHeader.value = false;
    }
    function onFinishBtn() {
      showHeader.value = true;
    }
    const showInputDiv = ref(false);

    const commentList = ref([]);

    const authorUserId = ref("");

    const replyCommentModel = ref({});

    const placeholder = ref("");

    const showComment = ref(false);
    async function onComment(commentId, userId, nickname) {
      replyCommentModel.value = {
        commentId,
        userId,
        nickname,
      };
      placeholder.value = `@${nickname}`;
      showInputDiv.value = !showComment.value;
    }
    async function onCommentBtn() {
      await getCommentList();
      showComment.value = true;
      replyCommentModel.value = null;
      placeholder.value = "说点什么...";
    }
    function showClosedToast() {
      placeholder.value = "";
      replyCommentModel.value = null;
    }
    async function getCommentList() {
      const param = {
        postId: router.currentRoute.value.params.id,
        commentId: 0,
        userId: userStore.getUserId(),
        page: 1,
        pageSize: 10,
      };
      const { msg, data, code } = await getCommentListApi(param);
      if (code === 0) {
        commentList.value = data;
      }
    }
    async function addComment(content, type, parentId) {
      const param = {
        userId: userStore.getUserId(),
        postId: videoWorkVO.value.postId,
        content,
        type,
        parentId,
      };
      const { msg, data, code } = await addCommentApi(param);
      if (code == 0) {
        showInputDiv.value = false;
        statistics.value.commentCount++;
        if (type == 0) {
          document.getElementById("content-textarea").innerText = "";
          getCommentList();
        }
      }
    }
    async function onSendBtn() {
      const p = document.getElementById("content-textarea");
      if (!p.innerText) {
        return;
      }
      if (replyCommentModel.value?.commentId) {
        addComment(p.innerText, 0, replyCommentModel.value.commentId);
      } else {
        addComment(p.innerText, 0, null);
      }
      replyCommentModel.value = null;
      placeholder.value = "";
    }

    getVideoWorkDetail();
    return {
      playerRef,
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
      showComment,
      commentList,
      onComment,
      onSendBtn,
      commentList,
      authorUserId,
      placeholder,
      showClosedToast,
      isMe,
      showAddFanBtn,
      showHeader,
      onFinishBtn,
    };
  },
};
</script>
<style lang="scss" scoped>
.click-icon-red {
  color: rgb(227, 20, 20);
}
.van-overlay {
  background: none;
}
.comment-list {
  padding: 20rem 8rem 0rem 8rem;
  margin-bottom: 108rem;
}
.toolbar-input {
  position: fixed;
  bottom: 0rem;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  min-height: 30rem;
  padding: 13rem 12rem;
  border-top: 1px solid #e2e1e1;
  z-index: 300;
  background: #fff;
  align-items: center;

  p:empty::before {
    content: attr(placeholder);
    color: #ccc;
    font-size: 16px;
  }
}
.content-edit {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  .send {
    height: 26rem;
    width: 58rem;
    line-height: 26rem;
    font-size: 14rem;
    background: rgb(243, 61, 61);
    border-radius: 20rem;
    .text {
      text-align: center;
      color: #fff;
    }
  }
  .content-input {
    width: 80%;
    cursor: text;
    caret-color: #3d8af5;
    margin: 0;
    min-height: 18rem;
    background-color: rgba(0, 0, 0, 0.03);
    border: none;
    border-radius: 4rem;
    padding: 9rem 16rem;
    border-radius: 20rem;
    outline: none;
    overflow-y: auto;
    text-rendering: optimizeLegibility;
    word-break: break-all;
    white-space: break-spaces;
    font-size: 15rem;
    line-height: 22rem;
    color: #333;
    border-radius: 20px;
    .inner {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      justify-content: flex-start;
      color: rgba(51, 51, 51, 0.6);
      font-size: 14rem;
      img {
        margin-right: 6rem;
        width: 24rem;
        height: 24rem;
        border-radius: 12rem;
        overflow: hidden;
        color: rgba(51, 51, 51, 0.3);
        border-style: none;
      }
    }
  }
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
          bottom: 4rem;
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
          bottom: 14rem;
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
          }
        }
        .video {
          position: absolute;
        }
      }
    }
  }
}
</style>
