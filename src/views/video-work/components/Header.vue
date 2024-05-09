<template>
  <div class="header">
    <div class="left" @click="goBack">
      <i class="icon-back"></i>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goBack() {
      this.$router.back();
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  height: 48rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
  .left {
    padding: 10rem;
    .icon-back {
      opacity: 1;
      font-size: 30rem;
      color: #fff;
    }
  }
}
</style>
