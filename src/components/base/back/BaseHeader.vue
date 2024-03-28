<template>
  <div id="BaseHeader" :class="[isFixed ? 'fixed' : '']">
    <div class="header">
      <Back @click="back()" class="left" />
      <slot name="center"><span></span></slot>
      <slot name="right"><span></span></slot>
    </div>
    <slot name="bottom"></slot>
  </div>
</template>
<script>
import Back from "./Back.vue";
export default {
  name: "BaseHeader",
  components: { Back },
  props: {
    backMode: {
      type: String,
      default: "gray",
    },
    backImg: {
      type: String,
      default: "back",
    },
    isClose: {
      type: Boolean,
      default: false,
    },
    isFixed: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {};
  },
  created() {},
  computed: {},
  methods: {
    back() {
      if (window.history.length <= 1) {
        this.$router.push("/");
      } else {
        this.$router.back();
      }
    },
  },
};
</script>

<style scoped lang="scss">
#BaseHeader {
  width: 100%;
  background: #fff;

  &.fixed {
    z-index: 1000;
    top: 0;
    position: fixed;
  }

  .header {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50rem;
    box-sizing: border-box;
    border-bottom: 1px solid #cccccc11;
    position: relative;

    .left {
      position: absolute;
      left: 10rem;
      top: 20rem;
    }

    & > :nth-last-child(1) {
      height: 100%;
      position: absolute;
      right: 17px;
      top: 0;
      display: flex;
      align-items: center;
    }
  }
}
</style>
