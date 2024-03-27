<template>
  <div class="preview-image-container">
    <Scroll :scrollX="true" class="scroll-container" @click.stop>
      <div class="scroll-content" @click.stop>
        <div
          class="item"
          v-for="(item, index) in uploadFileList"
          :key="item"
          :class="addMarLeft10Cls(index)"
        >
          <img :src="item" alt="" />
        </div>
      </div>
    </Scroll>
    <div class="upload-tip mar-left-8">
      <FileUploader
        @completeOneFile="getUploadFile"
        class="file-uploader"
      ></FileUploader>
    </div>
  </div>
</template>

<script>
import Scroll from "@/components/base/scroll/Scroll";
import FileUploader from "@/components/file-uploader";
export default {
  name: "previewImage",
  props: {
    uploadFileList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: { FileUploader, Scroll },
  setup(props) {
    function getUploadFile(fileUrl) {
      props.uploadFileList.push(fileUrl);
    }
    function addMarLeft10Cls(index) {
      return index > 0 ? "mar-left-8" : "";
    }
    return { getUploadFile, addMarLeft10Cls };
  },
};
</script>

<style lang="scss" scoped>
.preview-image-container {
  display: flex;
  align-items: center;
  max-height: 112rem;
  white-space: nowrap;
  .scroll-container {
    display: flex;
    white-space: nowrap;
    overflow: hidden;
    .scroll-content {
      display: flex;
      flex-direction: row;
      .item {
        border-radius: 8rem;
        height: 110rem;
        width: 128rem;
        img {
          height: 110rem;
          width: 128rem;
          // object-fit: cover;
        }
      }

      .mar-left-8 {
        margin-left: 8rem;
      }
    }
  }
  .upload-tip {
    height: 110rem;
    width: 128rem;
    background-color: #ccc;
    .file-uploader {
      margin-left: 8rem;
      height: 100rem;
      width: 100rem;
    }
    .icon-back {
      font-size: 20rem;
    }
  }
}
</style>
