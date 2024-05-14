<template>
  <div class="search-input">
    <i class="icon-search"></i>
    <input class="input-inner" v-model="query" :placeholder="placeholder" />
    <i class="icon-wrong" @click="clear" v-show="query"></i>
  </div>
</template>
<script>
import { debounce } from "throttle-debounce";
export default {
  name: "SearchInput",
  props: {
    modelValue: String,
    placeholder: {
      type: String,
      default: "搜索作品",
    },
  },

  data() {
    return {
      query: this.modelValue,
    };
  },

  methods: {
    clear() {
      this.query = "";
    },
  },
  created() {
    this.$watch(
      "query",
      debounce(300, (newQuery) => {
        this.$emit("update:modelValue", newQuery.trim());
      })
    );
    this.$watch("modelValue", (newValue) => {
      this.query = newValue;
    });
  },
};
</script>

<style lang="scss" scoped>
.search-input {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  padding: 0 6rem;
  height: 40rem;
  border-radius: 6rem;
  font-size: 16rem;
  background: #f7f7f7;
  .icon-search {
    font-size: 24rem;
  }
  .input-inner {
    flex: 1;
    margin: 0 5rem;
    line-height: 18rem;
    outline: 0;
    background: #f7f7f7;
    &::placeholder {
      color: #bcbcbc;
    }
  }
  .icon-wrong {
    font-size: 22rem;
    color: rgba(51, 51, 51, 0.8);
  }
}
</style>
