<template>
  <div class="slider" ref="rootRef">
    <slot></slot>
  </div>
</template>

<script>
import { ref } from "vue";
import useSlider from "./use-slider";

export default {
  name: "slider",
  props: {},
  setup() {
    const rootRef = ref(null);
    const { slider } = useSlider(rootRef);
    return {
      rootRef,
      slider,
    };
  },
};
</script>

<style lang="scss" scoped>
.slider {
  min-height: 1px;
  font-size: 0;
  touch-action: pan-y;
}
</style>
