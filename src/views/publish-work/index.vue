<template>
  <div class="publish-work-container"></div>
  <Footer />
</template>

<script>
import Footer from "@/components/footer/Footer.vue";
import { useRouter } from "vue-router";
import { onMounted } from "vue";
export default {
  components: {
    Footer,
  },
  setup() {
    const router = useRouter();

    onMounted(() => {
      router.push("/publishWork/publish");
    });
  },
};
</script>

<style lang="scss" scoped>
.publish-work-container {
  background-color: #fff;
}
</style>
