<template>
  <div class="list-container">
    <div class="parent-comment">
      <div class="comment-item">
        <div class="comment-inner-container">
          <div class="avatar">
            <a href=""
              ><img
                src="https://sns-avatar-qc.xhscdn.com/avatar/645c8eb5bef4b6b8c9efb0cb.jpg?imageView2/2/w/120/format/jpg|imageMogr2/strip"
            /></a>
          </div>
          <div class="right">
            <div class="author-wrapper">
              <div class="author">
                <a href="" class="name">这个博主好会玩</a>
                <span class="tag">作者</span>
              </div>
            </div>
            <div class="content">个人还是比较喜欢这款车的 只是客观评价一下</div>
            <div class="labels">
              <span class="top">置顶评论</span>
            </div>
            <div class="info">
              <span>昨天 17:36</span>
              <div class="introductions">
                <div class="like">44</div>
                <div class="reply">22</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="reply-container">
        <div class="list-container">
          <div class="parent-comment">
            <div class="comment-item">
              <div class="comment-inner-container">
                <div class="avatar">
                  <a href=""
                    ><img
                      src="https://sns-avatar-qc.xhscdn.com/avatar/645c8eb5bef4b6b8c9efb0cb.jpg?imageView2/2/w/120/format/jpg|imageMogr2/strip"
                  /></a>
                </div>
                <div class="right">
                  <div class="author-wrapper">
                    <div class="author">
                      <a href="" class="name">这个博主好会玩</a>
                      <span class="tag">作者</span>
                    </div>
                  </div>
                  <div class="content">
                    个人还是比较喜欢这款车的 只是客观评价一下
                  </div>
                  <div class="labels">
                    <span class="top">置顶评论</span>
                  </div>
                  <div class="info">
                    <span>昨天 17:36</span>
                    <div class="introductions">
                      <div class="like">44</div>
                      <div class="reply">22</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="reply-container"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.list-container {
  position: relative;
  .parent-comment {
    margin-bottom: 16rem;
    .comment-item {
      position: relative;
      display: flex;
      padding: 8rem;
      .comment-inner-container {
        position: relative;
        display: flex;
        z-index: 1;
        width: 100%;
        flex-shrink: 0;
        .avatar {
          flex: 0 0 auto;
          a {
            text-decoration: none;
            background-color: transparent;
            img {
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
              border-radius: 100%;
              border: 1px solid rgba(0, 0, 0, 0.08);
              object-fit: cover;
              width: 40rem;
              height: 40rem;
            }
          }
        }
        .right {
          margin-left: 12rem;
          display: flex;
          flex-direction: column;
          font-size: 14rem;
          flex-grow: 1;
          .author-wrapper {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .author {
              display: flex;
              align-items: center;
              a {
                text-decoration: none;
                background-color: transparent;
              }
              .name {
                color: rgba(51, 51, 51, 0.6);
                line-height: 18px;
              }
              .tag {
                margin-left: 4px;
                padding: 3px 6px;
                font-size: 10px;
                color: rgba(51, 51, 51, 0.6);
                background: rgba(0, 0, 0, 0.03);
                border-radius: 10.5px;
                font-weight: 500;
              }
            }
          }
          .content {
            margin-top: 4rem;
            line-height: 140%;
            color: #333;
          }
          .labels {
            margin-top: 8rem;
            .top {
              padding: 0 8px;
              background: rgba(255, 36, 66, 0.06);
              border-radius: 999px;
              font-weight: 500;
              font-size: 12px;
              line-height: 24px;
              height: 24px;
              color: #ff2442;
              display: inline-block;
            }
          }
          .info {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            font-size: 12rem;
            line-height: 16rem;
            color: rgba(51, 51, 51, 0.6);
            .date {
              margin: 8rem 0;
            }
            .introductions {
              display: flex;
              margin-left: -2rem;
              .like {
              }
              .reply {
                padding-left: 10rem;
              }
            }
          }
        }
      }
    }
    .reply-container {
      margin-left: 52rem;
    }
  }
}
</style>
