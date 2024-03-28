<template>
  <div>
    <div class="container">
      <BaseHeader>
        <template v-slot:center>
          <div class="title">
            <span class="f16">编辑资料</span>
          </div>
        </template>
      </BaseHeader>
      <div class="userInfo">
        <div class="avatar">
          <div class="avatar-ctn">
            <img
              class="avatar"
              src="@\assets\images\icon\avatar\2.png"
              alt=""
            />
            <img
              class="change"
              src="../../../assets/images/icon/me/camera-light.png"
              alt=""
            />
          </div>
          <span>点击更换头像</span>
        </div>
        <div class="row" @click="showEditItem(1)">
          <div class="left">名字</div>
          <div class="right">
            <span>我是撒地方</span>
            <i class="icon-right-back"></i>
          </div>
        </div>
        <div class="row" @click="showEditItem(2)">
          <div class="left">抖音号</div>
          <div class="right">
            <span>q32443243234</span>
            <i class="icon-right-back"></i>
          </div>
        </div>
        <div class="row" @click="showEditItem(3)">
          <div class="left">简介</div>
          <div class="right">
            <span>weqrojfkalsdsfkafs</span>
            <i class="icon-right-back"></i>
          </div>
        </div>
        <div class="row" @click="showSexBtn">
          <div class="left">性别</div>
          <div class="right">
            <span>男</span>
            <i class="icon-right-back"></i>
          </div>
        </div>
        <div class="row" @click="showBirthdayBtn">
          <div class="left">生日</div>
          <div class="right">
            <span>1012-10-10</span>
            <i class="icon-right-back"></i>
          </div>
        </div>
        <div class="row" @click="showLocationBtn">
          <div class="left">所在地</div>
          <div class="right">
            <span>中国-东莞</span>
            <i class="icon-right-back"></i>
          </div>
        </div>
        <div class="row" @click="showSchoolBtn">
          <div class="left">学校</div>
          <div class="right">
            <span>东莞理工学院</span>
            <i class="icon-right-back"></i>
          </div>
        </div>
      </div>
    </div>

    <router-view></router-view>
    <!-- 底部弹出 -->
    <van-popup
      v-model:show="showSexPopup"
      position="bottom"
      round
      :style="{ height: '27.6%', color: '#000' }"
    >
      <div class="sex-container">
        <div class="item" @click="showSexBtn">男</div>
        <div class="item" @click="showSexBtn">女</div>
        <div class="item border-btm-hide" @click="showSexBtn">不展示</div>
        <div class="item-interval"></div>
        <div class="item border-btm-hide" @click="showSexBtn">取消</div>
      </div>
    </van-popup>

    <van-popup
      v-model:show="showBirthdayPopup"
      position="bottom"
      :style="{ height: '40%' }"
      ><ChooseBirthday
    /></van-popup>
    <van-popup
      v-model:show="showLocationPopup"
      position="bottom"
      :style="{ height: '38%' }"
    >
      <van-area title="选择地区" :area-list="areaList" />
    </van-popup>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { ref } from "vue";
import BaseHeader from "@/components/base/back/BaseHeader.vue";
import ChooseBirthday from "./ChooseBirthday.vue";
import { areaList } from "@vant/area-data";

export default {
  name: "EditUserInfo",
  components: {
    BaseHeader,
    ChooseBirthday,
  },
  setup() {
    const router = useRouter();

    const showSexPopup = ref(false);

    const showBirthdayPopup = ref(false);

    const showLocationPopup = ref(false);

    function showEditItem(val) {
      router.push(`/me/edit-userinfo/${val}`);
    }

    function showBirthdayBtn() {
      showBirthdayPopup.value = !showBirthdayPopup.value;
    }
    function showSexBtn() {
      showSexPopup.value = !showSexPopup.value;
    }
    function showLocationBtn() {
      showLocationPopup.value = !showLocationPopup.value;
    }

    function showSchoolBtn() {
      router.push("/me/edit/chooseSchool");
    }
    return {
      showEditItem,
      showSexPopup,
      showSexBtn,
      showBirthdayPopup,

      showBirthdayBtn,
      showLocationPopup,

      showLocationBtn,
      areaList,
      showSchoolBtn,
    };
  },
};
</script>

<style lang="scss" scoped>
.container {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  overflow: auto;
  font-size: 14rem;
  background: #fff;
  z-index: 100;
}

.title {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userInfo {
  padding-top: 60rem;
  .avatar {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 20rem 0rem 18rem 0rem;
    $avatar-width: 90rem;
    .avatar-ctn {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 10rem;
      width: $avatar-width;
      height: $avatar-width;
      .avatar {
        position: absolute;
        width: $avatar-width;
        height: $avatar-width;
        border-radius: 50%;
      }
      .change {
        width: 28rem;
        z-index: 9;
        position: relative;
      }
    }
  }

  .row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 50rem;
    font-size: 16rem;
    margin: 0 16rem;
    border-bottom: 1px solid #ccc;
    .left {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #323030;
    }
    .right {
      max-width: 80%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .icon-right-back {
        font-size: 17rem;
      }
    }
  }
}
.sex-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #fff;
  color: #000;
  .item {
    width: 100%;
    height: 44rem;
    line-height: 44rem;
    color: #000;
    font-size: 18rem;
    text-align: center;
    border-bottom: solid 0.5px #ccc;
  }
  .item:hover {
    background-color: #c7cbce;
  }
  .item:focus {
    background-color: #c7cbce;
  }
  .item:active {
    background-color: #c7cbce;
  }
  .border-btm-hide {
    border-bottom: none;
  }
  .item-interval {
    height: 6rem;
    width: 100%;
    background: #e8e7e7;
  }
}

// #date_time_picker van-datetime-picker {
//   width: 100%;
//   height: 100%;
//   font-size: 20rem;
// }
</style>
