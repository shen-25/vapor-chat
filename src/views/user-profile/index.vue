<template>
  <div>
    <div class="user-profile-container">
      <div ref="float" class="float" :class="floatCls">
        <div class="left" @click="goBack">
          <i class="icon-back"></i>
        </div>
        <transition name="fade">
          <div class="center" v-if="floatFixed">
            <p class="name f15 mt1r mb1r">{{ userInfo.nickname }}</p>
          </div>
        </transition>

        <div class="right">
          <div class="item">
            <i class="icon-share"></i>
          </div>
        </div>
      </div>
      <Scroll
        class="user-profile-content"
        :probe-type="3"
        @scroll="onScroll"
        ref="scrollRef "
      >
        <div>
          <div class="desc">
            <header
              :style="{ 'background-image': `url(${userInfo.bgImageUrl})` }"
            >
              <div class="info">
                <img :src="userInfo.avatarUrl" class="avatar" />
                <div class="right">
                  <p class="name">{{ userInfo.nickname }}</p>
                  <div class="number mb1r">
                    <span>短号: {{ userInfo.shortname }}</span>
                  </div>
                </div>
              </div>
            </header>
            <div class="detail">
              <div class="head">
                <div class="heat">
                  <div class="text">
                    <span class="num">{{ uerStatistics.likeCount }}</span>
                    <span>获赞</span>
                  </div>
                  <div class="text">
                    <span class="num">{{ uerStatistics.followCount }}</span>
                    <span>关注</span>
                  </div>
                  <div class="text">
                    <span class="num">{{ uerStatistics.fanCount }}</span>
                    <span>粉丝</span>
                  </div>
                </div>
                <div class="msg-container">
                  <div class="follow" @click="onAddFanBtn">关注</div>
                  <div class="to-send" @click="onSendBtn">私信</div>
                </div>
              </div>
              <div class="signature">
                <template v-if="true">
                  <span>{{ getSignature() }}</span>
                </template>
              </div>
              <div class="more">
                <div class="age item" v-if="userInfo">
                  <img
                    v-if="userInfo.sex == 2"
                    src="../../assets/images/icon/me/woman.png"
                    alt=""
                  />
                  <img
                    v-if="userInfo.sex == 1"
                    src="../../assets/images/icon/me/man.png"
                    alt=""
                  />
                  <span>难</span>
                </div>
                <div class="item" v-if="userInfo.province">
                  {{ userInfo.province + "-" + userInfo.city }}
                </div>
                <div class="item" v-if="userInfo.school">
                  {{ userInfo.school }}
                </div>
              </div>
            </div>
          </div>
          <Indicator
            :tabTexts="tabTexts"
            v-model:currentTabIndex="currentTabIndex"
          >
          </Indicator>
          <div class="preview-container" ref="rootRef">
            <Preview :postList="myWorkPostList" @select="selectWork"></Preview>
          </div>
        </div>
      </Scroll>
    </div>
    <Indicator
      :class="tabCls"
      v-if="showFixedIndicator"
      :tabTexts="tabTexts"
      v-model:currentTabIndex="currentTabIndex"
    >
    </Indicator>
  </div>
</template>

<script>
import Indicator from "@/components/slide/Indicator";
import Scroll from "@/components/base/scroll/Scroll";
import Preview from "@/components/preview/index.vue";
import { computed, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { getUserInfoApi } from "@/api/user/user";
import { getMyWorkListApi } from "@/api/work/publish-work";
import usePullUpLoad from "@/components/base/pull-up/use-pull-up-load";
import {
  getWorkCollectPageListApi,
  getWorkLikedPageListApi,
} from "@/api/work/publish-work";
import { getUerStatisticsApi } from "@/api/interact/fan";
export default {
  name: "Me",
  components: {
    Indicator,
    Scroll,
    Preview,
  },
  setup() {
    const tabTexts = [
      {
        name: "作品",
      },
      {
        name: "喜欢",
      },
      {
        name: "收藏",
      },
    ];
    const router = useRouter();

    const userInfo = ref({});
    const scrollRef = ref(null);
    const scrollY = ref(0);

    const DISTANCE = 100;

    const floatFixed = ref(false);

    const currentTabIndex = ref(0);

    const userId = ref(router.currentRoute.value.params.id);

    const slideRowListStyle = computed(() => {
      return {
        height: "calc(100vh - 146rem)",
      };
    });

    const floatCls = computed(() => {
      return floatFixed.value ? "fixed" : "";
    });

    const floatStyle = computed(() => {
      return floatFixed.value ? "opacity: 0;" : "";
    });

    const showFixedIndicator = ref(false);

    const tabCls = computed(() => {
      return showFixedIndicator.value ? "tabCls" : "";
    });

    watch(currentTabIndex, () => {
      myWorkPostList.value = [];
      isLastPage.value = false;
      page.value = 1;
      searchFirst();
    });

    function onScroll(pos) {
      scrollY.value = -pos.y;
      if (scrollY.value >= DISTANCE) {
        floatFixed.value = true;
      } else {
        floatFixed.value = false;
      }
      if (scrollY.value >= 297) {
        showFixedIndicator.value = true;
      } else {
        showFixedIndicator.value = false;
      }
    }

    async function getUserInfo() {
      const param = {
        userId: userId.value,
      };
      const { msg, code, data } = await getUserInfoApi(param);
      if (code === 0) {
        userInfo.value = data;
      }
    }

    //
    const myWorkPostList = ref([]);
    // requestModel
    const page = ref(1);
    const pageSize = ref(2);
    const isLastPage = ref(false);

    const loading = computed(() => {
      return !myWorkPostList.value && !myWorkPostList.value.length;
    });

    const preventPullUpLoad = computed(() => {
      return loading.value || isLastPage.value;
    });

    const { rootRef, isPullUPload, scroll } = usePullUpLoad(
      searchMore,
      preventPullUpLoad
    );

    async function searchFirst() {
      const param = {
        userId: userId.value,
        page: page.value,
        pageSize: pageSize.value,
      };
      try {
        let tmpCode = 1;
        let tempData;
        if (currentTabIndex.value == 0) {
          const { code, msg, data } = await getMyWorkListApi(param);
          tmpCode = code;
          tempData = data;
        } else if (currentTabIndex.value == 1) {
          const { code, msg, data } = await getWorkLikedPageListApi(param);
          tmpCode = code;
          tempData = data;
        } else if (currentTabIndex.value == 2) {
          const { code, msg, data } = await getWorkCollectPageListApi(param);
          tmpCode = code;
          tempData = data;
        }
        if (tmpCode !== 0) {
          return;
        }
        // 修改页码和数据总条数、表格赋值
        myWorkPostList.value = tempData.list || [];
        isLastPage.value = tempData.isLastPage;
        page.value = page.value + 1;
      } catch (e) {
      } finally {
      }
    }

    async function searchMore() {
      const param = {
        userId: userId.value,
        page: page.value,
        pageSize: pageSize.value,
      };
      try {
        let tmpCode = 1;
        let tempData;
        if (currentTabIndex.value == 0) {
          const { code, msg, data } = await getMyWorkListApi(param);
          tmpCode = code;
          tempData = data;
        } else if (currentTabIndex.value == 1) {
          const { code, msg, data } = await getWorkLikedPageListApi(param);
          tmpCode = code;
          tempData = data;
        } else if (currentTabIndex.value == 2) {
          const { code, msg, data } = await getWorkCollectPageListApi(param);
          tmpCode = code;
          tempData = data;
        }
        if (tmpCode !== 0) {
          return;
        }
        // 修改页码和数据总条数、表格赋值
        myWorkPostList.value = myWorkPostList.value.concat(tempData.list);
        isLastPage.value = tempData.isLastPage;
        page.value = page.value + 1;
      } catch (e) {
      } finally {
      }
    }

    function selectWork(work) {
      if (work.type == 0) {
        router.push(`/video/${work.postId}`);
      } else if (work.type === 1) {
        router.push(`/recommend/${work.postId}`);
      }
    }
    watch(
      () => router.currentRoute.value.query.refresh,
      (newRefresh, old) => {
        if (newRefresh) {
          getUserInfo();
        }
      }
    );
    function getSignature() {
      if (userInfo.value.signature) {
        return userInfo.value.signature;
      } else {
        return "点击添加介绍，让大家认识你...";
      }
    }
    const uerStatistics = ref({});

    async function getUerStatistics() {
      const param = {
        userId: userId.value,
      };
      const { msg, code, data } = await getUerStatisticsApi(param);
      if (code == 0) {
        uerStatistics.value = data;
      }
    }

    const likeWorkPostList = ref([]);
    searchFirst();
    getUerStatistics();
    getUserInfo();

    function goBack() {
      router.back();
    }

    function onSendBtn() {
      router.push({
        path: `/message/${userId.value}`,
      });
    }

    function onAddFanBtn() {}

    return {
      slideRowListStyle,
      selectWork,
      userInfo,
      scrollRef,
      onScroll,
      floatCls,
      floatStyle,
      floatFixed,
      tabCls,
      showFixedIndicator,
      currentTabIndex,
      tabTexts,
      rootRef,
      myWorkPostList,
      likeWorkPostList,
      getSignature,
      uerStatistics,
      goBack,
      onSendBtn,
      onAddFanBtn,
    };
  },
};
</script>

<style lang="scss" scoped>
.preview-container {
  height: 100%;
  overflow: hidden;
}

.tabCls {
  position: fixed;
  top: 45rem;
  left: 0;
  width: 100%;
  background: #fff;
  z-index: 900;
}
.float {
  position: fixed;
  box-sizing: border-box;
  width: 100vw;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 46rem;
  padding: 0 15rem;
  background: transparent;
  transition: all 0.2s;
  text-align: center;
  .center {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    color: #000;
  }

  &.fixed {
    background: #fff;
    color: #000;
    .item {
      // background: #fff !important;
    }
  }

  $h: 30rem;

  .left {
    font-size: 14rem;
    height: $h;
    display: flex;
    gap: 6rem;
    padding: 0 6rem;
    align-items: center;
    border-radius: 20rem;
    background: rgba(82, 80, 80, 0.5);
    color: white;
    .icon-back {
      font-size: 20rem;
    }

    svg {
      font-size: 16rem;
    }
  }

  .right {
    display: flex;
    .item {
      height: $h;
      width: $h;
      display: flex;
      justify-content: center;
      align-items: center;
      background: rgba(82, 80, 80, 0.5);
      border-radius: 50%;
      margin-left: 10rem;
      .icon-share {
        color: white;
        font-size: 20rem;
      }
    }
  }
}
.user-profile-container {
  position: fixed;
  background: #fff;
  width: 100%;
  top: 0rem;
  bottom: 0rem;
  overflow: scroll;
  z-index: 10;
}
.user-profile-content {
  height: 100%;
  overflow: hidden;
}

.desc {
  header {
    position: relative;
    color: white;
    height: 190rem;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    box-sizing: border-box;
    opacity: 0.9;
    .info {
      position: absolute;
      bottom: 10rem;
      left: 0;
      right: 0;
      padding: 20rem;
      display: flex;
      align-items: center;
      gap: 15rem;
      opacity: 1;
      .avatar {
        background: black;
        padding: 2px;
        border-radius: 50%;
        width: 100rem;
        height: 100rem;
      }
      .name {
        font-size: 18rem;
        margin-bottom: 5rem;
        color: #fff;
      }
      .number {
        font-size: 12rem;
        display: flex;
        align-items: center;
        img {
          width: 12rem;
          margin-left: 5rem;
        }
      }
    }
  }

  $p: 15rem;

  .detail {
    transform: translateY(-10rem);
    background: #fff;
    padding: $p $p 0 $p;
    border-radius: 14rem 14rem 0 0;

    .head {
      width: 100%;
      display: flex;
      margin-bottom: 20rem;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      .heat {
        color: #000;
        display: flex;
        gap: 30rem;
        align-items: center;
        justify-content: space-between;
        .num {
          color: #000;
          font-size: 15rem;
          font-weight: bold;
        }
        .text {
          font-size: 13rem;
          display: flex;
          align-items: center;
          flex-direction: column;
        }
      }
      .msg-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        .follow {
          width: 80rem;
          height: 30rem;
          border-radius: 10rem;
          background: rgb(244, 59, 59);
          font-size: 16rem;
          line-height: 30rem;
          text-align: center;
          color: #fff;
          margin-right: 18rem;
        }
        .to-send {
          width: 50rem;
          height: 30rem;
          border-radius: 10rem;
          font-size: 16rem;
          line-height: 30rem;
          text-align: center;
          background: #f1eeee;
        }
      }
    }

    .signature {
      font-size: 13rem;
      color: #000;
      display: flex;
      align-items: center;
      margin-bottom: 8rem;

      img {
        height: 12rem;
        margin-left: 6rem;
      }

      .text {
        white-space: pre-wrap;
      }
    }

    .more {
      margin-bottom: 10rem;
      display: flex;
      gap: 8rem;
      .item {
        padding: 2rem 5rem;
        border-radius: 2rem;
        background: #e7e7f0;
        font-size: 12rem;
        display: flex;
        align-items: center;
        color: #000;
        img {
          height: 10rem;
          margin-right: 2rem;
        }
      }
    }

    .other {
      display: flex;
      justify-content: space-between;
      .item {
        width: 20vw;
        display: flex;
        flex-direction: column;
        align-items: center;
        color: gray;
        gap: 6rem;
        font-size: 12rem;

        i {
          font-size: 24rem;
        }
      }
    }
  }
}
</style>
