<template>
  <div class="head">
    <span class="iconfont iconjiantou2" @click="handleBack"></span>
    <strong>编辑资料</strong>
    <span>></span>
  </div>
</template>

<script>
export default {
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
    span:last-child{
        opacity: 0;
    }   
}
</style>