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
        value="你好"
        class="username"
        placeholder="手机号码"
        :rule="/^1[0-9]{4,11}$/"
        v-model="form.username"
        @input="handleusername"
        errormessage="您输入的手机格式有误，请重新输入！"
      ></AuthInput>
      <AuthInput
        placeholder="密码"
        :rule="/^[0-9,a-z,A-Z]{3,8}$/"
        v-model="form.password"
        @input="handleusername"
        errormessage="您输入的密码格式有误，请重新输入！"
      ></AuthInput>
      <div class="right">
        <p class="notlogin">
          <span>不登录</span>
          <router-link to="/" class="toutiao">去黑马头条首页</router-link>
        </p>
        <!-- 提示 -->
        <p class="tip">
          没有账号？
          <router-link to="/register" class="tips">去注册</router-link>
        </p>
      </div>
      <!-- //登录按钮 -->
      <AuthButton text="登录" @click="handlesubmit"></AuthButton>
    </div>
  </div>
</template>
<script>
//1.导入输入框组件
import AuthInput from "@/components/AuthInput";
//2.引入按钮组件
import AuthButton from "@/components/AuthButton";
export default {
  //这里等同于组件实例对象
  data() {
    return {
      form: {
        username: "",
        password: ""
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
        url: "/login",
        method: "POST",
        data: this.form
      }).then(res => {
        if (res.data.message === "登录成功") {
          //提取后台响应过来的数据
          const { message, data } = res.data;
          //把token和id保存到本地
          localStorage.setItem("token", data.token);
          localStorage.setItem("user_id", data.user.id);
          //跳转到下一页，也就是跳转到首页
          this.$router.push("/");
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
</script>
<style lang="less" scoped>
// lang声明样式的类型
//scoped为避免不同组件之间变量名重复造成的覆盖
.content {
  padding-left: 20px;
  padding-right: 20px;

  // .username {
  //   margin-top: 30px;
  //   margin-bottom: 50px;
  // }
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
  .right {
    float: right;
    margin-top: 15px;
    .tip {
      margin-top: 10px;
      height: 20px;
      .tips {
        color: blue;
      }
    }
    .notlogin {
      height: 20px;
      .toutiao {
        color: #0000ff;
      }
    }
  }
}
</style> 