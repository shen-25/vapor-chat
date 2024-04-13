<template>
  <div class="forget-container">
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
            v-model="forgetModel.email"
            name="email"
            placeholder="邮箱"
          />
          <div class="emailCode">
            <van-field
              v-model="forgetModel.emailCode"
              name="code"
              placeholder="邮箱验证码"
            >
            </van-field>
            <div
              class="send-code-button"
              @click="onEmailCodeBtn"
              :style="viewStyle"
            >
              <span v-show="!showTime" :class="!showTime ? 'send' : 'timer'"
                >发送</span
              >
              <span v-show="showTime" :class="showTime ? 'timer' : 'send'"
                >{{ countdown }} s</span
              >
            </div>
          </div>

          <van-field
            v-model="forgetModel.password"
            class="password"
            type="password"
            name="密码"
            placeholder="密码"
            show-password-immediately
          /><van-field
            v-model="forgetModel.confirmPassword"
            class="password"
            type="password"
            name="确认密码"
            placeholder="确认密码"
          />
        </van-cell-group>
        <div class="submit">
          <van-button block type="primary" native-type="submit">
            重置密码
          </van-button>
        </div>
      </van-form>
      <div class="tip">
        <a href="#/login">返回登录</a>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { forgetPasswordApi, sendEmailCodeApi } from "@/api/user/user.js";
import { useRouter } from "vue-router";
import { showNotify } from "vant";

export default {
  name: "login",

  setup() {
    const router = useRouter();

    const showTime = ref(false);
    const countdown = ref(5 * 60);
    const forgetModel = ref({
      email: "",
      password: "",
      confirmPassword: "",
      emailCode: "",
    });
    async function onSubmit() {
      const { code, msg, data } = await forgetPasswordApi({
        ...forgetModel.value,
      });
      if (code === 0) {
        showNotify({ type: "success", message: "重置密码成功,即将前往登录" });
        router.push("/login");
        resetForgetModel();
      } else {
        showNotify({ type: "warning", message: msg });
      }
    }
    function resetForgetModel() {
      forgetModel.value = {
        email: "",
        password: "",
        confirmPassword: "",
        emailCode: "",
      };
    }
    async function onEmailCodeBtn() {
      if (!forgetModel.value.email) {
        showNotify({ type: "warning", message: "邮箱格式不正确" });
      }
      const param = {
        email: forgetModel.value.email,
        isCheckEmail: true,
      };
      const { code, msg, data } = await sendEmailCodeApi(param);
      if (code == 0) {
        interValTime();
      }
    }
    function interValTime() {
      //点击发送出现60秒倒计时
      let timer = setInterval(() => {
        countdown.value--;
        if (countdown.value <= 0) {
          clearInterval(timer);
          showTime.value = false;
          countdown.value = 300;
        }
      }, 1000);

      showTime.value = true;
    }

    const viewStyle = computed(() => {
      if (showTime.value) {
        let borderColor = '"#d9d9d9';
        let backgroundColor = "#f5f5f5";
        return {
          borderColor,
          backgroundColor,
        };
      } else {
        return {};
      }
    });

    return {
      forgetModel,
      onSubmit,
      showTime,
      onEmailCodeBtn,
      countdown,
      viewStyle,
    };
  },
};
</script>

<style lang="scss" scoped>
.forget-container {
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
