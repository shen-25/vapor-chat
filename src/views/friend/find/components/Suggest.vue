<template>
  <div ref="rootRef" class="suggest">
    <ul class="suggest-list">
      <div class="suggest-item" v-for="item in userList" :key="item.userId">
        <div class="left">
          <img :src="item.avatarUrl" alt="" />
        </div>
        <div class="middle">
          <div class="name">{{ item.nickname }}</div>
          <div class="tip"></div>
        </div>
        <div
          class="right no-fan-class"
          :class="getFanClass(item.isFan, item.isFriend)"
          @click="onFanBtn(item)"
        >
          <span>{{ getFollowText(item.isFan, item.isFriend) }}</span>
        </div>
      </div>
    </ul>
  </div>
</template>

<script>
import { computed, nextTick, ref, watch } from "vue";
import usePullUpLoad from "@/components/base/pull-up/use-pull-up-load";
import { getByNameOrMobileApi } from "@/api/user/user";
import { addFanApi, deleteFanApi } from "@/api/interact/fan";
import WebToolkit from "@/im/utils/web-tool-kit";
import { getClientType } from "@/utils/client-type";
import { useUserStore } from "@/store/user";
import { APP_ID } from "@/config/setting";
export default {
  name: "Suggest",
  props: {
    query: String,
  },
  emits: ["selectUser", "selectAdd"],
  setup(props, { emit }) {
    const userList = ref([]);
    const hasMore = ref(true);
    const page = ref(1);
    const pageSize = ref(1);
    const manualLoading = ref(false);

    const userStore = useUserStore();

    const noResult = computed(() => {
      return !userList.value && !userList.value.length && !hasMore.value;
    });

    const loading = computed(() => {
      return !userList.value && !userList.value.length;
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
      // 重置
      page.value = 1;
      userList.value = [];
      hasMore.value = true;
      const param = {
        userId: userStore.getUserId(),
        keyword: props.query,
        page: page.value,
        pageSize: pageSize.value,
      };
      const { code, msg, data } = await getByNameOrMobileApi(param);
      if (code == 0) {
        userList.value = data.list;
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
      console.log(scroll.value.maxScrollY);
      if (scroll.value.maxScrollY >= -1) {
        manualLoading.value = true;
        await searchMore();
        manualLoading.value = false;
      }
    }
    async function searchMore() {
      if (!hasMore.value && !props.query) {
        return;
      }
      const param = {
        userId: userStore.getUserId(),
        keyword: props.query,
        page: page.value,
        pageSize: pageSize.value,
      };
      const { code, msg, data } = await getByNameOrMobileApi(param);
      if (code == 0) {
        userList.value = userList.value.concat(data.list);
        hasMore.value = !data.isLastPage;
        page.value = page.value + 1;
        await nextTick();
        await makeItScrollable();
      }
    }

    function getFanClass(isFan, isFriend) {
      return isFan || isFriend ? "fan-class" : "";
    }
    function getFollowText(isFan, isFriend) {
      if (isFriend) {
        return "朋友";
      }
      return isFan ? "已关注" : "关注";
    }

    function addFan(fromId, toId) {
      const imei = WebToolkit.getDeviceInfo().system;
      const param = {
        fromId,
        toId,
        appId: APP_ID,
        imei,
        clientType: getClientType(imei),
      };
      const { code, msg, data } = addFanApi(param);
      if (code == 0) {
      }
    }

    // 删除粉丝
    function deleteFan(fromId, toId) {
      const imei = WebToolkit.getDeviceInfo().system;
      const param = {
        fromId,
        toId,
        appId: APP_ID,
        imei,
        clientType: getClientType(imei),
      };
      const { code, msg, data } = deleteFanApi(param);
      if (code == 0) {
      }
    }

    function onFanBtn(item) {
      const toId = item.userId;
      const fromId = userStore.getUserId();
      if (item.isFan) {
        deleteFan(fromId, toId);
        item.isFan = false;
        item.isFriend = false;
      } else {
        addFan(fromId, toId);
        item.isFan = true;
      }
    }
    return { rootRef, userList, getFanClass, getFollowText, onFanBtn };
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
        height: 43rem;
        border-bottom: 1px #ccc solid;
        .name {
          font-size: 17rem;
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
