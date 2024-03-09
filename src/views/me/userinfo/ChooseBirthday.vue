<template>
  <van-date-picker
    v-model="currentDate"
    title="选择日期"
    :min-date="minDate"
    :max-date="maxDate"
  />
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const currentDate = ref(["2022", "01", "01"]);
    return {
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(2025, 5, 1),
      currentDate,
    };
  },
};
</script>

<style></style>
