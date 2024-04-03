import BScroll from "@better-scroll/core";
import Slide from "@better-scroll/slide";
import { onMounted, onUnmounted, ref } from "vue";

BScroll.use(Slide);

export default function useVideoSlider(wrapperRef) {
  const slider = ref(null);
  const currentPageIndex = ref(0);
  onMounted(() => {
    //把dom传给
    const sliderVal = (slider.value = new BScroll(wrapperRef.value, {
      click: true,
      scrollX: false,
      scrollY: true,
      momentum: false,
      bounce: false,
      probeType: 2,
      slide: {
        loop: false,
        autoplay: false,
      },
    }));
    sliderVal.on("slideWillChange", (page) => {
      currentPageIndex.value = page.pageY;
    });
  });

  onUnmounted(() => {
    slider.value.destroy();
  });

  return { slider, currentPageIndex };
}
