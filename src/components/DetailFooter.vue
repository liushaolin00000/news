<template>
  <!-- 此页显示文章和视屏详情共用的底部组件 -->
  <!-- 未点击评论的时候显示的页面 -->
  <div class="all">
    <div class="footer" v-if="!iswrite">
      <!-- 评论输入框 -->
      <!-- 点击写跟帖的时候进行切换  并且另一个输入框获取焦点-->
      <div class="write" @click="handleclick">写跟帖</div>

      <div class="threeBtn">
        <!-- 显示评论条数 -->
        <!-- 点击这个评论按钮跳转到精彩跟帖页面 -->
        <router-link :to="/Comment/+postdetail.id">
          <div class="comment">
            <span class="commentNum">{{postdetail.comment_length}}</span>
            <span class="iconfont iconpinglun-"></span>
          </div>
        </router-link>
        <!-- 收藏按钮 -->
        <span
          class="iconfont iconshoucang collect1"
          @click="handlecollect"
          v-if="postdetail.has_star==false"
        ></span>
        <span
          class="iconfont iconshoucang collect2"
          @click="handlecollect"
          v-if="postdetail.has_star==true"
        ></span>
        <!-- 分享按钮 -->
        <span class="iconfont iconfenxiang share"></span>
      </div>
    </div>
    <!-- 点击评论的时候显示此页面上面的页面不显示 -->
    <div class="send" v-if="iswrite">
      <!-- 回复框 -->
      <textarea class="replay" @blur="iswrite=false" ref="replay">回复火星网友</textarea>
      <div class="sendbtn">发送</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["postdetail"],
  data() {
    return {
      iswrite: false
    };
  },
  methods: {
    handleclick() {
      this.iswrite = true;
    },
    //点击收藏按钮的时候发射事件给父组件
    handlecollect() {
      this.$emit("click123");
    }
  }
};
</script>

<style lang='less' scoped>
.all {
  .footer {
    display: flex;
    padding: 20px;
    justify-content: space-between;
    align-items: center;
    .write {
      width: 181/360 * 100vw;
      height: 31/360 * 100vw;
      padding-left: 15px;
      line-height: 31/360 * 100vw;
      background-color: #d7d7d7;
      border-radius: 20px;
      box-sizing: border-box;
      font-size: 13px;
      color: #333333;
    }
    .threeBtn {
      display: flex;
      justify-content: space-around;
      align-items: center;
      span {
        font-size: 23px;
        margin: 0 10px;
      }
      .comment {
        position: relative;
        .commentNum {
          position: absolute;
          top: -6px;
          left: 10px;
          color: #ffffff;
          background-color: #ff0000;
          border-radius: 10px;
          padding: 0px 3px;
          font-size: 10px;
        }
      }
      .collect2 {
        background-color: yellow;
      }
    }
  }
  .send {
    padding: 20px 15px 20px;
    display: flex;
    position: relative;
    .replay {
      width: 261/360 * 100vw;
      height: 90/360 * 100vw;
      padding: 20px;
      background-color: #d7d7d7;
      border-radius: 10px;
    }
    .sendbtn {
      position: absolute;
      width: 62/360 * 100vw;
      height: 26/360 * 100vw;
      background: #ff0000;
      color: #ffffff;
      text-align: center;
      line-height: 26px;
      border-radius: 50px;
      bottom: 20px;
      right: 12px;
    }
  }
}
</style>