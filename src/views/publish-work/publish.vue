<template>
  <div class="publish-container">
    <div class="header">
      <div class="left">
        <i class="icon-back"></i>
      </div>
      <div class="right">
        <i class="icon-tip"></i>
      </div>
    </div>
    <Scroll class="content">
      <div class="scroll-content">
        <div class="imageOrVideo">
          <PreviewImage :uploadFileList="uploadFileList"></PreviewImage>
        </div>
        <div class="title">
          <van-field v-model="postModel.title" placeholder="输入标题" />
        </div>
        <div class="text">
          <van-field
            rows="4"
            v-model="postModel.content"
            type="textarea"
            placeholder="添加正文"
          />
        </div>
        <div class="extraneous-info">
          <div class="location">
            <van-field
              v-model="postModel.location"
              is-link
              readonly
              name="picker"
              label="添加地点"
              placeholder="点击选择地点"
              @click="showLocationPicker = true"
            ></van-field>
            <van-popup position="bottom" v-model:show="showLocationPicker">
              <van-picker
                :columns="locationColumns"
                @confirm="onLocationConfirm"
                @cancel="showLocationPicker = false"
              />
            </van-popup>
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
            <van-popup position="bottom" v-model:show="showVisiblePicker">
              <van-picker
                :columns="visibleColumns"
                @confirm="onVisibleConfirm"
                @cancel="showVisiblePicker = false"
              />
            </van-popup>
          </div>
        </div>
      </div>
    </Scroll>
    <div class="footer">
      <div class="draft">
        <i class="icon-draft"></i>
        <div class="text">存草稿</div>
      </div>
      <div class="post">
        <div class="text">发布笔记</div>
      </div>
    </div>
  </div>
</template>

<script>
import PreviewImage from "@/components/base/pre-image/PreviewImage.vue";
import Scroll from "@/components/base/scroll/Scroll";
import { ref } from "vue";
export default {
  name: "publish",
  components: { Scroll, PreviewImage },
  setup() {
    const postModel = ref({
      title: "",
      content: "",
      location: "",
      visible: 1,
    });

    const visibleResult = ref("公开可见");
    const showLocationPicker = ref(false);
    const showVisiblePicker = ref(false);
    const uploadFileList = ref([
      "https://img2.baidu.com/it/u=4031236485,1141790304&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1711731600&t=65e61d251d894bb803cad5325dec188e",
      "https://img2.baidu.com/it/u=4031236485,1141790304&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1711731600&t=65e61d251d894bb803cad5325dec188e",
      "https://img2.baidu.com/it/u=4031236485,1141790304&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1711731600&t=65e61d251d894bb803cad5325dec188e",
    ]);
    const locationColumns = [
      { text: "杭州", value: "Hangzhou" },
      { text: "宁波", value: "Ningbo" },
      { text: "温州", value: "Wenzhou" },
      { text: "绍兴", value: "Shaoxing" },
      { text: "湖州", value: "Huzhou" },
    ];
    const visibleColumns = [
      { text: "公开可见", value: "1" },
      { text: "仅自己可见", value: "0" },
    ];

    const onLocationConfirm = ({ selectedOptions }) => {
      postModel.value.location = selectedOptions[0]?.text;
      showLocationPicker.value = false;
    };
    const onVisibleConfirm = ({ selectedOptions }) => {
      postModel.value.visible = selectedOptions[0]?.value;
      visibleResult.value = selectedOptions[0]?.text;
      showVisiblePicker.value = false;
    };

    return {
      postModel,
      visibleResult,
      locationColumns,
      visibleColumns,
      onLocationConfirm,
      onVisibleConfirm,
      showLocationPicker,
      showVisiblePicker,
      uploadFileList,
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
  .content {
    position: fixed;
    width: 100%;
    top: 53rem;
    bottom: 80rem;
    .scroll-content {
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow: hidden;
      .imageOrVideo {
        height: 110rem;
        overflow: hidden;
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
    z-index: 100;
    height: 66rem;
    display: flex;
    flex-direction: row;
    margin: 0 16rem;
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
