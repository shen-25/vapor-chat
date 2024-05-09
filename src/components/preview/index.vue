<template>
  <div class="preview-container" @click.stop>
    <div class="preview-item" v-for="item in postList" :key="item">
      <div class="img-container" @click.stop="onItemClick(item)">
        <img class="picture" :src="item.coverUrl" />
        <i class="icon-isVideo-tip" v-if="item.type === 0"></i>
      </div>
      <div class="footer">
        <div class="text" @click="onItemClick(item)">
          <span v-html="item.title"></span>
        </div>
        <div class="wrapper">
          <div class="author-wrapper" @click="onAuthorBtn(item.userId)">
            <img :src="item.avatar" alt="" class="author-avatar" />
            <span class="name">{{ item.nickname }}</span>
          </div>
          <div class="like-wrapper">
            <Like
              :isLike="item.isLike"
              :likeCount="item.likeCount"
              :userId="userId"
              :postId="item.postId"
              @click.stop
            ></Like>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Like from "@/components/like/index.vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/user";
export default {
  name: "preView",
  components: {
    Like,
  },
  props: {
    postList: {
      type: Array,
      default: [],
    },
  },
  emits: ["select"],
  setup(props, { emit }) {
    const router = useRouter();

    const userStore = useUserStore();

    const userId = userStore.getUserId();

    function onItemClick(work) {
      emit("select", work);
    }
    function onAuthorBtn(userId) {
      router.push(`/userProfile/${userId}`);
    }

    return {
      onItemClick,
      onAuthorBtn,
      userId,
    };
  },
};
</script>

<style lang="scss" scoped>
.preview-container {
  display: grid;
  grid-template-columns: 48.6vw 48.6vw;
  margin: 4rem calc(0.2vw);
  grid-column-gap: 4rem;
  justify-content: center;
  .preview-item {
    position: relative;
    height: calc(72vw * 1.2);
    margin-bottom: 2rem;
    border-radius: 4rem;
    overflow: hidden;
    background-color: #fff;
    .img-container {
      display: block;
      padding-top: 33rem;
      position: relative;
      background-color: #f5f5f5;
      border-radius: 8rem 8rem 0 0;
      overflow: hidden;
      padding-top: 133%;
      .icon-isVideo-tip {
        font-size: 16rem;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        right: 14rem;
        top: 14rem;
        width: 20rem;
        height: 20rem;
        z-index: 150;
      }
      .picture {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: inherit;
        img {
          border: none;
        }
      }
    }

    .footer {
      display: flex;
      flex-direction: column;
      padding: 10rem 8rem 4rem 8rem;
      .text {
        margin-bottom: 8rem;
        font-size: 15rem;
        /* 内容过长显示两行，多余为省略号 */
        text-overflow: ellipsis; /*设置隐藏部分为省略号*/
        overflow: hidden; /*设置隐藏*/
        -webkit-line-clamp: 2; /*设置显示行数，此处为2行，可设置其他数字*/
        -webkit-box-orient: vertical;
        color: #333;
        word-break: break-all;
        display: -webkit-box;
        line-height: 140%;
      }
      .wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 20rem;
        font-size: 12rem;
        transition: color 1s;
        color: rgba(51, 51, 51, 0.8);
        .author-wrapper {
          display: flex;
          align-items: center;
          color: inherit;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin-right: 12rem;
          .author-avatar {
            margin-right: 6px;
            width: 20px;
            height: 20px;
            border-radius: 20px;
            flex-shrink: 0;
          }
          .name {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
      .like-wrapper {
        position: relative;
        cursor: pointer;
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>
