<template>
 <router-link :to='/DetailPages/+obj.id'>
  <div class="total">
    <!-- 当图片小于3或者是文章类型的时候显示以下代码 -->
    <div class="card" v-if="obj.cover.length<3&&obj.type==1">
      <!-- //左侧的文字 -->
      <div class="left-card">
        <div class="post-title">{{obj.title}}</div>
        <div class="auther"></div>
        <p class="post-info">
          <span>{{obj.user.nickname}}</span>
          <span>{{obj.comment_length}}跟帖</span>
        </p>
      </div>
      <!-- //右侧的图片 -->
      <div class="card-img">
        <img :src="obj.cover[0].url" alt />
      </div>
    </div>
    <!-- 3张图片显示的布局-->
    <div class="img-card" v-if="obj.cover.length>=3&&obj.type==2">
      <!-- 文章标题 -->
      <div class="post-title">{{obj.title}}</div>
      <!-- 图片展览区 -->
      <div class="img-list">
        <img
          v-for="(item,index) in obj.cover"
          :src="item.url"
          v-if="index<3"
          :key="index"
          class="img"
        />
      </div>
      <!-- 发布者和跟帖 -->
      <p class="post-info">
        <span>{{obj.user.nickname}}</span>
        <span>{{obj.comment_length}} 跟帖</span>
      </p>
    </div>

    <!--视频的显示布局-->
    <div class="radio" v-if="obj.cover.length<3&&obj.type==2">
      <div class="radio-title">{{obj.title}}</div>
      <div class="radio-content">
        <img :src="obj.cover[0].url" />
        <span class="iconfont iconshipin tubiao"></span>
      </div>
      <div class="radio-info">
        <span>{{obj.user.nickname}}</span>
        <span>{{obj.comment_length}} 跟帖</span>
      </div>
    </div>
  </div>
 </router-link>
</template>

<script>
export default {
  props: ["obj"]
};
</script>

<style lang='less' scopde>
.card {
  display: flex;
  padding: 15px 10px;
  justify-content: space-between;
  border-bottom: 1px #ccc solid;
  .left-card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 80 / 360 * 100vw;
    flex: 1;
    .post-title {
      line-height: 1.6;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
    .post-info {
      font-size: 13px;
      color: #868686;
    }
  }
  .card-img img {
    width: 121/360 * 100vw;
    height: 75/360 * 100vw;
    object-fit: cover;
  }
}

.img-card {
  padding: 20px 10px;
  border-bottom: 1px #ccc solid;
  .post-title {
    line-height: 1.6;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  .img-list {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
    .img {
      width: 33%;
      height: 80/360 * 100vw;
      object-fit: cover;
    }
  }
  .post-info {
    font-size: 13px;
    color: #868686;
  }
}

.radio {
  padding: 10px 10px;
  border-bottom: 1px #ccc solid;
  .radio-title {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  .radio-content {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    img {
      display: block;
      width: 100%;
      height: 170/360 * 100vw;
      margin: 10px 0;
    }
    .tubiao {
      position: absolute;
      width: 50/360 * 100vw;
      height: 50/360 * 100vw;
      font-size: 60px;
      color: #ffffff;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      background-color: rgba(0, 0, 0, 0.5);
    }
  }
  .radio-info {
    font-size: 13px;
    color: #868686;
  }
}
</style>