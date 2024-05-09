<template>
  <div class="tabs">
    <div
      class="tab"
      v-for="(item, index) in tabTexts"
      @click="changeIndex(index)"
      :key="item"
      :class="currentTabIndex === index ? 'active' : ''"
    >
      {{ item.name }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currentTabIndex: {
      type: Number,
      default: 0,
    },
    tabTexts: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {};
  },
  emit: ["update:currentTabIndex"],
  methods: {
    changeIndex(index) {
      this.$emit("update:currentTabIndex", index);
    },
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
.tabs {
  font-size: 14rem;
  width: 100%;
  height: 38rem;
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  .tab {
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: gray;
    transition: color 0.3s;
    font-size: 16rem;
    &.active {
      color: #000;
      font-weight: 550;
      border-bottom: 2px solid #000;
    }
  }
}
</style>
