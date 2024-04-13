<template>
  <div class="preview-image-container">
    <Scroll :scrollX="true" class="scroll-container" :click="false">
      <div class="scroll-content">
        <div
          class="item"
          v-for="(item, index) in uploadFileList"
          :key="item"
          :class="addMarLeft10Cls(index)"
        >
          <img :src="item" alt="" />
          <div class="button" @click.stop="onDeleteImageBtn(index)">
            <i class="icon-wrong"></i>
          </div>
        </div>
        <div class="upload-tip mar-left-8">
          <FileUploader @completeOneFile="getUploadFile" class="file-uploader">
            <template v-slot:center>
              <i class="icon-add"></i>
            </template>
          </FileUploader>
        </div>
      </div>
    </Scroll>
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
    function onDeleteImageBtn(index) {
      props.uploadFileList.splice(index, 1);
    }
    return { getUploadFile, addMarLeft10Cls, onDeleteImageBtn };
  },
};
</script>

<style lang="scss" scoped>
.icon-add {
  text-align: center;
  font-size: 30rem;
  color: #dcdee0;
}

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
        position: relative;
        border-radius: 8rem;
        height: 110rem;
        width: 128rem;
        img {
          height: 110rem;
          width: 128rem;
          object-fit: cover;
          overflow-clip-margin: content-box;
          overflow: clip;
        }
        .button {
          position: absolute;
          top: 0;
          right: 0;
          width: 14rem;
          height: 14rem;
          background: rgba(0, 0, 0, 0.7);
          border-radius: 0 0 0 12rem;
          .icon-wrong {
            font-size: 16rem;
            text-align: center;
            color: #fff;
          }
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
    background-color: #f7f8fa;
    .file-uploader {
      height: 110rem;
      width: 128rem;
      align-items: center;
      justify-content: center;
      display: flex;
    }
    .icon-back {
      font-size: 20rem;
    }
  }
}
</style>
