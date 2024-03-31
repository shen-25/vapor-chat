<template>
  <div class="explore-header-container">
    <div class="left">
      <div class="back" @click="onBack">
        <i class="icon-back"></i>
      </div>
      <div class="author">
        <div class="avatar">
          <img :src="headerData.avatar" alt="" />
        </div>
        <div class="name">{{ headerData.nickname }}</div>
      </div>
    </div>
    <div class="right">
      <div class="follow">
        <div class="text">关注</div>
      </div>
      <div class="share">
        <i class="icon-share"></i>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ExploreBack",
  props: {
    headerData: {
      type: Object,
    },
  },
  methods: {
    onBack() {
      this.$router.back();
    },
  },
};
</script>
<style lang="scss" scoped>
.explore-header-container {
  height: 60rem;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 4rem 12rem;
  .left {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 100%;
    width: 50%;
    .back {
      .icon-back {
        font-size: 25rem;
      }
    }
    .author {
      margin-left: 10rem;
      display: flex;
      flex-direction: row;
      align-items: center;
      img {
        height: 40rem;
        width: 40rem;
        border-radius: 50%;
      }
      .name {
        padding-left: 10rem;
        width: 70rem;
        font-size: 16rem;
      }
    }
  }
  .right {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    height: 100%;
    width: 50%;
    .follow {
      height: 26rem;
      width: 80rem;
      line-height: 26rem;
      font-size: 16rem;
      border: 1px solid red;
      border-radius: 20rem;
      .text {
        text-align: center;
      }
    }
    .share {
      margin: 0rem 6rem 0rem 14rem;
      .icon-share {
        font-size: 25rem;
      }
    }
  }
}
</style>
