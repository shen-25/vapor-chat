<template>
  <div class="recommend-container">
    <div class="header">
      <Header></Header>
    </div>
    <Scroll class="content">
      <div>
        <Preview :postList="postList" />
      </div>
    </Scroll>
    <div class="footer"><Footer /></div>
  </div>
</template>

<script>
import Header from "./header/Header";
import Footer from "@/components/footer/Footer.vue";
import Preview from "@/components/preview/index.vue";
import Scroll from "@/components/base/scroll/Scroll";

import { ref } from "vue";
export default {
  components: { Header, Footer, Preview, Scroll },
  setup() {
    const postList = ref([1, 2, 2, 12, 12, 3, 132, 132, 312, 231, 1, 1, 1]);
    return { postList };
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
}
</style>
