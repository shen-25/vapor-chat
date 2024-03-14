<template>
  <div class="bottom-menu">
    <div class="channel-list">
      <BottomChannel />
    </div>
  </div>
</template>

<script>
import BottomChannel from "./BottomChannel";
export default {
  name: "Footer",
  components: {
    BottomChannel,
  },
};
</script>

<style lang="scss" scoped>
.bottom-menu {
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 100;
  border-top: solid 0.8rem #e5e4e4;
  background: #fff;
  .channel-list {
    display: flex;
  }
}
</style>
