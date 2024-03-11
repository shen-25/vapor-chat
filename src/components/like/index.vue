<template>
  <div class="like-container">
    <i :class="iconClass" @click="onLike"></i>
    <span class="count">{{ count }}</span>
  </div>
</template>

<script>
export default {
  name: "like",
  props: {
    pLike: {
      Type: Boolean,
      default: false,
    },
    pCount: {
      Type: Number,
      default: 0,
    },
    // pPostId: {
    //   Type: String,
    //   required: true,
    // },
  },
  data() {
    return {
      like: this.pLike,
      count: this.pCount,
    };
  },
  computed: {
    iconClass() {
      return this.like ? "icon-liked" : "icon-like";
    },
  },
  methods: {
    onLike() {
      this.like = !this.like;
      this.like === true ? this.count++ : this.count--;
    },
  },
};
</script>

<style lang="scss" scoped>
.like-container {
  display: flex;
  justify-content: center;
  align-items: center;
  .icon-like {
    font-size: 16rem;
  }
  .icon-liked {
    font-size: 16rem;
    color: red;
  }
  .count {
    padding-left: 2rem;
    font-size: 14rem;
  }
}
</style>
