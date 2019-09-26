<template>
  <div class="head">
    <span class="iconfont iconjiantou2" @click="handleBack"></span>
    <strong>{{text}}</strong>
    <span>></span>
  </div>
</template>

<script>
export default {
    props:['text'],
    methods:{
        handleBack(){
           this.$router.back()
        }
    }
};
</script>

<style lang='less' scoped>
.head {
    display:flex;
    justify-content: space-between;
    flex:1;
    padding: 20px;
    span:last-child{
        opacity: 0;
    }   
}
</style>