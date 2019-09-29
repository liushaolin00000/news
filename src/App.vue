<template>
<div>
   <div>
     <!-- <router-link to='/login'>点击登录</router-link> -->
     <!-- //组件占位符 -->
     <router-view></router-view>
   </div>
  
 </div>
 
</template>

<script>

export default {
  data() {
    return {};
  },

}
</script>

<style>
/* 导入组件样式 */
@import url('../node_modules/vant/lib/index.css');
@import url('http://at.alicdn.com/t/font_1426139_h6vn3jbl5q.css');
/* 公共样式 */
html body{
  background:#f6f6f6;  
}
* {
  margin: 0;
  padding: 0;
  outline: none;
  box-sizing: border-box;
  vertical-align: middle;
}

a {
  color: inherit;
}
a:hover {
  text-decoration: none;
}
ul,
li,
ol {
  list-style: none;
}
i,
em {
  font-style: normal;
}
</style>