<template>
  <div class="publish-container">
    <div class="header">
      <div class="left">
        <i class="icon-back"></i>
      </div>
      <div class="right">
        <i class="icon-tip"></i>
      </div>
    </div>
    <div class="content">
      <div class="imageOrVideo"></div>
      <div class="title"></div>
      <div class="text"></div>
      <div class="extraneous-info">
        <div class="location"></div>
        <div class="visible"></div>
      </div>
    </div>
    <div class="footer">
      <div class="draft"></div>
      <div class="post"></div>
    </div>
  </div>
</template>

<script>
export default {};
</script>
<style lang="scss" scoped>
.publish-container {
  background: #fff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
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
  .content {
    background-color: rgb(30, 37, 37);
    height: 500rem;
    .imageOrVideo {
    }
    .title {
    }
    .text {
    }
    .extraneous-info {
    }
  }
  .footer {
    height: 100rem;
    .draft {
    }
    .post {
    }
  }
}
</style>
