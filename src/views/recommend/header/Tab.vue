<template>
  <div class="tab">
    <router-link
      class="tab-item"
      v-for="tab in tabs"
      :key="tab.path"
      :to="tab.path"
    >
      <span class="tab-link">
        {{ tab.name }}
      </span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "tab",
  data() {
    return {
      tabs: [
        {
          name: "关注",
          path: "/about",
        },
        {
          name: "发现",
          path: "/recommend",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.tab {
  display: flex;
  height: 44px;
  line-height: 44px;
  font-size: 16px;
  .tab-item {
    flex: 1;
    text-align: center;
    .tab-link {
      padding-bottom: 5px;
      color: #5c5c5c;
    }
    &.router-link-active {
      .tab-link {
        color: #000;
        border-bottom: 2.2px solid #000;
      }
    }
  }
}
</style>
