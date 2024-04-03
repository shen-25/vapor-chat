<template>
  <div class="publish-container">
    <div class="header">
      <div class="left" @click="onBack">
        <i class="icon-back"></i>
      </div>
      <div class="right">
        <i class="icon-tip"></i>
      </div>
    </div>
    <div class="header-two">
      <div
        class="tab"
        :class="isUploadVideo ? 'active' : ''"
        @click="toggleUploadType"
      >
        上传视频
      </div>
      <div
        class="tab"
        :class="isUploadVideo ? '' : 'active'"
        @click="toggleUploadType"
      >
        上传图文
      </div>
    </div>
    <Scroll class="content">
      <div class="scroll-content">
        <div class="image" v-if="!isUploadVideo">
          <PreviewImage :uploadFileList="uploadFileList"></PreviewImage>
        </div>
        <div class="video" v-if="isUploadVideo">
          <UploadVideo
            :videoUrl="videoUrl"
            @updateVideoUrl="updateVideoUrl2"
          ></UploadVideo>
        </div>
        <div class="title">
          <van-field v-model="postModel.title" placeholder="输入标题" />
        </div>
        <div class="text" v-if="!isUploadVideo">
          <van-field
            rows="4"
            v-model="postModel.text"
            type="textarea"
            placeholder="添加正文"
          />
        </div>
        <div class="extraneous-info">
          <div class="location">
            <van-field
              v-model="locationResult"
              is-link
              readonly
              name="picker"
              label="添加地点"
              placeholder="点击选择地点"
              @click="showLocationPicker = true"
            ></van-field>
          </div>
          <div class="visible">
            <van-field
              v-model="visibleResult"
              is-link
              readonly
              name="picker"
              label="公开可见"
              placeholder="点击选择"
              @click="showVisiblePicker = true"
            ></van-field>
          </div>
        </div>
      </div>
    </Scroll>
    <div class="footer">
      <div class="draft">
        <i class="icon-draft"></i>
        <div class="text">存草稿</div>
      </div>
      <div class="post" @click="onSubmit">
        <div class="text">发布笔记</div>
      </div>
    </div>
    <van-popup position="bottom" v-model:show="showLocationPicker">
      <van-picker
        :columns="locationColumns"
        @confirm="onLocationConfirm"
        @cancel="showLocationPicker = false"
      />
    </van-popup>
    <van-popup position="bottom" v-model:show="showVisiblePicker">
      <van-picker
        :columns="visibleColumns"
        @confirm="onVisibleConfirm"
        @cancel="showVisiblePicker = false"
      />
    </van-popup>
  </div>
</template>

<script>
import PreviewImage from "@/components/base/pre-image/PreviewImage.vue";
import UploadVideo from "./components/UploadVideo.vue";
import Scroll from "@/components/base/scroll/Scroll";
import { useUserStore } from "@/store/user";
import { ref } from "vue";
import { workPublishApi } from "@/api/work/publish-work";

import { useRouter } from "vue-router";
export default {
  name: "publish",
  components: { Scroll, PreviewImage, UploadVideo },
  setup() {
    const router = useRouter();
    const postModel = ref({
      title: "",
      text: "",
      location: "东莞",
      privateFlag: 1,
    });
    const locationResult = ref("东莞");
    const visibleResult = ref("公开可见");
    const showLocationPicker = ref(false);
    const showVisiblePicker = ref(false);
    const uploadFileList = ref([]);

    const isUploadVideo = ref(true);
    const videoUrl = ref(null);

    const userStore = useUserStore();
    const locationColumns = [
      { text: "杭州", value: "hanzhou" },
      { text: "东莞", value: "dongguan" },
      { text: "宁波", value: "ningbo" },
      { text: "温州", value: "wenzhou" },
      { text: "绍兴", value: "shaoxing" },
      { text: "湖州", value: "huzhou" },
    ];
    const visibleColumns = [
      { text: "公开可见", value: "1" },
      { text: "仅自己可见", value: "0" },
    ];

    const onLocationConfirm = ({ selectedOptions }) => {
      postModel.value.location = selectedOptions[0]?.text;
      locationResult.value = selectedOptions[0]?.text;
      showLocationPicker.value = false;
    };
    const onVisibleConfirm = ({ selectedOptions }) => {
      postModel.value.privateFlag = selectedOptions[0]?.value;
      visibleResult.value = selectedOptions[0]?.text;
      showVisiblePicker.value = false;
    };

    async function onSubmit() {
      postModel.value.userId = userStore.getUserId();
      let type = 0;
      let imageWorkReqList = [];
      let videoWorkReq = null;
      if (isUploadVideo.value) {
        videoWorkReq = {
          videoUrl: videoUrl.value,
        };
      } else {
        type = 1;
        uploadFileList.value.forEach((element) => {
          const image = {
            imageUrl: element,
          };
          imageWorkReqList.push(image);
        });
      }
      const { code, msg, data } = await workPublishApi({
        ...postModel.value,
        imageWorkReqList,
        videoWorkReq,
        type,
      });
      if (code !== 0) {
        console.log("发布作品失败");
      } else {
        resetPostModel();
        uploadFileList.value = [];
        (locationResult.value = "宁波"), (visibleResult.value = "公开可见");
      }
    }

    function onBack() {
      router.push("/recommend");
    }

    function toggleUploadType() {
      isUploadVideo.value = !isUploadVideo.value;
    }
    function resetPostModel() {
      postModel.value = {
        title: "",
        text: "",
        location: "东莞",
        privateFlag: 1,
      };
      (videoUrl.value = null), (uploadFileList.value = []);
    }
    function updateVideoUrl2(fileUrl) {
      videoUrl.value = fileUrl;
    }
    return {
      postModel,
      visibleResult,
      locationResult,
      locationColumns,
      visibleColumns,
      onLocationConfirm,
      onVisibleConfirm,
      showLocationPicker,
      showVisiblePicker,
      uploadFileList,
      onSubmit,
      onBack,
      isUploadVideo,
      videoUrl,
      toggleUploadType,
      updateVideoUrl2,
    };
  },
};
</script>
<style lang="scss" scoped>
.publish-container {
  background: #fff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  .header {
    display: flex;
    height: 52rem;
    justify-content: space-between;
    align-items: center;
    font-size: 20rem;
    margin: 0 10rem;
    .left {
      .icon-back {
        font-size: 25rem;
      }
    }
    .right {
      .icon-tip {
        font-size: 28rem;
      }
    }
  }
  .header-two {
    line-height: 28rem;
    font-size: 20rem;
    font-weight: 900;
    margin: 8rem 0rem 10rem 0rem;
    display: flex;
    font-size: 16rem;
    .tab {
      margin: 0 15rem;
      position: relative;
      cursor: pointer;
    }
    .active {
      color: red;
      border-bottom: 3px red solid;
    }
  }
  .content {
    position: fixed;
    width: 100%;
    top: 108rem;
    bottom: 80rem;
    .scroll-content {
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow: hidden;
      .image {
        height: 110rem;
        overflow: hidden;
        margin: 8rem 8rem;
      }
      .video {
        height: 160rem;
        margin: 8rem 8rem;
      }
      .title {
        border-bottom: 1px solid #ccc;
      }
      .text {
        border-bottom: 1px solid #ccc;
      }
      .extraneous-info {
      }
    }
  }
  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 66rem;
    display: flex;
    flex-direction: row;
    background: #fff;
    margin: 0 16rem;
    z-index: -1;
    .draft {
      width: 20%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .icon-draft {
        font-size: 20rem;
      }
      .text {
        padding-top: 3rem;
        font-size: 14rem;
      }
    }
    .post {
      width: 80%;
      height: 66rem;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 8rem;
      .text {
        font-size: 17rem;
        width: 100%;
        height: 40rem;
        line-height: 40rem;
        background-color: red;
        border-radius: 20rem;
        color: #fff;
        text-align: center;
      }
    }
  }
}
</style>
