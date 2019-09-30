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
      <input type="text" class="search" placeholder="通灵兽消失术" v-model="value" @keyup.enter='handlesearch'/>
      <!-- 搜索按钮 -->
      <div class="button" @click="handlesearch" >搜索</div>
    </div>
    <!-- 文章或者视频结构布局 -->
    <!-- 循环遍历渲染搜索结果的数据 -->
    <div class="total" v-for="(item,index) in searchres" :key="index">
      <!-- 当图片小于3或者是文章类型的时候显示以下代码 -->
      <div class="card" v-if="item.cover.length<3&&item.type==1">
        <!-- //左侧的文字 -->
        <div class="left-card">
          <div class="post-title">{{item.title}}</div>
          <div class="auther"></div>
          <p class="post-info">
            <span>{{item.user.nickname}}</span>
            <span>{{item.comment_length}} 跟帖</span>
          </p>
        </div>
        <!-- //右侧的图片 -->
        <div class="card-img">
          <img :src="item.cover[0].url" alt />
        </div>
      </div>
      <!-- 3张图片显示的布局-->
      <div class="img-card" v-if="item.cover.length>=3&&item.type==2">
        <!-- 文章标题 -->
        <div class="post-title">{{item.title}}</div>
        <!-- 图片展览区 -->
        <div class="img-list">
          <img
            v-for="(item,index) in item.cover"
            :src="item.url"
            v-if="index<3"
            :key="index"
            class="img"
          />
        </div>
        <!-- 发布者和跟帖 -->
        <p class="post-info">
          <span>{{item.user.nickname}}</span>
          <span>{{item.comment_length}} 跟帖</span>
        </p>
      </div>

      <!--视频的显示布局-->
      <div class="radio" v-if="item.cover.length<3&&item.type==2">
        <div class="radio-title">{{item.title}}</div>
        <div class="radio-content">
          <img :src="item.cover[0].url" />
          <span class="iconfont iconshipin tubiao"></span>
        </div>
        <div class="radio-info">
          <span>{{item.user.nickname}}</span>
          <span>{{item.comment_length}} 跟帖</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
      searchres: []
    };
  },
  methods: {
    //点击搜索按钮向后台发送数据请求
    handlesearch() {
      this.$axios({
        url: `/post_search?keyword=${this.value}`
      }).then(res => {
        const { data } = res.data;
        this.searchres = data;
      });
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