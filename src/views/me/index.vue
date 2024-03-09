<template>
  <div class="me">
    <div ref="float" class="float">
      <div class="left" @click="editUserBtn">
        <i class="icon-edit"></i>
        <span>编辑资料</span>
      </div>
      <div class="right">
        <div class="item">
          <i class="icon-nav"></i>
        </div>
        <div class="item">
          <i class="icon-nav"></i>
        </div>
        <div class="item">
          <i class="icon-nav"></i>
        </div>
        <div class="item">
          <i class="icon-nav"></i>
        </div>
      </div>
    </div>
    <Scroll class="me-content">
      <div>
        <div class="desc">
          <header>
            <div class="info">
              <img src="../../assets/images/icon/avatar/2.png" class="avatar" />
              <div class="right">
                <p class="name">我是曾深啊</p>
                <div class="number mb1r">
                  <span class="mr1r">私密账号</span>
                  <span>抖音号：123443423</span>
                  <img
                    src="../../assets/images/icon/me/qrcode-gray.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </header>
          <div class="detail">
            <div class="head">
              <div class="heat">
                <div class="text">
                  <span class="num">100万</span>
                  <span>获赞</span>
                </div>
                <div class="text">
                  <span class="num">100</span>
                  <span>朋友</span>
                </div>
                <div class="text">
                  <span class="num">100</span>
                  <span>关注</span>
                </div>
                <div class="text">
                  <span class="num">1000</span>
                  <span>粉丝</span>
                </div>
              </div>
              <div class="button">添加朋友</div>
            </div>
            <div class="signature">
              <template v-if="true">
                <span>点击添加介绍，让大家认识你...</span>
                <img src="../../assets/images/icon/me/write-gray.png" alt="" />
              </template>
            </div>
            <div class="more">
              <div class="age item" v-if="!userinfo">
                <img
                  v-if="userinfo == 0"
                  src="../../assets/images/icon/me/woman.png"
                  alt=""
                />
                <img
                  v-if="userinfo != 1"
                  src="../../assets/images/icon/me/man.png"
                  alt=""
                />
                <span>11岁</span>
              </div>
              <div class="item" v-if="userinfo || !userinfo">
                广东省
                <template v-if="userinfo && !userinfo"> - </template>
                东莞
              </div>
              <div class="item">东莞理工学院</div>
            </div>
            <div class="other">
              <div class="item">
                <i class="icon-shop"></i>
                <span>抖音商城</span>
              </div>
              <div class="item">
                <i class="icon-music"></i>

                <span>我的音乐</span>
              </div>
              <div class="item">
                <i class="icon-group-chat"></i>

                <span>我的群聊</span>
              </div>
              <div class="item">
                <i class="icon-navigation"></i>
                <span>查看更多</span>
              </div>
            </div>
          </div>
        </div>
        <Indicator
          name="videoList"
          tabStyleWidth="25%"
          :tabTexts="['作品', '私密', '喜欢', '收藏']"
          v-model:active-index="contentIndex"
        >
        </Indicator>
        <Preview />
      </div>
    </Scroll>
  </div>
  <Footer /><router-view></router-view>
</template>

<script>
import Indicator from "@/components/slide/Indicator";
import Scroll from "@/components/base/scroll/Scroll";
import Preview from "@/components/preview/index.vue";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import Footer from "@/components/footer/Footer.vue";

export default {
  name: "Me",
  components: {
    Indicator,
    Scroll,
    Preview,
    Footer,
  },
  setup() {
    const router = useRouter();
    const userinfo = ref(null);
    const slideRowListStyle = computed(() => {
      return {
        height: "calc(100vh - 146rem)",
      };
    });
    function editUserBtn() {
      router.push({
        path: `/me/edit-userinfo`,
      });
    }
    return {
      slideRowListStyle,
      editUserBtn,
      userinfo,
    };
  },
};
</script>

<style lang="scss" scoped>
.float {
  position: fixed;
  box-sizing: border-box;
  width: 100vw;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 46rem;
  padding: 0 15rem;
  background: transparent;
  transition: all 0.2s;
  text-align: center;
  .center {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    color: white;
  }

  $main-bg: rgb(21, 23, 36);
  &.fixed {
    background: $main-bg;

    .item {
      background: $main-bg !important;
    }
  }

  $h: 30rem;

  .left {
    font-size: 14rem;
    height: $h;
    display: flex;
    gap: 6rem;
    padding: 0 10rem;
    align-items: center;
    border-radius: 20rem;
    background: rgba(82, 80, 80, 0.5);
    color: white;

    svg {
      font-size: 16rem;
    }
  }

  .right {
    display: flex;
    .item {
      height: $h;
      width: $h;
      display: flex;
      justify-content: center;
      align-items: center;
      background: rgba(82, 80, 80, 0.5);
      border-radius: 50%;
      margin-left: 10rem;
      .icon-nav {
        color: white;
        font-size: 18rem;
      }
    }
  }
}
.me {
  position: fixed;
  background: #fff;
  width: 100%;
  top: 0rem;
  bottom: 46rem;
  overflow: scroll;
  z-index: 10;
}
.me-content {
  height: 100%;
  overflow: hidden;
}

.desc {
  header {
    position: relative;
    color: white;
    height: 190rem;
    background-image: url("../../assets/images/header-bg.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    box-sizing: border-box;

    .info {
      position: absolute;
      bottom: 10rem;
      padding: 20rem;
      display: flex;
      align-items: center;
      gap: 15rem;

      .avatar {
        background: black;
        padding: 2px;
        border-radius: 50%;
        width: 100rem;
        height: 100rem;
      }

      .name {
        font-size: 18rem;
        margin-bottom: 5rem;
      }

      .number {
        font-size: 12rem;
        display: flex;
        align-items: center;

        img {
          width: 12rem;
          margin-left: 5rem;
        }
      }
    }
  }

  $p: 15rem;

  .detail {
    transform: translateY(-10rem);
    background: #fff;
    padding: $p $p 0 $p;
    border-radius: 14rem 14rem 0 0;

    .head {
      width: 100%;
      display: flex;
      margin-bottom: 20rem;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;

      .heat {
        color: #000;
        display: flex;
        gap: 30rem;
        align-items: center;
        justify-content: space-between;

        .num {
          color: #000;
          font-size: 15rem;
          font-weight: bold;
        }

        .text {
          font-size: 13rem;
          display: flex;
          align-items: center;
          flex-direction: column;
        }
      }

      .button {
        position: relative;
        padding: 8rem 20rem;
        font-size: 15rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 4rem;
        background: #ccc;
        color: #000;
      }
    }

    .signature {
      font-size: 13rem;
      color: #000;
      display: flex;
      align-items: center;
      margin-bottom: 8rem;

      img {
        height: 12rem;
        margin-left: 6rem;
      }

      .text {
        white-space: pre-wrap;
      }
    }

    .more {
      margin-bottom: 10rem;
      display: flex;
      gap: 8rem;
      .item {
        padding: 2rem 5rem;
        border-radius: 2rem;
        background: #e7e7f0;
        font-size: 12rem;
        display: flex;
        align-items: center;
        color: #000;
        img {
          height: 10rem;
          margin-right: 2rem;
        }
      }
    }

    .other {
      display: flex;

      .item {
        width: 20vw;
        margin-right: 25rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        color: gray;
        gap: 6rem;
        font-size: 12rem;

        i {
          font-size: 24rem;
        }
      }
    }
  }
}
</style>
