<template>
  <div class="find-container">
    <div class="header">
      <div class="left" @click="goBack">
        <i class="icon-back"></i>
      </div>
      <div class="middle">
        <div class="item" :class="getFindCls(true)" @click="onFindBtn(1)">
          找人
        </div>
        <div class="item" @click="onFindBtn(2)" :class="getFindCls(false)">
          找群
        </div>
      </div>
      <div class="right"></div>
    </div>
    <div class="search-input-wrapper">
      <SearchInput v-model="query" :placeholder="placeholder"></SearchInput>
    </div>
    <div class="search-result" v-show="query">
      <Suggest
        :query="query"
        :searchType="searchType"
        v-if="searchType == 1"
        @selectSong="selectSong"
        @selectSinger="selectSinger"
      />
      <SuggestGroup
        :query="query"
        v-if="searchType == 2"
        :searchType="searchType"
        @selectSong="selectSong"
        @selectSinger="selectSinger"
      />
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import SearchInput from "./components/SearchInput.vue";
import Suggest from "./components/Suggest.vue";
import SuggestGroup from "./components/SuggestGroup.vue";

import { useRouter } from "vue-router";
export default {
  components: { SearchInput, Suggest, SuggestGroup },
  setup() {
    const router = useRouter();
    const showFindStyle = ref(false);
    const placeholder = ref("昵称/邮箱");
    const searchType = ref(1);
    function onFindBtn(val) {
      if (val == 1) {
        placeholder.value = "昵称/邮箱";
      } else {
        placeholder.value = "搜索群号/群名称";
      }
      query.value = "";
      searchType.value = val;
      showFindStyle.value = !showFindStyle.value;
    }
    function getFindCls(val) {
      if (showFindStyle.value == val) {
        return "findCls";
      }
      if (showFindStyle.value != val) {
        return "";
      }
    }
    const findTipStyle = computed(() => {
      const backgroundColor = "#fff";
      const color = "#000";
      return {
        backgroundColor,
        color,
      };
    });
    function goBack() {
      router.back();
    }

    const query = ref("");

    return {
      findTipStyle,
      showFindStyle,
      onFindBtn,
      getFindCls,
      goBack,
      // 搜索
      query,
      placeholder,
      searchType,
    };
  },
};
</script>
<style lang="scss" scoped>
.findCls {
  background: #fff !important;
  color: #000 !important;
}
.find-container {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50rem;
    margin: 8rem 16rem;
    .left {
      .icon-back {
        font-size: 24rem;
      }
    }
    .middle {
      width: 120rem;
      display: flex;
      align-items: center;
      border: 2px solid #000;
      .item {
        height: 30rem;
        line-height: 30rem;
        width: 70rem;
        background: #000;
        color: #fff;
        font-size: 16rem;
        text-align: center;
      }
    }
  }
  .search-input-wrapper {
    margin: 20rem;
  }
  .search-result {
    flex: 1;
    overflow: hidden;
  }
}
</style>
