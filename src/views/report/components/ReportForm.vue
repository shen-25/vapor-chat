<template>
  <div class="report-form-container">
    <div class="header">
      <div class="left" @click="goBack">
        <i class="icon-back"></i>
      </div>
      <div class="middle">举报用户</div>
      <div class="right"></div>
    </div>
    <Scroll>
      <div class="content">
        <van-field
          v-model="reason"
          name="reason"
          label="举报理由"
          disabled
        ></van-field>
        <van-field name="checkboxGroup" label="请选择用户违规内容(可多选)">
          <template #input>
            <van-checkbox-group v-model="type" direction="horizontal">
              <van-checkbox
                :name="item.key"
                shape="square"
                v-for="item in TypeEnum"
                :key="item.key"
                >{{ item.value }}</van-checkbox
              >
            </van-checkbox-group>
          </template>
        </van-field>
        <van-field
          v-model="reportDesc"
          rows="6"
          label="举报描述"
          type="textarea"
          maxlength="200"
          placeholder="请描述您举报该账号的原因，提交如:哪些场景的画面让您感到不适，或其他未提及的违规内容等证据。"
          show-word-limit
        />
        <div class="evidence">
          <div class="title">图片证据</div>
          <PreviewImage :uploadFileList="evidence"></PreviewImage>
        </div>
      </div>
    </Scroll>
    <div class="footer">
      <div class="bottom" @click="onSubmitBtn">提交</div>
    </div>
  </div>
</template>

<script>
import PreviewImage from "@/components/base/pre-image/PreviewImage.vue";
import { ref } from "vue";
import Scroll from "@/components/base/scroll/Scroll.vue";
import { useUserStore } from "@/store/user";
import { addReportApi } from "@/api/report/report";
export default {
  name: "reportForm",
  components: { PreviewImage, Scroll },
  props: {
    reason: {
      type: String,
    },
    reportedUserId: {
      type: String,
    },
  },
  emits: ["close"],
  setup(props, { emit }) {
    const TypeEnum = [
      {
        key: 0,
        value: "笔记",
      },
      {
        key: 1,
        value: "评论",
      },
      {
        key: 2,
        value: "私信",
      },
      {
        key: 3,
        value: "个人资料",
      },
      {
        key: 4,
        value: "其他",
      },
    ];

    const userStore = useUserStore();
    const evidence = ref([]);
    const reportDesc = ref("");
    const type = ref([]);
    const reason = ref(props.reason);

    async function onSubmitBtn() {
      const param = {
        reportedUserId: props.reportedUserId,
        userId: userStore.getUserId(),
        reason: reason.value,
        type: type.value,
        reportDesc: reportDesc.value,
        evidence: evidence.value,
      };
      const { msg, code, data } = await addReportApi(param);
      if (code == 0) {
        resetData();
        emit("close");
      }
    }
    function resetData() {
      evidence.value = [];
      reportDesc.value = "";
      type.value = [];
    }
    function goBack() {
      emit("close");
    }

    return {
      reason,
      TypeEnum,
      type,
      reportDesc,
      evidence,
      onSubmitBtn,
      goBack,
    };
  },
};
</script>

<style lang="scss">
.report-form-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  background: #fff;
  .van-cell.van-field {
    flex-direction: column;
    .van-field__label {
      width: 100% !important;
    }
    .van-cell__value {
      padding-bottom: 0rem;
      .van-checkbox {
        padding-top: 8rem;
      }
    }
    .van-field__control {
      border: 1px #ccc solid;
      padding: 2rem;
    }
    .van-checkbox-group {
      padding: 0rem 0rem 3rem 3rem;
    }
  }
  .header {
    height: 50rem;
    padding: 0 10rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ebebec;
    background-color: #fff;
    .left {
      padding: 10rem 10rem;
      display: flex;
      .icon-back {
        font-size: 24rem;
      }
    }
    .middle {
      font-size: 17rem;
    }
    .right {
    }
  }
  .footer {
    position: absolute;
    width: 100%;
    bottom: 0;
    .bottom {
      background: rgb(223, 78, 78);
      height: 36rem;
      margin: 0rem 20rem 8rem;
      border-radius: 20rem;
      text-align: center;
      line-height: 36rem;
      font-size: 16rem;
      color: #fff;
    }
  }
  .content {
    .evidence {
      margin-left: 20rem;
    }
    .title {
      padding-bottom: 6rem;
      font-size: 15rem;
    }
  }
}
</style>
