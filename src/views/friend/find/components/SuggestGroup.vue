<template>
  <div ref="rootRef" class="suggest">
    <ul class="suggest-list">
      <div class="suggest-item" v-for="item in groupList" :key="item.id">
        <div class="left">
          <img :src="item.photo" alt="" />
        </div>
        <div class="middle">
          <div class="name">{{ item.name }}</div>
          <div class="tip">
            {{ item.introduction }}
          </div>
        </div>
        <div class="right no-fan-class">
          <span>加入</span>
        </div>
      </div>
    </ul>
  </div>
</template>

<script>
import { computed, nextTick, ref, watch } from "vue";
import usePullUpLoad from "@/components/base/pull-up/use-pull-up-load";
import WebToolkit from "@/im/utils/web-tool-kit";
import { getClientType } from "@/utils/client-type";
import { useUserStore } from "@/store/user";
import { APP_ID } from "@/config/setting";
import { searchGroupApi } from "@/api/group/group";
export default {
  name: "Suggest",
  props: {
    query: String,
    searchType: Number,
  },
  emits: ["selectUser", "selectAdd"],
  setup(props, { emit }) {
    const groupList = ref([]);
    const hasMore = ref(true);
    const page = ref(1);
    const pageSize = ref(1);
    const manualLoading = ref(false);

    const userStore = useUserStore();

    const noResult = computed(() => {
      return !groupList.value && !groupList.value.length && !hasMore.value;
    });

    const loading = computed(() => {
      return !groupList.value && !groupList.value.length;
    });

    const pullUpLoading = computed(() => {
      return isPullUPload.value && hasMore.value;
    });

    const preventPullUpLoad = computed(() => {
      return loading.value || !hasMore.value || manualLoading.value;
    });

    const { rootRef, isPullUPload, scroll } = usePullUpLoad(
      searchMore,
      preventPullUpLoad
    );

    watch(
      () => props.query,
      async (newQuery) => {
        if (!newQuery) {
          return;
        }
        await searchFirst();
      }
    );

    async function searchFirst() {
      if (!props.query) {
        return;
      }
      if (props.searchType != 2) {
        return;
      }
      // 重置
      page.value = 1;
      groupList.value = [];
      hasMore.value = true;
      const param = {
        userId: userStore.getUserId(),
        keyword: props.query,
        page: page.value,
        pageSize: pageSize.value,
      };
      const { code, msg, data } = await searchGroupApi(param);
      if (code == 0) {
        groupList.value = data.list;
        hasMore.value = !data.isLastPage;
        page.value = page.value + 1;
        await nextTick();
        await makeItScrollable();
      }
    }

    async function makeItScrollable() {
      if (!hasMore.value) {
        return;
      }
      if (props.searchType != 2) {
        return;
      }
      if (scroll.value.maxScrollY >= -1) {
        manualLoading.value = true;
        await searchMore();
        manualLoading.value = false;
      }
    }
    async function searchMore() {
      if (props.searchType != 1) {
        return;
      }
      const param = {
        userId: userStore.getUserId(),
        keyword: props.query,
        page: page.value,
        pageSize: pageSize.value,
      };
      const { code, msg, data } = await searchGroupApi(param);
      if (code == 0) {
        groupList.value = groupList.value.concat(data.list);
        hasMore.value = !data.isLastPage;
        page.value = page.value + 1;
        await nextTick();
        await makeItScrollable();
      }
    }

    return { rootRef, groupList };
  },
};
</script>

<style lang="scss" scoped>
.fan-class {
  background: #fff !important;
  color: #000 !important;
}
.suggest {
  height: 100%;
  overflow: hidden;
  .suggest-list {
    padding: 0 20rem;
    .suggest-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 18rem;
      height: 52rem;
      .left {
        width: 58rem;
        img {
          width: 50rem;
          height: 50rem;
          border-radius: 50%;
        }
      }
      .middle {
        flex: 1;
        margin-top: 4rem;
        padding-left: 5rem;
        border-bottom: 1px #ccc solid;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        .name {
          font-size: 16rem;
        }
        .tip {
          padding: 4rem 0rem;
          font-size: 12rem;
        }
      }
      .right {
        width: 60rem;
        height: 30rem;
        border: 1px #ccc solid;
        font-size: 15rem;
        line-height: 30rem;
        text-align: center;
        border-radius: 8rem;
        background: red;
        color: #fff;
      }
    }
  }
}
</style>
