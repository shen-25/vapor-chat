<template>
  <div class="like-container">
    <i :class="iconClass"></i>
    <span class="count" @click.stop="onLikeBtn">{{ count }}</span>
  </div>
</template>

<script>
import { addLikeApi, deleteLikeApi } from "@/api/interact/like";
import { cloneDeep } from "lodash-es";
import { computed, ref } from "vue";

export default {
  name: "like",
  props: {
    isLike: {
      type: Boolean,
      default: false,
    },
    likeCount: {
      type: String,
      default: "0",
    },
    userId: {
      type: String,
    },
    postId: {
      type: String,
    },
  },
  setup(props) {
    const like = ref(cloneDeep(props.isLike));
    const count = ref(cloneDeep(props.likeCount));
    const iconClass = computed(() => {
      return like.value ? "icon-liked" : "icon-like";
    });
    function onLikeBtn() {
      if (like.value) {
        deleteWorkLike();
        return;
      } else {
        addWorkLike();
        return;
      }
    }
    async function addWorkLike() {
      const param = {
        postId: props.postId,
        userId: props.userId,
      };
      const { msg, data, code } = await addLikeApi(param);
      if (code == 0) {
        like.value = true;
        count.value++;
      }
    }
    async function deleteWorkLike() {
      const param = {
        postId: props.postId,
        userId: props.userId,
      };
      const { msg, data, code } = await deleteLikeApi(param);
      if (code == 0) {
        like.value = false;
        count.value--;
      }
    }
    return {
      iconClass,
      like,
      count,
      onLikeBtn,
    };
  },
};
</script>

<style lang="scss" scoped>
.like-container {
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
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
