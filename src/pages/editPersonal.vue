<template>
  <div>
    <headerNalmore text='编辑用户'></headerNalmore>
    <div class="img">
      <img :src="profile.head_img" alt />
      <!-- 调用文件上传组件 -->
      <van-uploader :after-read="afterRead" class="loader" />
    </div>
    <!-- 使用已经封装好的单行组件 ,组件库里动态接收父组件传过去的值-->
    <!-- 将获取到的数据渲染到页面上 -->

    <Authcellbar lebal="昵称" :text="profile.nickname" @click="show1=!show1"></Authcellbar>
    <!-- 调用组件，这个为密码编辑输入框 -->
    <van-dialog v-model="show1" title="编辑昵称" show-cancel-button @confirm="handleNickname">
      <van-field placeholder="请输入昵称" ref="nickname" :value="profile.nickname" />
    </van-dialog>

    <Authcellbar lebal="密码" :text="profile.password" @click="show2=!show2"></Authcellbar>
    <!-- 调用组件，这个为密码编辑输入框 -->
    <van-dialog v-model="show2" title="编辑密码" show-cancel-button @confirm="handlepassword">
      <van-field placeholder="请输入密码" ref="password" :value="profile.password" />
    </van-dialog>

    <Authcellbar lebal="性别" :text="profile.gender===1?'男':'女'" @click="show3=!show3"></Authcellbar>
    <van-dialog v-model="show3" title="编辑性别" show-cancel-button @confirm="handlegender">
      <!-- 调用组件，这个为性别编辑输入框 -->
      <van-radio-group v-model="genderCache">
        <van-cell-group class="gender">
          <van-cell title="男" clickable @click="genderCache= '1'" class="gender">
            <van-radio slot="right-icon" name="1" />
          </van-cell>
          <van-cell title="女" clickable @click="genderCache= '0'" class="gender">
            <van-radio slot="right-icon" name="0" />
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-dialog>
  </div>
</template>

<script>
//引入单行组件
import Authcellbar from "@/components/Authcellbar";
//引入头部组件
import headerNalmore from "@/components/headerNalmore.vue";
import { stringify } from "querystring";
export default {
  //将返回的数据存到这里
  data() {
    return {
      profile: {},
      //昵称弹窗
      show1: false,
      //密码弹窗
      show2: false,
      //性别弹窗
      show3: false,
      genderCache: ""
    };
  },
  methods: {
    //封装了请求编辑用户资料接口函数
    editprofile(data, callback) {
      //判断如果没有传入数据则不执行函数下面的代码
      if (data) {
        this.$axios({
          url: "/user_update/" + localStorage.getItem("user_id"),
          method: "post",
          //添加头信息
          headers: {
            Authorization: localStorage.getItem("token")
          },
          data: {}
        }).then(res => {
          const { message } = res.data;
          //成功修改图片之后弹出提示
          if (message == "修改成功") {
            //如果有传入回调函数就说明要赋值到编辑的内容里面
            if (callback) {
              callback();
            }
            this.$toast.success("message");
          }
        });
      }
    },
    //选择完图片之后的回调函数，file返回选中的图片
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      //构造表单数据
      const formData = new FormData();
      //通过表单使用append方法追加数据
      formData.append("file", file.file);
      this.$axios({
        url: "/upload",
        method: "POST",
        //添加头信息
        headers: {
          Authorization: localStorage.getItem("token")
        },
        //传入数据
        data: formData
      }).then(res => {
        const { data } = res.data;
        //替换用户资料图片
        this.profile.head_img = this.$axios.defaults.baseURL + data.url;
        //把头像资料Url上传到 用户资料
        this.$axios({
          url: "/user_update/" + localStorage.getItem("user_id"),
          method: "Post",
          //添加头信息
          headers: {
            Authorization: localStorage.getItem("token")
          },
          data: {
            head_img: data.url
          }
        }).then(res => {
          const { message } = res.data;
          //成功修改图片之后弹出提示
          if (message == "修改成功") {
            this.$toast.success("message");
          }
        });
      });
    },
    //点击编辑昵称，点击确认的时候触发
    handleNickname() {
      //拿到input输入框的值
      const value = this.$refs.nickname.$refs.input.value;
      //把昵称上传到用户资料  调用方法里面的请求接口函数
      // this.editprofile({ nickname: value }, () => {
      //   this.profile.nickname = value;
      // });
      this.$axios({
        url: "/user_update/" + localStorage.getItem("user_id"),
        method: "Post",
        //添加头信息
        headers: {
          Authorization: localStorage.getItem("token")
        },
        data: {
          nickname: value
        }
      }).then(res => {
        this.profile.nickname = value;
        const { message } = res.data;
        //成功修改图片之后弹出提示
        if (message == "修改成功") {
          this.$toast.success("message");
        }
      });
    },
    //点击编辑密码,点击确认的时候触发
    handlepassword() {
      //拿到input输入框的值
      const value = this.$refs.password.$refs.input.value;
      //把昵称上传到用户资料  调用方法里面的请求接口函数
      // this.editprofile({ password: value }, () => {
      //   this.profile.password = value;
      // });
      this.$axios({
        url: "/user_update/" + localStorage.getItem("user_id"),
        method: "Post",
        //添加头信息
        headers: {
          Authorization: localStorage.getItem("token")
        },
        data: {
          password: value
        }
      }).then(res => {
        this.profile.password = value;
        const { message } = res.data;
        //成功修改图片之后弹出提示
        if (message == "修改成功") {
          this.$toast.success("message");
        }
      });
    },
    //点击编辑性别,点击确认的时候触发
    handlegender() {
      //拿到性别的值
      const gender = +this.genderCache;

      // console.log(this.profile)
      //把昵称上传到用户资料  调用方法里面的请求接口函数
      // this.editprofile({gender}, () => {
      //   this.profile.gender = gender;
      // });
      this.$axios({
        url: "/user_update/" + localStorage.getItem("user_id"),
        method: "Post",
        //添加头信息
        headers: {
          Authorization: localStorage.getItem("token")
        },
        data: {
          gender
        }
      }).then(res => {
        this.profile.gender = gender;
        const { message } = res.data;
        //成功修改图片之后弹出提示
        if (message == "修改成功") {
          this.$toast.success("message");
        }
      });
    }
  },
  //  注册单行组件/头部组件
  components: {
    Authcellbar,
    headerNalmore
  },
  //页面加载完毕的时候动态渲染那数据
  mounted() {
    this.$axios({
      url: "/user/" + localStorage.getItem("user_id"),
      //添加头信息
      headers: {
        Authorization: localStorage.getItem("token")
      }
    }).then(res => {
      // console.log(res);
      //将数据保存起来
      const { data } = res.data;
      this.profile = data;

      //把后天返回的性别数据赋值给genderCache 将性别转换成字符串
      this.genderCache = String(data.gender);
      if (data.head_img) {
        this.profile.head_img =
          this.$axios.defaults.baseURL + this.profile.head_img;
      } else {
        this.profile.head_img = "./static/美女.jpg";
      }
    });
  }
};
</script>

<style lang='less' scoped>
div {
  padding: 20px;
  head {
    display: flex;
  }
  strong {
    margin-left: 100/360 * 100vw;
  }
  .img {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 70/360 * 100vw;
      border-radius: 50%;
    }
    .loader {
      position: absolute;
      opacity: 0;
    }
  }
  // .gender{
  //   height: 10/360*100vw;
  // }
}
// /deep/ .van-dialog__content{
//    height: 100/360*100vw;
// }
</style>