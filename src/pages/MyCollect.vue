<template>
  <div class="all">
    <!-- 页面的头部 -->
    <Header text="我的收藏"></Header>
    <!-- 我收藏的文章和视屏 -->
    <PostCard v-for="(item,index) in collect" :obj='item'   :key='index'></PostCard>
  </div>
</template>

<script>
//导入头组件
import Header from "@/components/headerNalmore";
//引入文章组件
import PostCard from "@/components/PostCard.vue";
export default {
  //组件的注册
  components: {
    Header,
    PostCard
  },
  data(){
     return{
         collect:[]
     }
  },
  mounted() {
    //当我的收藏页面刷新的时候向后台发起请求我的收藏的数据
    this.$axios({
      url: "/user_star",
      //添加头信息
      headers: {
        Authorization: localStorage.getItem("token")
      }
    }).then(res=>{
        const {data} = res.data
        this.collect = data
    });
  }
};
</script>

<style>
</style>