<template>
  <div class="main">
    <headerNalmore text="我的关注"></headerNalmore>

    <!-- 主页面 -->
    <!-- 将我的关注信息数据循环渲染到页面上  必须加上 :key="index"才不会报错-->
    <!-- <div class="content" v-for="(item index) in list" :key="index"> -->
    <div class="content" v-for="(item, index) in list" :key="index">
      <img :src="$axios.defaults.baseURL+item.head_img" alt />
      <div class="middle">
        <div>{{item.nickname}}</div>
        <span>2019-9-26</span>
      </div>
      <div class="follow" @click="handlecancel(index)">取消关注</div>
    </div>
  </div>
</template>

<script>
//引入头部组件
import headerNalmore from "@/components/headerNalmore.vue";
export default {
  //1.注册组件
  components: {
    headerNalmore
  },
  //2.将数据存放到这里
  data() {
    return {
      list: []
    };
  },
  methods: {
    handlecancel(index) {
      if (confirm("是否取消关注")) {
        this.$axios({
          url: "/user_unfollow/"+this.list[index].id,
          // method: "GET",
          //添加头信息
          headers: {
            Authorization: localStorage.getItem("token")
          }
        }).then(res=>{
             this.list.splice(index,1)
        });
      }
    }
  },
  mounted() {
    //页面加载完成后就动态渲染页面

    this.$axios({
      url: "/user_follows",
      // method: "GET",
      //添加头信息
      headers: {
        Authorization: localStorage.getItem("token")
      }
    }).then(res => {
      const { data } = res.data;
      //  console.log(data)
      //将数组存放到数据当中
      this.list = data;
      console.log(this.list);
    });
  }
};
</script>

<style lang='less' scoped>
.main {
  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 35/360 * 100vw;
    padding: 20px 20px;
    border-bottom: 1px solid #a9b5b9;
    img {
      width: 80/360 * 100vw;
      border-radius: 50%;
    }
    .middle {
      flex: 1;
      padding: 0 10px;
      span {
        color: #a9b5b9;
      }
    }
    .follow {
      background: #a9b5b9;
      padding: 0 10px;
      height: 35px;
      line-height: 35px;
      font-style: 12px;
      border-radius: 50px;
    }
  }
}
</style>