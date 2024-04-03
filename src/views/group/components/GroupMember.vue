<template>
  <div class="card-container">
    <div class="member-card" v-for="item in data" :key="item.memberId">
      <div class="information">
        <img :src="item.avatar" alt="" />
        <div class="name">
          {{ item.nickname }}
          <span v-if="item.role != 0">{{ getTag(item.role) }}</span>
        </div>
      </div>
      <div class="operate">
        <div class="send">私信</div>
        <i class="icon-shengluehao"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: {},
    },
  },
  methods: {
    getTag(role) {
      if (role == 1) {
        return "管理员";
      } else if (role == 2) {
        return "群主";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.card-container {
  .member-card {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: 40rem;
    margin: 10rem 0rem;
    .information {
      display: flex;
      padding-left: 20rem;
      align-items: center;
      img {
        width: 40rem;
        height: 40rem;
        border-radius: 18rem;
      }
      .name {
        padding-left: 20rem;
        font-size: 16rem;
        span {
          height: 12rem;
          padding: 2rem 4rem;
          background-color: #ccc;
          font-size: 10rem;
          border-radius: 3rem;
          color: #7d7d7d;
        }
      }
    }
    .operate {
      display: flex;
      align-items: center;
      .send {
        background: #ccc;
        border-radius: 8rem;
        height: 26rem;
        line-height: 26rem;
        text-align: center;
        width: 66rem;
        font-size: 16rem;
      }
      .icon-shengluehao {
        margin: 0 8rem;
        padding: 8rem;
        font-size: 20rem;
      }
    }
  }
}
</style>
