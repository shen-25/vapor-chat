<template>
  <div class="edit-group-container">
    <div class="header">
      <div class="left" @click="cancel">取消</div>
      <div class="middle">编辑群资料</div>
      <div class="right" @click="confirm">发布</div>
    </div>
    <div class="photo">
      <div class="avatar">
        <FileUploader
          @completeOneFile="getUploadFile"
          class="file-uploader avatar-ctn"
        >
          <template v-slot:center>
            <img class="avatar" :src="editPhoto" alt="" />
            <img
              class="change"
              src="../../../assets/images/icon/me/camera-light.png"
              alt=""
            />
          </template>
        </FileUploader>
      </div>
    </div>
    <div class="name">
      <van-cell-group inset>
        <van-cell-group inset>
          <van-field
            v-model="editGroupName"
            rows="1"
            autosize
            label="群名称"
            type="textarea"
            maxlength="12"
            placeholder="请输入群名称"
            show-word-limit
            label-align="top"
          />
        </van-cell-group>
      </van-cell-group>
    </div>
    <div class="introduce">
      <van-cell-group inset>
        <van-field
          v-model="editIntroduction"
          rows="5"
          autosize
          label="群介绍"
          type="textarea"
          maxlength="100"
          placeholder="请输入群介绍"
          show-word-limit
          label-align="top"
        />
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import { cloneDeep } from "lodash-es";
import FileUploader from "@/components/file-uploader";
import { updateBasicGroupApi } from "@/api/group/group";
import { APP_ID } from "@/config/setting";
import { mapStores } from "pinia";
import { useUserStore } from "@/store/user";
import WebToolkit from "@/im/utils/web-tool-kit";
import { getClientType } from "@/utils/clien-type";
export default {
  props: {
    data: {
      type: Object,
    },
  },
  components: { FileUploader },
  data() {
    return {
      editPhoto: cloneDeep(this.data.photo),
      editGroupName: cloneDeep(this.data.name),
      editIntroduction: cloneDeep(this.data.introduction),
    };
  },
  methods: {
    cancel() {
      this.$emit("toggle", false);
    },
    confirm() {
      this.updateBasicGroup();
    },
    async updateBasicGroup() {
      const imei = WebToolkit.getDeviceInfo().system;
      const param = {
        appId: APP_ID,
        userId: this.userStore.getUserId(),
        imei,
        clientType: getClientType(imei),
        photo: this.editPhoto,
        groupId: this.data.groupId,
        name: this.editGroupName,
        introduction: this.editIntroduction,
      };
      const { msg, data, code } = await updateBasicGroupApi(param);
      if (code === 0) {
        this.$emit("toggle", true, {
          photo: this.editPhoto,
          name: this.editGroupName,
          introduction: this.editIntroduction,
        });
      }
    },
    getUploadFile(fileUrl) {
      this.editPhoto = fileUrl;
    },
  },
  computed: {
    ...mapStores(useUserStore),
  },
};
</script>

<style lang="scss" scoped>
.edit-group-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 600;
  background: #f2f2f4;
  .header {
    height: 50rem;
    padding: 0 10rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ebebec;
    background-color: #fff;
    font-size: 14rem;
    .left {
      padding: 10rem 10rem;
      display: flex;
    }
    .middle {
      color: #000;
      font-size: 16rem;
    }
    .right {
      background: #ccc;
      border-radius: 18rem;
      height: 30rem;
      line-height: 30rem;
      text-align: center;
      width: 66rem;
    }
  }
  .photo {
    margin-bottom: 20rem;
    .avatar {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      margin: 20rem 0rem 18rem 0rem;
      $avatar-width: 90rem;
      .avatar-ctn {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 10rem;
        width: $avatar-width;
        height: $avatar-width;

        .avatar {
          position: absolute;
          width: $avatar-width;
          height: $avatar-width;
          border-radius: 50%;
          padding: 20rem 20rem;
        }
        .change {
          left: 35rem;
          bottom: -42rem;
          width: 28rem;
          z-index: 9;
          position: relative;
        }
      }
    }
  }
  .name {
    margin-bottom: 20rem;
  }
}
</style>
