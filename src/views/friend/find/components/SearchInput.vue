<template>
  <div class="search-input">
    <i class="icon-search"></i>
    <input class="input-inner" v-model="query" :placeholder="placeholder" />
    <i class="icon-dismiss" @click="clear" v-show="query"></i>
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
      debounce(40, (newQuery) => {
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
  height: 38rem;
  background: #d5e0f3;
  border-radius: 6rem;
  .icon-search {
    font-size: 20rem;
    color: #000;
  }
  .input-inner {
    flex: 1;
    margin: 0 5rem;
    line-height: 18rem;
    background: #d5e0f3;
    color: $color-text;
    font-size: 14rem;
    outline: 0;
    &::placeholder {
      color: #000;
    }
  }
  .icon-dismiss {
    font-size: 16rem;
    color: #000;
  }
}
</style>
