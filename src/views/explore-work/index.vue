<template>
  <div class="explore-container">
    <Header :headerData="headerData"></Header>
    <Scroll class="explore-content">
      <div>
        <div class="slider-wrapper">
          <div class="slider-content">
            <Slider v-if="sliders.length" :sliders="sliders"></Slider>
          </div>
        </div>
        <div class="work-content">
          <div class="title">{{ workDetail.title }}</div>
          <div class="text">
            {{ workDetail.text }}
          </div>
          <div class="work-tip">
            {{ workDetail.createTime }} <span>{{ workDetail.location }}</span>
          </div>
        </div>
        <div class="comment-content"></div>
      </div>
    </Scroll>
  </div>
</template>

<script>
import Slider from "@/components/base/slider/Slider.vue";
import Scroll from "@/components/base/scroll/Scroll";
import Header from "./Header.vue";
import { getWorkPostDetailApi } from "@/api/work/publish-work";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
export default {
  name: "explore",
  components: { Header, Slider, Scroll },
  setup() {
    const router = useRouter();
    const sliders = ref([]);
    const workDetail = ref({});
    const headerData = ref({});
    async function getWorkPostDetail(postId) {
      const { msg, data, code } = await getWorkPostDetailApi({ postId });
      if (code == 0) {
        workDetail.value = data;
        sliders.value = workDetail.value.imagePostList;
        headerData.value = {
          userId: data.userId,
          avatar: data.avatar,
          nickname: data.nickname,
        };
      }
    }
    getWorkPostDetail(router.currentRoute.value.params.id);

    return { sliders, workDetail, headerData };
  },
};
</script>

<style lang="scss" scoped>
.explore-container {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  z-index: 2000;
  .scroll {
  }
  .explore-content {
    height: 100%;
    overflow: hidden;
    .slider-wrapper {
      width: 100%;
      .slider-content {
        width: 100%;
        height: 100%;
      }
    }
    .work-content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin: 1rem 10rem 8rem 10rem;
      .title {
        height: 20rem;
        margin-bottom: 8rem;
        font-size: 20rem;
      }
      .text {
        line-height: 18rem;
        font-size: 16rem;
        margin-bottom: 18rem;
      }
      .work-tip {
        height: 20rem;
        font-size: 12rem;
        color: #ccc;
      }
    }
    .comment-content {
      display: flex;
      flex-direction: column;
      height: 100rem;
      margin: 1rem 10rem;
      border-top: 1px #ccc solid;
    }
  }
}
</style>
