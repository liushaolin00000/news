<template>
  <!-- 此页显示文章和视屏详情共用的底部组件 -->
  <!-- 未点击评论的时候显示的页面 -->
  <div class="all">
    <div class="footer" v-if="!iswrite">
      <!-- 评论输入框 -->
      <!-- 点击写跟帖的时候进行切换  并且另一个输入框获取焦点-->
      <input type="text" placeholder="写跟帖" @focus="handleFocus" class="inputss" />

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
    <!-- 输入评论页脚，这里显示和隐藏必须要用v-show原因是为了获取dom元素 -->
    <div class="send" v-show="iswrite">
      <!-- 回复框 -->
      <textarea
        class="replay"
        @blur="handleBlur"
        placeholder="回复火星网友"
        v-model="comment"
        ref="textarea"
        :autofocus="iswrite"
        :placeholder="placeholder"
      ></textarea>
      <div class="sendbtn" @click="handleSend">发送</div>
    </div>
  </div>
</template>

<script>
import { type } from "os";
export default {
  props: ["postdetail", "replyComment"],
  data() {
    return {
      iswrite: false,
      comment: "",
      content: {},
      placeholder: "写跟帖"
    };
  },
  methods: {
    //评论的输入框失去焦点
    handleBlur() {
      //当失去焦点且没有值的时候切换成小的输入框
      if (!this.$refs.textarea.value) {
        this.iswrite = false;
        //如果有回复的评论，清空回复的评论
        if (this.replyComment) {
          this.$emit("handleReply", null);
          this.placeholder = "写跟帖";
        }
      }
    },
    handleFocus() {
      this.iswrite = true;
    },
    //点击收藏按钮的时候发射事件给父组件
    handlecollect() {
      this.$emit("click123");
    },
    //点击发送按钮发表评论
    handleSend() {
      // 如果评论内容为空则不向后台发起请求
      if (this.comment == "") {
        return;
      }
      //评论的参数
      var data = {
        content: this.comment
      };
      //如果有回复的评论，加上parent_id
      if (this.replyComment) {
        data.parent_id = this.replyComment.id;
      }
      this.$axios({
        url: "/post_comment/" + this.postdetail.id,
        //添加头信息
        headers: {
          Authorization: localStorage.getItem("token")
        },
        method: "POST",
        data
      }).then(res => {
        const { message } = res.data;
        if (message == "评论发布成功") {
          this.$toast(message);
          setTimeout(() => {
            window.location.reload();
            //发布评论成功后滚动条滚动到页面顶部
            window.scrollTo(0, 0);
          }, 3000);
          //点击发送按钮成功后重新刷新页面将最新评论显示在最上面
        }
      });
    }
  },
  watch: {
    //监听replyComment值的变化
    replyComment() {
      if (this.replyComment) {
        this.iswrite = true;
        this.placeholder = "@" + this.replyComment.user.nickname;
      }
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
    .write,
    .inputss {
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