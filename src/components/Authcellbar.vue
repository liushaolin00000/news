<template>
  <div class="main" @click="handleLogout">
    <div>{{lebal}}</div>
    <div class="right">
      {{text}}
      <span class="iconfont iconjiantou1"></span>
    </div>
  </div>
</template>

<script>
export default {
   props:['lebal','text'],
   methods:{
     handleLogout(){
         this.$emit('click')
     }
   }
};
</script>

<style lang='less' scoped>
.main {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid #e4e4e4;
  .right {
    color: #a1a1b6;
  }
}
</style>