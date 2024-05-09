<template>
  <div class="recommend-container">
    <div class="header">
      <div class="left">
        <i class="icon-nav"></i>
      </div>
      <Indicator
        class="nav"
        :tabTexts="tabTexts"
        v-model:currentTabIndex="currentTabIndex"
      >
      </Indicator>
      <div class="search" @click="onSearchBtn">
        <i class="icon-search"></i>
      </div>
    </div>
    <Scroll class="content" :click="false">
      <div class="scroll" ref="rootRef">
        <Preview :postList="workPostList" @select="selectWork" @click.stop />
      </div>
    </Scroll>
    <div class="footer"><Footer /></div>
    <router-view />
  </div>
</template>

<script>
import Indicator from "@/components/slide/Indicator";

import Footer from "@/components/footer/Footer.vue";
import Preview from "@/components/preview/index.vue";
import Scroll from "@/components/base/scroll/Scroll";
import { useRouter } from "vue-router";
import { getWorkListApi, getFollowWorkListApi } from "@/api/work/publish-work";
import { ref, computed, watch } from "vue";
import usePullUpLoad from "@/components/base/pull-up/use-pull-up-load";
import { useUserStore } from "@/store/user";
export default {
  components: { Footer, Preview, Scroll, Indicator },
  setup() {
    const tabTexts = [
      {
        name: "关注",
      },
      {
        name: "推荐",
      },
    ];

    const currentTabIndex = ref(1);

    const router = useRouter();

    const userStore = useUserStore();

    const workPostList = ref([]);

    // requestModel
    const page = ref(1);
    const pageSize = ref(2);
    const isLastPage = ref(false);
    const keyword = ref("");

    const manualLoading = ref(false);

    const loading = computed(() => {
      return !workPostList.value && !workPostList.value.length;
    });

    const preventPullUpLoad = computed(() => {
      return loading.value || isLastPage.value;
    });

    const { rootRef, isPullUPload, scroll } = usePullUpLoad(
      searchMore,
      preventPullUpLoad
    );

    watch(currentTabIndex, () => {
      workPostList.value = [];
      isLastPage.value = false;
      page.value = 1;
      searchFirst();
    });

    async function searchFirst() {
      page.value = 1;
      pageSize.value = 10;
      let tmpCode = 1;
      let tempData;
      try {
        if (currentTabIndex.value == 1) {
          const param = {
            userId: userStore.getUserId(),
            keyword: keyword.value,
            page: page.value,
            pageSize: pageSize.value,
          };
          const { code, msg, data } = await getWorkListApi(param);
          tmpCode = code;
          tempData = data;
        } else {
          const param = {
            userId: userStore.getUserId(),
            page: page.value,
            pageSize: pageSize.value,
          };
          const { code, msg, data } = await getFollowWorkListApi(param);
          tmpCode = code;
          tempData = data;
        }
        if (tmpCode !== 0) {
          return;
        }
        // 修改页码和数据总条数、表格赋值
        workPostList.value = tempData.list || [];
        isLastPage.value = tempData.isLastPage;
        page.value = page.value + 1;
      } catch (e) {
      } finally {
      }
    }

    async function searchMore() {
      let tmpCode = 1;
      let tempData;
      try {
        if (currentTabIndex.value == 1) {
          const param = {
            userId: userStore.getUserId(),
            keyword: keyword.value,
            page: page.value,
            pageSize: pageSize.value,
          };
          const { code, msg, data } = await getWorkListApi(param);
          tmpCode = code;
          tempData = data;
        } else {
          const param = {
            userId: userStore.getUserId(),
            page: page.value,
            pageSize: pageSize.value,
          };
          const { code, msg, data } = await getFollowWorkListApi(param);
          tmpCode = code;
          tempData = data;
        }
        if (tmpCode !== 0) {
          return;
        }
        // 修改页码和数据总条数、表格赋值
        workPostList.value = tempData.list || [];
        isLastPage.value = tempData.isLastPage;
        page.value = page.value + 1;
      } catch (e) {
      } finally {
      }
    }

    async function makeItScrollable() {
      if (scroll.value.maxScrollY >= -1) {
        manualLoading.value = true;
        await searchMore();
        manualLoading.value = false;
      }
    }

    function selectWork(work) {
      if (work.type == 0) {
        router.push(`/video/${work.postId}`);
      } else if (work.type === 1) {
        router.push(`/recommend/${work.postId}`);
      }
    }

    searchFirst();

    return { workPostList, selectWork, rootRef, tabTexts, currentTabIndex };
  },
};
</script>

<style lang="scss" scoped>
.recommend-container {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  background: #fff;
  z-index: 900;
  .header {
    border-bottom: 0.6px solid #ccc;
    display: flex;
    justify-content: space-between;
    height: 44px;
    text-align: center;
    font-size: 0;
    .left {
      .icon-nav {
        display: block;
        padding: 11px;
        font-size: $font-size-large-x;
      }
    }
    .nav {
      font-size: 14rem;
      width: 36%;
      height: 38rem;
      display: flex;
      justify-content: space-between;
      font-weight: bold;
    }
    .search {
      .icon-search {
        display: block;
        padding: 12px;
        font-size: $font-size-large-x;
      }
    }
  }
  .content {
    height: 100%;
    overflow: hidden;
  }
  .scroll {
    padding-bottom: 120rem;
  }
}
</style>
