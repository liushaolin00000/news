<template>
  <div>
    <!-- 点击返回按钮跳到头条首页 -->
    <div class="push">
      <span class="iconfont iconjiantou" @click="$router.push('/')">跳转到首页</span>
    </div>
    <!-- 将后台返回的数据动态渲染到页面上 -->
    <div class="head" @click="handleEdit">
      <!-- $axios.defaults.baseURL读取axios的服务器路径 -->
      <img :src="profile.head_img" alt />
      <div class="head-center">
        <div class="name">
          <span class="iconfont iconxingbienv"></span>
          {{profile.nickname}}
        </div>
        <div class="time">2019-9-24</div>
      </div>
      <span class="iconfont iconjiantou1 youjiantou"></span>
    </div>
    <div class="body">
      <router-link to="/userfollow">
        <Authcellbar lebal="我的关注" text="关注的用户"></Authcellbar>
      </router-link>
      <router-link to="/followup">
        <Authcellbar lebal="我的跟帖" text="跟帖/回复"></Authcellbar>
      </router-link>
      <router-link to="/MyCollect">
        <Authcellbar lebal="我的收藏" text="文章/视频"></Authcellbar>
        <Authcellbar lebal="退出" @click="handleLogout"></Authcellbar>
      </router-link>
    </div>
  </div>
</template>

<script>
import Authcellbar from "@/components/Authcellbar";
export default {
  components: {
    Authcellbar
  },
  data() {
    return {
      profile: {}
    };
  },
  methods: {
    handleLogout() {
      // 清除本地token和id
      localStorage.removeItem("token");
      localStorage.removeItem("user_id");
      //跳转到登录页面，浏览器点击后退时退回到浏览器初始页
      this.$router.replace("./login");
    },

    handleEdit() {
      //点击用户头像栏向后台发送请求获取数据
      // this.$axios({
      //     url:'/editPersonal',
      // })
      //点击用户头像那一栏时跳转到编辑用户资料页面
      this.$router.push("./editPersonal");
    }
  },
  //用户详情页面加载完毕后执行以下代码
  mounted() {
    //请求个人资料接口
    this.$axios({
      url: "/user/" + localStorage.getItem("user_id"),
      //添加头信息
      headers: {
        Authorization: localStorage.getItem("token")
      }
    }).then(res => {
      //将后台返回的数据保存起来
      // console.log(res);
      const { data } = res.data;
      this.profile = data;
      //判断是否有用户头像

      if (data.head_img) {
        this.profile.head_img =
          this.$axios.defaults.baseURL + this.profile.head_img;
      } else {
        this.profile.head_img = "./static/美女.jpg";
      }
    });
  }
};
</script>

<style lang='less' scoped>
div {
  background-color: #f2f2f2;
  .push {
    padding: 15px;
  }
  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 20px 40px 20px;
    border-bottom: 5px solid #e4e4e4;
    img {
      width: 70/360 * 100vw;
      border-radius: 50%;
    }
    .head-center {
      flex: 1;
      margin-left: 10px;
      span {
        color: pink;
      }
      .time {
        margin-top: 10px;
        font-size: 14px;
        color: #b7b7b7;
      }
    }
    .youjiantou {
      color: #a1a1b6;
    }
  }
}
</style>