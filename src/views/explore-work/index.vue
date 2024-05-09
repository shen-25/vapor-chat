<template>
  <div class="explore-container">
    <Header
      :headerData="headerData"
      :workDetail="workDetail"
      v-if="headerData"
    ></Header>
    <div class="scroll-wrapper" @click="hideCommentDiv">
      <Scroll class="explore-content" ref="scrollRef">
        <div>
          <div class="slider-wrapper">
            <div class="slider-content">
              <Slider v-if="sliders.length" :sliders="sliders"></Slider>
            </div>
          </div>
          <div class="work-content">
            <div class="title">{{ workDetail.title }}</div>
            <div class="text">
              {{ workDetail.text }}
            </div>
            <div class="work-tip">
              {{ workDetail.createTime }}
            </div>
          </div>
          <div class="comment-content">
            <div class="total">
              共{{ workDetail?.statistics?.commentCount }}条评论
            </div>
            <div @click.stop>
              <Comment
                :commentList="commentList"
                @onComment="onComment"
                :authorUserId="authorUserId"
              ></Comment>
            </div>
          </div>
        </div>
      </Scroll>
    </div>
    <div class="footer">
      <div class="content-edit">
        <div class="content-input" @click="toInput">
          <div class="inner">
            <img :src="getAvatar()" alt="" />
            <span>评论</span>
          </div>
        </div>
      </div>
      <div class="interact-container">
        <div class="item">
          <i
            @click="onLikeBtn"
            :class="workDetail.isLike ? 'icon-liked' : 'icon-like'"
          ></i>
          <span>{{ workDetail?.statistics?.likeCount }}</span>
        </div>
        <div class="item">
          <i
            @click="onCollectBtn"
            :class="
              workDetail.isCollect ? 'icon-video-collect' : 'icon-collect-blank'
            "
          ></i>
          <span>{{ workDetail?.statistics?.collectCount }}</span>
        </div>
        <div class="item">
          <i class="icon-video-comment" @click="onCommentBtn"></i>
          <span>{{ workDetail?.statistics?.commentCount }}</span>
        </div>
      </div>
    </div>
    <div class="toolbar" v-show="showInputDiv">
      <div class="content-edit">
        <p contenteditable class="content-input" id="content-textarea"></p>
      </div>
      <div class="tip">
        <div class="icons">
          <i class="icon-back"></i>
        </div>
        <div class="send" @click="onSendBtn">
          <div class="text">发送</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Slider from "@/components/base/slider/Slider.vue";
import Scroll from "@/components/base/scroll/Scroll";
import Header from "./Header.vue";
import { getWorkPostDetailApi } from "@/api/work/publish-work";
import { nextTick, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import Comment from "./components/Comment.vue";
import { addCommentApi, getCommentListApi } from "@/api/comment/index";
import { useUserStore } from "@/store/user";
import { addCollectApi, deleteCollectApi } from "@/api/interact/collect";
import { addLikeApi, deleteLikeApi } from "@/api/interact/like";
export default {
  name: "explore",
  components: { Header, Slider, Scroll, Comment },
  setup() {
    const router = useRouter();
    const userStore = useUserStore();
    const sliders = ref([]);
    const workDetail = ref({});
    const headerData = ref(null);
    const commentList = ref([]);
    const showInputDiv = ref(false);
    const showLine = ref(false);

    const scrollRef = ref(null);

    const authorUserId = ref("");

    function getAvatar() {
      return userStore.getAvatar();
    }

    async function getWorkPostDetail(postId) {
      const userId = userStore.getUserId();
      const { msg, data, code } = await getWorkPostDetailApi({
        postId,
        userId,
      });
      if (code == 0) {
        workDetail.value = data;
        sliders.value = workDetail.value.imagePostList;
        headerData.value = {
          userId: data.userId,
          avatar: data.avatar,
          nickname: data.nickname,
        };
        authorUserId.value = data.userId;
      }
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
        postId: workDetail.value.postId,
        content,
        type,
        parentId,
      };
      const { msg, data, code } = await addCommentApi(param);
      if (code == 0) {
        showInputDiv.value = false;
        if (type == 0) {
          document.getElementById("content-textarea").innerText = "";
          getCommentList();
        }
        workDetail.value.statistics.commentCount++;
      }
    }

    const replyCommentModel = ref();

    async function toInput() {
      replyCommentModel.value = {
        commentId: "",
        userId: "",
        nickname: "",
      };
      showInputDiv.value = true;
    }
    async function onSendBtn() {
      const p = document.getElementById("content-textarea");

      if (replyCommentModel.value.commentId) {
        addComment(p.innerText, 0, replyCommentModel.value.commentId);
      } else {
        addComment(p.innerText, 0, null);
      }
    }

    function hideCommentDiv() {
      showInputDiv.value = false;
    }

    async function onComment(commentId, userId, nickname) {
      replyCommentModel.value = {
        commentId,
        userId,
        nickname,
      };
      showInputDiv.value = !showInputDiv.value;
    }

    getWorkPostDetail(router.currentRoute.value.params.id);

    async function addCollect() {
      const param = {
        postId: workDetail.value.postId,
        userId: userStore.getUserId(),
      };
      const { msg, data, code } = await addCollectApi(param);
      if (code == 0) {
        workDetail.value.isCollect = true;
        workDetail.value.statistics.collectCount++;
      }
    }
    async function addWorkLike() {
      const param = {
        postId: workDetail.value.postId,
        userId: userStore.getUserId(),
      };
      const { msg, data, code } = await addLikeApi(param);
      if (code == 0) {
        workDetail.value.isLike = true;
        workDetail.value.statistics.likeCount++;
      }
    }
    async function deleteCollect() {
      const param = {
        postId: workDetail.value.postId,
        userId: userStore.getUserId(),
      };
      const { msg, data, code } = await deleteCollectApi(param);
      if (code == 0) {
        workDetail.value.isCollect = false;
        workDetail.value.statistics.collectCount--;
      }
    }
    async function deleteWorkLike() {
      const param = {
        postId: workDetail.value.postId,
        userId: userStore.getUserId(),
      };
      const { msg, data, code } = await deleteLikeApi(param);
      if (code == 0) {
        workDetail.value.isLike = false;
        workDetail.value.statistics.likeCount--;
      }
    }

    async function onLikeBtn() {
      if (workDetail.value.isLike) {
        await deleteWorkLike();
      } else {
        await addWorkLike();
      }
    }

    async function onCollectBtn() {
      if (workDetail.value.isCollect) {
        await deleteCollect();
      } else {
        await addCollect();
      }
    }
    async function onCommentBtn() {
      scrollRef.value.scroll.refresh();

      scrollRef.value.scroll.scrollToElement(".total", 200, true, true);
    }

    getCommentList();
    onMounted(() => {});

    return {
      sliders,
      workDetail,
      headerData,
      showInputDiv,
      onSendBtn,
      toInput,
      showLine,
      hideCommentDiv,
      commentList,
      onComment,
      authorUserId,
      onLikeBtn,
      onCollectBtn,
      onCommentBtn,
      scrollRef,
      getAvatar,
    };
  },
};
</script>
<style lang="scss" scoped>
.explore-container {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  z-index: 600;
  .scroll-wrapper {
    position: fixed;
    width: 100%;
    top: 64rem;
    bottom: 51rem;
    overflow: scroll;
  }
  .explore-content {
    height: 100%;
    overflow: hidden;
    .slider-wrapper {
      width: 100%;
      .slider-content {
        width: 100%;
        height: 100%;
      }
    }
    .work-content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin: 1rem 10rem 8rem 10rem;
      .title {
        margin-bottom: 8rem;
        font-weight: 600;
        height: 20rem;
        font-size: 18rem;
      }
      .text {
        font-size: 16rem;
        font-weight: 400;
      }
      .work-tip {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 12rem;
        height: 20rem;
        font-size: 12rem;
        color: #ccc;
      }
    }
    .comment-content {
      display: flex;
      flex-direction: column;
      padding: 16rem 8rem;
      border-top: 1px #f0f0f0 solid;
      .total {
        font-size: 14rem;
        color: rgba(51, 51, 51, 0.6);
        margin-left: 8rem;
        margin-bottom: 12rem;
      }
    }
  }

  .footer {
    position: fixed;
    width: 100%;
    height: 50rem;
    bottom: 0rem;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px #f0f0f0 solid;

    .interact-container {
      min-height: 40%;
      width: auto;
      display: flex;
      flex-direction: row;
      text-align: center;
      align-items: center;
      justify-content: space-around;
      margin-right: 10rem;
      .item {
        display: flex;
        flex-direction: row;
        align-items: center;
        font-size: 14rem;
        padding-left: 10rem;
        .icon-like {
          font-size: 23rem;
          margin-right: 4rem;
        }
        .icon-liked {
          color: red;
          font-size: 22rem;
          margin-right: 4rem;
        }
        .icon-video-comment {
          font-size: 19rem;
          margin-right: 4rem;
        }
        .icon-collect-blank {
          font-size: 26rem;
          margin-right: 4rem;
        }
        .icon-video-collect {
          font-size: 23rem;
          margin-right: 4rem;
          color: rgb(226, 177, 87);
        }
      }
    }
  }
  .content-edit {
    flex: 1;
    position: relative;
    min-width: 70rem;
    width: 100%;
  }
  .content-input {
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
  .toolbar {
    background: #fff;

    position: fixed;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    bottom: 0;
    left: 0;
    right: 0;
    align-items: center;
    min-height: 30rem;
    padding: 13rem 12rem 0rem 12rem;
    border-top: 1px solid #e2e1e1;
    .tip {
      height: 28rem;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      padding: 8rem;
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
    }
  }
}
</style>
