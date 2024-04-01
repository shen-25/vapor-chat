<template>
  <div class="register-container">
    <div class="header">
      <i class="icon-back" @click="goBack"></i>
    </div>
    <div class="main">
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field
            v-model="registerModel.mobile"
            name="输入手机号"
            placeholder="输入手机号"
            :rules="[{ required: true, message: '请填写手机号' }]"
          />
          <van-field
            v-model="registerModel.password"
            class="password"
            type="password"
            name="密码"
            placeholder="输入密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
        </van-cell-group>
        <div style="margin: 16px">
          <van-button block type="primary" native-type="submit">
            注册
          </van-button>
        </div>
      </van-form>
    </div>
    <div class="footer">
      <div class="tip" @click="toLogin">
        <i class="icon-add"></i><span>登录</span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { registerApi } from "@/api/user/user.js";
import { useRouter } from "vue-router";
export default {
  name: "login",

  setup() {
    const router = useRouter();
    const registerModel = ref({
      mobile: "",
      password: "",
      roleId: "1774613111052046336",
    });

    async function onSubmit() {
      const { code, msg, data } = await registerApi({
        mobile: registerModel.value.mobile,
        password: registerModel.value.password,
        roleId: registerModel.value.roleId,
      });
      if (code !== 0) {
        // 登录失败
      } else {
        toLogin();
      }
    }
    function toLogin() {
      router.push("/login");
    }
    function goBack() {
      router.back();
    }
    return {
      registerModel,
      onSubmit,
      toLogin,
      goBack,
    };
  },
};
</script>

<style lang="scss" scoped>
.register-container {
  background-color: aliceblue;
  position: fixed;
  width: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
    height: 240rem;
    padding: 0 20rem;
    .account {
      margin-bottom: 10rem;
    }
  }
  .footer {
    height: 60rem;
    margin-bottom: 26rem;
    .tip {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      .icon-add {
        font-size: 38rem;
        padding-bottom: 8rem;
      }
      span {
        font-size: 16rem;
      }
    }
  }
}
.van-cell-group {
  background: none;
}
.van-cell {
  margin-bottom: 20rem;
}
</style>
