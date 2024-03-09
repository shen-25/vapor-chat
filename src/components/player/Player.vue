<template>
  <div id="video-player"></div>
</template>
<script>
import { onMounted, watch, ref, onUnmounted } from "vue";
import xgPlayer from "xgplayer";

export default {
  name: "Player",
  props: {
    // 视频地址
    videoUrl: {
      type: String,
      default() {
        return "http://localhost/%E9%98%B4%E6%99%B4%E8%A1%A5%E4%B8%81.mp4";
      },
    },
    // 预览图片
    poster: {
      type: String,
      default: () =>
        "http://lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/byted-player-videos/1.0.0/poster.jpg",
    },
    // 内联模式
    playsinline: {
      type: Boolean,
      default: true,
    },
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "100%",
    },
  },
  emits: ["triggerEvent"],
  setup(props, { emit }) {
    onMounted(() => {
      initPlayer();
    });
    onUnmounted(() => {
      player.value.destroy();
      player.value = null;
    });

    const player = ref(null);

    function initPlayer() {
      const config = {
        id: "video-player",
        url: props.videoUrl,
        height: props.height,
        width: props.width,
        // fitVideoSize: "auto",
        loop: true,

        // fluid: true,
        /**倍速播放 */
        playbackRate: [0.5, 0.75, 1, 1.5, 2],
        defaultPlaybackRate: 1,
        playsinline: props.playsinline,
        whitelist: [""],
        /**画中画 */
        pip: true,
        pipConfig: {
          bottom: 100,
          right: 100,
          width: 320,
          height: 180,
        },
        /**初始化首帧 */
        videoInit: true,
        autoplay: true,

        //关闭控制条

        controls: false,
      };

      //开始实例化
      const tPlayer = new xgPlayer(config);
      if (tPlayer) {
        player.value = tPlayer;
        /* 这里注册监听 */
        // 监听视频开始播放 播放传给父组件的是true
        player.value.on("play", () => {
          emit("triggerEvent", true);
        });
        // 监听视频已经暂停 暂停传给父组件的是true
        player.value.on("pause", () => {
          emit("triggerEvent", false);
        });
        //监听 视频退出全屏
        player.value.on("exitFullscreen", () => {
          window.scrollTo(0, 0);
          console.log("已经退出全屏了");
        });
      }
    }
    watch(
      () => props.videoUrl,
      (newUrl) => {
        if (!player.value) {
          initPlayer();
        } else {
          player.value.src = newUrl;
        }
      }
    );
  },
};
</script>

<style lang="scss" scoped>
.video-player {
  flex: auto;
}
</style>
