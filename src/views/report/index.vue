<template>
  <div class="report-container">
    <div class="header">
      <div class="left" @click="goBack">
        <i class="icon-back"></i>
      </div>
      <div class="middle">举报用户</div>
      <div class="right"></div>
    </div>
    <div class="content">
      <van-radio-group v-model="reason">
        <van-cell-group inset>
          <van-cell
            :title="item.title"
            clickable
            @click="reason = item.title"
            v-for="item in userReportReason"
            :key="item"
          >
            <template #right-icon>
              <van-radio :name="item.title" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </div>
    <div class="footer">
      <div class="bottom" @click="onNextBtn">下一步</div>
    </div>
    <ReportForm
      v-if="showReportFrom"
      :reason="reason"
      :reportedUserId="reportedUserId"
      @close="closeReportForm"
    ></ReportForm>
  </div>
</template>

<script>
import { ref } from "vue";
import ReportForm from "./components/ReportForm.vue";
import router from "@/router";
import { useRouter } from "vue-router";
export default {
  name: "userReport",
  components: { ReportForm },
  setup() {
    const router = useRouter();
    const showReportFrom = ref(false);

    const reason = ref("");
    const userReportReason = [
      {
        title: "违法违规",
      },
      {
        title: "色情低俗",
      },
      {
        title: "诈骗信息",
      },
      {
        title: "时政不实信息",
      },
      {
        title: "引导站外交易",
      },
      {
        title: "售卖假货",
      },
      {
        title: "低差广告",
      },
      {
        title: "冒充他人",
      },
      {
        title: "谩骂攻击",
      },
      {
        title: "涉未成年人",
      },
      {
        title: "疑似自残自杀",
      },
      {
        title: "网络暴力",
      },
      {
        title: "其他",
      },
    ];
    const reportedUserId = ref(router.currentRoute.value.params.id);
    function onNextBtn() {
      showReportFrom.value = true;
    }
    function closeReportForm() {
      showReportFrom.value = false;
    }
    function goBack() {
      router.back();
    }
    return {
      userReportReason,
      reason,
      onNextBtn,
      showReportFrom,
      reportedUserId,
      closeReportForm,
      goBack,
    };
  },
};
</script>

<style lang="scss" scoped>
.report-container {
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
}
</style>
