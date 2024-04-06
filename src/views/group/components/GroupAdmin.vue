<template>
  <div class="group-admin-container">
    <div class="header">
      <div class="left" @click="goBack">
        <i class="icon-back"></i>
      </div>
      <div class="middle">群管理员</div>
      <div class="right"></div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    function goBack() {
      router.back();
    }
    return {
      goBack,
    };
  },
};
</script>

<style lang="scss" scoped>
.group-admin-container {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1000;
  background: #fff;
  .header {
    height: 50rem;
    padding: 0 16rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ebebec;
    background-color: #fff;
    font-size: 14rem;
    .left {
      display: flex;
      .icon-back {
        font-size: 22rem;
      }
    }
    .middle {
      color: #000;
      font-size: 16rem;
    }
    .right {
      .icon-share {
        font-size: 22rem;
      }
    }
  }
}
</style>
