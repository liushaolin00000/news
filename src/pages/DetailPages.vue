<template>
  <!-- 整个文章页面 -->
  <div class="all">
    <!-- 主要文章内容部分 如果是纯文字的文章显示以下代码-->
    <div class="detail" v-if="postdetail.type==1||postdetail.cover.length>=3">
      <!-- 文章详情页头部部分 -->
      <div class="header">
        <!-- 左边部分 -->
        <div class="left">
          <span class="iconfont iconjiantou" @click="$router.back()"></span>
          <span class="iconfont new iconnew"></span>
        </div>
        <!-- 关注部分 -->
        <div class="follow" v-if="postdetail.has_follow" @click="handleunfollow">已关注</div>
        <div class="unfollow" v-if="!postdetail.has_follow" @click="handlefollow">关注</div>
      </div>
      <!-- 文章标题部分 -->
      <h2 class="title">{{postdetail.title}}</h2>
      <!-- 文章作者和时间 -->
      <div class="label">
        <span>{{postdetail.user.nickname}}</span>
        <span>2019-10-10</span>
      </div>
      <!-- 文章主内容 -->
      <p class="content" v-html="postdetail.content"></p>
    </div>
    <!-- 主要视频页面部分， 如果type为2 显示以下代码 -->
    <div class="video" v-if="postdetail.type==2&&postdetail.cover.length<3">
      <!-- 视频显示部分 -->
      <div class="back">
          <span class="iconfont iconjiantou" @click="$router.back()"></span>
          返回
        </div>
       <!-- 视频头部的返回按钮 -->
      <video controls preload poster="../../static/123.jpg">
        <source
          src="https://video.pearvideo.com/mp4/third/20190917/cont-1603130-11956977-103252-hd.mp4"
        />
      </video>
      <!-- 视频发布者部分 -->
      <div class="author">
        <!-- 视频发布者左边部分 -->
        <div class="left">
          <img :src="$axios.defaults.baseURL+postdetail.user.head_img" alt />
          <span>{{postdetail.user.nickname}}</span>
        </div>
        <!-- 视频发布者右边部分 -->
        <!-- 关注部分 -->
        <div class="follow" v-if="postdetail.has_follow" @click="handleunfollow">已关注</div>
        <div class="unfollow" v-if="!postdetail.has_follow" @click="handlefollow">关注</div>
      </div>
      <!-- 视频标题部分 -->
      <div class="title">{{postdetail.title}}</div>
    </div>
    <!-- 文章详情和视屏详情共用的部分 -->
    <div class="share">
      <!-- 点赞和微信分享按钮 -->
      <div class="doublebtn">
        <!-- 为点赞按钮绑定点击事件 -->
        <!-- 未点赞时候的状态 -->
        <div class="like" @click="handlelike" v-if="!postdetail.has_like">
          <span class="iconfont icondianzan"></span>
          <span>{{postdetail.like_length}}</span>
        </div>
        <!-- 点赞的状态 -->
        <div class="liking" v-if="postdetail.has_like" @click="handleliking">
          <span class="iconfont icondianzan"></span>
          <span>{{postdetail.like_length}}</span>
        </div>
        <div class="weixin">
          <span class="iconfont iconweixin weixinicon"></span>
          <span>微信</span>
        </div>
      </div>
      <!-- 调用共用的底部组件 -->
      <DetailFooter :postdetail="postdetail" @click123="handlecollect"></DetailFooter>
    </div>
  </div>
</template>

<script>
//引入共用的底部组件
import DetailFooter from "@/components/DetailFooter.vue";
export default {
  //注册共用的底部组件
  components: {
    DetailFooter
  },
  data() {
    return {
      postdetail: {
        cover:[],
        user: {}
      }
    };
  },
  methods: {
    //点击底部组件实现收藏的取消和收藏
    handlecollect() {
      //点击收藏的时候向后台发送请求
      this.$axios({
        url: "/post_star/" + this.postdetail.id,
        //添加头信息
        headers: {
          Authorization: localStorage.getItem("token")
        }
      }).then(res => {
        console.log(res);
        const { message } = res.data;
        if (message == "收藏成功") {
          this.$toast.success(message);
          this.postdetail.has_star = true;
        }
        if (message == "取消成功") {
          this.$toast.success(message);
          this.postdetail.has_star = false;
        }
        if (message == "收藏失败，文章不存在") {
          this.$toast.fail(message);
        }
      });
    },
    handlefollow() {
      //点击关注按钮向后台发送关注的接口
      this.$axios({
        url: "/user_follows/" + this.postdetail.user.id,
        //添加头信息
        headers: {
          Authorization: localStorage.getItem("token")
        }
      }).then(res => {
        console.log(res);
        const { message } = res.data;
        if (message == "关注成功" || message == "已关注") {
          this.postdetail.has_follow = true;
          this.$toast.success(message);
        }
      });
    },
    //点击已关注按钮向后台发送取消关注的接口
    handleunfollow() {
      this.$axios({
        url: "/user_unfollow/" + this.postdetail.user.id,
        //添加头信息
        headers: {
          Authorization: localStorage.getItem("token")
        }
      }).then(res => {
        console.log(res);
        const { message } = res.data;
        console.log(message);
        if (message == "取消关注成功") {
          this.postdetail.has_follow = false;
          this.$toast.success(message);
        }
      });
    },
    //点击点赞按钮，点赞数加一，且样变成红色
    handlelike() {
      this.$axios({
        url: "/post_like/" + this.postdetail.id,
        //添加头信息
        headers: {
          Authorization: localStorage.getItem("token")
        }
      }).then(res => {
        const { message } = res.data;
        if (message == "点赞成功") {
          this.postdetail.has_like = true;
          //点赞成功之后数字加1
          this.postdetail.like_length++;
          this.$toast.success(message);
        }
      });
    },
    //点击已点赞按钮，点赞减一，且样式变回初始默认灰色样式
    handleliking() {
      this.$axios({
        url: "/post_like/" + this.postdetail.id,
        //添加头信息
        headers: {
          Authorization: localStorage.getItem("token")
        }
      }).then(res => {
        console.log(res);
        const { message } = res.data;
        if (message == "取消成功") {
          this.postdetail.has_like = false;
          //取消点赞成功后点赞数量减1,
          this.postdetail.like_length--;
          this.$toast.success(message);
        }
      });
    }
  },
  // 详情页面一加载完毕就发起获取文章后台的请求
  mounted() {
    const id = this.$route.params.id;
    // console.log(id)
    this.$axios({
      url: "/post/" + id,
      //添加头信息
      headers: {
        Authorization: localStorage.getItem("token")
      }
    }).then(res => {
      const { data } = res.data;
      //将后台获取到的数据保存起来
      this.postdetail = data;
      console.log(this.postdetail);
    });
  }
};
</script>

<style lang='less' scoped>
.all {
  padding-bottom: 100/ 360 * 100vw;
  .detail {
    padding: 20px;

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        justify-content: space-between;
        align-items: center;
        span:last-child {
          font-size: 70px;
          color: #000000;
        }
      }
      .unfollow {
        width: 62px;
        height: 26px;
        background: #ff0000;
        color: #ffffff;
        text-align: center;
        line-height: 26px;
        border-radius: 50px;
      }
      .follow {
        width: 62px;
        height: 26px;
        color: #333333;
        text-align: center;
        line-height: 26px;
        border-radius: 50px;
        background-color: #f2f2f2;
        border: 1px solid #cccccc;
      }
    }
    .title {
      font-weight: 600;
      color: #333333;
      margin-bottom: 8px;
    }
    .label {
      font-size: 13px;
      color: #868686;
    }
    .content {
      margin-top: 25px;
      line-height: 28px;
      font-style: 14px;
      /deep/ img {
        max-width: 100%;
      }
    }
  }
  .video {
    .back{
      padding:13px;
      
    }
    video {
      width: 100%;
    }
    .author {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 13px;
      color: #868686;
      img {
        width: 30/360 * 100vw;
        height: 30/360 * 100vw;
        border-radius: 50%;
      }
      .unfollow {
        width: 62px;
        height: 26px;
        background: #ff0000;
        color: #ffffff;
        text-align: center;
        line-height: 26px;
        border-radius: 50px;
      }
      .follow {
        width: 62px;
        height: 26px;
        color: #333333;
        text-align: center;
        line-height: 26px;
        border-radius: 50px;
        background-color: #f2f2f2;
        border: 1px solid #cccccc;
      }
    }
    .title {
      padding: 0 13px;
    }
  }
  .share {
    .doublebtn {
      display: flex;
      justify-content: space-around;
      margin-top: 40px;
      padding-bottom: 20px;
      border-bottom: 5px solid #e4e4e4;
      .like,
      .weixin,
      .liking {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 79px;
        height: 29px;
        border: 1px solid #808080;
        border-radius: 50px;
        .weixinicon {
          color: #0ac90a;
        }
      }
      .liking {
        border: 1px solid red;
        color: red;
        background: skyblue;
      }
    }
  }
}
</style>