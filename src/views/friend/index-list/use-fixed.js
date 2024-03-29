import { ref, computed, watch, nextTick } from "vue";
export default function useFixed(props) {
  const groupRef = ref(null);
  const listHeight = ref([]);
  const scrollY = ref(0);
  const currentIndex = ref(0);
  const distance = ref(0);
  const TITLE_HEIGHT = 30;

  const fixedTitle = computed(() => {
    if (scrollY.value < 0) {
      return "";
    }
    const currentGroup = props.data[currentIndex.value];
    return currentGroup ? currentGroup.title : "";
  });

  const fixedStyle = computed(() => {
    const distanceVal = distance.value;
    const diff =
      distanceVal > 0 && distanceVal < TITLE_HEIGHT
        ? distanceVal - TITLE_HEIGHT
        : 0;
    return {
      transform: `translate3d(0, ${diff}px, 0)`,
    };
  });

  watch(
    () => props.data,
    async () => {
      await nextTick();
      calculate();
    }
  );

  watch(scrollY, (newY) => {
    const listHeightValue = listHeight.value;
    for (let i = 0; i < listHeightValue.length - 1; i++) {
      const heightTop = listHeightValue[i];
      const heightButton = listHeightValue[i + 1];
      if (newY >= heightTop && newY <= heightButton) {
        currentIndex.value = i;
        distance.value = heightButton - newY;
      }
    }
  });

  function calculate() {
    const list = groupRef.value.children;
    const listHeightValue = listHeight.value;
    let height = 0;
    listHeightValue.length = 0;

    listHeightValue.push(height);
    for (let i = 0; i < list.length; i++) {
      height += list[i].clientHeight;
      listHeightValue.push(height);
    }
  }

  function onScroll(pos) {
    scrollY.value = -pos.y;
  }

  return {
    groupRef,
    onScroll,
    fixedTitle,
    fixedStyle,
    currentIndex,
  };
}
