<template>
  <div class="edit-user-info-item-container">
    <BaseHeader>
      <template v-slot:center>
        <span v-if="type === 1" class="f16">修改名字</span>
        <span v-if="type === 2" class="f16">修改抖音号</span>
        <span v-if="type === 3" class="f16">修改简介</span>
      </template>
      <template v-slot:right>
        <div>
          <span
            class="f16"
            :class="isChanged ? 'changed' : 'no-changed'"
            @click="save"
            >保存</span
          >
        </div>
      </template>
    </BaseHeader>
    <div class="content">
      <div v-if="type === 1">
        <div class="notice">我的名字</div>
        <div class="input-ctn" style="margin-bottom: 1rem">
          <input
            type="text"
            v-model="localUserInfo.nickname"
            placeholder="记得填写名字哦"
          />
          <img
            v-if="localUserInfo.nickname"
            style="transform: scale(2)"
            class="close"
            src="./images/close-and-bg.png"
            alt=""
            @click="localUserInfo.nickname = ''"
          />
        </div>
        <div class="num">{{ localUserInfo.nickname.length }}/20</div>
      </div>
      <div v-if="type === 2">
        <div class="notice">我的抖音号</div>
        <div class="input-ctn" style="margin-bottom: 10rem">
          <input type="text" v-model="localUserInfo.id" />
          <img
            v-if="localUserInfo.id"
            style="transform: scale(2)"
            class="close"
            src="./images/close-and-bg.png"
            alt=""
            @click="localUserInfo.id = ''"
          />
        </div>
        <div class="num">
          最多16个字,只允许包含字母、数字、下划线和点,30天内仅能修改一次
        </div>
      </div>
      <div v-if="type === 3" class="text-container">
        <div class="notice">个人简介</div>
        <div class="textarea-ctn">
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            v-model="localUserInfo.desc"
            placeholder="你可以填写兴趣爱好、心情愿望，有趣的介绍能让被关注的概率变高噢！"
          ></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseHeader from "@/components/base/BaseHeader.vue";
export default {
  name: "editUserInfoItem",
  components: {
    BaseHeader,
  },
  data() {
    return {
      type: 3,
      localUserInfo: {
        nickname: "大地的诗歌",
        id: "234108978153980",
        desc: "大地的诗歌从来不会死亡：当所有的鸟儿因骄阳而昏晕，隐藏在阴凉的林中，就有一种声音在新割的草地周围的树篱上飘荡那就是蝈蝈的乐音啊！它争先沉醉于盛夏的豪华，它从未感到自己的喜悦消逝，一旦唱得疲劳了，便舒适地栖息在可喜的草丛中间",
      },
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
    padding-top: 70rem;
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
