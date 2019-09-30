<template>
  <div class="all">
    <!-- 精彩跟帖头部部分 -->
    <div header>
      <Header text="精彩跟帖"></Header>
    </div>
    <!-- 评论用户信息部分 -->
    <div class="info">
      <!-- 左侧部分 -->
      <div class="left">
        <img src="../../../static/123.jpg" />
        <div class="name">
          <span>火星网友</span>
          <span>2小时前</span>
        </div>
      </div>
      <!-- 右侧回复部分 -->
      <div class="reply">回复</div>
    </div>
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