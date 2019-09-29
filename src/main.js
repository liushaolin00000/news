import Vue from 'vue'
//引入组件库
import Vant from 'vant'

//提取vant里面的一个对象
import {
    Toast
} from 'vant'
//引入vant组件库下文件上传的组件
import { Uploader } from 'vant';
//引入vant组件库下的弹出框组件
import { Dialog } from 'vant';
//引入axios文件库 引入请求库
import axios from "axios";


import App from './App.vue'
//引入路由插件
import Router from 'vue-router'
import VueRouter from 'vue-router'

//注册路由
Vue.use(Router)
//注册第三方组件
Vue.use(Vant);
//注册文件上传的组件
Vue.use(Uploader);
// //注册弹出框组件
Vue.use(Dialog);
// 绑定到原型
Vue.prototype.$axios = axios;
//基准路径，每次请求后台数据都会自动加上
axios.defaults.baseURL = "http://localhost:3000"
//1.导入登录页面的组件
import Login from '@/pages/login.vue'
//2.导入注册页面的组键
import Register from '@/pages/register.vue'
//3.导入个人中心页面组件
import Personal from '@/pages/Personal.vue'
//4.导入编辑用户信息的组件
import EditPersonal from '@/pages/editPersonal.vue'
//5.导入我的关注的组件
import UserFollow from '@/pages/userFollow.vue'
//6.导入我的跟帖的组件
import Followup from '@/pages/followup.vue'
//7.导入头条主页面的组件
import Index from '@/pages/index.vue'
//8.导入头条详情部分
import DetailPages from '@/pages/DetailPages.vue'
//8.导入新闻搜索组件
import SearchNews  from '@/pages/SearchNews.vue'
//2.创建路由配置
const routes = [
    //路由重定向
    // {
    //     path: '/',
    //     redirect: '/login'
    // },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/register',
        component: Register
    },
    {
        path: '/personal',
        component: Personal
    },
    //将编辑用户信息的组件和路由关联起来
    {
        path:'/editPersonal',
        component:EditPersonal
    },
     //将我的关注的组件和路由关联起来
     {
        path:'/userFollow',
        component:UserFollow
    },
      //将我的跟帖组件和路由关联起来
      {
        path:'/followup',
        component: Followup
    },
     //将头条主页面组件和路由关联起来
     {
        path:'/',
        component: Index
    },
     //将头条文章和视屏详情组件和路由关联起来
     {
        path:'/DetailPages/:id',
        component:DetailPages
    },
     //将文章搜索和路由关联起来
     {
        path:'/SearchNews',
        component:DetailPages
    },
]
//3.创建对象
const router = new VueRouter({
    routes
})
//路由守卫  用于判断用户是否登录
router.beforeEach((to, form, next) => {
    //在本地存储获取token
    const hasToken = localStorage.getItem('token');
    //判断是否有个人中心页/用户编辑页  判断是否需要登录权限的页面
    if (to.path == '/personal'||to.path == '/editPersonal'||to.path=='/userFollow') {
        //判断本地是否有token值 ,有则正常跳转，没有则返回登录页
        if (hasToken) {
            //正常跳转
            return next()
        } else {
            //没有token跳转到登录页面
            return next('/login')
        }
    }
    //所有人可以访问的页面正常浏览
    next()
})
//axios响应拦截器，放到路由对象后面，稍后需要依赖路由对象进行跳转
axios.interceptors.response.use(res => {
    // console.log(res)
    const {
        message,
        statusCode
    } = res.data;
    //能正常请求后台，但是响应的cstatusCode是401时弹出错误
    if (message && statusCode == 401) {
        Toast.fail(message)
    }
    //判断如果token过期或者失效也不能跳转到需要权限的页面并且返回到登录页
    if (message === "用户信息验证失败") {
        //团转到登录页面
        router.push('/login');
        Toast.fail(message)
    }
    return res
}, function (err) {
    //请求后台失败时候的错误
    return Toast.fail('网络错误')
})
new Vue({
    el: '#app',
    //4.挂载到根实例
    router,
    //指定一个组件渲染根实例，这个组件可以成为最底层的组件
    render: function (createElement) {
        //render函数使用固定的写法，只有app可变
        return createElement(App)
    }
})