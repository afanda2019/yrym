<template>
  <v-page :title="title">
    <div class="content">
      <img :src='teacherDetail.list_img' style='width:100%;display:block'>
      <div class="course-info">
        <div class="title">
          {{teacherDetail.name}}
        </div>
      </div>
      <div style='background:#f7f7f7;height:10px'></div>
     
     
      <div class='xiangqingtitle'>详情</div>
      <div class='cont' v-html='teachercont' style='background:#fff'></div>
      
      
    </div>
  </v-page>
</template>

<script>
  export default {
    name: 'course_detail',
    data () {
      return {
        
        teacherDetail:'',
        teachercont:'',
        title:'名师详情'
      }
    },
    mounted(){
      if(this.$route.query.title){
        this.title=this.$route.query.type_id
      }
      this.course_detail()
      
    },
    methods:{
      
      openPage(str,id,type){
        this.$router.push({name:str,query: {type_id: id,type:type}});
      },
      // 商品信息
      course_detail(){
        const params = {
          'token':this.$getStorage('token'),
          'id':this.$route.query.type_id
        }
        this.$ajax('teacher/teacherDetail',params).then((res) => {
          this.$toast.clear()
          if (res.errno == 1000) {
            this.teacherDetail = res.data;
            this.teachercont = this.formatImg(this.teacherDetail.description)
          }
        }, (err) => {
          console.log(err)
        })
      },
      formatImg:function(html){
                var newContent= html.replace(/<img[^>]*>/gi,function(match,capture){
            var match = match.replace(/<img/gi,'<img/style="width:100%"');
            return match;
        });
        return newContent;
      },
      
      // 、、收藏商品
      collection(id){
        const params = {
          'token':this.$getStorage('token'),
          'data_id':this.productinfo.id,
          'group_flag':'product'
        }
        this.$ajax('member/addHistory',params).then((res) => {
          this.$toast.clear()
          console.log(res)
          if (res.errno == 1000) {
            this.productinfo.is_history = 1
            // this.onLoad()
            
          }
          
        }, (err) => {
          console.log(err)
        })
      },
      // 取消收藏
      delcollection(id){
        const params = {
          'token':this.$getStorage('token'),
          'data_id':this.productinfo.id,
          'group_flag':'product'
        }
        this.$ajax('member/delHistory',params).then((res) => {
          this.$toast.clear()
          console.log(res)
          if (res.errno == 1000) {
            this.productinfo.is_history = 0
            
          }
          
        }, (err) => {
          console.log(err)
        })
      },
     
      
    },
  }
</script>

<style scoped>
  .checkbox-wrap{
    padding: 15px 0;
  }
  .cont{padding:10px 15px 50px;}
  .explain-wrap >>> .van-checkbox__icon--checked .van-icon {
    border-color     : #FA6835;
    background-color : #FA6835;
  }
  .van-button--large {
    border-radius : 5px;
    color         : #fff;
    background    : #0E4548;
  }
  .cont{}
  .van-dialog {
    width : 90%;
  }

  .explain-wrap {
    padding : 15px;
    margin  : 10px;
  }
.btn-audio{
        margin: 90px auto;
        width: 186px;
        height: 186px;
        background:url('../assets/grzx_03.jpg') no-repeat center bottom;
        background-size:cover;
    }
  .explain-wrap .title {
    margin  : 0;
    padding : 5px 0;
  }

  .explain-content-wrap {
    background  : #E7F8F2;
    padding     : 15px;
    font-size   : 15px;
    line-height : 24px;
    color       : #333;
  }

  .explain-content {
    text-indent : 20px;
  }

  .explain-content-wrap .date {
    text-align : right;
    color      : #000;
  }

  .content >>> .van-button--danger {
    background   : linear-gradient(to right, #4FFD74, #20953F);
    border-width : 0;
  }

  .course-info {
    background    : #fff;
    padding       : 15px;
  }

  .course-info .title {
    font-size : 15px;
    color     : #333;
  }

  .price {
    display         : flex;
    margin          : 8px 0 0 0;
    justify-content : space-between;
  }

  .price span:first-child {
    color : #F59C3F;
  }

  .price span:last-child {
    font-size : 14px;
    color     : #999;
  }

  .content {
    height:100vh;
    background : #fff;
  }

  .audio-wrap {
    text-align    : center;
    margin-bottom : 10px;
    box-shadow    : #999 0 0 18px;
  }
  .van-dialog{
    height: 80%;
    overflow: scroll;
    -webkit-overflow-scrolling:touch
  }
#beijing{width: 100%;height:100%;left:0;top:0;position: fixed;z-index:199;background:rgba(0,0,0,0.5);}
#fuli{position:relative;}
#dhcg img{width: 80% !important;}
#guanbi{ height:20px;width:20px;background:#ff0000;z-index:999;}
.tankuang{background:#fff; position:fixed;width:100%;bottom:0;left:0;z-index:999999; overflow:hidden;}
.db_tc{ clear:both; position:relative; padding:10px; overflow:hidden;}
.db_tc_left{ float:left; width:30%; border-radius:5px;}
.db_tc_left img{width:100%}
.db_tc_right{ float:left; width:55%; padding:5px 0 0 5%; color:#df1614;}
.db_tc_right span{ height:52px; line-height:26px; overflow:hidden; color:#000; display:block;}
.an_gb{ position:absolute; z-index:99; right:10px; top:10px; width:15px;}
.db_tc_sx{ clear:both; padding:10px; overflow:hidden;}
.db_tc_sx_left{float:left; width:25%; text-align:center;}
.db_tc_sx_right{ float:left; width:75%;}
.db_tc_sx_right ul li{ float:left; width:30%; text-align:center; color:#df1614; border:1px #df1614 solid; line-height:26px; margin:-3px 2% 0 0; border-radius:5px;}
.ljgm{ clear:both; margin-top:10px;}
.ljgm{ background:#0f4549; color:#FFF; text-align:center; line-height:40px;width:100%}
.xiangqingtitle{
  padding:10px;
  text-align:center;
  background:#fff;
  border-bottom:2px solid #f1f1f1
}
.cont{padding:0 15px;}
p{margin:0}
</style>
