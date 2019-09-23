import Vue from 'vue'
//引入组件库
import Vant from 'vant'
//引入axios文件库 引入请求库
import axios from "axios";
import App from './App.vue'
//注册路由插件
import Router from 'vue-router'
import VueRouter from 'vue-router'
//注册路由
Vue.use(Router)
//注册第三方组件
Vue.use(Vant);
// 绑定到原型
Vue.prototype.$axios = axios;
//基准路径，每次请求后台数据都会自动加上
axios.defaults.baseURL = "http://localhost:3000"
//1.导入登录组件
import Login from '@/pages/login.vue'
//2.导入注册主键
import Register from '@/pages/register.vue'

//2.创建路由配置
const routes = [{
        path: '/login',
        component: Login
    },
    {
      path:'/register',
      component:Register
    }
]
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