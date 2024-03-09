<template>
  <div class="container">
    <div class="preview-item" v-for="item in list" :key="item">
      <span class="img-container">
        <img class="picture" src="http://localhost/6.jpg" />
      </span>
      <div class="note-body">
        <div class="text">
          看见达拉斯方法大嫂而非去啊打算反馈杰地方撒拉德是否看了就打算附件两份但是风口浪尖大师傅
        </div>
        <div class="footer">
          <a href="http://localhost/6.jpg" class="title"><span></span></a>
          <div class="author-wrapper">
            <div class="like-wrapper">
              <span class="like"></span>
              <span class="count"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: [1, 2, 3, 4, 6, , 8],
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
    height: calc(68vw * 1.2);
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

    .note-body {
      display: flex;
      align-content: center;
      padding: 10rem 8rem 4rem 8rem;

      .text {
        font-size: 15rem;
        line-height: 15rem;

        /* 内容过长显示两行，多余为省略号 */
        text-overflow: ellipsis; /*设置隐藏部分为省略号*/
        overflow: hidden; /*设置隐藏*/
        display: -webkit-box;
        -webkit-line-clamp: 2; /*设置显示行数，此处为2行，可设置其他数字*/
        -webkit-box-orient: vertical;

        color: #333;
        font-weight: 600;
      }
      .footer {
      }
    }
  }
}
</style>
