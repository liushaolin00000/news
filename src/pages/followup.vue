<template>
  <div>
    <!-- //调用头部组件 -->
    <headerNalmore text="我的跟帖"></headerNalmore>
    <!-- 评论的列表 -->
    <!-- 将后台返回的数据渲染到页面上，如果有parent就要渲染parent模块，没有则去掉 -->
    <div class="comment-item" v-for="(item,index) in list"  :key="index">
      <div class="time">2019-10-10 10:25</div>
      <!-- 当前的评论 -->
      <div class="parent" v-if="item.parent">
        <div class="parent-title">回复：{{item.parent.user.nickname}}</div>
        <div class="parent-content">{{item.parent.content}}</div>
      </div>
      <!-- 回复评论内容 -->
      <div class="content">{{item.content}}</div>

      <!-- 原文链接 -->
      <div class="acticle-link">
        <router-link to="#" class="origin">
          <p>原文：{{item.post.title}}</p>
          <span class="iconfont iconjiantou1 youjiantou"></span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
//引入头部组件
import headerNalmore from "@/components/headerNalmore.vue";
export default {
  //将数据保存到这里
  data() {
    return {
      list: []
    };
  },
  //注册头部组件
  components: {
    headerNalmore
  },
  mounted() {
    //页面加载完毕后就渲染数据到页面上
    this.$axios({
      url: "/user_comments",
      //添加头信息
      headers: {
        Authorization: localStorage.getItem("token")
      }
    }).then(res => {
      const { data } = res.data;
      //将数据保存起来
      this.list = data;
      console.log(this.list);
    });
  }
};
</script>

<style lang='less' scoped>
.comment-item {
  border-bottom: 1px solid #ccc;
  padding: 20px;
  .time {
    font-size: 15px;
    color: #afafaf;
  }
  .parent {
    width: 321/360 * 100vw;
    background: #e4e4e4;
    padding: 15px 10px;
    font-size: 15px;
    color: #afafaf;
    .parent-title {
      padding: 5px 10px;
    }
    .parent-content {
      padding: 5px 10px;
    }
  }
  .content {
    font-size: 15px;
    padding: 15px 0px;
  }
  .origin{
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 12px;
        color:#999;
    p {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      word-break: break-all;
      // overflow: hidden;
      // text-overflow: ellipsis;
      // white-space: nowrap;
    }
  }
}
</style>