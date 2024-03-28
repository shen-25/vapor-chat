<template>
  <div class="login-container">
    <div class="main">
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field
            v-model="loginModel.shortname"
            name="输入账号"
            placeholder="输入用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <van-field
            v-model="loginModel.password"
            class="password"
            type="password"
            name="密码"
            placeholder="输入密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
        </van-cell-group>
        <div style="margin: 16px">
          <van-button block type="primary" native-type="submit">
            提交
          </van-button>
        </div>
      </van-form>
    </div>
    <div class="footer"></div>
  </div>
</template>

<script>
import { ref, inject } from "vue";
import { loginApi } from "@/api/user.js";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/user";

export default {
  name: "login",

  setup() {
    const imSdk = inject("$imSdk");
    const router = useRouter();
    const userStore = useUserStore();

    const loginModel = ref({
      shortname: "zengshen",
      password: "520520520",
      loginType: 1,
    });

    async function onSubmit() {
      const { code, msg, data } = await loginApi({
        shortname: loginModel.value.shortname,
        password: loginModel.value.password,
      });
      if (code !== 0) {
        // 登录失败
      } else {
        localStorage.setItem("userId", data.userId);
        userStore.setUserInfo(data);
        await imSdk.initIm(
          "",
          data.appId,
          data.userId,
          data.imei,
          data.userSign,
          function (sdk) {
            router.push("/message");
          }
        );
      }
    }
    return {
      loginModel,
      onSubmit,
    };
  },
};
</script>

<style lang="scss" scoped>
.login-container {
  background-color: aliceblue;
  position: fixed;
  width: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  .main {
    height: 200rem;
    margin-top: 170rem;
    padding: 0 20rem;
    .account {
      margin-bottom: 10rem;
    }
  }
}
</style>
