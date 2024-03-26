<template>
  <div class="container">
    <BaseHeader>
      <template v-slot:center>
        <span class="f16">添加学校</span>
      </template>
      <template v-slot:right>
        <div>
          <span
            class="f16"
            :class="isChanged ? 'changed' : 'no-changed'"
            @click="save"
            >保存</span
          >
        </div>
      </template>
    </BaseHeader>
    <div class="content">
      <div class="item">
        <div class="left">学校</div>
        <div class="right">
          <span>东莞理工学院</span>
          <i class="icon-right-back"></i>
        </div>
      </div>
      <div class="item">
        <div class="left">入学时间</div>
        <div class="right">
          <span>2020</span>
          <i class="icon-right-back"></i>
        </div>
      </div>
      <div class="item">
        <div class="left">学历</div>
        <div class="right">
          <span>本科</span>
          <i class="icon-right-back"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseHeader from "@/components/base/BaseHeader.vue";
export default {
  name: "ChooseSchool",
  components: {
    BaseHeader,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.changed {
  color: rgb(252, 47, 86);
}

.no-changed {
  color: rgba(252, 47, 86, 0.5);
}

.container {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: #fff;
  z-index: 400;
}
.content {
  padding-top: 70rem;
  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50rem;
    line-height: 50rem;

    font-size: 16rem;
    margin: 0 16rem;
    .left {
      min-width: 14%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #323030;
    }
    .right {
      max-width: 80%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .icon-right-back {
        font-size: 20rem;
      }
    }
  }
}
</style>
