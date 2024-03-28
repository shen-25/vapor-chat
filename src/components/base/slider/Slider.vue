<template>
  <div class="slider" ref="rootRef">
    <div class="slider-group">
      <div class="slider-page" v-for="(item, index) in sliders" :key="index">
        <img :src="item.imageUrl" />
      </div>
    </div>
    <div class="dots-wrapper">
      <div
        class="dot"
        v-for="(item, index) in sliders"
        :key="item"
        :class="{ active: currentPageIndex === index }"
      ></div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import useSlider from "./use-slider";

export default {
  name: "slider",
  props: {
    sliders: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  setup() {
    const rootRef = ref(null);
    const { currentPageIndex } = useSlider(rootRef);
    return {
      rootRef,
      currentPageIndex,
    };
  },
};
</script>

<style lang="scss" scoped>
.slider {
  min-height: 1px;
  width: 100%;
  font-size: 0;
  touch-action: pan-y;
  .slider-group {
    position: relative;
    overflow: hidden;
    white-space: nowrap;
    .slider-page {
      display: inline-block;
      transform: translate3d(0, 0, 0);
      backface-visibility: hidden;
      a {
        display: block;
        width: 100%;
      }
      img {
        display: block;
        width: 100%;
      }
    }
  }
  .dots-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 24px;
    line-height: 24px;
    .dot {
      display: inline-block;
      margin: 0 4px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: rgba(72, 65, 65, 0.5);
      &.active {
        width: 18px;
        border-radius: 5px;
        background-color: rgba(223, 40, 40, 0.8);
      }
    }
  }
}
</style>
