<template>
  <div class="group-list-container">
    <div class="header">
      <div class="left" @click="onBack">
        <i class="icon-back"></i>
      </div>
      <div class="middle">群聊</div>
      <div class="right"></div>
    </div>
    <div class="groupList">
      <Scroll class="groupList-content">
        <div>
          <div class="groupList-list">
            <ul>
              <li
                v-for="item in groups"
                class="item"
                :key="item.id"
                @click="selectItem(item)"
              >
                <div class="icon">
                  <img :src="item.photo" />
                </div>
                <div class="text">
                  {{ item.name }}
                </div>
              </li>
              <li class="item2">
                <div class="text">{{ totalGroup }}个群聊</div>
              </li>
            </ul>
          </div>
        </div>
      </Scroll>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import Scroll from "@/components/base/scroll/Scroll";
import { getJoinGroupApi } from "@/api/group/group";
import { APP_ID } from "@/config/setting";
import { useUserStore } from "@/store/user";
import { mapStores } from "pinia";
export default {
  name: "groupList",
  components: {
    Scroll,
  },
  data() {
    return {
      groups: [],
      totalGroup: 0,
    };
  },
  computed: {
    ...mapStores(useUserStore),
  },
  methods: {
    selectItem(group) {
      this.$router.push({
        path: `/group/list/${group.id}`,
      });
    },
    onBack() {
      this.$router.push("/friend");
    },
    async getJoinedGroup() {
      const param = {
        appId: APP_ID,
        userId: this.userStore.getUserId(),
      };
      const { msg, data, code } = await getJoinGroupApi(param);
      if (code === 0) {
        this.groups = data.groupList;
        this.totalGroup = data.totalCount;
      }
    },
  },
  created() {
    this.getJoinedGroup();
  },
};
</script>
<style lang="scss" scoped>
.groupList {
  position: fixed;
  width: 100%;
  top: 52rem;
  bottom: 0;
  background: #ccc;
  .groupList-content {
    height: 100%;
    overflow: hidden;
  }
  .groupList-list {
    background: #ffff;
    .item {
      height: 40rem;
      display: flex;
      align-items: center;
      padding: 10rem 0rem 14rem 15rem;
      .icon {
        img {
          width: 36rem;
          height: 36rem;
          border-radius: 8rem;
        }
      }
      .text {
        flex: 1;
        line-height: 20rem;
        font-size: 16rem;
        padding: 8rem 0rem 8rem 11rem;
        border-bottom: 1rem #ccc solid;
      }
    }
    .item2 {
      display: flex;
      align-items: center;
      height: 30rem;
      justify-content: center;
      .text {
        flex: 1;
        text-align: center;
        color: #ccc;
        font-size: 16rem;
        padding-bottom: 8rem;
      }
    }
  }
}
.header {
  display: flex;
  height: 52rem;
  justify-content: space-between;
  align-items: center;
  font-size: 20rem;
  margin: 0 10rem;
  .left {
    .icon-back {
      font-size: 25rem;
    }
  }
  .right {
    .icon-tip {
      font-size: 28rem;
    }
  }
}
</style>
