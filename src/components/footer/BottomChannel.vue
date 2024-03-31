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
          name: "消息",
          path: "/message",
        },
        {
          name: "推荐",
          path: "/recommend",
        },
        {
          name: "发布",
          path: "/publishWork",
        },
        {
          name: "通讯录",
          path: "/friend",
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
.icon-add {
  font-size: 36rem;
}
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
