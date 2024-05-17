<template>
  <div class="edit-group-notice-container">
    <div class="header">
      <div class="left" @click="cancel">取消</div>
      <div class="middle">群公告</div>
      <div class="right" @click="confirm">发布</div>
    </div>
    <div class="notice">
      <van-cell-group inset>
        <van-field
          rows="8"
          autosize
          type="textarea"
          placeholder="填写群公告"
          show-word-limit
        />
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import { cloneDeep } from "lodash-es";
import { updateBasicGroupApi } from "@/api/group/group";
import { APP_ID } from "@/config/setting";
import { mapStores } from "pinia";
import { useUserStore } from "@/store/user";
import WebToolkit from "@/im/utils/web-tool-kit";
import { getClientType } from "@/utils/client-type";
export default {
  props: {
    data: {
      type: Object,
    },
  },
  data() {
    return {
      notice: cloneDeep(this.data.notice ?? ""),
    };
  },
  methods: {
    cancel() {
      this.$emit("toggle", null);
    },
    confirm() {
      this.updateGroupNotice();
    },
    async updateGroupNotice() {
      const imei = WebToolkit.getDeviceInfo().system;
      const param = {
        appId: APP_ID,
        userId: this.userStore.getUserId(),
        imei,
        clientType: getClientType(imei),
        notice: this.notice,
        groupId: this.data.groupId,
      };
      const { msg, data, code } = await updateBasicGroupApi(param);
      if (code === 0) {
        this.$emit("toggle", this.notice);
        this.notice = "";
      }
    },
  },
  computed: {
    ...mapStores(useUserStore),
  },
};
</script>

<style lang="scss" scoped>
.edit-group-notice-container {
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
  .notice {
    margin-top: 30rem;
    font-size: 16rem;
  }
}
</style>
