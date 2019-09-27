<template>
  <div>
    <!-- 头条头部部分 -->
    <div class="header">
      <!-- logo部分 -->
      <div class="logo">
        <span class="iconfont new iconnew"></span>
      </div>
      <!-- 搜索框部分 -->
      <div class="search">
        <span class="iconfont iconsearch"></span>
        <span class="news">搜索新闻</span>
      </div>
      <!-- 个人中心组件部分 -->
      <router-link to="/personal">
        <div class="personal">
          <span class="iconfont iconwode"></span>
        </div>
      </router-link>
    </div>
    <!-- 引入滑动模块组件 -->
    <van-tabs v-model="active" swipeable sticky>
      <van-tab v-for="(item,index) in categories" :title="item.name" :key="index">
        <!-- v-model:是否处于加载状态，加载过程中不触发load事件
        finished:是否已加载完成，加载完成后不再触发load事件
        finished-text:加载完成后的提示文案
        loading-tex:数据加载完全后的提示文案-->
        <!-- load: 到底部触发的事件 -->
        <!-- immediate-check 禁止list立即出发onload -->
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多的数据了"
          @load="onLoad"
          :immediate-check="false"
          loading-text="头条君正在努力加载中，请耐心等待~~"
        >
          <PostCard v-for="(item,index) in posts" :obj="item" :key="index"></PostCard>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
//引入主内容布局的组件
import PostCard from "@/components/PostCard.vue";
export default {
  //注册组件
  components: {
    PostCard
  },
  data() {
    return {
      // 当前默认的栏目, 没有登录应该0，有登录等于1, 最终的效果为了默认显示头条
      // 随着栏目的切换会变化
      active: localStorage.getItem("token") ? 1 : 0,
      //文章栏目列表数据
      categories: [],
      //栏目id
      cid: 999,
      //文章内容数据
      posts: [],
      // 是否在加载,加载完毕后需要手动变为false
      loading: false,
      // 是否有更多数据，如果加载完所有的数据，改为true
      finished: false,
      //分页变量
      pageIndex: 1,
      //每页加载的数据条数
      pageSize: 5
    };
  },
  methods: {
    //加载下一页的数据
    onLoad() {
      setTimeout(() => {
        //请求文章列表
        this.$axios({
          url: `/post?category=${this.cid}&pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`
        }).then(res => {
          //获取的结果为十条数据
          const { data } = res.data;

          //没有更多的数据了
          if (data.length < this.pageSize) {
            this.finished = true;
          }
          //默认赋值给头条的列表
          this.posts = [...this.posts, ...data];

          //页数加一
          this.pageIndex++,
          //告诉onload事件这次的数据加载已经完毕，下次可以继续出发onload
          this.loading = false;
        });
      }, 4000);
    }
  },
  mounted() {
    //头条页面加载完成即显示内容
    //获取栏目列表

    const config = {
      url: "/category"
    };
    // 是否存在token，如果有就给头部加上token验证
    if (localStorage.getItem("token")) {
      config.headers = {
        Authorization: localStorage.getItem("token")
      };
    }
    // 请求栏目的数据
    this.$axios(config).then(res => {
      //将获取的栏目列表信息存放起来
      const { data } = res.data;
      this.categories = data;
      // console.log(data);
    });

    //文章刷新后同时请求文章列表
    this.$axios({
      url: `/post?category=${this.cid}&pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`
    }).then(res => {
      const { data } = res.data;
      //默认赋值给头条的列表
      this.posts = data;
      console.log(this.posts);

      //页数加一
      this.pageIndex++;
    });
  },
  // 监听active变化获取栏目id
  watch: {
    active() {
      this.cid = this.categories[this.active].id;
    }
  }
};
</script>

<style lang='less' scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  color: #ffffff;
  background: #ff0000;
  .logo > span {
    font-size: 54/360 * 100vw;
  }
  .search {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 210/360 * 100vw;
    height: 36/360 * 100vw;
    border-radius: 50px;
    background-color: #f97979;
    span:last-child {
      margin-left: 10px;
      font-size: 16px;
    }
  }
  .personal span {
    font-size: 25/360 * 100vw;
  }
}
/deep/ .van-tabs__nav {
  background-color: #e4e4e4;
}
/deep/ .van-tab {
  font-size: 18px;
  color: #333333;
}
</style>