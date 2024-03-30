<template>
  <router-view />
</template>
<script>
import WebToolkit from "@/im/utils/web-tool-kit";
import { useUserStore } from "@/store/user";
import { APP_ID } from "@/config/setting";
import { inject } from "vue";
export default {
  name: "App",
  setup() {
    const imSdk = inject("$imSdk");
    const userStore = useUserStore();

    async function connectNetty() {
      if (!imSdk.isConnected()) {
        const imei = WebToolkit.getDeviceInfo().system;
        await imSdk.initIm(
          "",
          APP_ID,
          userStore.getUserId(),
          imei,
          "",
          function (sdk) {
            console.log(imSdk);
            console.log("刷新按钮时重新连接netty");
          }
        );
      }
    }
    connectNetty();
  },
};
</script>
<style lang="scss"></style>
