<template>
  <div>
    <!-- //调用头部组件 -->
    <headerNalmore text="我的跟帖"></headerNalmore>
    <!-- 评论的列表 -->
    <div class="content" >
      <!-- //拿到后台数据动态渲染到评论页面上 -->
      <div class="comment-item" v-if="item.parent" v-for="(item,index) in list" :key="index">
        <!-- 当前的评论回复的评论 -->
        <div class="parent"  >
          <div class="time">2019-10-10 10:25</div>
          <div class="parent-title">回复：火星彩票研究员</div>{{item.parent.content}}
        </div>
        <!-- 个人的评论内容 -->
       <div class="reply">{{item.content}}</div>
      </div>
      
      <!-- 原文链接 -->
      <router-link to="#" class="article-link">
        <p>原文：《六合彩之白小姐》《六合彩之白小姐》《六合彩之白小姐》《六合彩之白小姐》</p>
        <span class="iconfont iconjiantou1 youjiantou"></span>
      </router-link>
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
.content {
  padding: 0 20px;
  .time {
    color: #a1b7d2;
  }
  .parent {
    padding: 20px 10px;
    background: #e4e4e4;
    color: #939393;
    .parent-title {
      margin-bottom: 12px;
    }
  }
  .reply {
    padding: 18px 0;
  }
  .article-link {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 15px;
    color: #999;
    p {
      width: 90%;
      //单行超出只显示一行，并加上三个点结尾
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>