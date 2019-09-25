<template>
  <div class="content">
    <!-- 登录页 -->
    <!-- 关闭的按钮 -->
    <div class="close">
      <span class="iconfont iconicon-test"></span>
    </div>

    <!-- logo -->
    <div class="logo">
      <span class="iconfont iconnew"></span>
    </div>

    <!-- 用户名密码输入框 -->
    <div>
      <AuthInput
        class="username"
        placeholder="手机号码"
        :rule="/^1[0-9]{3,10}$/"
        v-model="form.username"
        @input="handleusername"
        errormessage="您输入的手机格式有误，请重新输入！"
       
      ></AuthInput>
      <!-- 昵称输入框组件组件 -->
       <AuthInput
        placeholder="昵称"
        :rule="/^[0-9,a-z,A-Z,\u4e00-\u9fa5]{3,8}$/"
        v-model="form.nickname"
        @input="handleusername"
        errormessage="您输入的昵称格式有误，请重新输入！"
      ></AuthInput>
      <AuthInput
        placeholder="密码"
        :rule="/^[0-9,a-z,A-Z]{3,8}$/"
        v-model="form.password"
        @input="handleusername"
        errormessage="您输入的密码格式有误，请重新输入！"
      ></AuthInput>
      <!-- 提示 -->
      <p class="tip">有账号？<router-link to="/login" class="tips">去登录</router-link></p>
      <!-- //登录按钮 -->
      <AuthButton text="注册" @click="handlesubmit"></AuthButton>
    </div>
  </div>
</template>
<script>
//1.导入输入框组件
import AuthInput from "@/components/AuthInput";
//2.引入按钮组件
import AuthButton from "@/components/AuthButton";
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
        nickname:'',
      }
    };
  },
  methods: {
    //传递给输入框组件，用于获取用户
    handleusername(value) {
      this.form.userName = value;
    },
    handlesubmit() {
      this.$axios({
        url: "/register",
        method: "POST",
        data: this.form
      }).then(res => {
          console.log(res)
        if(res.data.message==='注册成功'){
            this.$toast.fail('注册成功！')
           //跳转到下一页，也就是跳转到登录页
           this.$router.push('/login')
        }
      });
    }
  },
  //注册组件
  //2.组件的注册
  components: {
    AuthInput,
    AuthButton
  }
};
</script>>
<style lang="less" scoped>
// lang声明样式的类型
.content {
  padding-left: 20px;
  padding-right: 20px;

//   .username {
//     margin-top: 30px;
//     margin-bottom: 50px;
//   }
  .close {
    padding: 20px;
    span {
      font-size: 27 / 360 * 100vw;
    }
  }
  .logo {
    display: flex;
    justify-content: center;
    span {
      display: block;
      font-size: 126 / 360 * 100vw;
      color: #d81e06;
    }
  }
  .tip{
    float: right;
    margin-top: 10px;
   .tips{
       color: blue;
    }
  }
}
</style> 