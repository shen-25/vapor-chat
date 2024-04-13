<template>
  <div class="login-container">
    <div class="header">
      <!-- <i class="icon-back" @click="goBack"></i> -->
    </div>
    <div class="main">
      <div class="desc">
        <h1>社交平台</h1>
        <span>国际互联网入口</span>
      </div>
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field
            v-model="loginModel.email"
            name="email"
            placeholder="邮箱"
          />
          <van-field
            v-model="loginModel.password"
            class="password"
            type="password"
            name="密码"
            placeholder="密码"
            show-password-immediately
          />
        </van-cell-group>
        <div class="submit">
          <van-button block type="primary" native-type="submit">
            登录
          </van-button>
        </div>
      </van-form>
      <div class="tip">
        <a href="#/register">注册</a>
        <span>|</span>
        <a href="#/forget">忘记密码</a>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, inject } from "vue";
import { loginApi } from "@/api/user/user.js";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/user";
import WebToolkit from "@/im/utils/web-tool-kit";
import { showNotify } from "vant";

export default {
  name: "login",

  setup() {
    const imSdk = inject("$imSdk");
    const router = useRouter();
    const userStore = useUserStore();

    const loginModel = ref({
      email: "",
      password: "",
    });

    async function onSubmit() {
      const { code, msg, data } = await loginApi({
        email: loginModel.value.email,
        password: loginModel.value.password,
      });
      if (code !== 0) {
        showNotify({ type: "danger", message: msg });
        // 登录失败
      } else {
        showNotify({ type: "success", message: "登录成功" });

        console.log(data);
        localStorage.setItem("userInfo", JSON.stringify(data));
        userStore.setUserInfo(data);
        const imei = WebToolkit.getDeviceInfo().system;
        await imSdk.initIm(
          "",
          data.appId,
          data.userId,
          imei,
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
  background-color: #ffffff;
  position: fixed;
  width: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  .header {
    height: 50rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 8rem 16rem;
    .icon-back {
      font-size: 26rem;
    }
  }
  .main {
    padding: 0rem 17rem;
    .desc {
      text-align: center;
      margin-bottom: 30rem;
      h1 {
        font-size: 22rem;
        font-weight: 600;
        margin-bottom: 10rem;
      }
      span {
        font-size: 14rem;
        color: #999;
        word-break: break-all;
        text-align: center;
      }
    }
    .van-cell-group {
      background: none;
    }
    .van-cell-group--inset {
      padding-top: 8rem;
      margin: 0;
    }
    .van-cell {
      margin-bottom: 18rem;
      font-size: 16rem;
      border: 1px solid #d9d9d9;
    }
    .account {
      margin-bottom: 10rem;
    }
    .submit {
      font-size: 16rem;
    }
    .tip {
      margin-top: 22rem;
      font-size: 15rem;
      a {
        transition: opacity 0.3s;
        opacity: 0.7;
        text-decoration: none;
        color: #000;
      }
      span {
        padding: 0rem 2rem;
        opacity: 0.2;
        font-size: 14rem;
        color: #000;
      }
    }
    .emailCode {
      display: flex;
      flex-direction: row;
      padding-right: 0rem;
    }
    .send-code-button {
      width: 88rem;
      height: 44rem;
      font-size: 16rem;
      line-height: 44rem;
      text-align: center;
      text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
      box-shadow: 0 2rem #0000000b;
      border-radius: 6rem;
      border-color: rgb(59, 89, 152);
      background: rgb(59, 89, 152);
    }
    .send {
      color: #fff;
    }
    .timer {
      color: #00000040;
      font-size: 15rem;
    }
  }
}
</style>
