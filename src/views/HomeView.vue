<template>
  <!-- 播放的视频容器 -->
  <div class="videoPlayer">
    <Player class="video" />
  </div>
  <Footer />
</template>
<script>
// @ is an alias to /src
import Player from "@/components/player/Player.vue";
import Footer from "@/components/footer/Footer.vue";

export default {
  name: "HomeView",
  components: {
    Player,
    Footer,
  },
};
</script>
<style lang="scss" scoped>
.videoPlayer {
  width: 100%;

  display: block;
  position: absolute;
  top: 0px;
  bottom: 48px;
  .video {
    display: flex;
    width: 100%;
    height: 100%;
  }
}
</style>
