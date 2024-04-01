<template>
  <div class="explore-container">
    <Header :headerData="headerData"></Header>
    <div class="scroll-wrapper" @click="hideCommentDiv">
      <Scroll class="explore-content">
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
            <div class="total">共100条评论</div>
            <div
              class="list-container"
              v-for="item in commentList"
              :key="item.commentId"
            >
              <Comment :data="item"></Comment>
            </div>
          </div>
        </div>
      </Scroll>
    </div>
    <div class="footer">
      <div class="content-edit">
        <div class="content-input" @click="toInput">
          <div class="inner">
            <img
              src="http://zengshen.org:9000/vapor-chat/google%E5%A4%B4%E5%83%8F.png"
              alt=""
            />
            <span>评论</span>
          </div>
        </div>
      </div>
      <div class="interact-container">
        <div class="item">
          <i class="icon-like"></i>
          <span>2213</span>
        </div>
        <div class="item">
          <i class="icon-like"></i>
          <span>2213</span>
        </div>
        <div class="item">
          <i class="icon-like"></i>
          <span>2213</span>
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
export default {
  name: "explore",
  components: { Header, Slider, Scroll, Comment },
  setup() {
    const router = useRouter();
    const userStore = useUserStore();
    const sliders = ref([]);
    const workDetail = ref({});
    const headerData = ref({});
    const commentList = ref([]);
    const showInputDiv = ref(false);
    const showLine = ref(false);

    const inputFocus = ref(false);

    const inputPRef = ref(null);

    async function getWorkPostDetail(postId) {
      const { msg, data, code } = await getWorkPostDetailApi({ postId });
      if (code == 0) {
        workDetail.value = data;
        sliders.value = workDetail.value.imagePostList;
        headerData.value = {
          userId: data.userId,
          avatar: data.avatar,
          nickname: data.nickname,
        };
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

    async function addComment(content, type, parentId, replyId) {
      const param = {
        userId: userStore.getUserId(),
        postId: workDetail.value.postId,
        content,
        type,
        parentId,
        replyId,
      };
      const { msg, data, code } = await addCommentApi(param);
      if (code == 0) {
        showInputDiv.value = false;
        if (type == 0) {
          document.getElementById("content-textarea").innerText = "";
          getCommentList();
        }
      }
    }

    async function toInput() {
      showInputDiv.value = true;
      inputFocus.value = true;
    }
    async function onSendBtn() {
      const p = document.getElementById("content-textarea");
      addComment(p.innerText, 0, null, null);
    }

    function hideCommentDiv() {
      showInputDiv.value = false;
    }
    getWorkPostDetail(router.currentRoute.value.params.id);

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
      inputPRef,
      commentList,
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
        text-align: center;
        padding-left: 10rem;
        .icon-like {
          font-size: 24rem;
          margin-right: 4rem;
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
