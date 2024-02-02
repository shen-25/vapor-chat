<template>
  <div class="header">
    <router-link class="left" to="/more">
      <i class="icon-nav"></i>
    </router-link>
    <Tab class="nav" />
    <router-link class="search" to="/search">
      <i class="icon-search"></i>
    </router-link>
  </div>
</template>

<script>
import Tab from "@/components/tab/Tab";
export default {
  name: "Header",
  components: {
    Tab,
  },
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-around;
  height: 44px;
  text-align: center;
  font-size: 0;
  .left {
    .icon-nav {
      display: block;
      padding: 11px;
      font-size: $font-size-large-x;
    }
  }
  .nav {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 60%;
    margin: 0px 10px;
  }
  .search {
    .icon-search {
      display: block;
      padding: 12px;
      font-size: $font-size-large-x;
    }
  }
}
</style>
