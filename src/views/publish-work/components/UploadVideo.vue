<template>
  <div>
    <div class="video-upload-container">
      <FileUploader
        @completeOneFile="getUploadFile"
        class="wrapper"
        v-if="!show"
      >
        <template v-slot:center>
          <i class="icon-add"></i>
        </template>
      </FileUploader>
      <Player
        :videoUrl="videoUrl"
        v-if="show"
        class="video"
        @onClick="hideVideo"
      />
      <div class="tip" @click="showVideo" v-show="videoUrl !== ''">
        预览视频
      </div>
    </div>
  </div>
</template>

<script>
import FileUploader from "@/components/file-uploader";
import Player from "@/components/player/Player.vue";
import { ref, watch } from "vue";
export default {
  name: "VideoPreview",
  components: { FileUploader, Player },
  props: {
    videoUrl: {
      type: String,
      default() {
        return null;
      },
    },
  },
  emits: ["updateVideoUrl"],
  setup(props, { emit }) {
    const show = ref(false);
    function getUploadFile(fileUrl) {
      emit("updateVideoUrl", fileUrl);
    }
    function hideVideo() {
      show.value = false;
    }
    function showVideo() {
      show.value = true;
    }
    return { getUploadFile, show, hideVideo, showVideo };
  },
};
</script>

<style lang="scss" scoped>
.video {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: #ffff;
  z-index: 100;
}
.tip {
  margin-top: 10rem;
  width: 110rem;
  height: 22rem;
  line-height: 22rem;
  border-radius: 10rem;
  background: #ccc;
  text-align: center;

  font-size: 14rem;
}
.video-upload-container {
  height: 160rem;
  background: rgba(0, 0, 0, 0.01);
  border-radius: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  .wrapper {
    background-color: rgba(0, 0, 0, 0.16);
    background-size: 100%;
    background-position-y: 50%;
    background-repeat: no-repeat;
    width: 110rem;
    height: 116rem;
    float: left;
    cursor: pointer;
    position: relative;
    flex-shrink: 0;
    border-radius: 5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    .icon-add {
      font-size: 30rem;
    }
  }
}
</style>
