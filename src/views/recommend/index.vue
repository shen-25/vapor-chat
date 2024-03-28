<template>
  <div class="recommend-container">
    <div class="header">
      <Header></Header>
    </div>
    <Scroll class="content">
      <div class="scroll">
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
import { ref } from "vue";
export default {
  components: { Header, Footer, Preview, Scroll },
  setup() {
    const router = useRouter();

    const workPostList = ref([]);

    const page = ref(1);
    const pageSize = ref(10);

    const keyword = ref("");

    async function getWorkPostList(param) {
      debugger;
      if (!param) {
        param = {
          keyword: keyword.value,
          page: page.value,
          pageSize: pageSize.value,
        };
      }
      try {
        const { code, msg, data } = await getWorkListApi(param);
        if (code !== 0) {
          return;
        }
        // 修改页码和数据总条数、表格赋值
        workPostList.value = data.list || [];
      } catch (e) {
      } finally {
      }
    }

    function selectWork(work) {
      router.push(`/recommend/${work.postId}`);
    }

    getWorkPostList();

    return { workPostList, selectWork };
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
