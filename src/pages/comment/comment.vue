<template>
  <div class="all">
    <!-- 精彩跟帖头部部分 -->
    <div header>
      <Header text="精彩跟帖"></Header>
    </div>
    <!-- 底部评论组件的调用 -->
    <DetailFooter :postdetail="postdetail" :replyComment="replyComment" @handleReply="handleReply"></DetailFooter>
    <!-- 评论用户信息部分 -->
    <!-- 循环遍历后天返回的数据，渲染到评论页面上 -->
    <!-- 调用分页组件 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :immediate-check="false"
      @load="onLoad"
    >
      <div class="main" v-for="(item,index) in comment" :key="index">
        <div class="info">
          <!-- 左侧部分 -->
          <div class="left">
            <img :src="$axios.defaults.baseURL+item.user.head_img" v-if="item.user.head_img" />
            <img src="../../../static/123.jpg" v-else />
            <div class="name">
              <span>{{item.user.nickname}}</span>
              <span>2小时前</span>
            </div>
          </div>
          <!-- 右侧回复部分 -->
          <div class="reply" @click="handleReply(item)">回复</div>
        </div>
        <!-- 评论楼层 -->
        <!-- 如果有评论楼层才显示不然不显示 -->
        <CommentFloor v-if="item.parent" :data="item.parent" @handleReply="handleReply"></CommentFloor>
        <!-- 显示左后一条评论内容 -->
        <div class="last-comment">{{item.content}}</div>
      </div>
    </van-list>
  </div>
</template>

<script>
//导入配置文件
import config from "./comment.js";
export default config;
</script>

<style scoped lang='less'>
@import url("comment.less");
</style>