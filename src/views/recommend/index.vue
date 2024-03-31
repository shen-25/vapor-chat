<template>
  <div class="recommend-container">
    <div class="header">
      <Header></Header>
    </div>
    <Scroll class="content">
      <div class="scroll" ref="rootRef">
        <Preview :postList="workPostList" @select="selectWork" />
      </div>
    </Scroll>
    <div class="footer"><Footer /></div>
    <router-view />
  </div>
</template>

<script>
import Header from "./header/Header";
import Footer from "@/components/footer/Footer.vue";
import Preview from "@/components/preview/index.vue";
import Scroll from "@/components/base/scroll/Scroll";
import { useRouter } from "vue-router";
import { getWorkListApi } from "@/api/work/publish-work";
import { ref, computed } from "vue";
import usePullUpLoad from "@/components/base/pull-up/use-pull-up-load";
export default {
  components: { Header, Footer, Preview, Scroll },
  setup() {
    const router = useRouter();

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

    async function searchFirst() {
      page.value = 1;
      pageSize.value = 6;
      const param = {
        keyword: keyword.value,
        page: page.value,
        pageSize: pageSize.value,
      };
      try {
        const { code, msg, data } = await getWorkListApi(param);
        if (code !== 0) {
          return;
        }
        // 修改页码和数据总条数、表格赋值
        workPostList.value = data.list || [];
        isLastPage.value = data.isLastPage;
        page.value = page.value + 1;
      } catch (e) {
      } finally {
      }
    }

    async function searchMore() {
      const param = {
        keyword: keyword.value,
        page: page.value,
        pageSize: pageSize.value,
      };
      try {
        const { code, msg, data } = await getWorkListApi(param);
        if (code !== 0) {
          return;
        }
        // 修改页码和数据总条数、表格赋值
        workPostList.value = workPostList.value.concat(data.list);
        isLastPage.value = data.isLastPage;
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
        router.push(`/recommend/video/${work.postId}`);
      } else if (work.type === 1) {
        router.push(`/recommend/${work.postId}`);
      }
    }

    searchFirst();

    return { workPostList, selectWork, rootRef };
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
    border-bottom: 0.4px solid #f8ecec;
    margin-bottom: 1rem;
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
