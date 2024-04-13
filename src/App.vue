<template>
  <router-view />
</template>
<script>
import WebToolkit from "@/im/utils/web-tool-kit";
import { useUserStore } from "@/store/user";
import { APP_ID } from "@/config/setting";
import { inject } from "vue";
import {
  SystemCommand,
  MessageCommand,
  GroupCommand,
} from "@/im/common/command";
import { showDialog } from "vant";
import { useRouter } from "vue-router";

export default {
  name: "App",
  setup() {
    const imSdk = inject("$imSdk");
    const userStore = useUserStore();
    const router = useRouter();

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

    imSdk.listeners.onUserMutualLoginEvent = (pack) => {
      const data = JSON.parse(pack);
      if (data.command == SystemCommand.MUTUAL_LOGIN) {
        showDialog({
          width: "280px",
          theme: "round-button",
          message: "你已有其他设备登录,请退出登录",
        }).then(() => {
          router.push("/login");
        });
      }
    };
    connectNetty();
  },
};
</script>
<style lang="scss"></style>
