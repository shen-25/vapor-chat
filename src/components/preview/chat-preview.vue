<template>
  <div class="preview-item">
    <div class="img-container" @click="onItemClick">
      <img class="picture" :src="postWork.coverUrl" />
      <i class="icon-isVideo-tip" v-if="postWork.type === 0"></i>
    </div>
    <div class="footer">
      <div class="text" @click="onItemClick(postWork)">
        <span v-html="postWork.title"></span>
      </div>
      <div class="wrapper">
        <div class="author-wrapper">
          <img :src="postWork.avatar" alt="" class="author-avatar" />
          <span class="name">{{ postWork.nickname }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "chatPreview",
  props: {
    postWork: {
      type: Object,
      default() {
        return null;
      },
    },
  },
  emits: ["select"],
  setup(props, { emit }) {
    function onItemClick() {
      emit("select", props.postWork);
    }
    return {
      onItemClick,
    };
  },
};
</script>

<style lang="scss" scoped>
.preview-item {
  position: relative;
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
    padding: 4rem 4rem 4rem 4rem;
    .text {
      margin-bottom: 2rem;
      font-size: 13rem;
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
          width: 14px;
          height: 14px;
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
  }
}
</style>
