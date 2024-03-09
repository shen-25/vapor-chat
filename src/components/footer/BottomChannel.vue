<template>
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
</template>

<script>
export default {
  name: "tab",
  data() {
    return {
      tabs: [
        {
          name: "首页",
          path: "/",
        },
        {
          name: "朋友",
          path: "/friend",
        },
        {
          name: "发布",
          path: "/upload-content",
        },
        {
          name: "消息",
          path: "/message",
        },
        {
          name: "我的",
          path: "/me",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.tab-item {
  display: flex;
  flex-grow: 1;
  height: 46rem;
  justify-content: center;
  align-items: center;
  .tab-link {
    font-size: 16rem;
    color: #3d3a3a;
  }
  &.router-link-active {
    .tab-link {
      color: #000;
      font-size: 18rem;
    }
  }
}
</style>
