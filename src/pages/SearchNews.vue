<template>
  <div class="all">
    <!-- 搜索头部分 -->
    <div class="header">
      <!-- 搜索返回按钮 -->
      <div class="back">
        <span class="iconfont iconjiantou" @click="$router.back()"></span>
      </div>
      <!-- 搜索框 -->
      <span class="iconfont iconsearch iconsearchs"></span>
      <!-- 引入分页插件 -->
      <input
        type="text"
        class="search"
        placeholder="通灵兽消失术"
        v-model="value"
        @keyup.enter="handlesearch"
      />
      <!-- 搜索按钮 -->
      <div class="button" @click="handlesearch">搜索</div>
    </div>
    <!-- 文章或者视频结构布局 -->
    <!-- 循环遍历渲染搜索结果的数据 -->
    <!-- 引入分页插件 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :immediate-check="false"
    >
     <PostCard v-for="(item,index) in searchres" :obj='item'  :key='index'></PostCard>
    </van-list>
  </div>
</template>

<script>
import PostCard from "@/components/PostCard.vue";
export default {
  components:{
     PostCard 
  },
  name:'search',
  data() {
    return {
      value: "",
      searchres: [],
      //分页插件的参数
      finished: false,
      loading: false,
      pageIndex: 1,
      pageSize: 5
    };
  },
  methods: {
    //点击搜索按钮向后台发送数据请求
    handlesearch() {
      this.$axios({
        url: `/post_search?keyword=${this.value}&pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`
      }).then(res => {
        const { data } = res.data;
        //通过解构赋值将每次请求的数据相加，完整显示到页面上
        this.searchres =data;
        //手动将loading设置成未加载
        this.loading = false;
        if (data.length < this.pageSize) {
          this.finished = true;
          return;
        }
        //当前页自动加1
        this.pageIndex++;
      });
    },
    // 页面滑到底部的时候触发组件loading加载更多的文章和视频
    onLoad() {
      //每过三面执行一次加载更多数据的请求
      setTimeout(() => {
        this.$axios({
          url: `/post_search?keyword=${this.value}&pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`
        }).then(res => {
          const { data } = res.data;
          //通过解构赋值将每次请求的数据相加，完整显示到页面上
          this.searchres = [...this.searchres, ...data];
          //手动将loading设置成未加载
          this.loading = false;
          // 判断如果当当前页面的数量小于每页规定的数量时，则显示数据已全部加载
          if (data.length < this.pageSize) {
            this.finished = true;
            return;
          }
          //当前页自动加1
          this.pageIndex++;
        });
      }, 3000);
    }
  },
  //组件内的路由守卫，判断如果是首页进入到搜索页面的，清空页面的缓存数据
  beforeRouteEnter(to,from,next){
     if(from.path === '/'){
       //不能获取实例对象，需要在next回调函数中获取
       next(vm=>{
         //vm就是实例对象
         vm.searchres = [];
         vm.value = '';
       })
     }else{
       //如果不是从首页来的就照旧执行就可以了
       next()
     }
  }
};
</script>

<style lang='less' scoped>
.all {
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 15px;
    position: relative;
    .back {
      span {
        color: #272727;
      }
    }
    .search {
      padding-left: 36px;
      width: 258/360 * 100vw;
      height: 45/360 * 100vw;
      background-color: #f2f2f2;
      border: 1px solid #ccc;
      border-radius: 50px;
    }
    .iconsearchs {
      position: absolute;
      left: 50px;
    }
  }
}
</style>