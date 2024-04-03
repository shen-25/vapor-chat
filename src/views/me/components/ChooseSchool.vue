<template>
  <div class="container">
    <BaseHeader>
      <template v-slot:center>
        <span class="f16">添加学校</span>
      </template>
      <template v-slot:right>
        <div @click="onSave">
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
      <van-field v-model="school" label="学校" placeholder="请输入学校" />
      <van-field
        v-model="enrollmentTime"
        is-link
        readonly
        label="入学时间"
        placeholder="选择你的入学时间"
        @click="showYearPicker = true"
      />
      <van-field
        v-model="educationText"
        is-link
        readonly
        label="学历"
        placeholder="选择你的学历"
        @click="showEducationPicker = true"
      />

      <van-popup v-model:show="showEducationPicker" round position="bottom">
        <van-picker
          :columns="eductionColumns"
          @cancel="showEducationPicker = false"
          @confirm="onEductionConfirm"
        />
      </van-popup>
      <van-popup v-model:show="showYearPicker" round position="bottom">
        <van-date-picker
          title="选择日期"
          :columns-type="columnsType"
          @cancel="showYearPicker = false"
          @confirm="onYearConfirm"
        />
      </van-popup>
    </div>
  </div>
</template>

<script>
import BaseHeader from "@/components/base/back/BaseHeader.vue";
import { ref } from "vue";
import { cloneDeep } from "lodash-es";
import { useUserStore } from "@/store/user";
import { editUserEductionApi } from "@/api/user/user";
export default {
  name: "ChooseSchool",
  props: {
    data: {
      type: Object,
    },
  },
  components: {
    BaseHeader,
  },
  emits: ["close"],
  setup(props, { emit }) {
    const userStore = useUserStore();

    const isChanged = ref(true);
    const eductionColumns = [
      { text: "专科", value: 1 },
      { text: "本科", value: 2 },
      { text: "硕士", value: 3 },
      { text: "博士", value: 4 },
    ];
    const education = ref(cloneDeep(props.data.education));
    const school = ref(cloneDeep(props.data.school));
    const enrollmentTime = ref(
      cloneDeep(props.data.enrollmentTime).substring(0, 4)
    );
    const showEducationPicker = ref(false);
    const showYearPicker = ref(false);
    const educationText = ref(getEductionText(props.data.education));

    function getEductionText(val) {
      if (val == 1) {
        return "专科";
      }
      if (val == 2) {
        return "本科";
      }
      if (val == 3) {
        return "硕士";
      }
      if (val == 4) {
        return "博士";
      }
      return "未知";
    }

    const onEductionConfirm = ({ selectedOptions }) => {
      showEducationPicker.value = false;
      education.value = selectedOptions[0].value;
      educationText.value = selectedOptions[0].text;
    };

    const onYearConfirm = ({ selectedOptions }) => {
      showYearPicker.value = false;
      enrollmentTime.value = selectedOptions[0].value;
    };
    async function onSave() {
      const param = {
        school: school.value,
        enrollmentTime: new Date(enrollmentTime.value),
        education: education.value,
        userId: userStore.getUserId(),
      };
      const { msg, code, data } = await editUserEductionApi(param);
      if (code == 0) {
        props.data.school = school.value;
        props.data.enrollmentTime = enrollmentTime.value;
        props.data.education = education.value;
        emit("close", true);
      }
    }
    const columnsType = ["year"];
    return {
      showEducationPicker,
      eductionColumns,
      onEductionConfirm,
      columnsType,
      enrollmentTime,
      onYearConfirm,
      showYearPicker,
      educationText,
      school,
      onSave,
      isChanged,
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

.container {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: #fff;
  z-index: 400;
}
.content {
  padding-top: 70rem;
  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50rem;
    line-height: 50rem;

    font-size: 16rem;
    margin: 0 16rem;
    .left {
      min-width: 14%;
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
        font-size: 20rem;
      }
    }
  }
}
</style>
