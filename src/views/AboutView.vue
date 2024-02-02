<template>
  <!-- 播放的视频容器 -->
  <div class="videoPlayer">
    <Player class="video" />
  </div>
</template>
<script>
// @ is an alias to /src
import Player from "@/components/player/Player.vue";

export default {
  name: "HomeView",
  components: {
    Player,
  },
};
</script>
<style lang="scss" scoped>
.videoPlayer {
  position: absolute;
  top: 44px;
  left: 0px;
  right: 0px;
  bottom: 24px;
  max-height: 100%;
  max-width: 100%;
  margin: 0 auto auto auto;
  .video {
    display: flex;
    width: 100%;
    height: 100%;
  }
}
</style>
