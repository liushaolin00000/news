<template>
<div>
  <div class="floor">
    <div class="message">
      <span>{{data.user.nickname}}</span>
      <span class="time">2小时前</span>
      <span @click='handleReply'>回复</span>
    </div>
    <!-- 回复楼层中的评论内容部分 -->
    <div class="content">{{data.content}}</div>
  </div>
  <CommentFloor :data='data.parent' v-if='data.parent' @handleReply='handleReply'></CommentFloor>
</div>
</template>

<script>
export default {
  //组件的名字，单纯的针对当前的组件命名，当前的组件可以通过改名字自己调用自己
  name: "CommentFloor",
  //接收父组件传递过来的数据
  props: ["data"],
  methods:{
    handleReply(){
       this.$emit('handleReply',this.data)
    }
  }
};
</script>

<style lang='less' scoped>
div{
.floor:not(:first-child){
    border-top:none;
}
.floor {
  padding: 15px 8px;
  margin: 0 20px 0px 20px; 
  border: 1px solid #ccc;
  .message {
    .time {
      font-size: 12px;
      color: #707070;
    }

    span:last-child {
      float: right;
      font-size: 12px;
      color: #707070;
      line-height: 23px;
    }
  }
  .content {
    padding-top: 10px;
  }
}
}
</style>