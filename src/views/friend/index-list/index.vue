<template>
  <Scroll
    class="friend-list"
    :probe-type="3"
    @scroll="onScroll"
    ref="scrollRef"
  >
    <ul ref="groupRef">
      <li v-for="group in data" :key="group.title" class="group">
        <h2 class="title">{{ group.title }}</h2>
        <ul>
          <li
            v-for="item in group.list"
            :key="item.remark"
            class="item"
            @click="onItemClick(item)"
          >
            <img class="avatar" :src="item.avatar" />
            <span class="name">{{ item.remark }}</span>
          </li>
        </ul>
      </li>
      <div class="footer">一共{{ totalFriends }}个好友</div>
    </ul>

    <div class="fixed" v-show="fixedTitle" :style="fixedStyle">
      <div class="fixed-title">{{ fixedTitle }}</div>
    </div>
    <div
      class="shortcut"
      @touchstart.stop.prevent="onShortcutTouchStart"
      @touchmove.stop.prevent="onShortcutTouchMove"
      @touchend.stop.prevent
    >
      <ul>
        <li
          v-for="(item, index) in shortcutList"
          :key="item"
          class="item"
          :data-index="index"
          :class="{ current: currentIndex === index }"
        >
          {{ item }}
        </li>
      </ul>
    </div>
  </Scroll>
</template>

<script>
import Scroll from "@/components/base/scroll/Scroll";
import useFixed from "./use-fixed";
import useShortcut from "./use-shortcut";

export default {
  name: "IndexList",
  components: { Scroll },
  emit: ["select"],
  props: {
    data: {
      type: Array,
      default() {
        return [];
      },
    },
    totalFriends: {
      type: Number,
      default() {
        return 0;
      },
    },
  },

  setup(props, { emit }) {
    const { groupRef, onScroll, fixedTitle, fixedStyle, currentIndex } =
      useFixed(props);

    const {
      shortcutList,
      scrollRef,
      onShortcutTouchStart,
      onShortcutTouchMove,
    } = useShortcut(props, groupRef);

    const onItemClick = (item) => {
      emit("select", item);
    };
    return {
      groupRef,
      onScroll,
      fixedTitle,
      fixedStyle,
      currentIndex,
      shortcutList,
      onShortcutTouchStart,
      onShortcutTouchMove,
      scrollRef,

      onItemClick,
    };
  },
};
</script>
<style lang="scss" scoped>
.friend-list {
  position: relative;
  width: 100%;
  height: 100%;
  background: #fff;
  z-index: 300;
  overflow: hidden;
  .group {
    padding-bottom: 8rem;
    .title {
      height: 30rem;
      line-height: 30rem;
      padding-left: 20rem;
      font-size: 16rem;
      color: #898383;
      background: #eae5e5;
    }
    .item {
      display: flex;
      align-items: center;
      padding: 10rem 0 0 30rem;
      .avatar {
        width: 40rem;
        height: 40rem;
        border-radius: 10rem;
      }
      .name {
        margin-left: 20rem;
        color: #000;
        font-size: 14rem;
      }
    }
  }
  .fixed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    .fixed-title {
      height: 30rem;
      line-height: 30rem;
      padding-left: 20rem;
      // color: #000;
      // background: #eae5e5;
      font-size: 16rem;
    }
  }
  .shortcut {
    position: absolute;
    right: 4rem;
    top: 55%;
    transform: translateY(-50%);
    width: 20rem;
    padding: 20rem 0;
    border-radius: 10rem;
    text-align: center;
    color: #898383;
    font-family: Helvetica;
    .item {
      padding: 3rem;
      line-height: 1;
      font-size: 12.4rem;
      color: rgba(73, 70, 70, 0.5);
      &.current {
        // color: red;
      }
    }
  }
  .footer {
    height: 38rem;
    line-height: 38rem;
    text-align: center;
    font-size: 16rem;
    color: #aaa2a2;
  }
}
</style>
