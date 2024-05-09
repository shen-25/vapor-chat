<template>
  <div class="join-group-container">
    <div class="header">
      <div class="left" @click="goBack">
        <i class="icon-back"></i>
      </div>
      <div class="middle">验证消息</div>
      <div class="right" @click="onSendBtn">发送</div>
    </div>
    <div class="content">
      <van-cell-group inset class="group">
        <van-field
          v-model="joinModel.reason"
          rows="3"
          autosize
          label="申请加群原因"
          type="textarea"
          maxlength="50"
          placeholder="请输入"
          show-word-limit
        />
        <van-field
          v-model="joinModel.introduce"
          rows="3"
          autosize
          label="进群介绍"
          type="textarea"
          maxlength="50"
          placeholder="请输入进群介绍"
          show-word-limit
        />
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/user";
import { joinGroupReqApi } from "@/api/group/group";
import { showSuccessToast } from "vant";

export default {
  setup() {
    const joinModel = ref({
      reason: "",
      introduce: "",
    });
    const router = useRouter();
    const userStore = useUserStore();
    function onSendBtn() {
      const param = {
        ...joinModel,
        toId: router.currentRoute.value.params.id,
        fromId: userStore.getUserId(),
        addSource: "搜索群组",
      };
      showSuccessToast("入群申请已发送，管理员审核中");

      const { msg, code, data } = joinGroupReqApi(param);
      if (code == 0) {
        if (data) {
        }
        router.back();
      }
    }
    function goBack() {
      router.back();
    }
    return {
      joinModel,
      goBack,
      onSendBtn,
    };
  },
};
</script>

<style lang="scss" scoped>
.join-group-container {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: #f9f8f8;

  .header {
    height: 50rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 6rem 18rem;
    font-weight: 600;
    .left {
      .icon-back {
        font-size: 20rem;
      }
    }
    .middle {
      font-size: 15rem;
    }
    .right {
      font-size: 17rem;
    }
  }
  .content {
    .van-cell {
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
