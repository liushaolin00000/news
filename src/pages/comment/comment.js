//导入头部部分的组件
import Header from '@/components/headerNalmore.vue'
//引入评论楼层组件
import CommentFloor from '@/components/CommentFloor.vue'
// 降底部的评论组件引入进来
import DetailFooter from '@/components/DetailFooter.vue'
export default {
    //注册组件
    components: {
        Header,
        CommentFloor,
        DetailFooter
    },
    data() {
        return {
            comment: [],
            postdetail: {},
            replyComment:null,
            //分页的参数
            loading: false,
            finished: false,
            pageIndex: 1,
            pageSize: 10,
        }
    },
    mounted() {
        //精彩跟帖页面加载完毕之后就向后台请求评论的数据
        this.$axios({
                //每一页显示评论条数10条
                url: '/post_comment/' + this.$route.params.id + '?pageIndex' + this.pageIndex
            }).then(res => {
                //将后台返回的数据保存起来
                const {
                    data
                } = res.data
                this.comment = data
                //页数加1
                this.pageIndex++
            }),
            //精彩跟帖页面加载完毕之后就向后台请本篇文章的文章详情数据
            this.$axios({
                url: "/post/" + this.$route.params.id,
                //添加头信息
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            }).then(res => {
                const {
                    data
                } = res.data;
                //将后台获取到的数据保存起来
                this.postdetail = data;
            });
    },
    methods: {
        //加载更多
        onLoad(){
          
          //加载新页面，每过3秒钟
            setTimeout(() => {
                this.$axios({
                    //每一页显示评论条数10条
                    url: '/post_comment/' + this.$route.params.id + '?pageIndex=' + this.pageIndex
                }).then(res => {
                    //将后台返回的数据保存起来
                    const {
                        data
                    } = res.data
                    //覆盖评论列表
                    this.comment = [...this.comment, ...data]
                    //请求完毕后手动将loading变为false
                    this.loading = false;
                    if (data.length < this.pageSize) {
                        this.finished = true;
                        return
                    }
                    //页数加1
                    this.pageIndex++
                })
            }, 3000)
           
        },
        //点击回复按钮时候触发的方法
        handleReply(item){
            //获取当前要回复的用户
          this.replyComment = item
        }
    }
}