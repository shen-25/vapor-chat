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
            <img class="avatar" :src="userInfo.avatarUrl" alt="" />
            <img
              class="change"
              src="../../../assets/images/icon/me/camera-light.png"
              alt=""
            />
          </div>
          <span>点击更换头像</span>
        </div>
        <div class="row" @click="onEditItem(1)">
          <div class="left">名字</div>
          <div class="right">
            <span>{{ userInfo.nickname }}</span>
            <i class="icon-right-back"></i>
          </div>
        </div>
        <div class="row" @click="onEditItem(2)">
          <div class="left">抖音号</div>
          <div class="right">
            <span>{{ userInfo.shortname }}</span>
            <i class="icon-right-back"></i>
          </div>
        </div>
        <div class="row" @click="onEditItem(3)">
          <div class="left">简介</div>
          <div class="right">
            <span>{{ userInfo.signature }}</span>
            <i class="icon-right-back"></i>
          </div>
        </div>
        <div class="row" @click="showSexBtn">
          <div class="left">性别</div>
          <div class="right">
            <span>{{ getSexName() }}</span>
            <i class="icon-right-back"></i>
          </div>
        </div>
        <div class="row" @click="showBirthdayBtn">
          <div class="left">生日</div>
          <div class="right">
            <span>{{ userInfo.birthday }}</span>
            <i class="icon-right-back"></i>
          </div>
        </div>
        <div class="row" @click="showLocationBtn">
          <div class="left">所在地</div>
          <div class="right">
            <span>{{ userInfo.province }}- {{ userInfo.city }}</span>
            <i class="icon-right-back"></i>
          </div>
        </div>
        <div class="row" @click="showSchoolBtn">
          <div class="left">学校</div>
          <div class="right">
            <span>{{ userInfo.college }}</span>
            <i class="icon-right-back"></i>
          </div>
        </div>
      </div>
    </div>

    <van-popup
      v-model:show="showSexPopup"
      position="bottom"
      round
      :style="{ height: '27.6%', color: '#000' }"
    >
      <div class="sex-container">
        <div class="item" @click="onSexBtn(1)">男</div>
        <div class="item" @click="onSexBtn(2)">女</div>
        <div class="item border-btm-hide" @click="onSexBtn(3)">保密</div>
        <div class="item-interval"></div>
        <div class="item border-btm-hide" @click="onSexBtn(4)">取消</div>
      </div>
    </van-popup>

    <van-popup
      v-model:show="showBirthdayPopup"
      position="bottom"
      :style="{ height: '40%' }"
    >
      <van-date-picker
        v-model="currentDate"
        title="选择你的生日"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="onBirthDayConfirmBtn"
    /></van-popup>
    <van-popup
      v-model:show="showLocationPopup"
      position="bottom"
      :style="{ height: '38%' }"
      @click="onLocationBtn"
    >
      <van-area
        title="选择地区"
        :area-list="areaList"
        v-model="locationCode"
        columns-num="2"
      />
    </van-popup>
    <EditUserInfoItem
      :type="showBasicType"
      :userInfo="userInfo"
      v-if="showEditItem"
      @toggleItem="toggleItem"
    ></EditUserInfoItem>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import BaseHeader from "@/components/base/back/BaseHeader.vue";
import { areaList } from "@vant/area-data";
import EditUserInfoItem from "../components/EditUserInfoItem.vue";
import { getUserInfoApi } from "@/api/user/user";
import { useUserStore } from "@/store/user";
import { editUserInfoApi } from "@/api/user/user";

export default {
  name: "EditUserInfo",
  components: {
    BaseHeader,
    EditUserInfoItem,
  },
  setup() {
    const router = useRouter();

    const showSexPopup = ref(false);

    const showBirthdayPopup = ref(false);

    const showLocationPopup = ref(false);

    const userInfo = ref({});

    const userStore = useUserStore();

    const showEditItem = ref(false);

    const showBasicType = ref(1);

    const locationCode = ref(null);

    const date = new Date();

    const currentDate = ref(["2021", "01", "01"]);

    const minDate = new Date(1900, 0, 1);
    const maxDate = ref(
      new Date(date.getFullYear(), date.getMonth() + 1, date.getDate())
    );

    function showBirthdayBtn() {
      showBirthdayPopup.value = !showBirthdayPopup.value;
    }
    function showSexBtn() {
      showSexPopup.value = true;
    }
    function showLocationBtn() {
      showLocationPopup.value = !showLocationPopup.value;
    }
    function showSchoolBtn() {}
    function onEditItem(val) {
      showBasicType.value = val;
      showEditItem.value = true;
    }
    function toggleItem(val) {
      showEditItem.value = false;
      if (val) {
        getUserInfo();
      }
    }
    async function getUserInfo() {
      const param = {
        userId: userStore.getUserId(),
      };
      const { msg, code, data } = await getUserInfoApi(param);
      if (code === 0) {
        userInfo.value = data;
        if (userInfo.value.birthday) {
          currentDate.value = userInfo.value.birthday.split("-");
        }
      }
    }
    /**
     * 第一个参数是sex
     * 第二个是日期
     * 第三个是地区
     * 后端做了判断，如果为空则不更新
     */
    async function editUserInfo(sex, date, location) {
      const param = {
        userId: userStore.getUserId(),
        sex,
        birthday: date,
        ...location,
      };
      const { msg, data, code } = await editUserInfoApi(param);
      if (code == 0) {
      }
    }
    function getSexName() {
      if (userInfo.value.sex == 1) {
        return "男";
      }
      if (userInfo.value.sex == 2) {
        return "女";
      } else {
        return "保密";
      }
    }
    async function onSexBtn(sex) {
      if (sex == 1 || sex == 2 || sex == 3) {
        await editUserInfo(sex);
        userInfo.value.sex = sex;
        showSexPopup.value = !showSexPopup.value;
      }
    }
    async function onBirthDayConfirmBtn() {
      const date = currentDate.value.join("-");
      await editUserInfo(null, date);
      userInfo.value.birthday = date;
      showBirthdayPopup.value = false;
    }
    async function onLocationBtn() {
      console.log(locationCode.value);
      const province =
        areaList.province_list[
          locationCode.value.toString().substr(0, 2) + "0000"
        ];
      const city = areaList.city_list[locationCode.value];
      await editUserInfo(null, null, { province, city, country: "中国" });
      userInfo.value.province = province;
      userInfo.value.city = city;
      showLocationPopup.value = false;
    }

    onMounted(async () => {});
    getUserInfo();
    return {
      showEditItem,
      onEditItem,
      getSexName,
      showSexPopup,
      showBirthdayPopup,
      showBirthdayBtn,
      showLocationPopup,
      showLocationBtn,
      areaList,
      showSchoolBtn,
      userInfo,
      toggleItem,
      showBasicType,
      onSexBtn,
      showSexBtn,
      currentDate,
      minDate,
      maxDate,
      onBirthDayConfirmBtn,
      onLocationBtn,
      locationCode,
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
