import BScroll from "@better-scroll/core";
import PullUp from "@better-scroll/pull-up";
import ObserveDOM from "@better-scroll/observe-dom";
import { onMounted, onUnmounted, ref } from "vue";
BScroll.use(PullUp);
BScroll.use(ObserveDOM);

export default function usePullUpLoad(requestData, preventPullUpLoad) {
  const scroll = ref(null);
  const rootRef = ref(null);
  const isPullUPload = ref(false);
  onMounted(() => {
    const scrollVal = (scroll.value = new BScroll(rootRef.value, {
      pullUpLoad: true,
      observeDOM: true,
      click: true,
    }));
    scrollVal.on("pullingUp", pullingUpHandler);

    async function pullingUpHandler() {
      if (preventPullUpLoad.value) {
        scrollVal.finishPullUp();
        return;
      }
      isPullUPload.value = true;
      await requestData();
      scrollVal.finishPullUp();
      scrollVal.refresh();
      isPullUPload.value = false;
    }
  });
  onUnmounted(() => {
    scroll.value.destroy();
  });
  return {
    scroll,
    rootRef,
    isPullUPload,
  };
}
