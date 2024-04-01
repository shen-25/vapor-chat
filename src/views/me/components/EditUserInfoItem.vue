<template>
  <div class="edit-user-info-item-container">
    <div class="header">
      <div class="left" @click="goBack">
        <i class="icon-back"></i>
      </div>
      <div class="middle">
        <span v-if="type == 1" class="f16">修改名字</span>
        <span v-if="type == 2" class="f16">修改抖音号</span>
        <span v-if="type == 3" class="f16">修改简介</span>
      </div>
      <div class="right" @click="onSaveBtn">
        <span
          class="f16"
          :class="isChanged ? 'changed' : 'no-changed'"
          @click="save"
          >保存</span
        >
      </div>
    </div>
    <div class="content">
      <div v-if="type == 1">
        <div class="notice">我的名字</div>
        <div class="input-ctn" style="margin-bottom: 1rem">
          <input type="text" v-model="nickname" placeholder="记得填写名字哦" />
          <img
            v-if="userInfo.nickname"
            style="transform: scale(2)"
            class="close"
            src="../images/close-and-bg.png"
            alt=""
            @click="nickname = ''"
          />
        </div>
        <div class="num">{{ nickname ? nickname.length : 0 }}/20</div>
      </div>
      <div v-if="type == 2">
        <div class="notice">我的抖音号</div>
        <div class="input-ctn" style="margin-bottom: 10rem">
          <input type="text" v-model="shortname" />
          <img
            v-if="userInfo.id"
            style="transform: scale(2)"
            class="close"
            src="../images/close-and-bg.png"
            alt=""
            @click="shortname = ''"
          />
        </div>
        <div class="num">
          最多16个字,只允许包含字母、数字、下划线和点,30天内仅能修改一次
        </div>
      </div>
      <div v-if="type == 3" class="text-container">
        <div class="notice">个人简介</div>
        <div class="textarea-ctn">
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            v-model="signature"
            placeholder="你可以填写兴趣爱好、心情愿望，有趣的介绍能让被关注的概率变高噢！"
          ></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseHeader from "@/components/base/back/BaseHeader.vue";
import { useUserStore } from "@/store/user";
import { cloneDeep } from "lodash-es";
import { editUserInfoApi } from "@/api/user/user";
import { ref, watch } from "vue";
export default {
  name: "editUserInfoItem",
  props: {
    type: {
      type: Number,
      default() {
        return 1;
      },
    },
    userInfo: {
      type: Object,
    },
  },
  components: {
    BaseHeader,
  },
  emit: ["toggleItem"],

  setup(props, { emit }) {
    const userStore = useUserStore();

    const isChanged = ref(true);
    const nickname = ref("");
    const signature = ref("");
    const shortname = ref("");

    nickname.value = cloneDeep(props.userInfo.nickname);
    shortname.value = cloneDeep(props.userInfo.shortname);
    signature.value = cloneDeep(props.userInfo.signature);

    function goBack() {
      emit("toggleItem", false);
    }

    async function editUserInfo() {
      const param = {
        userId: userStore.getUserId(),
      };
      if (props.type == 1) {
        param.nickname = nickname.value;
      }
      if (props.type == 2) {
        param.shortname = shortname.value;
      }
      if (props.type == 3) {
        param.signature = signature.value;
      }
      const { msg, data, code } = await editUserInfoApi(param);
      if (code == 0) {
        resetEditUserInfo;
        emit("toggleItem", true);
      }
    }
    function onSaveBtn() {
      editUserInfo();
    }

    function resetEditUserInfo() {
      nickname.value = "";
      shortname.value = "";
      signature.value = "";
    }
    return {
      goBack,
      onSaveBtn,
      isChanged,
      nickname,
      shortname,
      signature,
    };
  },
};
</script>

<style lang="scss" scoped>
.changed {
  color: rgb(252, 47, 86);
}

.no-changed {
  color: rgba(252, 47, 86, 0.5);
}

.header {
  height: 50rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 6rem 18rem;
  .left {
    .icon-add {
      font-size: 20rem;
    }
  }
  .right {
  }
  .middle {
    font-size: #000;
  }
}
.edit-user-info-item-container {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: #f3ecec;
  z-index: 200;
  font-size: 18rem;

  .content {
    padding-top: 12rem;
    .notice {
      padding: 4rem 17rem;

      font-size: 17rem;
      color: #242323;
    }
    .num {
      padding: 4rem 17rem;

      font-size: 15rem;
      color: #242323;
    }

    .input-ctn {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 10rem;
      background-color: #fff;
      height: 54rem;
      margin: 0rem 10rem;
      text-align: center;
      input {
        margin: 0 10rem;
        color: #1b1a1a;
        height: 40rem;
        width: 100%;
        outline: none;
        border: none;
        background: transparent;
        font-weight: 550;

        &::placeholder {
          color: #ccc;
        }
      }

      .close {
        width: 18rem;
        height: 18rem;
        padding-right: 4rem;
      }
    }

    .text-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      overflow: hidden;
      .textarea-ctn {
        display: flex;
        align-items: center;
        background: #fff;
        margin: 10rem;
        height: 140rem;
        textarea {
          width: 100%;
          height: 100%;
          outline: none;
          border: none;
          color: #000;
          font-size: 17rem;
          &::placeholder {
            color: #1f1c1c;
          }
        }
      }
    }
  }
}
</style>
