<template>
  <div>
    <headerNalmore></headerNalmore>
    <div class="img">
      <img :src="profile.head_img" alt />
      <!-- 调用文件上传组件 -->
      <van-uploader :after-read="afterRead" class="loader"/>
    </div>
    <!-- 使用已经封装好的单行组件 ,组件库里动态接收父组件传过去的值-->
    <!-- 将获取到的数据渲染到页面上 -->
    <Authcellbar lebal="昵称" :text="profile.nickname"></Authcellbar>
    <Authcellbar lebal="密码" :text="profile.password"></Authcellbar>
    <Authcellbar lebal="性别" :text="profile.gender===1?'男':'女'"></Authcellbar>
  </div>
</template>

<script>
//引入单行组件
import Authcellbar from "@/components/Authcellbar";
//引入头部组件
import headerNalmore from "@/components/headerNalmore.vue";
export default {
  //将返回的数据存到这里
  data() {
    return {
      profile: {}
    };
  },
  methods: {
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      //构造表单数据
      const forData = new FormData();
      //通过表单使用append方法追加数据
      forData.append('file',file.file);
      this.$axios({
        url:'/upload',
        method:'post',
        //添加头信息
        header:{
          Authorization:localStorage.getItem('token')
        }
      })
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
      console.log(res);
      //将数据保存起来
      const { data } = res.data;
      this.profile = data;
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
    .loader{
       position: absolute;
       opacity: 0;
    }
  }
}
</style>