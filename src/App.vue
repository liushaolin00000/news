<template>
   <div>{{message}}你好啊
       <router-link to='/login'>登录</router-link>
       <router-view></router-view>
   </div>
</template>

<script>
export default {
     data(){
         return{
             message:'nihao'
         }
     }
}
</script>

<style>
   div{
       color:red;
   }
</style>