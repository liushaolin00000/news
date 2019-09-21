import Vue from 'vue'
import App from './App.vue'
//注册路由插件
import Router from 'vue-router'
import VueRouter from 'vue-router'
//注册路由
Vue.use(Router)
//1.导入组件
import Login from '@/pages/login.vue'
//2.创建路由配置
const routes =[{
    path:'/login',
    component:Login
}] 
//3.创建对象
const router = new VueRouter({
    routes
})
new Vue({
    el: '#app',
    //4.挂载到根实例
    router,
    render: function (createElement) {
        return createElement(App)
    }
})