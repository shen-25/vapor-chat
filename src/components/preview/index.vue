<template>
  <div class="container">
    <div class="preview-item" v-for="item in postList" :key="item">
      <span class="img-container">
        <img class="picture" src="http://localhost/6.jpg" />
      </span>
      <div class="footer">
        <div class="text">
          <span
            >风雨送春归，飞雪迎春到。已是悬崖百丈冰，犹有花枝俏。俏也不争春，只把春来报。待到山花烂漫时，她在丛中笑。
          </span>
        </div>
        <div class="wrapper">
          <div class="author-wrapper">
            <img src="http://localhost/6.jpg" alt="" class="author-avatar" />
            <span class="name">体制内打工人</span>
          </div>
          <div class="like-wrapper">
            <Like />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Like from "@/components/like/index.vue";
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
};
</script>

<style lang="scss" scoped>
.container {
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
    .img-container {
      display: block;
      padding-top: 33rem;
      position: relative;
      background-color: #f5f5f5;
      border-radius: 8rem 8rem 0 0;
      overflow: hidden;
      padding-top: 133%;
      .picture {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: inherit;
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
            border: 1px solid rgba(0, 0, 0, 0.08);
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
