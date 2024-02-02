<template>
  <Header />
  <router-view />
</template>
<script>
import Header from "@/components/header/Header";
export default {
  name: "App",
  components: {
    Header,
  },
};
</script>
<style lang="scss"></style>
